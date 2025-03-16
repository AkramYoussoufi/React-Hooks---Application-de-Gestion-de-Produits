import { useState, useEffect, useCallback } from 'react';
import useDebounce from './useDebounce';

const useProductSearch = (searchTerm = '') => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Appliquer le debounce au terme de recherche
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://api.daaif.net/products?delay=1000');
        if (!response.ok) throw new Error('Erreur réseau');
        const data = await response.json();
        setProducts(data.products);
        setFilteredProducts(data.products);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filtrer les produits quand le terme de recherche debounced change
  useEffect(() => {
    if (!debouncedSearchTerm.trim()) {
      setFilteredProducts(products);
      return;
    }
    
    const searchResults = products.filter(product => 
      product.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
    
    setFilteredProducts(searchResults);
  }, [debouncedSearchTerm, products]);

  const reloadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.daaif.net/products?delay=1000');
      if (!response.ok) throw new Error('Erreur réseau');
      const data = await response.json();
      setProducts(data.products);
      setFilteredProducts(data.products);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, []);

  return { 
    products: filteredProducts, 
    loading, 
    error,
    reloadProducts,
  };
};

export default useProductSearch;