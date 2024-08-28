"use client";
import React, { useEffect, useState, useCallback } from 'react'; // Importa useCallback para memoizar discardChanges
import { useRouter, usePathname } from 'next/navigation'; // Importação correta para a estrutura app
import styles from './modalFilter.module.css';

const ModalFilter = ({ isOpen, onClose }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [tempSelectedOption, setTempSelectedOption] = useState(null);
  const [tempSelectedCategory, setTempSelectedCategory] = useState(null);
  const router = useRouter();
  const pathname = usePathname(); // Obtém o caminho da página atual

  useEffect(() => {
    // Recupera os dados salvos do localStorage
    const savedOption = localStorage.getItem('selectedOption');
    const savedCategory = localStorage.getItem('selectedCategory');
    if (savedOption) setSelectedOption(savedOption);
    if (savedCategory) setSelectedCategory(savedCategory);
  }, []); // Este efeito não depende de nada, então o array de dependências está correto aqui

  useEffect(() => {
    if (isOpen) {
      setTempSelectedOption(selectedOption);
      setTempSelectedCategory(selectedCategory);
      setShowCategories(selectedOption === "categoriaDoPost");
    }
  }, [isOpen, selectedOption, selectedCategory]); // Inclui `selectedCategory` como dependência

  useEffect(() => {
    // Limpa a modal e desmarcar todas as opções se a página não for '/postagens/search'
    if (pathname !== '/postagens/search') {
      setSelectedOption(null);
      setSelectedCategory(null);
      setTempSelectedOption(null);
      setTempSelectedCategory(null);
      setShowCategories(false);

      // Limpa o localStorage
      localStorage.removeItem('selectedOption');
      localStorage.removeItem('selectedCategory');
    }
  }, [pathname]); // O array de dependências está correto aqui

  const discardChanges = useCallback(() => {
    setTempSelectedOption(selectedOption);
    setTempSelectedCategory(selectedCategory);
    setShowCategories(selectedOption === "categoriaDoPost");
  }, [selectedOption, selectedCategory]); // Inclui `selectedOption` e `selectedCategory` como dependências

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        discardChanges();
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [discardChanges, onClose]); // Inclui `discardChanges` no array de dependências

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      discardChanges();
      onClose();
    }
  };

  const handleOptionChange = (e) => {
    const { name } = e.target;

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

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setTempSelectedCategory(value);
  };

  const handleApply = () => {
    const queryString = new URLSearchParams({
      option: tempSelectedOption,
      category: tempSelectedCategory,
    }).toString();

    if (!tempSelectedOption && pathname === '/postagens/search') {
      // Redireciona para '/postagens' se nenhuma opção estiver selecionada e a página for '/postagens/search'
      router.push('/postagens');
    } else {
      // Atualiza os estados com as opções selecionadas
      setSelectedOption(tempSelectedOption);
      setSelectedCategory(tempSelectedCategory);

      // Salva os parâmetros no localStorage
      localStorage.setItem('selectedOption', tempSelectedOption);
      localStorage.setItem('selectedCategory', tempSelectedCategory);

      // Redireciona para a página de busca com os parâmetros
      router.push(`/postagens/search?${queryString}`);
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleClickOutside}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={() => { discardChanges(); onClose(); }}>X</button>
        <h2 className={styles.title}>Como quer pesquisar?</h2>
        <div className={styles.options}>
          <label>
            <input
              type="checkbox"
              name="títuloDoPost"
              checked={tempSelectedOption === "títuloDoPost"}
              onChange={handleOptionChange}
            />
            Título do post
          </label>
          <label>
            <input
              type="checkbox"
              name="categoriaDoPost"
              checked={tempSelectedOption === "categoriaDoPost"}
              onChange={handleOptionChange}
            />
            Categoria do post
          </label>
          {showCategories && (
            <div className={styles.dropdownContent}>
              <label>
                <input
                  type="radio"
                  name="category"
                  value="escrita"
                  checked={tempSelectedCategory === "escrita"}
                  onChange={handleCategoryChange}
                />
                escrita
              </label>
              <label>
                <input
                  type="radio"
                  name="category"
                  value="resenhas"
                  checked={tempSelectedCategory === "resenhas"}
                  onChange={handleCategoryChange}
                />
                resenhas
              </label>
              <label>
                <input
                  type="radio"
                  name="category"
                  value="vida"
                  checked={tempSelectedCategory === "vida"}
                  onChange={handleCategoryChange}
                />
                vida
              </label>
              <label>
                <input
                  type="radio"
                  name="category"
                  value="jogos"
                  checked={tempSelectedCategory === "jogos"}
                  onChange={handleCategoryChange}
                />
                jogos
              </label>
            </div>
          )}
        </div>
        <button className={styles.applyButton} onClick={handleApply}>Filtrar</button>
      </div>
    </div>
  );
};

export default ModalFilter;
