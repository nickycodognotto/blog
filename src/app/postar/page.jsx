"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw, CompositeDecorator } from "draft-js";
import { AtomicBlockUtils } from "draft-js";
import styles from "./post.module.css"; // Importando o CSS Module
import { useSession } from "next-auth/react";
import LoadingMaquina from "../components/loadingMaquina/LoadingMaquina";
import axios from "axios";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState(""); // Inicializa com uma string vazia
  const [editorState, setEditorState] = useState(EditorState.createEmpty()); // Estado do Draft.js
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // Estado para armazenar o preview da imagem
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login"); // Redireciona para a página de login se não estiver autenticado
    }
  }, [status, router]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    // Gerando o preview da imagem
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result); // Define o preview da imagem
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "preset_blog"); // Substitua pelo seu upload preset

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dmsygyvgj/image/upload", // Substitua pelo seu Cloud Name
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

    if (!theme) {
      alert("Por favor, escolha o tema do post.");
      return;
    }

    // Converte o estado do editor para Raw JSON
    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);

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
          content: JSON.stringify(rawContent), // Armazena o conteúdo formatado
          image: imageUrl,
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

  // Funções para lidar com a formatação
  const handleBoldClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  };

  const handleLinkClick = () => {
    const url = prompt('Digite o URL do link:');
    if (url) {
      setEditorState(RichUtils.toggleLink(editorState, url));
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

        {/* Exibe o preview da imagem */}
        {imagePreview && (
          <div className={styles.imagePreviewContainer}>
            <img src={imagePreview} alt="Preview da imagem" className={styles.imagePreview} />
          </div>
        )}

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título"
          required
          className={styles.inputField}
        />
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className={`${styles.inputField} ${theme === "" ? styles.placeholderOption : ""}`}
          required
        >
          <option value="" disabled>
            escolha o tema do post
          </option>
          <option value="escrita">escrita</option>
          <option value="resenhas">resenhas</option>
          <option value="vida">vida</option>
          <option value="jogos">jogos</option>
        </select>

        {/* Controles de formatação */}
        <div className={styles.controls}>
          <button type="button" onClick={handleBoldClick}>Negrito</button>
          <button type="button" onClick={handleLinkClick}>Link</button>
        </div>

        {/* Editor Draft.js */}
        <div className={styles.editorContainer}>
          <Editor
            editorState={editorState}
            onChange={setEditorState}
            placeholder="Escreva seu post aqui..."
          />
        </div>

        <button className={styles.botaopublish} type="submit">publicar</button>
      </form>
    </div>
  );
};

export default CreatePost;
