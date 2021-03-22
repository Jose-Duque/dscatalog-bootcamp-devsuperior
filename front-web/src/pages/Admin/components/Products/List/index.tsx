import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Pagination from '../../../../../core/components/Pagination';
import { ProductsResponse } from '../../../../../core/types/Prooduct';
import { makeRequest } from '../../../../../core/utils/request';
import Card from '../Card';

const List = () =>{
   // Quando o componente iniciar, buscar a lista de produtos
  // Quando a lista de produtos estiver disponível,
  //popular um estado no componente, e listar os produtos do back-end
  const [productsResponse, setproductsResponse] = useState<ProductsResponse>();
  const [isLoader, setIsLoader] = useState(false);
  const [activePage, setActivePage] = useState(0);
  const history = useHistory();
 
  useEffect(() => {
   const params = {
     page: activePage,
     linesPerPage: 4
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

  const handleCreate = () => {
    history.push("/admin/products/create");
  }

  return (
    <div className="admin-products-list">
      <button className="btn btn-primary btn-lg" onClick={handleCreate}>
        ADICIONAR
      </button>
      <div className="admin-list-container">
        {productsResponse?.content.map(products => (
          <Card product={products} key={products.id} />
        ))}       
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

export default List;