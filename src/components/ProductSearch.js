import React, { useState, useContext } from 'react';
import { ThemeContext } from '../App';
import { ProductSearchContext } from '../context/ProductSearchContext';

const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { isDarkTheme } = useContext(ThemeContext);
  const { setSearchQuery } = useContext(ProductSearchContext);
  
  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    setSearchQuery(newSearchTerm);
  };
  
  return (
    <div className="mb-4">
      <div className="input-group">
        <span className="input-group-text">🔍</span>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Rechercher un produit..."
          className={`form-control ${isDarkTheme ? 'bg-dark text-light' : ''}`}
        />
        {searchTerm && (
          <button 
            className="btn btn-outline-secondary" 
            type="button"
            onClick={() => {
              setSearchTerm('');
              setSearchQuery('');
            }}
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductSearch;