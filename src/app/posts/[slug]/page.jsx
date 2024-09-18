import Image from 'next/image';
import prisma from '../../../utils/prismaClient';
import styles from './slugView.module.css';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'; 
import EditButton from '@/app/components/editButton/EditButton';
import { getServerSession } from 'next-auth/next'; // Importar getServerSession para verificar a sessão
import { authOptions } from '../../../../pages/api/auth/[...nextauth]'; // Importar suas opções de autenticação

export default async function PostPage({ params }) {
  const { slug } = params;

  // Obtém a sessão do lado do servidor
  const session = await getServerSession(authOptions);

  let post = await prisma.posts.findUnique({
    where: {
      slug: slug,
    },
  });

  if (!post) {
    return <p>Post não encontrado.</p>;
  }

  // Função para renderizar o conteúdo Delta como HTML
  const renderContent = (content) => {
    try {
      const delta = JSON.parse(content); // Converte o JSON para Delta

      if (delta && delta.ops) {
        const converter = new QuillDeltaToHtmlConverter(delta.ops, {}); 
        const contentHTML = converter.convert(); // Converte o Delta para HTML
        return <div dangerouslySetInnerHTML={{ __html: contentHTML }} />;
      } else {
        return <p>Conteúdo inválido</p>;
      }
    } catch (e) {
      return <p>Erro ao renderizar o conteúdo</p>;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.boxTitulo}>
        <h1 className={styles.titulo}>{post.title}</h1>
        <div className={styles.boxSubtitulo}>
          <p className={styles.data}>
            <strong className={styles.dataLabel}>Data:</strong> {new Date(post.created_at).toLocaleDateString()}
          </p>
          <p className={styles.tema}>
            <strong className={styles.temaLabel}>Tema:</strong> {post.theme}
          </p>
          <p className={styles.autor}>docinho</p>

          <div className={styles.boxEditButton}>
            {/* Renderizar o botão de edição apenas se o usuário for admin */}
            {session?.user?.role === 'admin' && <EditButton />}
          </div>
        </div>
      </div>

      {post.image && (
        <div>
          <Image 
            className={styles.imagemPost} 
            src={post.image} 
            alt={post.title}
            width={2000}  
            height={1800}
          />
        </div>
      )}
      <div className={styles.boxConteudo}>
        <h2 className={styles.conteudoLabel}>Conteúdo:</h2>
        <div className={styles.quillContent}>
          {renderContent(post.content)}
        </div>
      </div>
      <div className={styles.divisor}></div>
    </div>
  );
}
