import prisma from '../../../utils/prismaClient';
import styles from './slugView.module.css';

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
          <img className={styles.imagemPost} src={post.image} alt={post.title} />
        </div>
      )}
      <div>
        <h2 className={styles.conteudoLabel}>Conteúdo:</h2>
        <p className={styles.conteudo}>{post.content}</p>
      </div>
    </div>
  );
}
