"use client"
import Link from "next/link";
import styles from "./authLinks.module.css";
import { useState, useEffect, useRef } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import LoadingMaquina from "../loadingMaquina/LoadingMaquina";

const AuthLinks = () => {
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const dropdownRef = useRef(null);

  const handleLoginRedirect = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      router.push("/login");
    }, 800);
  };

  const handlePostRedirect = () => {
    router.push("/postar");
  };

  const handleMyAccountToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handlePasswordChange = () => {
    router.push("/alterarSenha");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const userRole = session?.user?.role;

  return (
    <>
      {status === "unauthenticated" ? (
        <span className={styles.link} onClick={handleLoginRedirect}>
          login
        </span>
      ) : (
        <div 
          className={`${styles.dropdown} ${dropdownOpen ? styles.dropdownOpen : ""}`} 
          onClick={handleMyAccountToggle} 
          ref={dropdownRef}
        >
          minha conta
          {dropdownOpen && (
            <div className={styles.dropdownContent}>
              {userRole === "admin" && (
                <span onClick={handlePostRedirect}>publicar</span>
              )}
              <span onClick={handlePasswordChange}>alterar senha</span>
              <span onClick={() => signOut({ callbackUrl: '/' })}>logout</span>
            </div>
          )}
        </div>
      )}
      {loading && <LoadingMaquina />}
    </>
  );
};

export default AuthLinks;
