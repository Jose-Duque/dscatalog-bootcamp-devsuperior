import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Pagination from '../../../../../core/components/Pagination';
import { ProductsResponse } from '../../../../../core/types/Prooduct';
import { makePrivateRequest, makeRequest } from '../../../../../core/utils/request';
import Card from '../Card';

const List = () =>{
   // Quando o componente iniciar, buscar a lista de produtos
  // Quando a lista de produtos estiver disponível,
  //popular um estado no componente, e listar os produtos do back-end
  const [productsResponse, setproductsResponse] = useState<ProductsResponse>();
  const [isLoader, setIsLoader] = useState(false);
  const [activePage, setActivePage] = useState(0);
  const history = useHistory();
 
  const getProduct = useCallback(() => {
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
  }, [activePage])

  useEffect(() => {
   getProduct();
  }, [getProduct]);

  const handleCreate = () => {
    history.push("/admin/products/create");
  }

  const onRemove = (productId: number) => {
    const confirm = window.confirm('Deseja excluir este produto?');

    if(confirm) {
      makePrivateRequest({url: `/products/${productId}`, method: 'DELETE'})
      .then(() => {
        toast.info('Produto excluido com sucesso!');
        getProduct();
      })
      .catch(() => {
        toast.error('Erro ao excluir produto!');
      })
    }
  }
  
  return (
    <div className="admin-products-list">
      <button className="btn btn-primary btn-lg" onClick={handleCreate}>
        ADICIONAR
      </button>
      <div className="admin-list-container">
        {productsResponse?.content.map(products => (
          <Card product={products} key={products.id} onRemove={onRemove} />
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