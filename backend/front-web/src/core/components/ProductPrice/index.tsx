import { type } from 'os';
import React from 'react';
import './styles.scss';

type Props = {
  price: number;
}

const FormatPrice = (price: number) => {
  return new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(price);
}

const ProductPrice = ({price}: Props) => (
  <div className="product-price-container">
    <span className="product-currency">R$</span>
    <h3 className="product-price">{FormatPrice(price)}</h3>
  </div>
);

export default ProductPrice;