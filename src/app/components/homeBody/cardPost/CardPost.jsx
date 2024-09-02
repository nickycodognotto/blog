// components/CardPost.jsx
"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import styles from './cardPost.module.css';
import Link from 'next/link'; // Importar o componente Link
import LoadingMaquina from '../../loadingMaquina/LoadingMaquina';

export default function CardPost() {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchLatestPost = async () => {
      try {
        const response = await axios.get('/api/latestPost'); // Corrija o nome da API se necessário
        setPost(response.data);
      } catch (error) {
        console.error('Erro ao buscar o post mais recente:', error);
      }
    };

    fetchLatestPost();

    // Configura um intervalo para atualizar o post a cada 30 segundos
    const intervalId = setInterval(fetchLatestPost, 100000);
    return () => clearInterval(intervalId); // Limpa o intervalo ao desmontar o componente
  }, []);

  if (!post) {
    return <LoadingMaquina />;
  }

  return (
    <Link href={`/posts/${post.slug}`} passHref>
      <div className={styles.card}>
        <div className={styles.cardImage}>
          {post.image && (
            <Image
              src={post.image}
              alt={post.title}
              layout="fill"
            />
          )}
        </div>
        <div className={styles.category}>{post.theme}</div>
        <div className={styles.heading}>
          <div className={styles.tituloPost}>{post.title}</div>
          <div className={styles.author}>
            By <span className={styles.name}>docinho</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
