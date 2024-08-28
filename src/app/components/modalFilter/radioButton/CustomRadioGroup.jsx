import React, { useState } from 'react';
import styles from './CustomRadioGroup.module.css';

const CustomRadioGroup = ({ onCategoryChange }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleRadioChange = (e, index) => {
    onCategoryChange(e.target.value);
    setActiveIndex(index);
  };

  return (
    <form className={styles.radioForm}>
      <input
        checked={activeIndex === 0}
        value="escrita"
        name="hopping"
        type="radio"
        id="escrita"
        onChange={(e) => handleRadioChange(e, 0)}
      />
      <label htmlFor="escrita">
        <span></span>escrita
      </label>
      
      <input
        checked={activeIndex === 1}
        value="resenhas"
        name="hopping"
        type="radio"
        id="resenhas"
        onChange={(e) => handleRadioChange(e, 1)}
      />
      <label htmlFor="resenhas">
        <span></span>resenhas
      </label>
      
      <input
        checked={activeIndex === 2}
        value="vida"
        name="hopping"
        type="radio"
        id="vida"
        onChange={(e) => handleRadioChange(e, 2)}
      />
      <label htmlFor="vida">
        <span></span>vida
      </label>

      <input
        checked={activeIndex === 3}
        value="jogos"
        name="hopping"
        type="radio"
        id="jogos"
        onChange={(e) => handleRadioChange(e, 3)}
      />
      <label htmlFor="jogos">
        <span></span>jogos
      </label>

      <div className={styles.worm}>
        <div className={styles.worm__segment}></div>
      </div>
    </form>
  );
};

export default CustomRadioGroup;
