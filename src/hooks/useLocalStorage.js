import { useState, useEffect } from 'react';

// Hook pour persister des données dans localStorage
const useLocalStorage = (key, initialValue) => {
  // Fonction pour récupérer la valeur initiale
  const getStoredValue = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  // État basé sur la valeur dans localStorage
  const [storedValue, setStoredValue] = useState(getStoredValue);

  // Fonction pour mettre à jour la valeur
  const setValue = (value) => {
    try {
      // Permettre la valeur d'être une fonction (comme dans useState)
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Sauvegarder dans l'état
      setStoredValue(valueToStore);
      
      // Sauvegarder dans localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Mettre à jour localStorage si la clé change
  useEffect(() => {
    const storedValue = getStoredValue();
    setStoredValue(storedValue);
  }, [key]);

  return [storedValue, setValue];
};

export default useLocalStorage;