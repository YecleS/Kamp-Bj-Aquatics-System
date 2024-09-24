import React from 'react';
import '../Styles/ViewProductsModal.css';
import ButtonComponent from '../UIComponents/ButtonComponent';
import ImagePreview from '../Assets/image-preview.png';

const ViewProductsModal = ({products, onClick}) => {
  return (
    <div className='view-products-modal'>
      <div className='view-products-modal_wrapper'>
        <div className='view-products-modal__img-wrapper'>
          <img src={ImagePreview} className='view-products-modal__img'/>
        </div>
        <div className='view-products-modal__details-wrapper'>
          <h3 className='view-products-modal__title'>{products.product}</h3>
          <p className='view-products-modal__description'>{products.description}</p>

          <p className='view-products-modal__label'>Brand</p>
          <p className='view-products-modal__brand'>{products.brand}</p>

          <p className='view-products-modal__label'>Model</p>
          <p className='view-products-modal__model'>{products.model}</p>

          <p className='view-products-modal__label'>Category</p>
          <p className='view-products-modal__model'>{products.category}</p>
          
          <p className='view-products-modal__label'>Supplier</p>
          <p className='view-products-modal__model'>{products.supplier}</p>

          <p className='view-products-modal__label'>Procured price</p>
          <p className='view-products-modal__model'>{products.procured}</p>

          <p className='view-products-modal__label'>Markup Percentage</p>
          <p className='view-products-modal__model'>{products.markup}</p>

          <p className='view-products-modal__label'>Selling Price</p>
          <p className='view-products-modal__price'>₱ {products.price}</p>

          <ButtonComponent buttonCustomClass='view-product-modal__back-button' label='Back' onClick={onClick} />
        </div>
      </div>
    </div>
  )
}

export default ViewProductsModal
