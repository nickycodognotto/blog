import Link from 'next/link';
import prisma from '../../utils/prismaClient';
import styles from './postagens.module.css';

export default async function PostsListPage() {
  const posts = await prisma.posts.findMany();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Lista de postagens:</h1>
      <ul className={styles.postsList}>
        {posts.map((post) => (
          <li key={post.id} className={styles.postItem}>
            <div className={styles.imageContainer}>
            <img className={styles.image} src={post.image} alt={post.title} />
            </div>
            <div className={styles.content}>
            <h2 className={styles.postTitle}>{post.title}</h2>
            <p className={styles.postTheme}><strong>Tema:</strong> {post.theme}</p>
            <p className={styles.postExcerpt}>{post.content.slice(0, 100)}...</p>
            </div>
            <Link href={`/posts/${post.slug}`} className={styles.postLink}>
                <button className={styles.button}>
                    <p className={styles.buttonText}>Leia Mais</p> 
                    <p className={styles.iconer}><svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor"></path></svg></p>  
                </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
