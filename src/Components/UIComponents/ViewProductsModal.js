import React from 'react';
import '../Styles/ViewProductsModal.css';
import ButtonComponent from '../UIComponents/ButtonComponent';
import ImagePreview from '../Assets/image-preview.png';
import { NavLink, useNavigate } from 'react-router-dom';

const ViewProductsModal = ({ products, onClick }) => {
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  // Check if the product has an image; if not, use the default ImagePreview
  const imageUrl = products.image 
    ? `${apiUrl}/KampBJ-api/server/uploads/products/${products.image}` 
    : ImagePreview;

  return (
    <div className='view-products-modal'>
      <div className='view-products-modal_wrapper'>
        <div className='view-products-modal__img-wrapper'>
          <img src={imageUrl} alt={products.productname} className='view-products-modal__img'/>
          <p className='view-products-modal__label'>Description</p>
          <p className='view-products-modal__description'>{products.description}</p>
        </div>
        
        <div className='view-products-modal__details-wrapper'>
          <h1 className='view-products-modal__title'>{products.productName}</h1>
  
          <p className='view-products-modal__label'>Brand</p>
          <p className='view-products-modal__brand'>{products.brand}</p>

          <p className='view-products-modal__label'>Model</p>
          <p className='view-products-modal__model'>{products.model}</p>

          <p className='view-products-modal__label'>Category</p>
          <p className='view-products-modal__model'>{products.category}</p>
          
          <p className='view-products-modal__label'>Procured price</p>
          <p className='view-products-modal__model'>₱ {products.procuredPrice}</p>

          <p className='view-products-modal__label'>Critical Stock Level</p>
          <p className='view-products-modal__model'>{products.lowStockIndicator}</p>

          <p className='view-products-modal__label'>Markup Percentage</p>
          <p className='view-products-modal__model'>{products.markup}%</p>

          <p className='view-products-modal__label'>Selling Price</p>
          <p className='view-products-modal__price'>₱ {(products.sellingPrice * 1).toFixed(2)}</p>

          <div className='view-products-modal__button-wrapper'>
            <ButtonComponent buttonCustomClass='view-product-modal__back-button' label='Back' onClick={onClick} />
            <NavLink to={`/home/view-batch/${products.productId}`}>
              <ButtonComponent buttonCustomClass='view-product-modal__back-button' label='Batches'/>
            </NavLink>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProductsModal;
