import React, { useState, useRef, useEffect } from 'react';
import '../Styles/ProductBatch.css';
import ButtonComponent from '../UIComponents/ButtonComponent';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const ProductBatch = () => {
    const { productId } = useParams();
    const [isFilterDropdownOpen, setFilterDropdownOpen] = useState(false);
    const filterDropdownRef = useRef(null);
    const navigate = useNavigate();

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

    const inventoryData = [
        { Batch_no: "BN001", Name: "Waterlights", Category: "Accessories", Brand: "Kawazaki", Model: "XXS21", Stocks: 24, Price: 366.38 },
        { Batch_no: "BN002", Name: "Waterlights", Category: "Accessories", Brand: "Kawazaki", Model: "XXS21", Stocks: 154, Price: 166.75 },
        { Batch_no: "BN003", Name: "Waterlights", Category: "Accessories", Brand: "Kawazaki", Model: "XXS21", Stocks: 254, Price: 256.28 },
        { Batch_no: "BN004", Name: "Waterlights", Category: "Accessories", Brand: "Kawazaki", Model: "XXS21", Stocks: 354, Price: 566.88 }
      ];

  return (
    <div className='product-batch'>
        <ButtonComponent label='Back' onClick={() => navigate('/home/inventory')} buttonCustomClass='product-batch__back-button' />
        <div className='product-batch__header'>
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
                    <select
                        className="product-batch__filter-field"
                    >
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
        </div>

        <div className='product-batch__body'>
            <div className='product-batch__table-wrapper'>
                <table className='product-batch__table'>
                    <thead>
                        <tr>
                            <th className='product-batch__table-th'>Batch_no</th>
                            <th className='product-batch__table-th'>Name</th>
                            <th className='product-batch__table-th'>Category</th>
                            <th className='product-batch__table-th'>Brand</th>
                            <th className='product-batch__table-th'>Model</th>
                            <th className='product-batch__table-th'>Stocks</th>
                            <th className='product-batch__table-th'>Price</th>

                        </tr>
                    </thead>
                    <tbody>

                        {productId}
                        {/* {
                            inventoryData.map(product => (
                                <tr className='product-batch__table-tr' key={product.Batch_no}>
                                    <td className='product-batch__table-td'>{product.Batch_no}</td>
                                    <td className='product-batch__table-td'>{product.Name}</td>
                                    <td className='product-batch__table-td'>{product.Category}</td>
                                    <td className='product-batch__table-td'>{product.Brand}</td>
                                    <td className='product-batch__table-td'>{product.Model}</td>
                                    <td className='product-batch__table-td'>{product.Stocks}</td>
                                    <td className='product-batch__table-td'>₱ {product.Price}</td>
                                </tr>
                            ))
                        } */}
                        
                    </tbody>
                </table>
            </div>
      </div>   

    </div>
  )
}

export default ProductBatch
