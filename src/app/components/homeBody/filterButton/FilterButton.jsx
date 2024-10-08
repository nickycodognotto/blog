"use client";
import React, { useState } from 'react';
import styles from './filterButton.module.css';
import ModalFilter from '../../modalFilter/ModalFilter';

const FilterButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleApplyFilter = (option, category) => {
    setSelectedOption(option);
    setSelectedCategory(category);
    console.log("Option selected:", option);
    console.log("Category selected:", category);
    // Aqui você pode realizar outras ações necessárias com as seleções
  };

  return (
    <>
      <button title="filter" className={styles.filter} onClick={handleOpenModal}>
        <svg viewBox="0 0 512 512" height="1em">
          <path
            d="M0 416c0 17.7 14.3 32 32 32l54.7 0c12.3
              28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7
              0 32-14.3 32-32s-14.3-32-32-32l-246.7 
              0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384c-17.7
              0-32 14.3-32 32zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64
              0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-32.8
              0-61 19.7-73.3 48L32 224c-17.7 0-32 14.3-32 32s14.3 32 32
              32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7
              0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3
              -40.5-48-73.3-48zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0
              64zm73.3-64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32
              64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5
              48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64z"
          ></path>
        </svg>
      </button>
      <ModalFilter
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onApply={handleApplyFilter} // Passa a função de aplicar
      />
    </>
  );
};

export default FilterButton;
