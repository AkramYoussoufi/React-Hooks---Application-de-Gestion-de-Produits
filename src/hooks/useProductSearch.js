import { useState, useEffect, useCallback } from 'react';
import useDebounce from './useDebounce';

const useProductSearch = (searchTerm = '') => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // État pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(6);
  const [paginatedProducts, setPaginatedProducts] = useState([]);
  
  // Appliquer le debounce au terme de recherche
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Fonction pour charger les produits depuis l'API
  const fetchProducts = useCallback(async () => {
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

  // Charger les produits au montage du composant
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Filtrer les produits quand le terme de recherche debounced change
  useEffect(() => {
    if (!debouncedSearchTerm.trim()) {
      setFilteredProducts(products);
    } else {
      const searchResults = products.filter(product => 
        product.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
      setFilteredProducts(searchResults);
    }
    // Réinitialiser à la première page après une recherche
    setCurrentPage(1);
  }, [debouncedSearchTerm, products]);

  // Mettre à jour les produits paginés quand les produits filtrés changent
  useEffect(() => {
    const total = Math.ceil(filteredProducts.length / productsPerPage);
    setTotalPages(total || 1); // Éviter d'avoir 0 pages

    // Vérifier si la page actuelle est toujours valide
    if (currentPage > total && total > 0) {
      setCurrentPage(total);
    }

    // Paginer les produits
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    setPaginatedProducts(filteredProducts.slice(startIndex, endIndex));
  }, [filteredProducts, currentPage, productsPerPage]);

  // Fonction pour recharger les produits
  const reloadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.daaif.net/products?delay=1000');
      if (!response.ok) throw new Error('Erreur réseau');
      const data = await response.json();
      setProducts(data.products);
      setFilteredProducts(data.products);
      setCurrentPage(1); // Revenir à la première page
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, []);

  // Fonctions pour naviguer entre les pages
  const nextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  }, [currentPage, totalPages]);

  const previousPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  }, [currentPage]);

  const goToPage = useCallback((page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }, [totalPages]);

  return { 
    products: paginatedProducts, 
    allProducts: filteredProducts, // Tous les produits filtrés (non paginés)
    loading, 
    error,
    reloadProducts,
    // Pagination
    currentPage,
    totalPages,
    nextPage,
    previousPage,
    goToPage,
    productsPerPage,
    setProductsPerPage,
  };
};

export default useProductSearch;