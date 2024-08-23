"use client";
import { signIn, useSession } from "next-auth/react";
import LoginForm from '@/app/components/loginForm/LoginForm';
import styles from './loginPage.module.css';
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const { status } = useSession();

  const router = useRouter();

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
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