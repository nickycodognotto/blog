"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./post.module.css"; // Importando o CSS Module
import { useSession } from "next-auth/react";
import LoadingMaquina from "../components/loadingMaquina/LoadingMaquina";
import axios from "axios";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login"); // Redireciona para a página de login se não estiver autenticado
    }
  }, [status, router]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'preset_blog'); // Substitua pelo seu upload preset
    
    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dmsygyvgj/image/upload', // Substitua pelo seu Cloud Name
        formData
      );
  
      if (response.status === 200) {
        return response.data.secure_url; // URL da imagem
      } else {
        console.error("Erro ao enviar a imagem. Status:", response.status);
        console.error("Resposta do erro:", response.data);
        throw new Error("Erro ao enviar a imagem para o Cloudinary.");
      }
    } catch (error) {
      console.error("Erro ao enviar a imagem para o Cloudinary:", error.message);
      if (error.response) {
        console.error("Detalhes da resposta de erro:", error.response.data);
        alert("Erro ao enviar imagem: " + error.response.data.message);
      }
      throw error; // Re-lançar o erro para ser capturado no bloco de captura do handleSubmit
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (status === "unauthenticated") {
      alert("Você precisa estar logado para publicar um post.");
      return;
    }
  
    let imageUrl = "";
    if (image) {
      try {
        imageUrl = await uploadImageToCloudinary(image);
        console.log("Imagem enviada com sucesso. URL:", imageUrl);
      } catch (error) {
        console.error("Erro ao enviar a imagem para o Cloudinary:", error.message);
        if (error.response) {
          console.error("Detalhes da resposta de erro:", error.response.data);
        }
        alert("Falha ao enviar a imagem para o Cloudinary.");
        return;
      }
    } else {
      console.log("Nenhuma imagem selecionada.");
    }
  
    try {
      const response = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title,
            theme,
            content,
            image: imageUrl, // Use "image" em vez de "imageUrl"
          }),
      });
  
      if (response.ok) {
        alert("Post publicado com sucesso!");
        router.push("/"); // Redireciona para a página inicial após a publicação
      } else {
        console.error("Erro ao publicar o post. Status:", response.status);
        const errorData = await response.json();
        console.error("Detalhes do erro:", errorData);
        alert("Falha ao publicar o post.");
      }
    } catch (error) {
      console.error("Erro ao publicar o post:", error.message);
    }
  };

  if (status === "loading") {
    return <LoadingMaquina />; // Tela de carregamento enquanto verifica a autenticação
  }

  return (
    <div className={styles.container}>
      <h1>Criar Novo Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className={styles.inputField}
        />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título"
          required
          className={styles.inputField}
        />
        <input
          type="text"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          placeholder="Tema"
          required
          className={styles.inputField}
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Escreva seu post aqui..."
          required
          className={`${styles.inputField} ${styles.textareaField}`} // Aplicando ambas as classes
        />
        <button className={styles.botaopublish} type="submit">Publicar</button>
      </form>
    </div>
  );
};

export default CreatePost;
