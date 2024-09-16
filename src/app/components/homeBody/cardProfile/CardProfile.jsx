import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './cardProfile.module.css';

const CardProfile = () => {
  return (
    <div className={styles.card}>
      <button className={styles.mail}>
        <svg
          className="lucide lucide-mail"
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 24 24"
          height="24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect rx="2" y="4" x="2" height="16" width="20"></rect>
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
        </svg>
      </button>

      <div className={styles.profilePic}>
        <Image 
          src="/profilePic.jpg" 
          alt="Profile Pic docinho"
          fill // Usado para ajustar a imagem ao contêiner
          style={{ objectFit: 'cover' }} // Ajuste a imagem dentro do contêiner
        />
      </div>

      <div className={styles.bottom}>
        <div className={styles.content}>
          <span className={styles.name}>docinho</span>
          <span className={styles.aboutMe}>
            Lorem ipsum dolor sit amet consectetur adipisicinFcls
          </span>
        </div>
        <div className={styles.bottomBottom}>
          <div className={styles.socialLinksContainer}>
            <Link 
            href="https://www.skoob.com.br/share/user/whoismanz"
            target='_blank'
            >
                <Image 
                  src="/skoobLogo.png" 
                  alt="Skoob Logo"
                  width={50}   // Defina a largura desejada
                  height={50}  // Defina a altura desejada
                  style={{ objectFit: 'contain' }} // Ajuste a imagem dentro do contêiner
                />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProfile;
