import React, { useState, useRef, useEffect } from 'react';
import AddProductModal from '../UIComponents/AddProductModal';
import EditProductModal from '../UIComponents/EditProductModal';
import '../Styles/AddProducts.css';
import UpdateIcon from '../UIComponents/UpdateIcon';
import DeleteIcon from '../UIComponents/DeleteIcon';
import { ViewProductIcon } from '../UIComponents/ActionIcons';

const AddProducts = () => {
  const [isFilterDropdownOpen, isSetFilterDropdownOpen] = useState(false);
  const [isAddModalOpen, isSetAddModalOpen] = useState(false);
  const [isEditModalOpen, isSetEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // State for selected product
  const [productsData, setProductsData] = useState([]); // State to hold products data
  const filterDropdownRef = useRef(null);

  // Initial Values For Filters Store In useState
  const [filters, setFilters] = useState({
    filterBy: '',
  });

  // Fetch products from the server
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost/KampBJ-api/server/getProducts.php');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProductsData(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Toggle Dropdowns
  const toggleFilterDropdown = () => isSetFilterDropdownOpen(!isFilterDropdownOpen);
  const toggleAddModal = () => isSetAddModalOpen(!isAddModalOpen);
  const toggleEditModal = (product) => {
    setSelectedProduct(product); // Set the selected product before opening the modal
    isSetEditModalOpen(!isEditModalOpen);
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

  // Reset Filters
  const resetFilters = () => {
    setFilters({
      filterBy: '',
    });
  };

  return (
    <div className='add-products'>
      <div className='add-products__header'>
        <div className='add-products__left-controls-wrapper'>
          <div className='add-products__search-wrapper'>
            <input type='text' placeholder='Search' className='add-products__input-field' />
          </div>
          <div className='add-products__filter-wrapper' ref={filterDropdownRef}>
            <i className="add-products__filter-icon fa-solid fa-filter" onClick={toggleFilterDropdown}></i>
            {isFilterDropdownOpen &&
              <div className='add-products__filter-dropdown'>
                <div className='add-products__filter-dropdown-body'>
                  <div className='add-products__filter-dropdown-field-wrapper'>
                    <p className='add-products__filter-label'>Filter by</p>
                    <select value={filters.filterBy}
                      onChange={(e) => setFilters({ ...filters, filterBy: e.target.value })}
                      className='add-products__filter-field'
                    >
                      <option></option>
                      <option value='name'>Name</option>
                      <option value='price'>Price</option>
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
                <th className='add-products__table-th'></th>
              </tr>
            </thead>
            <tbody>
              {productsData.map((product) => (
                <tr className='add-products__table-tr' key={product.productId}>
                  <td className='add-products__table-td'>{product.productName}</td>
                  <td className='add-products__table-td'>{product.category}</td>
                  <td className='add-products__table-td'>{product.brand}</td>
                  <td className='add-products__table-td'>{product.model}</td>
                  <td className='add-products__table-td'>{product.markup} %</td>
                  <td className='add-products__table-td'>
                    <UpdateIcon onClick={() => toggleEditModal(product)} />
                    <ViewProductIcon products={product} />
                    <DeleteIcon onClick={() => { }} />
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
    </div>
  );
};

export default AddProducts;
