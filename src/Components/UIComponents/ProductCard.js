import React from 'react';
import '../Styles/ProductCard.css';
import { ViewProductIcon } from '../UIComponents/ActionIcons';

const ProductCard = ({ product, icon, onClick }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  return (
    <div className='product-card'>
      <div className='product-card__header'>
      <img
          src={`${apiUrl}/KampBJ-api/server/uploads/products/${product.image}`}
          className='product-card__img'
          alt={product.productName}
        />
      </div>
      <div className='product-card__body'>
        <h4 className='product-card__title'>{product.productName}</h4>
        <p className='product-card__brand'>Category: {product.category}</p>
        <p className='product-card__brand'>Brand: {product.brand}</p>
        <p className='product-card__model'>Model: {product.model}</p>
        <p className='product-card__stock'>Stocks: {product.quantity}</p>
      </div>
      <div className='product-card__footer'>
        <p className='product-card__total-price'>₱ {(product.sellingPrice * 1).toFixed(2)}</p>

        <div className='product-card__icon-wrapper'>
          <ViewProductIcon products={product} />
          <div onClick={(e) => { e.stopPropagation(); onClick(product); }}>
            <i className={`product-card__icon fa-solid ${icon}`}></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
