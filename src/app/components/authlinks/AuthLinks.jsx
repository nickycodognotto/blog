"use client"
import Link from "next/link";
import styles from "./authLinks.module.css";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import LoadingMaquina from "../loadingMaquina/LoadingMaquina";

const AuthLinks = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { status } = useSession();
  const router = useRouter();

  const handleLoginRedirect = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      router.push("/login");
    }, 2500);
  };

  const handlePostRedirect = () => {
    router.push("/postar");
  };

  return (
    <>
      {status === "unauthenticated" ? (
        <span className={styles.link} onClick={handleLoginRedirect}>
          login
        </span>
      ) : (
        <>
          <span className={styles.link} onClick={handlePostRedirect}>
            publicar
          </span>
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
          {status === "unauthenticated" ? (
            <span className={styles.loginButton} onClick={handleLoginRedirect}>login</span>
          ) : (
            <>
              <span onClick={handlePostRedirect}>publicar</span>
              <span className={styles.link} onClick={() => signOut()}>logout</span>
            </>
          )}
        </div>
      )}
      {loading && <LoadingMaquina />}
    </>
  );
};

export default AuthLinks;
