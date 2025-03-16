import React, { useContext } from 'react';
import { ThemeContext } from '../App';
import { ProductSearchContext } from '../context/ProductSearchContext';
import { useLanguage } from '../context/LanguageContext';
import useProductSearch from '../hooks/useProductSearch';

const ProductList = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { searchQuery } = useContext(ProductSearchContext);
  const { t } = useLanguage();
  
  const { 
    products, 
    allProducts, // Tous les produits filtrés (non paginés)
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
    setProductsPerPage
  } = useProductSearch(searchQuery);
  
  if (loading) return (
    <div className="text-center my-4">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">{t('loading')}</span>
      </div>
      <p className="mt-2">{t('loading')}</p>
    </div>
  );
  
  if (error) return (
    <div className="alert alert-danger" role="alert">
      {t('error')} {error}
    </div>
  );
  
  if (allProducts.length === 0) {
    return (
      <div className="alert alert-info" role="alert">
        {t('noProducts')}
      </div>
    );
  }
  
  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <p>
          <strong>{allProducts.length}</strong> {t('productsFound')}
        </p>
        <button className="btn btn-outline-primary" onClick={reloadProducts}>
          🔄 {t('reload')}
        </button>
      </div>
      
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {products.map(product => (
          <div key={product.id} className="col">
            <div className={`card h-100 ${isDarkTheme ? 'bg-dark text-light' : ''}`}>
              {product.thumbnail && (
                <img 
                  src={product.thumbnail} 
                  className="card-img-top" 
                  alt={product.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">
                  <strong>{t('price')}</strong>
                  {product.price}€
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contrôles de pagination */}
      {totalPages > 1 && (
        <nav className="mt-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div className="d-flex align-items-center">
              <label htmlFor="itemsPerPage" className="me-2">{t('itemsPerPage')}:</label>
              <select 
                id="itemsPerPage" 
                className="form-select form-select-sm" 
                style={{ width: '70px' }}
                value={productsPerPage}
                onChange={(e) => setProductsPerPage(Number(e.target.value))}
              >
                <option value="3">3</option>
                <option value="6">6</option>
                <option value="9">9</option>
                <option value="12">12</option>
              </select>
            </div>
            <div>
              {t('page')} {currentPage} {t('of')} {totalPages}
            </div>
          </div>
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button 
                className="page-link" 
                onClick={previousPage}
                disabled={currentPage === 1}
              >
                {t('previous')}
              </button>
            </li>
            
            {/* Afficher les numéros de page */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <li 
                key={page} 
                className={`page-item ${currentPage === page ? 'active' : ''}`}
              >
                <button 
                  className="page-link" 
                  onClick={() => goToPage(page)}
                >
                  {page}
                </button>
              </li>
            ))}
            
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button 
                className="page-link" 
                onClick={nextPage}
                disabled={currentPage === totalPages}
              >
                {t('next')}
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default ProductList;