import React, { useState, useRef, useEffect } from 'react';
import '../Styles/ProductBatch.css';
import ButtonComponent from '../UIComponents/ButtonComponent';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const ProductBatch = () => {
    const { productId } = useParams();
    const [isFilterDropdownOpen, setFilterDropdownOpen] = useState(false);
    const [inventoryData, setInventoryData] = useState([]);
    const filterDropdownRef = useRef(null);
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

        // Fetch product batch data
    useEffect(() => {
        const fetchProductBatchData = async () => {
            try {
                // Pass the productId as a query parameter
                const response = await fetch(`${apiUrl}/KampBJ-api/server/getProductBatchNum.php?productId=${productId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product batch data');
                }
                const data = await response.json();
                setInventoryData(data);
            } catch (error) {
                console.error('Error fetching product batch data:', error);
            }
        };

        if (productId) { // Ensure productId is available before making the request
            fetchProductBatchData();
        }
    }, [productId, apiUrl]);


    // Toggle Filter Dropdown
    const toggleFilterDropdown = () => {
        setFilterDropdownOpen(!isFilterDropdownOpen);
    };

    // Close dropdown when clicked outside
    useEffect(() => {
        const handler = (e) => {
            if (filterDropdownRef.current && !filterDropdownRef.current.contains(e.target)) {
                setFilterDropdownOpen(false);
            }
        };

        document.addEventListener('click', handler);
        return () => document.removeEventListener('click', handler);
    }, []);

    return (
        <div className='product-batch'>
            <ButtonComponent label='Back' onClick={() => navigate('/home/inventory')} buttonCustomClass='product-batch__back-button' />
            {/* <div className='product-batch__header'>
                <div className='product-batch__search-wrapper'>
                    <input 
                        type='text' 
                        placeholder='Search product' 
                        className='product-batch__input-field' 
                    />
                </div>
                <div className='product-batch__filter-wrapper' ref={filterDropdownRef}>
                    <i className="product-batch__filter-icon fa-solid fa-filter" onClick={toggleFilterDropdown}></i>
                    {isFilterDropdownOpen && (
                        <div className="product-batch__filter-dropdown">
                            <div className="product-batch__filter-dropdown-body">
                                <div className="product-batch__filter-dropdown-field-wrapper">
                                    <p className="product-batch__filter-label">Sort by</p>
                                    <select className="product-batch__filter-field">
                                        <option value="">Select</option>
                                        <option value="category">Category</option>
                                        <option value="brand">Brand</option>
                                        <option value="priceAsc">Price (Lowest - Highest)</option>
                                        <option value="priceDesc">Price (Highest - Lowest)</option>
                                        <option value="stocksAsc">Stocks (Lowest - Highest)</option>
                                        <option value="stocksDesc">Stocks (Highest - Lowest)</option>
                                    </select>
                                </div>
                            </div>
                            <div className="product-batch__filter-dropdown-footer">
                                <p className="product-batch__filter-reset">Reset Filters</p>
                            </div>
                        </div>
                    )}
                </div>
            </div> */}

            <div className='product-batch__body'>
                <div className='product-batch__table-wrapper'>
                    <table className='product-batch__table'>
                        <thead>
                            <tr>
                                <th className='product-batch__table-th'>Batch Number</th>
                                <th className='product-batch__table-th'></th>
                                <th className='product-batch__table-th'>Quantity</th>
                                <th className='product-batch__table-th'>Unit Price</th>
                                <th className='product-batch__table-th'>Markup Percentage</th>
                                <th className='product-batch__table-th'>Selling Price</th>
                                <th className='product-batch__table-th'>Supplier</th>
                                <th className='product-batch__table-th'>Date Procured</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inventoryData.map((product, index) => (
                                <tr className='product-batch__table-tr' key={index}>
                                    <td className='product-batch__table-td'>{product.batchNumber}</td>
                                    <td className='product-batch__table-td'>{product.productName}</td>
                                    <td className='product-batch__table-td'>{product.quantity}</td>
                                    <td className='product-batch__table-td'>₱ {product.unitPrice.toFixed(2)}</td>
                                    <td className='product-batch__table-td'>{product.markup} %</td>
                                    <td className='product-batch__table-td'>₱ {product.sellingPrice.toFixed(2)}</td>
                                    <td className='product-batch__table-td'>{product.supplierName}</td>
                                    <td className='product-batch__table-td'>{product.dateProcured}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProductBatch;
