import React from 'react';
import styles from './loginForm.module.css';

const LoginForm = () => {
  return (
    <div className={styles.wrapperLogin}>
      <div className={styles.cardSwitch}>
        <label className={styles.switch}>
          <input type="checkbox" className={styles.toggle} />
          <span className={styles.slider}></span>
          <span className={styles.cardSide}></span>
          <div className={styles.flipCardInner}>
            <div className={styles.flipCardFront}>
              <div className={styles.title}>Entrar</div>
              <form className={styles.flipCardForm} action="">
                <input
                  className={styles.flipCardInput}
                  name="email"
                  placeholder="Email"
                  type="email"
                />
                <input
                  className={styles.flipCardInput}
                  name="password"
                  placeholder="Senha"
                  type="password"
                />
                <button className={styles.flipCardBtn}>Vamos lá!</button>
              </form>
            </div>
            <div className={styles.flipCardBack}>
              <div className={styles.title}>Inscrever</div>
              <form className={styles.flipCardForm} action="">
                <input
                  className={styles.flipCardInput}
                  placeholder="Nome"
                  type="name"
                />
                <input
                  className={styles.flipCardInput}
                  name="email"
                  placeholder="Email"
                  type="email"
                />
                <input
                  className={styles.flipCardInput}
                  name="password"
                  placeholder="Senha"
                  type="password"
                />
                <button className={styles.flipCardBtn}>Inscrever!</button>
              </form>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default LoginForm;
