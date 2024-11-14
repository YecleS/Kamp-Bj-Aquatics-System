import React, { useState, useRef, useEffect } from 'react';
import '../Styles/VoidProducts.css';
import AddVoidProductModal from '../UIComponents/AddVoidProductModal';
import { ViewVoidedProductIcon } from '../UIComponents/ActionIcons';

const VoidProducts = () => {
  const [isVoidProductsModalOpen, setIsVoidProductsModalOpen] = useState(false);
  const [isFilterDropdownOpen, isSetFilterDropdownOpen] = useState(false);
  const [voidedProducts, setVoidedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // New state for search term
  const filterDropdownRef = useRef(null);
  const [filters, setFilters] = useState({
    filterBy: '',
  });

  // Fetch voided product records from the backend
  const fetchVoidedProducts = async () => {
    try {
      const response = await fetch('http://localhost/KampBJ-api/server/fetchVoidedRecords.php');
      const data = await response.json();
      
      if (data.status === 'success') {
        setVoidedProducts(data.data);  // Update state with fetched records
      } else {
        console.error("Error fetching voided products:", data.message);
      }
    } catch (error) {
      console.error("Failed to fetch voided products:", error);
    }
  };

  useEffect(() => {
    fetchVoidedProducts(); // Fetch data when component mounts
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase()); // Convert search term to lowercase for case-insensitive comparison
  };

  // Toggle Dropdowns
  const toggleFilterDropdown = () => {
    isSetFilterDropdownOpen(!isFilterDropdownOpen);
  };

  const toggleVoidProductsModal = () => {
    setIsVoidProductsModalOpen(!isVoidProductsModalOpen);
  };

  const resetFilters = () => {
    setFilters({
      filterBy: '',
    });
    setSearchTerm(''); // Reset search term when filters are reset
  };

  useEffect(() => {
    const handler = (e) => {
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(e.target)) {
        isSetFilterDropdownOpen(false);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  // Filter products based on search term
// Filter and sort products based on search term and selected filter
const filteredProducts = voidedProducts
  .filter(product =>
    product.productName.toLowerCase().includes(searchTerm) ||
    (product.username && product.username.toLowerCase().includes(searchTerm)) ||
    (product.recordId && product.recordId.includes(searchTerm))
  )
  .sort((a, b) => {
    switch (filters.filterBy) {
      case 'brand':
        return a.brand.localeCompare(b.brand);
      case 'quantity_high':
        return b.quantity - a.quantity;
      case 'quantity_low':
        return a.quantity - b.quantity;
      case 'date_new':
        return new Date(b.date) - new Date(a.date);
      case 'date_old':
        return new Date(a.date) - new Date(b.date);
      default:
        return 0; // No sorting if no filter is selected
    }
  });



  return (
    <div className='void-products'>
      <div className='void-products__header'>
        <div className='void-products__left-controls-wrapper'>
          <div className='void-products__search-wrapper'>
            <input
              type='text'
              placeholder='Search Product ...'
              className='void-products__input-field'
              value={searchTerm} // Bind search input to state
              onChange={handleSearchChange} // Handle input change
            />
          </div>
          <div className='void-products__filter-wrapper' ref={filterDropdownRef}>
            <i className="void-products__filter-icon fa-solid fa-filter" onClick={toggleFilterDropdown}></i>
            {isFilterDropdownOpen &&
              <div className='void-products__filter-dropdown'>
                <div className='void-products__filter-dropdown-body'>
                  <div className='void-products__filter-dropdown-field-wrapper'>
                    <p className='void-products__filter-label'>Filter by</p>
                    <select value={filters.filterBy} 
                      onChange={(e) => setFilters({ ...filters, filterBy: e.target.value })} 
                      className='void-products__filter-field'
                    >
                      <option></option>
                      <option value='brand'>Brand</option>
                      <option value='quantity_high'>Quantity (Highest - Lowest)</option>
                      <option value='quantity_low'>Quantity (Lowest - Highest)</option>
                      <option value='date_new'>Date (Newest)</option>
                      <option value='date_old'>Date (Oldest)</option>
                    </select>
                  </div>
                </div>
                <div className='void-products__filter-dropdown-footer'>
                  <p className='void-products__filter-reset' onClick={resetFilters}>Reset Filters</p>
                </div>
              </div>
            }
          </div>
        </div>
        <button className='void-products__insert' onClick={toggleVoidProductsModal}>
          +
        </button>
      </div>
      <div className='void-products__body'>
        <div className='void-products__table-wrapper'>
          <table className='void-products__table'>
            <thead>
              <tr>
                <th className='void-products__table-th'>Record ID</th>
                <th className='void-products__table-th'>Product</th>
                <th className='void-products__table-th'>Brand</th>
                <th className='void-products__table-th'>Model</th>
                <th className='void-products__table-th'>Quantity</th>
                <th className='void-products__table-th'>Reason</th>
                <th className='void-products__table-th'>Reported By</th>
                <th className='void-products__table-th'>Date</th>
                <th className='void-products__table-th'></th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr className='void-products__table-tr' key={product.recordId}>
                  <td className='void-products__table-td'>{product.recordId}</td>
                  <td className='void-products__table-td'>{product.productName}</td>
                  <td className='void-products__table-td'>{product.brand}</td>
                  <td className='void-products__table-td'>{product.model}</td>
                  <td className='void-products__table-td'>{product.quantity}</td>
                  <td className='void-products__table-td'>{product.description}</td>
                  <td className='void-products__table-td'>{product.username}</td>
                  <td className='void-products__table-td'>{product.date}</td>
                  <td className='void-products__table-td'><ViewVoidedProductIcon products={product} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {isVoidProductsModalOpen && <AddVoidProductModal onClick={toggleVoidProductsModal} refresh={fetchVoidedProducts} />}
      </div>
    </div>
  );
};

export default VoidProducts;
