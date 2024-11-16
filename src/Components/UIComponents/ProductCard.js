import React, { useState, useEffect } from 'react';
import '../Styles/ProductCard.css';
import { ViewProductIcon } from '../UIComponents/ActionIcons';

const ProductCard = ({ product, icon, onClick }) => {
  const [quantity, setQuantity] = useState(0); // To store the product's quantity
  const apiUrl = process.env.REACT_APP_API_URL;

  // Fetch product inventory data
  useEffect(() => {
    const fetchProductInventory = async () => {
      if (product?.productId) {
        try {
          const response = await fetch(
            `${apiUrl}/KampBJ-api/server/getProductTotalStocks.php?productId=${product.productId}`
          );
          if (!response.ok) {
            throw new Error('Failed to fetch product inventory');
          }
          const data = await response.json();
          if (data.length > 0) {
            // Calculate the total quantity by summing up the quantity of all batches
            const totalQuantity = data.reduce((sum, batch) => sum + parseInt(batch.totalStocks), 0);
            setQuantity(totalQuantity); // Update the quantity state
          } else {
            setQuantity(0); // If no inventory found, set quantity to 0
          }
        } catch (error) {
          console.error('Error fetching product inventory:', error);
          setQuantity(0); // In case of error, set quantity to 0
        }
      }
    };

    fetchProductInventory();
  }, [product, apiUrl]); // Only run when the product changes

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
        <p className='product-card__stock'>
          Stocks: {quantity} {/* Display the fetched quantity */}
        </p>
      </div>
      <div className='product-card__footer'>
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
