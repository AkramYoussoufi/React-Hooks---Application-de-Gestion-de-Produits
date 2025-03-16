import React, { createContext, useState } from 'react';
import ProductList from './components/ProductList';
import ProductSearch from './components/ProductSearch';
import ThemeToggle from './components/ThemeToggle';
import LanguageSelector from './components/LanguageSelector';
import { ProductSearchProvider } from './context/ProductSearchContext';
import LanguageProvider, { useLanguage } from './context/LanguageContext';

// Contexte pour le thème
export const ThemeContext = createContext();

// Composant qui utilise le contexte de langue
const AppContent = () => {
  const { t } = useLanguage();
  const { isDarkTheme } = React.useContext(ThemeContext);

  return (
    <div className={`container ${isDarkTheme ? 'bg-dark text-light' : 'bg-light'}`}>
      <header className="my-4">
        <h1 className="text-center">{t('appTitle')}</h1>
        <div className="d-flex justify-content-end gap-2 mb-3">
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

// Composant principal de l'application
const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  return (
    <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
      <LanguageProvider>
        <ProductSearchProvider>
          <AppContent />
        </ProductSearchProvider>
      </LanguageProvider>
    </ThemeContext.Provider>
  );
};

export default App;