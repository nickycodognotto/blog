import Image from 'next/image';
import prisma from '../../../utils/prismaClient';
import styles from './slugView.module.css';
import dynamic from 'next/dynamic';

const { convertFromRaw } = dynamic(() => import('draft-js'), { ssr: false });
const { convertToHTML } = dynamic(() => import('draft-convert'), { ssr: false });

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

  // Função para renderizar o conteúdo do Draft.js
  const renderContent = (content) => {
    try {
      console.log('Conteúdo JSON:', content);
      const jsonContent = JSON.parse(content);
      console.log('JSON parseado:', jsonContent);
      const contentState = convertFromRaw(jsonContent);
      const contentHTML = convertToHTML(contentState);
      return <div dangerouslySetInnerHTML={{ __html: contentHTML }} />;
    } catch (e) {
      console.error('Erro ao renderizar o conteúdo:', e);
      return <p>{content}</p>;
    }
  };

  
  return (
    <div className={styles.container}>
      <div className={styles.boxTitulo}>
        <h1 className={styles.titulo}>{post.title}</h1>
        <div className={styles.boxSubtitulo}>
          <p className={styles.data}><strong className={styles.dataLabel}>Data:</strong> {new Date(post.created_at).toLocaleDateString()}</p>
          <p className={styles.tema}><strong className={styles.temaLabel}>Tema:</strong> {post.theme}</p>
          <p className={styles.autor}>Docinho</p>
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
        {renderContent(post.content)}
      </div>
      <div className={styles.divisor}></div> 
    </div>
  );
}
