import React, { useState, useRef, useEffect } from 'react';
import '../Styles/Pos.css';
import AddToCartModal from '../UIComponents/AddToCartModal';
import ProductCard from '../UIComponents/ProductCard';
import { ToastSuccess, ToastError } from '../UIComponents/ToastComponent';

const Pos = () => {
    const [isFilterDropdownOpen, isSetFilterDropdownOpen] = useState(false);
    const [isAddToCartModalOpen, isSetAddToCartOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);
    const filterDropdownRef = useRef(null);

    const [filters, setFilters] = useState({
        filterBy: '',
        startDate: '',
        endDate: '',
    });

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

    const toggleFilterDropdown = () => {
        isSetFilterDropdownOpen(!isFilterDropdownOpen);
    };

    const toggleAddToCartModal = (product = null) => {
        setSelectedProduct(product);
        isSetAddToCartOpen(!isAddToCartModalOpen);
    };
  
    const addToCart = (product, quantity) => {
        setCart(prevCart => {
            const existingProductIndex = prevCart.findIndex(item => item.productId === product.productId);
            const existingProduct = prevCart[existingProductIndex];
  
            if (existingProductIndex !== -1) {
                const newQuantity = existingProduct.quantity + quantity;
                
                if (newQuantity > product.quantity) {
                    alert("The quantity entered exceeds the available stock.");
                    return prevCart;
                }
  
                const updatedCart = [...prevCart];
                updatedCart[existingProductIndex].quantity = newQuantity;
                ToastSuccess(`${product.productName} added to cart!`);
                return updatedCart;
            } else {
                if (quantity > product.quantity) {
                    alert("The quantity entered exceeds the available stock.");
                    return prevCart;
                }
                ToastSuccess(`${product.productName} added to cart!`);
                return [...prevCart, { ...product, quantity }];
            }
        });
    };

    const handleCheckout = async () => {
        const orderItems = cart.map(item => ({
            indicator: item.lowStockIndicator,
            productName: item.productName,
            productId: item.productId,
            quantity: item.quantity,
            price: item.sellingPrice,
            total: item.sellingPrice * item.quantity
        }));
        const totalAmount = orderItems.reduce((sum, item) => sum + item.total, 0);

        try {
            const response = await fetch('http://localhost/KampBJ-api/server/processCheckout.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderItems, totalAmount }),
            });

            const result = await response.json();
            if (result.success) {
                ToastSuccess("Order processed successfully!");
                setCart([]); // Clear the cart after successful checkout
                // Optionally, re-fetch products to update stock availability
                const productsResponse = await fetch('http://localhost/KampBJ-api/server/getProducts.php');
                const productsData = await productsResponse.json();
                setProducts(productsData);
            } else {
                ToastError(result.message || "Failed to process order.");
            }
        } catch (error) {
            console.error("Error processing checkout:", error);
            ToastError("Error processing checkout.");
        }
    };

    const resetFilters = () => {
      setFilters({
          filterBy: '',
          startDate: '',
          endDate: '',
      });
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
        <div className='pos'>
            <div className='pos__header'>
                <div className='pos__search-wrapper'>
                    <input type='text' placeholder='Search' className='pos__input-field'/>
                </div>
                <div className='pos__filter-wrapper' ref={filterDropdownRef}>
                    <i className="pos__filter-icon fa-solid fa-filter" onClick={toggleFilterDropdown}></i>
                    {isFilterDropdownOpen && (
                        <div className='pos__filter-dropdown'>
                            <div className='pos__filter-dropdown-body'>
                                <div className='pos__filter-dropdown-field-wrapper'>
                                    <p className='pos__filter-label'>Filter by</p>
                                    <select value={filters.filterBy} 
                                        onChange={(e) => setFilters({ ...filters, filterBy: e.target.value })} 
                                        className='pos__filter-field'>
                                        <option></option>
                                        <option value='name'>Name</option>
                                        <option value='date'>Date</option>
                                        <option value='price'>Price</option>
                                    </select>
                                </div>
                            </div>
                            <div className='pos__filter-dropdown-footer'>
                                <p className='pos__filter-reset' onClick={resetFilters}>Reset Filters</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className='pos__body'>
                <div className='pos__content-wrapper'>
                    <div className='pos__inventory-wrapper'>
                        {dummyProducts.map((product) => 
                            <ProductCard 
                                key={product.productId} 
                                product={product}
                                icon='fa-arrow-right'
                                onClick={() => toggleAddToCartModal(product)}
                            />
                        )}
                    </div>

                    <div className='pos__orders-wrapper'>
                        <h5 className='pos__table-title'>Orders list</h5>
                        <div className='pos__orders-table-wrapper'>
                            <table className='pos__table'>
                                <thead>
                                    <tr>
                                        <th className='pos__table-th'>Name</th>
                                        <th className='pos__table-th'>Brand</th>
                                        <th className='pos__table-th'>Model</th>
                                        <th className='pos__table-th'>Quantity</th>
                                        <th className='pos__table-th'>Price</th>
                                        <th className='pos__table-th'></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map((item, index) => (
                                        <tr className='pos__table-tr' key={index}>
                                            <td className='pos__table-td'>{item.productName}</td>
                                            <td className='pos__table-td'>{item.brand}</td>
                                            <td className='pos__table-td'>{item.model}</td>
                                            <td className='pos__table-td'>{item.quantity}</td>
                                            <td className='pos__table-td'>₱ {(item.sellingPrice * item.quantity).toFixed(2)}</td>
                                            <td className='pos__table-td'>
                                                <i className="pos__icon-td fa-solid fa-trash" onClick={() => {
                                                    setCart(cart.filter((_, i) => i !== index));
                                                }}></i>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className='pos__orders-details'>
                            <div className='pos__billing-details-wrapper'>
                                <p className='pos__bill-label'>Sub Total</p>
                                <p className='pos__bill-label'>₱ {cart.reduce((sum, item) => sum + item.sellingPrice * item.quantity, 0).toFixed(2)}</p>
                            </div>
                            <button className='pos__checkout' onClick={handleCheckout}>Checkout</button>
                        </div>     
                    </div>
                </div>    
            </div>
            {isAddToCartModalOpen && (
                <AddToCartModal 
                    product={selectedProduct} 
                    onClick={toggleAddToCartModal} 
                    onAddToCart={addToCart}
                />
            )}
        </div>
    );
};

export default Pos;
