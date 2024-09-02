import Link from 'next/link';
import Image from 'next/image';
import prisma from '../../utils/prismaClient';
import styles from './postagens.module.css';
import SearchBar from '../components/homeBody/SearchBar/SearchBar';
import FilterButton from '../components/homeBody/filterButton/FilterButton';

export default async function PostsListPage() {
  let posts = [];

  try {
    posts = await prisma.posts.findMany();
  } catch (error) {
    console.error('Error fetching posts:', error);
    // Lide com o erro de forma apropriada
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>lista de postagens:</h1>
      <div className={styles.boxSearchBar}>
        <SearchBar/>
        <FilterButton />
      </div>
      <ul className={styles.postsList}>
        {posts.map((post) => (
          <li key={post.id} className={styles.postItem}>
            <div className={styles.imageContainer}>
              <Image 
                className={styles.image} 
                src={post.image} 
                alt={post.title}
                width={500}   
                height={300}
              />
            </div>
            <div className={styles.content}>
              <h2 className={styles.postTitle}>{post.title}</h2>
              <p className={styles.postTheme}>{post.theme}</p>
              <p className={styles.postExcerpt}>{post.content.slice(0, 50)}...</p>
            </div>
            <Link href={`/posts/${post.slug}`} className={styles.postLink}>
              <button className={styles.button}>
                <p className={styles.buttonText}>leia mais</p> 
                <p className={styles.iconer}>
                  <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor"></path>
                  </svg>
                </p>  
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
