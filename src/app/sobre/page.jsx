import React from 'react';
import Image from 'next/image';
import styles from './sobreMim.module.css'; // Importando o CSS como módulo

const SobreMim = () => {
  return (
    <div className={styles.container}>
      <div className={styles.molduraContainer}>
        <Image 
          src="/fotoMolduraPerfil.png" 
          alt="Moldura" 
          className={styles.moldura}
          layout="responsive" 
          objectFit="cover" 
          width={500} 
          height={300}
        />  
      </div>

      {/* Imagem da página do caderno com texto */}
      <div className={styles.cadernoContainer}>
        <Image 
          src="/folhaCaderno.jpg" 
          alt="Caderno" 
          className={styles.caderno}
          layout="responsive" 
          objectFit="contain" 
          width={500} 
          height={300}
        />
        <p className={styles.textoTitulo}>sobre mim</p>
        <p className={styles.textoCorpoUm}>oi! talvez tenha meu nome aqui em algum momento, mas por enquanto, se me encontrou, pode me conhecer como Docinho.</p>
        <p className={styles.textoCorpoDois}>gosto de livros (às vezes), gatinhos (sempre) e café (depende). nem tudo sobre mim é muito claro ou cheio de significado, mas aprecio as coisas simples e raramente saio da minha área de conforto.</p>
        <p className={styles.textoCorpoTres}>
        é por isso que esse blog existe! senti a necessidade de escrever e ter um 
        registro acessível para quem quisesse se perder um pouco nos pensamentos de 
        uma desconhecida. não tenho a intenção, necessariamente, de tornar minhas 
        palavras públicas, mas também acho que é um desperdício guardá-las só para mim.
        </p>
        <p className={styles.textoCorpoQuatro}>
          foi mal, exagerei no sobre mim; meio que eu sou assim, eu acho, então é uma ótima forma de você me conhecer um pouco.
        </p>
        <p className={styles.textoCorpoCinco}>
          de qualquer forma, seja bem-vinde! espero que sua passagem seja duradoura e sua experiência uma doçura.
        </p>
        <p className={styles.textoAssinatura}>com amor, docinho.</p>
      </div>
    </div>
  );
};

export default SobreMim;
