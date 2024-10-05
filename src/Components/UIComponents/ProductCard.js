import React from 'react';
import '../Styles/ProductCard.css';
import DefaultImage from '../Assets/image-preview.png'
import TextSlicer from '../Utils/TextSlicer';
import '../Styles/ProductCard.css';
import { ViewProductIcon } from '../UIComponents/ActionIcons'

const ProductCard = ({product, icon}) => {
    
  return (
    <div className='product-card'>
        <div className='product-card__header'>
            <img src={DefaultImage} className='product-card__img' />
        </div>
        <div className='product-card__body'>
            <h4 className='product-card__title'>{product.product}</h4>
            <p className='product-card__description'><TextSlicer text={product.description}/></p>
            <p className='product-card__brand'>Brand: {product.brand}</p>
            <p className='product-card__model'>Model: {product.model}</p>
            <p className='product-card__stock'>Stocks: {product.stocks}</p>
        </div>
        <div className='product-card__footer'>
            <p className='prouct-card__total-price'>₱ {product.price}</p>

            <div>
                <ViewProductIcon products={product} />
                <i className={`product-card__icon fa-solid ${icon}`}></i>
            </div>
            
        </div>
    </div>
  )
}

export default ProductCard
