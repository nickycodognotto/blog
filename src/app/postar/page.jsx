"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import LoadingMaquina from "../components/loadingMaquina/LoadingMaquina";
import axios from "axios";
import dynamic from "next/dynamic";
import styles from "./post.module.css";

// Carregue o QuillEditor dinamicamente com SSR desabilitado
const QuillEditor = dynamic(() => import("../components/quillEditor/QuillEditor"), {
  ssr: false,
});

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [editorContent, setEditorContent] = useState(null);
  const [showPostForm, setShowPostForm] = useState(false);
  const [showPhotoForm, setShowPhotoForm] = useState(false);
  const [photoTitle, setPhotoTitle] = useState("");
  const [photoDescription, setPhotoDescription] = useState("");
  const { status, data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (session?.user?.role !== "admin") {
      router.push("/");
    }
  }, [status, session, router]);

  if (status === "loading") {
    return <LoadingMaquina />;
  }

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
        throw new Error("Erro ao enviar a imagem para o Cloudinary.");
      }
    } catch (error) {
      console.error("Erro ao enviar a imagem para o Cloudinary:", error.message);
      throw error;
    }
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();

    if (!theme) {
      alert("Por favor, escolha o tema do post.");
      return;
    }

    const rawContent = JSON.stringify(editorContent);

    let imageUrl = "";
    if (image) {
      try {
        imageUrl = await uploadImageToCloudinary(image);
      } catch (error) {
        alert("Falha ao enviar a imagem para o Cloudinary.");
        return;
      }
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
        alert("Falha ao publicar o post.");
      }
    } catch (error) {
      console.error("Erro ao publicar o post:", error.message);
    }
  };

  const handleSubmitPhoto = async (e) => {
    e.preventDefault();

    let imageUrl = "";
    if (image) {
      try {
        imageUrl = await uploadImageToCloudinary(image);
      } catch (error) {
        alert("Falha ao enviar a imagem para o Cloudinary.");
        return;
      }
    }

    try {
      const response = await fetch("/api/fotografia", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          img_url: imageUrl,
          description: photoDescription,
        }),
      });

      if (response.ok) {
        alert("Foto publicada com sucesso!");
        router.push("/");
      } else {
        alert("Falha ao publicar a foto.");
      }
    } catch (error) {
      console.error("Erro ao publicar a foto:", error.message);
    }
  };

  return (
    <div className={styles.container}>
      <h1
        onClick={() => setShowPostForm(!showPostForm)}
        className={`${styles.dropdownTitle} ${showPostForm ? styles.active : ''}`}
      >
        Criar Novo Post
      </h1>
      {showPostForm && (
        <form onSubmit={handleSubmitPost}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className={styles.inputField}
          />

          {imagePreview && (
            <div className={styles.imagePreviewContainer}>
              <Image
                src={imagePreview}
                alt="Preview da imagem"
                className={styles.imagePreview}
                width={500}
                height={500}
              />
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
            className={styles.inputField}
            required
          >
            <option value="" disabled>
              escolha o tema do post
            </option>
            <option value="escrita">escrita</option>
            <option value="resenhas">resenhas</option>
            <option value="vida">vida</option>
            <option value="jogos">jogos</option>
            <option value="culinaria">culinaria</option>
          </select>

          <QuillEditor onEditorChange={(content) => setEditorContent(content)} />

          <button className={styles.botaopublish} type="submit">
            publicar
          </button>
        </form>
      )}

      <h1
        onClick={() => setShowPhotoForm(!showPhotoForm)}
        className={`${styles.dropdownTitle} ${showPhotoForm ? styles.active : ''}`}
      >
        Postar Nova Foto
      </h1>
      {showPhotoForm && (
        <form onSubmit={handleSubmitPhoto}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className={styles.inputField}
            required
          />

          {imagePreview && (
            <div className={styles.imagePreviewContainer}>
              <Image
                src={imagePreview}
                alt="Preview da imagem"
                className={styles.imagePreview}
                width={500}
                height={500}
              />
            </div>
          )}

          <textarea
            value={photoDescription}
            onChange={(e) => setPhotoDescription(e.target.value)}
            placeholder="Descrição da foto"
            required
            className={styles.inputField}
          />

          <button className={styles.botaopublish} type="submit">
            publicar
          </button>
        </form>
      )}
    </div>
  );
};

export default CreatePost;
