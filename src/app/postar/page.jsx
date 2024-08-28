"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import styles from "./post.module.css";
import { useSession } from "next-auth/react";
import LoadingMaquina from "../components/loadingMaquina/LoadingMaquina";
import axios from "axios";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { status } = useSession();
  const router = useRouter();
  const quillRef = useRef(null); // Ref para armazenar a instância do Quill

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (typeof window !== "undefined" && !quillRef.current) {
      const editorContainer = document.querySelector("#editor-container");
      if (editorContainer) {
        const quill = new Quill(editorContainer, {
          theme: "snow",
          modules: {
            toolbar: [
              [{ 'header': [1, 2, false] }],
              ['bold', 'italic', 'underline'],
              ['link'],
              [{ 'color': [] }],
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              ['image']
            ],
          },
        });
        quillRef.current = quill; // Armazena a instância do Quill

        // Adiciona o aviso apenas ao sair da página "Postar"
        const handleBeforeUnload = (event) => {
          event.preventDefault();
          event.returnValue = "A página foi recarregada, e o progresso não salvo será perdido.";
        };
        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
          // Remove o aviso e destrói a instância do Quill
          window.removeEventListener("beforeunload", handleBeforeUnload);
          quillRef.current = null;
        };
      }
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
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
    formData.append("upload_preset", "preset_blog");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dmsygyvgj/image/upload",
        formData
      );

      if (response.status === 200) {
        return response.data.secure_url;
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
      throw error;
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

    const delta = quillRef.current.getContents();
    const rawContent = JSON.stringify(delta);

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
          content: rawContent,
          image: imageUrl,
        }),
      });

      if (response.ok) {
        alert("Post publicado com sucesso!");
        router.push("/");
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
    return <LoadingMaquina />;
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

        <div id="editor-container" className={styles.editorContainer}></div>

        <button className={styles.botaopublish} type="submit">publicar</button>
      </form>
    </div>
  );
};

export default CreatePost;
