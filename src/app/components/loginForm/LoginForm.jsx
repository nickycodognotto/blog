"use client";
import React, { useState } from 'react';
import styles from './loginForm.module.css';
import { signIn } from 'next-auth/react';
import LoadingMaquina from '../loadingMaquina/LoadingMaquina';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false); // Adicione o estado de loading

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação dos campos
    if (!email || !password || (isRegistering && !name)) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true); // Ative o estado de loading apenas se todos os campos estiverem preenchidos

    if (isRegistering) {
      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          console.log('Cadastro bem-sucedido:', data);
          window.location.href = '/login';
        } else {
          console.error('Erro:', data);
          alert('Erro: ' + (data.error || 'Erro desconhecido'));
        }
      } catch (error) {
        console.error('Erro ao conectar-se com a API:', error);
        alert('Erro ao conectar-se com a API');
      }
    } else {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result.ok) {
        setTimeout(() => {
          setLoading(false);
          window.location.href = '/';
        }, 2500);
      } else {
        console.error('Erro de autenticação:', result.error);
        alert('Erro de autenticação: ' + result.error);
      }
    }
  };

  if (loading) {
    return <LoadingMaquina />;
  }

  return (
    <div className={styles.wrapperLogin}>
      <div className={styles.cardSwitch}>
        <label className={styles.switch}>
          <input
            type="checkbox"
            className={styles.toggle}
            checked={isRegistering}
            onChange={() => setIsRegistering(!isRegistering)}
          />
          <span className={styles.slider}></span>
          <span className={styles.cardSide}></span>
          <div className={styles.flipCardInner}>
            <div className={styles.flipCardFront}>
              <div className={styles.title}>Entrar</div>
              <form className={styles.flipCardForm} onSubmit={handleSubmit}>
                <input
                  className={styles.flipCardInput}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  type="email"
                />
                <input
                  className={styles.flipCardInput}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Senha"
                  type="password"
                />
                <button type="submit" className={styles.flipCardBtn}>
                  {isRegistering ? 'Inscrever!' : 'Vamos lá!'}
                </button>
              </form>
            </div>
            <div className={styles.flipCardBack}>
              <div className={styles.title}>Inscrever</div>
              {isRegistering && (
                <form className={styles.flipCardForm} onSubmit={handleSubmit}>
                  <input
                    className={styles.flipCardInput}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nome"
                    type="text"
                  />
                  <input
                    className={styles.flipCardInput}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    type="email"
                  />
                  <input
                    className={styles.flipCardInput}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Senha"
                    type="password"
                  />
                  <button type="submit" className={styles.flipCardBtn}>Inscrever!</button>
                </form>
              )}
            </div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default LoginForm;
