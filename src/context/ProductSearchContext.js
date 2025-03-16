import React, { createContext, useState } from 'react';

export const ProductSearchContext = createContext();

export const ProductSearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <ProductSearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </ProductSearchContext.Provider>
  );
};