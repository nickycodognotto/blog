"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import styles from '../postagens.module.css';
import SearchBar from '@/app/components/homeBody/SearchBar/SearchBar';
import FilterButton from '@/app/components/homeBody/filterButton/FilterButton';
import LoadingMaquina from '@/app/components/loadingMaquina/LoadingMaquina';

const PostsSearchPage = () => {
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const option = searchParams.get('option');
      const category = searchParams.get('category');

      try {
        const response = await fetch(`/api/search?option=${encodeURIComponent(option)}&category=${encodeURIComponent(category)}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPosts(data.posts || []);
      } catch (error) {
        console.error('Erro ao buscar posts:', error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [searchParams]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Resultados da Pesquisa:</h1>
      <div className={styles.boxSearchBar}>
        <SearchBar />
        <FilterButton />
      </div>
      <ul className={styles.postsList}>
        {loading ? (
          <LoadingMaquina />
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <li key={post.id} className={styles.postItem}>
              <div className={styles.imageContainer}>
                <Image 
                className={styles.image} 
                src={post.image} 
                alt={post.title}
                width={500}  
                height={300}>
                </Image>
              </div>
              <div className={styles.content}>
                <h2 className={styles.postTitle}>{post.title}</h2>
                <p className={styles.postTheme}><strong>Tema:</strong> {post.theme}</p>
                <p className={styles.postExcerpt}>{post.content.slice(0, 100)}...</p>
              </div>
              <a href={`/posts/${post.slug}`} className={styles.postLink}>
                <button className={styles.button}>
                  <p className={styles.buttonText}>Leia Mais</p>
                  <p className={styles.iconer}>
                    <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor"></path>
                    </svg>
                  </p>
                </button>
              </a>
            </li>
          ))
        ) : (
          <p className={styles.noPosts}>Nenhum post encontrado.</p>
        )}
      </ul>
    </div>
  );
};

export default function PostsSearchPageWrapper() {
  return (
    <Suspense fallback={<LoadingMaquina />}>
      <PostsSearchPage />
    </Suspense>
  );
}
