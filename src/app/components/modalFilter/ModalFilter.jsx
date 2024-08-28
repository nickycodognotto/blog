import React, { useEffect, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import CustomCheckbox from './checkbox/CustomCheckbox';
import styles from './modalFilter.module.css';
import CustomRadioGroup from './radioButton/CustomRadioGroup';

const ModalFilter = ({ isOpen, onClose }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [tempSelectedOption, setTempSelectedOption] = useState(null);
  const [tempSelectedCategory, setTempSelectedCategory] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const savedOption = localStorage.getItem('selectedOption');
    const savedCategory = localStorage.getItem('selectedCategory');
    if (savedOption) setSelectedOption(savedOption);
    if (savedCategory) setSelectedCategory(savedCategory);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTempSelectedOption(selectedOption);
      setTempSelectedCategory(selectedCategory);
      setShowCategories(selectedOption === "categoriaDoPost");
    }
  }, [isOpen, selectedOption, selectedCategory]);

  useEffect(() => {
    if (pathname !== '/postagens/search') {
      setSelectedOption(null);
      setSelectedCategory(null);
      setTempSelectedOption(null);
      setTempSelectedCategory(null);
      setShowCategories(false);

      localStorage.removeItem('selectedOption');
      localStorage.removeItem('selectedCategory');
    }
  }, [pathname]);

  const discardChanges = useCallback(() => {
    setTempSelectedOption(selectedOption);
    setTempSelectedCategory(selectedCategory);
    setShowCategories(selectedOption === "categoriaDoPost");
  }, [selectedOption, selectedCategory]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        discardChanges();
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [discardChanges, onClose]);

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      discardChanges();
      onClose();
    }
  };

  const handleOptionChange = (name) => {
    if (tempSelectedOption === name) {
      setTempSelectedOption(null);
      setShowCategories(false);
    } else {
      setTempSelectedOption(name);
      setShowCategories(name === "categoriaDoPost");
      if (name !== "categoriaDoPost") {
        setTempSelectedCategory(null);
      }
    }
  };

  const handleCategoryChange = (value) => {
    setTempSelectedCategory(value);
  };

  const handleApply = () => {
    const queryString = new URLSearchParams({
      option: tempSelectedOption,
      category: tempSelectedCategory,
    }).toString();

    if (!tempSelectedOption && pathname === '/postagens/search') {
      router.push('/postagens');
    } else {
      setSelectedOption(tempSelectedOption);
      setSelectedCategory(tempSelectedCategory);

      localStorage.setItem('selectedOption', tempSelectedOption);
      localStorage.setItem('selectedCategory', tempSelectedCategory);

      router.push(`/postagens/search?${queryString}`);
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleClickOutside}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={() => { discardChanges(); onClose(); }}>X</button>
        <h2 className={styles.title}>como quer filtrar?</h2>
        <div className={styles.options}>
          <label className={styles.labelTitulo}>
            <CustomCheckbox
              checked={tempSelectedOption === "tituloDoPost"}
              onChange={() => handleOptionChange("tituloDoPost")}
            />
            Título do post
          </label>
          <div
            className={styles.categoryOption}
            onClick={() => handleOptionChange("categoriaDoPost")}
          >
            Categoria do post
            <span className={`${styles.arrow} ${showCategories ? styles.arrowRigth : styles.arrowDown}`} />
          </div>
          {showCategories && (
            <CustomRadioGroup
              selectedCategory={tempSelectedCategory}
              onCategoryChange={handleCategoryChange}
            />
          )}
        </div>
        <button className={styles.applyButton} onClick={handleApply}>Filtrar</button>
      </div>
    </div>
  );
};

export default ModalFilter;
