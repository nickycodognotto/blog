import LoginForm from '@/app/components/loginForm/LoginForm';
import styles from './loginPage.module.css';

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <LoginForm />
    </div>
  );
};

export default LoginPage;