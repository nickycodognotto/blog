"use client";
import { signIn, useSession } from "next-auth/react";
import LoginForm from '@/app/components/loginForm/LoginForm';
import styles from './loginPage.module.css';
import { useRouter } from "next/navigation";
import LoadingMaquina from "../components/loadingMaquina/LoadingMaquina";

const LoginPage = () => {
  const { status } = useSession();

  const router = useRouter();

  if (status === "loading") {
    return <LoadingMaquina />;
  }

  if (status === "authenticated") {
    router.push("/")
  }


  return (
    <div className={styles.container}>
      <LoginForm />
    </div>
  );
};

export default LoginPage;