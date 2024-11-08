import React, { useState, useRef, useEffect } from 'react';
import '../Styles/Modal.css';
import '../Styles/Pos.css';
import AddVoidProductRecord from '../UIComponents/AddVoidProductRecordModal';
import ProductCard from '../UIComponents/ProductCard';

const AddVoidProductModal = ({onClick}) => {
  const [products, setProducts] = useState([]);
  const [isAddVoidProductRecordOpen, isSetAddVoidProductRecordOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost/KampBJ-api/server/getProducts.php');
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

  return (
    <div className='pos'>
            <div className='pos__header'>
                <div className='pos__search-wrapper'>
                    <input type='text' placeholder='Search' className='pos__input-field'/>         
                </div>
                <i className="modal__close-icon fa-solid fa-xmark" onClick={onClick}></i>
            </div>
            <div className='pos__body'>
                <div className='pos__content-wrapper'>
                    <div className='pos__inventory-wrapper'>
                        {products.map((product) => 
                            <ProductCard 
                                key={product.productId} 
                                product={product}
                                icon='fa-arrow-right'
                                onClick={() => toggleAddVoidProductRecord(product)}
                            />
                        )}
                    </div>

                </div>    
            </div>
            {isAddVoidProductRecordOpen && (
                <AddVoidProductRecord 
                    product={selectedProduct} 
                    onClick={toggleAddVoidProductRecord}
                />
            )}
        </div>
  )
}

export default AddVoidProductModal
