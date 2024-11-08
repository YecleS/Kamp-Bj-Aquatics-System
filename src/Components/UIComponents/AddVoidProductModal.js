import React, { useState, useRef, useEffect } from 'react';
import '../Styles/Modal.css';
import '../Styles/Pos.css';
import '../Styles/AddVoidProductModal.css'
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

  const dummyProducts = [
    {productId: 1, image: 'WaterLights.png', productName: 'Led Aquarium Light', category:'accessories', brand:'aquaboy', model:'XXZZX110', quantity: 30, sellingPrice: 75.3 },
    {productId: 2, image: 'WaterLights.png', productName: 'Led Aquarium Light', category:'accessories', brand:'aquaboy', model:'XXZZX110', quantity: 30, sellingPrice: 75.3 },
    {productId: 3, image: 'WaterLights.png', productName: 'Led Aquarium Light', category:'accessories', brand:'aquaboy', model:'XXZZX110', quantity: 30, sellingPrice: 75.3 },
    {productId: 4, image: 'WaterLights.png', productName: 'Led Aquarium Light', category:'accessories', brand:'aquaboy', model:'XXZZX110', quantity: 30, sellingPrice: 75.3 },
    {productId: 5, image: 'WaterLights.png', productName: 'Led Aquarium Light', category:'accessories', brand:'aquaboy', model:'XXZZX110', quantity: 30, sellingPrice: 75.3 },
    {productId: 6, image: 'WaterLights.png', productName: 'Led Aquarium Light', category:'accessories', brand:'aquaboy', model:'XXZZX110', quantity: 30, sellingPrice: 75.3 },
    {productId: 7, image: 'WaterLights.png', productName: 'Led Aquarium Light', category:'accessories', brand:'aquaboy', model:'XXZZX110', quantity: 30, sellingPrice: 75.3 },
    {productId: 8, image: 'WaterLights.png', productName: 'Led Aquarium Light', category:'accessories', brand:'aquaboy', model:'XXZZX110', quantity: 30, sellingPrice: 75.3 },
    {productId: 9, image: 'WaterLights.png', productName: 'Led Aquarium Light', category:'accessories', brand:'aquaboy', model:'XXZZX110', quantity: 30, sellingPrice: 75.3 },
    {productId: 10, image: 'WaterLights.png', productName: 'Led Aquarium Light', category:'accessories', brand:'aquaboy', model:'XXZZX110', quantity: 30, sellingPrice: 75.3 },
  ]

  return (
    <div className='add-void-product-modal'>
            <div className='add-void-product-modal__header'>
                <div className='add-void-product-modal__search-wrapper'>
                    <input type='text' placeholder='Search' className='pos__input-field'/>         
                </div>
                <i className="modal__close-icon fa-solid fa-xmark" onClick={onClick}></i>
            </div>
            <div className='add-void-product-modal__body'>
                <div className='add-void-product-modal__cards-wrapper'>
                    {dummyProducts.map((product) => 
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
                />
            )}
        </div>
  )
}

export default AddVoidProductModal
