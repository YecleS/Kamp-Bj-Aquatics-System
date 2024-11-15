import React, { useState, useRef, useEffect } from 'react';
import '../Styles/Modal.css';
import '../Styles/AddVoidProductModal.css';
import AddVoidProductRecord from '../UIComponents/AddVoidProductRecordModal';
import ProductCard from '../UIComponents/ProductCard';

const AddVoidProductModal = ({ onClick, refresh }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // New state for search term
  const [isAddVoidProductRecordOpen, isSetAddVoidProductRecordOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${apiUrl}/KampBJ-api/server/getActiveProducts.php`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const toggleAddVoidProductRecord = (product = null) => {
    setSelectedProduct(product);
    isSetAddVoidProductRecordOpen(!isAddVoidProductRecordOpen);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase()); // Convert to lowercase for case-insensitive search
  };

  // Filter products based on the search term
  const filteredProducts = products.filter(product =>
    product.productName.toLowerCase().includes(searchTerm)
  );

  return (
    <div className='add-void-product-modal'>
      <div className='add-void-product-modal__wrapper'>
        <div className='add-void-product-modal__header'>
          <div className='add-void-product-modal__search-wrapper'>
            <input
              type='text'
              placeholder='Search product ...'
              className='add-void-product-modal__input-field'
              value={searchTerm} // Bind input value to state
              onChange={handleSearchChange} // Handle input change
            />
          </div>
          <i className="add-void-product-modal__close-icon fa-solid fa-xmark" onClick={onClick}></i>
        </div>
        <div className='add-void-product-modal__body'>
          <div className='add-void-product-modal__cards-wrapper'>
            {filteredProducts.map((product) => 
              <ProductCard 
                key={product.productId} 
                product={product}
                icon='fa-arrow-right'
                onClick={() => toggleAddVoidProductRecord(product)}
              />
            )}
          </div>    
        </div>
        {isAddVoidProductRecordOpen && (
          <AddVoidProductRecord 
            product={selectedProduct} 
            onClick={toggleAddVoidProductRecord}
            exit={onClick}
            refresh={refresh}
          />
        )}
      </div>
    </div>
  );
};

export default AddVoidProductModal;
