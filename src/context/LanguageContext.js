import React, { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import translations from '../translations';

// Création du contexte
export const LanguageContext = createContext();

// Hook personnalisé pour utiliser le contexte de langue
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage doit être utilisé dans un LanguageProvider');
  }
  return context;
};

// Provider pour le contexte de langue
export const LanguageProvider = ({ children }) => {
  // Utiliser useLocalStorage pour persister la langue
  const [language, setLanguage] = useLocalStorage('language', 'fr');
  
  // Liste des langues disponibles
  const availableLanguages = Object.keys(translations);
  
  // Fonction pour obtenir une traduction
  const t = (key) => {
    if (!translations[language]) {
      console.warn(`Langue "${language}" non disponible, utilisation du français par défaut`);
      return translations.fr[key] || key;
    }
    
    return translations[language][key] || key;
  };
  
  // Valeur du contexte
  const value = {
    language,
    setLanguage,
    t,
    availableLanguages,
    translations
  };
  
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Export par défaut du provider pour faciliter l'importation
export default LanguageProvider;