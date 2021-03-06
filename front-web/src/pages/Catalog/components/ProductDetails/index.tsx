
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ReactComponent as SetaImage} from '../../../../core/assets/images/Seta.svg'
import ProductPrice from '../../../../core/components/ProductPrice';
import { Product } from '../../../../core/types/Prooduct';
import { makeRequest } from '../../../../core/utils/request';
import ProductDescription from '../Loaders/productDescription';
import ProductInfoLoader from '../Loaders/productInfoLoader';
import './styles.scss';

type ParamsType = {
  productId: string;
}

const ProductDetails = () => {
  const {productId} = useParams<ParamsType>();
  const [product, setProduct] = useState<Product>();
  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    setIsLoader(true);
    makeRequest({url: `/products/${productId}`})
    .then(response => setProduct(response.data))
    .finally(() =>{
      setIsLoader(false);
    })
  }, [productId]);

  return (
    <div className="product-details-container">
      <div className="card-base border-radius-20 product-details">
      <Link to="/products" className="product-details-goback">
        <SetaImage className="icon-goback"/>
        <h1 className="text-goback">VOLTAR</h1>
      </Link>
      <div className="row">
        <div className="col-6 card-content">
          {isLoader ? <ProductInfoLoader/> : (
             <>
              <div className="product-details-card text-center">
                <img src={product?.imgUrl} alt={product?.name} className="product-details-image"/>
              </div>
              <h1 className="product-details-name">
                {product?.name}
              </h1>
              {product?.price && <ProductPrice price={product?.price}/>}
           </>
          )}
         
        </div>
        <div className="col-6 product-details-card">
          <h1 className="product-decription-title">Decrição do Produto</h1>
          {isLoader ? <ProductDescription/> : (
               <p className="product-decription-text">
               {product?.description}
              </p>
          )}
       
        </div>
      </div>
      </div>     
    </div>
  );
}

export default ProductDetails;
   