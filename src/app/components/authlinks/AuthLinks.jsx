"use client";
import Link from "next/link";
import styles from "./authLinks.module.css";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'; // Importa o useRouter
import LoadingMaquina from "../loadingMaquina/LoadingMaquina";

const AuthLinks = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Estado para controle do carregamento
  const { status } = useSession();
  const router = useRouter(); // Hook para redirecionamento

  const handleLoginRedirect = () => {
    setLoading(true); // Ativa o carregamento

    setTimeout(() => {
      setLoading(false); // Desativa o carregamento após o tempo
      router.push("/login"); // Redireciona para a página de login
    }, 2500); // Tempo de carregamento simulado (3 segundos)
  };

  return (
    <>
      {status === "unauthenticated" ? (
        <span className={styles.link} onClick={handleLoginRedirect}>
          login
        </span>
      ) : (
        <>
          <Link href="/write" className={styles.link}>
            publicar
          </Link>
          <span className={styles.link} onClick={() => signOut()}>
            logout
          </span>
        </>
      )}
      <div className={styles.burger} onClick={() => setOpen(!open)}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
      {open && (
        <div className={styles.responsiveMenu}>
          <Link href="/">home</Link>
          <Link href="/">sobre mim</Link>
          <Link href="/">postagens</Link>
          {status === "unauthenticated" ? (
            <span onClick={handleLoginRedirect}>login</span>
          ) : (
            <>
              <Link href="/write">write</Link>
              <span className={styles.link} onClick={() => signOut()}>Logout</span>
            </>
          )}
        </div>
      )}
      {loading && (
          <LoadingMaquina />
      )}
    </>
  );
};

export default AuthLinks;
