import React from 'react';
import styles from './customCheckbox.module.css'; // Supondo que você tenha algum estilo para aplicar

const CustomCheckbox = ({ checked, onChange }) => {
  return (
    <label className={styles.customCheckbox}>
      <input 
      name="tituloDoPost" 
      type="checkbox" 
      checked={checked}
      onChange={onChange} />
      <span className={styles.checkmark}></span>
    </label>
  );
};

export default CustomCheckbox;
