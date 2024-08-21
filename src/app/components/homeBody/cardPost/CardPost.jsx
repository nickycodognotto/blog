import styles from './cardPost.module.css';
import Image from 'next/image';

export default function CardPost() {
  return (
    <div className={styles.card}>
      <div className={styles['card-image']}>
        <img src="" alt="" />
      </div>
      <div className={styles.category}>TEMA DO POST </div>
      <div className={styles.heading}>Título do Post
        <div className={styles.author}>
          By <span className={styles.name}>Docinho</span>
        </div>
      </div>
    </div>
  );
}
