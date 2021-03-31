import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './components/ProductCard';
import { makeRequest } from '../../core/utils/request';
import './styles.scss';
import { Category, ProductsResponse } from '../../core/types/Prooduct';
import ProductCardLoader from './components/Loaders';
import Pagination from '../../core/components/Pagination';
import ProductFilters from '../../core/components/ProductFilters';

const Catalog = () => {
  // Quando o componente iniciar, buscar a lista de produtos
  // Quando a lista de produtos estiver disponível,
  //popular um estado no componente, e listar os produtos do back-end
  const [productsResponse, setproductsResponse] = useState<ProductsResponse>();
  const [isLoader, setIsLoader] = useState(false);
  const [activePage, setActivePage] = useState(0);
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Category>();

  const getProduct = useCallback(() => {
    const params = {
      page: activePage,
      linesPerPage: 12,
      direction: 'DESC',
      orderBy: 'id',
      name: name,
      categoryId: category?.id
    }
    // inicia loader
    setIsLoader(true);
     makeRequest({url:'/products', params})
       .then(response => setproductsResponse(response.data))
       .finally(() => {
         // finalizar loader
         setIsLoader(false)
       })
  }, [activePage, name, category])

  useEffect(() => {
   getProduct();
  }, [getProduct]);

  
  const handleChangeName = (name: string) => {
    setActivePage(0);
    setName(name);
  }

  const handleChangeCategory = (category: Category) => {
    setActivePage(0);
    setCategory(category);
  }

  const clearFilter = () => {
    setActivePage(0);
    setCategory(undefined);
    setName('');
  }

  return (
    <div className="catalog-container">
      <div className="d-flex justify-content-between">
        <h1 className="catalog-title">
          Catálogo de produdos
        </h1>
        <ProductFilters 
          name={name} 
          category={category}
          handleChangeCategory={handleChangeCategory}
          handleChangeName={handleChangeName}
          clearFilter={clearFilter}
        />
      </div>
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