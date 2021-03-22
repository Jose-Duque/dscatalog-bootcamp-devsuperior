import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './components/ProductCard';
import { makeRequest } from '../../core/utils/request';
import './styles.scss';
import { ProductsResponse } from '../../core/types/Prooduct';
import ProductCardLoader from './components/Loaders';
import Pagination from '../../core/components/Pagination';

const Catalog = () => {
  // Quando o componente iniciar, buscar a lista de produtos
  // Quando a lista de produtos estiver disponível,
  //popular um estado no componente, e listar os produtos do back-end
  const [productsResponse, setproductsResponse] = useState<ProductsResponse>();
  const [isLoader, setIsLoader] = useState(false);
  const [activePage, setActivePage] = useState(0);

  useEffect(() => {
   const params = {
     page: activePage,
     linesPerPage: 12,
     direction: 'DESC',
     orderBy: 'id'
   }
   // inicia loader
   setIsLoader(true);
    makeRequest({url:'/products', params})
      .then(response => setproductsResponse(response.data))
      .finally(() => {
        // finalizar loader
        setIsLoader(false)
      })
  }, [activePage]);

  return (
    <div className="catalog-container">
      <h1 className="catalog-title">
        Catálogo de produdos
      </h1>
      <div className="catalog-products">
        {isLoader ? <ProductCardLoader/> : (
          productsResponse?.content.map(product => (
            <Link to={`/products/${product.id}`} key={product.id}>
              <ProductCard product={product}/>
            </Link>
          ))
        )}
        
      </div>
      {productsResponse && (
      <Pagination 
      totalPage={productsResponse.totalPages}
      activePage={activePage}
      onchange={page => setActivePage(page)}
      />)} 
    </div>
  );
}

export default Catalog;