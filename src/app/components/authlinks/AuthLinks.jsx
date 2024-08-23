"use client";
import Link from "next/link";
import styles from "./authLinks.module.css";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

const AuthLinks = () => {
  const [open, setOpen] = useState(false);
  const { status } = useSession();

  return (
    <>
      {status === "unauthenticated" ? (
        <Link href="/login" className={styles.link}>
          login
        </Link>
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
            <Link href="/login">login</Link>
          ) : (
            <>
              <Link href="/write">write</Link>
              <span className={styles.link} onClick={() => signOut()}>Logout</span>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AuthLinks;
