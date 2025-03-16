import React, { useRef, useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const LanguageSelector = () => {
  const { language, setLanguage, availableLanguages, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Map des noms complets des langues
  const languageNames = {
    fr: "Français",
    en: "English",
    es: "Español"
  };
  
  // Map des drapeaux pour chaque langue
  const languageFlags = {
    fr: "🇫🇷",
    en: "🇬🇧",
    es: "🇪🇸"
  };

  // Gérer le clic en dehors du dropdown pour le fermer
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);
  
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setIsOpen(false);
  };
  
  return (
    <div className="dropdown" ref={dropdownRef}>
      <button 
        className="btn btn-light dropdown-toggle" 
        type="button"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
      >
        {languageFlags[language]} {languageNames[language]}
      </button>
      
      {isOpen && (
        <ul 
          className="dropdown-menu show" 
          style={{ position: 'absolute', inset: '0px auto auto 0px', margin: '0px', transform: 'translate(0px, 40px)' }}
        >
          {availableLanguages.map(lang => (
            <li key={lang}>
              <button 
                className={`dropdown-item ${lang === language ? 'active' : ''}`}
                onClick={() => handleLanguageChange(lang)}
              >
                {languageFlags[lang]} {languageNames[lang]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSelector;