import React from 'react';
import styles from './Newsletter.module.css';

const Newsletter = () => {
  return (
    <div className={styles.subscribe}>
      <p>INSCREVA-SE</p>
      <input
        placeholder="Seu e-mail"
        className={styles.subscribeInput}
        name="email"
        type="email"
      />
      <br />
      <div className={styles.submitBtn}>Enviar</div>
    </div>
  );
};

export default Newsletter;
