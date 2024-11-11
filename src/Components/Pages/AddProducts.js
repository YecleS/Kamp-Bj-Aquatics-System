import React, { useState, useRef, useEffect } from 'react';
import AddProductModal from '../UIComponents/AddProductModal';
import EditProductModal from '../UIComponents/EditProductModal';
import '../Styles/AddProducts.css';
import UpdateIcon from '../UIComponents/UpdateIcon';
import DeleteIcon from '../UIComponents/DeleteIcon';
import { ViewProductIcon } from '../UIComponents/ActionIcons';
import ConfirmationMessageModal from '../UIComponents/ConfirmationMessageModal';
import { ToastSuccess } from '../UIComponents/ToastComponent';

const AddProducts = () => {
  const [isFilterDropdownOpen, isSetFilterDropdownOpen] = useState(false);
  const [isAddModalOpen, isSetAddModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isEditModalOpen, isSetEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // State for selected product
  const [productsData, setProductsData] = useState([]); // State to hold products data
  const [filteredData, setFilteredData] = useState([]); // State to hold filtered products data
  const filterDropdownRef = useRef(null);
  const [productId, setProductId] = useState();
  const [status, setStatus] = useState();
  const [name, setName] = useState();

  // Initial Values For Filters Store In useState
  const [filters, setFilters] = useState({
    filterBy: '',
    searchQuery: '',
    sortBy: '',
  });

  // Fetch products from the server
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost/KampBJ-api/server/fetchProducts.php');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProductsData(data);
      setFilteredData(data); // Initialize filtered data with fetched products
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products based on search query, filters, and sort
  useEffect(() => {
    let filteredProducts = [...productsData];

    // Apply search query across product fields
    if (filters.searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.productName.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }

    // Apply filter
    if (filters.filterBy) {
      filteredProducts = filteredProducts.filter((product) => {
        switch (filters.filterBy) {
          case 'status_active':
            return product.status.toLowerCase() === 'active';
          case 'status_inactive':
            return product.status.toLowerCase() === 'inactive';
          default:
            return true;
        }
      });
    }

    // Sorting logic
    switch (filters.sortBy) {
      case 'markup_low':
        filteredProducts = filteredProducts.sort((a, b) => a.markup - b.markup);
        break;
      case 'markup_high':
        filteredProducts = filteredProducts.sort((a, b) => b.markup - a.markup);
        break;
      case 'category':
        filteredProducts = filteredProducts.sort((a, b) => a.category.localeCompare(b.category));
        break;
      default:
        break;
    }

    setFilteredData(filteredProducts);
  }, [filters, productsData]);

  // Toggle Dropdowns
  const toggleFilterDropdown = () => isSetFilterDropdownOpen(!isFilterDropdownOpen);
  const toggleAddModal = () => isSetAddModalOpen(!isAddModalOpen);
  const toggleEditModal = (product) => {
    setSelectedProduct(product); // Set the selected product before opening the modal
    isSetEditModalOpen(!isEditModalOpen);
  };

  const toggleConfirmationModal = (productId, status, name) => {
    setProductId(productId);
    setStatus(status);
    setName(name);
    setIsConfirmationModalOpen(!isConfirmationModalOpen);
  };

  // Handle Closing of Dropdowns When Clicked Outside of Its Div
  useEffect(() => {
    const handler = (e) => {
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(e.target)) {
        isSetFilterDropdownOpen(false);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  const proceed = () => {
    // Make a POST request to setProductInactive.php
    fetch('http://localhost/KampBJ-api/server/setProductInactive.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({productId:productId, status:status, name:name, userId: localStorage.getItem('userId')})
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          ToastSuccess('Product Status Successfully Changed!');
          fetchProducts();
          setIsConfirmationModalOpen(false);
        } else {
          alert(data.message);
        }
      })
  };

  // Reset Filters
  const resetFilters = () => {
    setFilters({
      filterBy: '',
      searchQuery: '',
      sortBy: ''
    });
  };

  return (
    <div className='add-products'>
      <div className='add-products__header'>
        <div className='add-products__left-controls-wrapper'>
          <div className='add-products__search-wrapper'>
            <input
              type='text'
              placeholder='Search products, brand, or model'
              className='add-products__input-field'
              value={filters.searchQuery}
              onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
            />
          </div>
          <div className='add-products__filter-wrapper' ref={filterDropdownRef}>
            <i className="add-products__filter-icon fa-solid fa-filter" onClick={toggleFilterDropdown}></i>
            {isFilterDropdownOpen &&
              <div className='add-products__filter-dropdown'>
                <div className='add-products__filter-dropdown-body'>
                  <div className='add-products__filter-dropdown-field-wrapper'>
                    <p className='add-products__filter-label'>Filter by</p>
                    <select
                      value={filters.filterBy}
                      onChange={(e) => setFilters({ ...filters, filterBy: e.target.value })}
                      className='add-products__filter-field'
                    >
                      <option value=''>None</option>
                      <option value='status_active'>Status (active)</option>
                      <option value='status_inactive'>Status (inactive)</option>
                    </select>
                  </div>
                  <div className='add-products__filter-dropdown-field-wrapper'>
                    <p className='add-products__filter-label'>Sort by</p>
                    <select
                      value={filters.sortBy}
                      onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                      className='add-products__filter-field'
                    >
                      <option value=''>None</option>
                      <option value='markup_low'>Markup (lowest - highest)</option>
                      <option value='markup_high'>Markup (highest - lowest)</option>
                      <option value='category'>Category</option>
                    </select>
                  </div>
                </div>
                <div className='add-products__filter-dropdown-footer'>
                  <p className='add-products__filter-reset' onClick={resetFilters}>Reset Filters</p>
                </div>
              </div>
            }
          </div>
        </div>
        <div className='add-products__right-controls-wrapper'>
          <button className='add-products__insert' onClick={toggleAddModal}>
            <i className="add-products__insert-icon fa-solid fa-plus"></i>
          </button>
          {isAddModalOpen && <AddProductModal onClick={toggleAddModal} />}
        </div>
      </div>

      <div className='add-products__body'>
        <div className='add-products__table-wrapper'>
          <table className='add-products__table'>
            <thead>
              <tr>
                <th className='add-products__table-th'>Name</th>
                <th className='add-products__table-th'>Category</th>
                <th className='add-products__table-th'>Brand</th>
                <th className='add-products__table-th'>Model</th>
                <th className='add-products__table-th'>Markup percent</th>
                <th className='add-products__table-th'>Status</th>
                <th className='add-products__table-th'></th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((product) => (
                <tr className='add-products__table-tr' key={product.productId}>
                  <td className='add-products__table-td'>{product.productName}</td>
                  <td className='add-products__table-td'>{product.category}</td>
                  <td className='add-products__table-td'>{product.brand}</td>
                  <td className='add-products__table-td'>{product.model}</td>
                  <td className='add-products__table-td'>{product.markup} %</td>
                  <td className='add-products__table-td'>{product.status}</td>
                  <td className='add-products__table-td'>
                    <UpdateIcon onClick={() => toggleEditModal(product)} />
                    <ViewProductIcon products={product} />
                    {/* <i className="fa-brands fa-creative-commons-sa" onClick={() => { toggleConfirmationModal(product.productId, product.status, product.productName) }}></i> */}
                    <DeleteIcon onClick={() => { toggleConfirmationModal(product.productId, product.status, product.productName) }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isAddModalOpen && <AddProductModal onClick={toggleAddModal} refresh={fetchProducts} />}
      {isEditModalOpen && (
        <EditProductModal 
          onClick={toggleEditModal} 
          productData={selectedProduct} // Pass the selected product to the modal
          refresh={fetchProducts}
        />        
      )}
      {isConfirmationModalOpen && <ConfirmationMessageModal message='Are you sure you want to change the status of this product?' onClickProceed={proceed} onClickCancel={toggleConfirmationModal} />}
    </div>
  );
};

export default AddProducts;
