import Image from 'next/image';
import prisma from '../../../utils/prismaClient';
import styles from './slugView.module.css';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'; // Importe a classe corretamente

export default async function PostPage({ params }) {
  const { slug } = params;

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
      console.log('Conteúdo JSON:', content);
      const delta = JSON.parse(content); // Converte o JSON para Delta

      if (delta && delta.ops) {
        // Instancie o conversor com o delta e as opções
        const converter = new QuillDeltaToHtmlConverter(delta.ops, {}); 
        const contentHTML = converter.convert(); // Converte o Delta para HTML
        return <div dangerouslySetInnerHTML={{ __html: contentHTML }} />;
      } else {
        console.error('Conteúdo Delta inválido:', delta);
        return <p>Conteúdo inválido</p>;
      }
    } catch (e) {
      console.error('Erro ao renderizar o conteúdo:', e);
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
        </div>
      </div>
      {post.image && (
        <div>
          <Image 
            className={styles.imagemPost} 
            src={post.image} 
            alt={post.title}
            width={500}  
            height={300}
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
