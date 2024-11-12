import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LandingPageButton from './LandingPageComponents/LandingPageButton';
import './LandingPageStyles/LandingPageProductView.css';
import Product1 from '../Assets/product1.jpg';

const LandingPageProductView = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch('http://localhost/KampBJ-api/server/fetchInventoryProducts.php')
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          // Ensure both IDs are strings for comparison
          const foundProduct = data.data.find(item => item.productId === productId);
          if (foundProduct) {
            setProduct(foundProduct);
          } else {
            alert('Product not found');
          }
        } else {
          alert('Failed to fetch product data');
        }
      })
      .catch(error => {
        console.error('Error fetching product data:', error);
      });
  }, [productId]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className='landing-page-product-view'>
      <div className='landing-page-product-view__content-wrapper'>
        <div className='landing-page-product-view__img-wrapper'>
            <img
                src={product.image ? `http://localhost/KampBJ-api/server/uploads/products/${product.image}` : Product1} // Adjust path as needed
                alt={product.productName}
                className='landing-page-product-view__img'
              />
          </div>
            <div className='landing-page-product-view__details-wrapper'>
            <h1 className='landing-page-product-view__name'>{product.productName}</h1>
            <p className='landing-page-product-view__description'>{product.description}</p>
            <p className='landing-page-product-view__Brand'>Brand: {product.brand}</p>
            <p className='landing-page-product-view__Model'>Model: {product.model}</p>
            <p className='landing-page-product-view__category'>Category: {product.category}</p>
            <p className='landing-page-product-view__stocks'>Stocks available: {product.quantity}</p>
            <p className='landing-page-product-view__price'>Price: ₱ {parseFloat(product.sellingPrice).toFixed(2)}</p>
            <LandingPageButton label='View More' onClick={() => navigate('/products')} varietyClass='landing-page-product-view__view-more'/>
      </div>
      </div>
        
    </div>
  );
};

export default LandingPageProductView;
