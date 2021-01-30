import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './components/ProductCard';
import { makeRequest } from '../../core/utils/request';
import './styles.scss';
import { ProductsResponse } from '../../core/types/Prooduct';

const Catalog = () => {
  // Quando o componente iniciar, buscar a lista de produtos
  // Quando a lista de produtos estiver disponível,
  //popular um estado no componente, e listar os produtos do back-end
  const [productsResponse, setproductsResponse] = useState<ProductsResponse>();
 
  useEffect(() => {
   const params = {
     page: 0,
     linesPerPage: 12
   }
    makeRequest({url:'/products', params})
      .then(response => setproductsResponse(response.data));
  }, []);

  return (
    <div className="catalog-container">
      <h1 className="catalog-title">
        Catálogo de produdos
      </h1>
      <div className="catalog-products">
        {productsResponse?.content.map(product => (
          <Link to={`/products/${product.id}`} key={product.id}>
            <ProductCard product={product}/>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Catalog;