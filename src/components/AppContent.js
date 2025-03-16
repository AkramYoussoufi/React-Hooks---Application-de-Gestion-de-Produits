import React, { useContext } from 'react';
import { ThemeContext } from '../App';
import { LanguageContext } from '../context/LanguageContext';
import ProductList from './ProductList';
import ProductSearch from './ProductSearch';
import ThemeToggle from './ThemeToggle';
import LanguageSelector from './LanguageSelector';

// Ce composant pourrait être utilisé ultérieurement pour simplifier App.js
// Pour l'instant, nous utilisons la structure directement dans App.js
const AppContent = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { t } = useContext(LanguageContext);
  
  return (
    <div className={`container ${isDarkTheme ? 'bg-dark text-light' : 'bg-light'}`}>
      <header className="my-4">
        <h1 className="text-center">{t('appTitle')}</h1>
        <div className="d-flex justify-content-end gap-2">
          <LanguageSelector />
          <ThemeToggle />
        </div>
      </header>
      <main>
        <ProductSearch />
        <ProductList />
      </main>
    </div>
  );
};

export default AppContent;