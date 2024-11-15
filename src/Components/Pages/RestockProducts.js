import React, { useState, useRef, useEffect } from 'react';
import '../Styles/RestockProducts.css';
import AddToRestockListModal from "../UIComponents/AddtoRestockListModal";
import { RestockProductRightIcon, DeleteIcon } from '../UIComponents/ActionIcons';
import ButtonComponent from '../UIComponents/ButtonComponent';
import { ToastSuccess, ToastError } from '../UIComponents/ToastComponent';


const RestockProducts = () => {
  const [isFilterDropdownOpen, isSetFilterDropdownOpen] = useState(false);
  const [isAddToRestockModalOpen, isSetAddToRestockModalOpen] = useState(false); // State to open restock modal
  const [products, setProducts] = useState([]); // State to store fetched products
  const [selectedProduct, setSelectedProduct] = useState(null); // State to track the selected product
  const [restockList, setRestockList] = useState([]); // State to track the list of items to restock
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [filters, setFilters] = useState({
    filterBy: '',
  }); // State for filters
  const filterDropdownRef = useRef(null);
  const apiUrl = process.env.REACT_APP_API_URL;

 
  useEffect(() => {
    fetchProductData()
  }, []);


  const fetchProductData = () => {
    fetch(`${apiUrl}/KampBJ-api/server/getProducts.php`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data); // Store the fetched product data
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }


  // Toggle Dropdowns
  const toggleFilterDropdown = () => {
    isSetFilterDropdownOpen(!isFilterDropdownOpen);
  };

  // Toggle AddToRestockModal and set the selected product
  const toggleAddToRestockModal = (product) => {
    setSelectedProduct(product);
    isSetAddToRestockModalOpen(!isAddToRestockModalOpen);
  };

  const addToRestockList = (quantity, unitPrice, supplier) => {
    // Ensure unitPrice is a number
    unitPrice = parseFloat(unitPrice); // Convert to float if it's not already
  
    setRestockList((prevRestockList) => {
      const existingRestockIndex = prevRestockList.findIndex(
        (restock) => restock.productId === selectedProduct.productId
      );
  
      if (existingRestockIndex !== -1) {
        // Update existing restock item quantity and unitPrice
        const updatedRestockList = [...prevRestockList];
        updatedRestockList[existingRestockIndex] = {
          ...updatedRestockList[existingRestockIndex],
          quantity: updatedRestockList[existingRestockIndex].quantity + quantity,
          unitPrice, // Update unitPrice
          supplierName: supplier, // Update supplierName
        };
        return updatedRestockList;
      } else {
        // Add new product to the restock list
        const restockItem = {
          ...selectedProduct,
          quantity,
          unitPrice, // Add unitPrice
          supplierName: supplier, // Add supplierName
        };
        return [...prevRestockList, restockItem];
      }
    });
  
    setSelectedProduct(null);
    isSetAddToRestockModalOpen(false); // Close the modal
  };
  


  // Remove an item from the restock list
  const removeRestockItem = (index) => {
    setRestockList((prevRestockList) => prevRestockList.filter((_, i) => i !== index));
  };

  // Filter products based on the search query and other filters
  const filteredProducts = products
    .filter((product) => 
      product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.model.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (filters.filterBy) {
        case 'name':
          return a.productName.localeCompare(b.productName);
        case 'brand':
          return a.brand.localeCompare(b.brand);
        case 'quantity-high-to-low':
          return b.quantity - a.quantity; // Sort by quantity (highest to lowest)
        case 'quantity-low-to-high':
          return a.quantity - b.quantity; // Sort by quantity (lowest to highest)
        default:
          return 0;
      }
    });

  // Handle the submission of the restock list
  const handleRestockSubmit = () => {
    if (restockList.length === 0) {
      ToastError('Restock List is Empty');
      return;
    }

    const restockData = {
      restockItems: restockList,
      userId: localStorage.getItem('userId')
    };

    fetch(`${apiUrl}/KampBJ-api/server/processRestock.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(restockData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          ToastSuccess('Restock processed successfully');
          setRestockList([]); // Clear the restock list after successful submission
          fetchProductData();
        } else {
          ToastError(`Error: ${data.message}`);
          // toast.error(`Error: ${data.message}`);
        }
      })
      .catch((error) => {
        console.error('Error during restock submission:', error);
        ToastError(`An error occurred during restock submission.`);
        // toast.error('An error occurred during restock submission.');
      });
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      filterBy: '',
    });
  };

  // Handle closing of dropdowns when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(e.target)) {
        isSetFilterDropdownOpen(false);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  return (
    <div className="restock-products">
      <div className="restock-products__header">
        <div className="restock-products__search-wrapper">
          <input
            type="text"
            placeholder="Search products..."
            className="restock-products__input-field"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update the search query as the user types
          />
        </div>
        <div className="restock-products__filter-wrapper" ref={filterDropdownRef}>
          <i className="restock-products__filter-icon fa-solid fa-filter" onClick={toggleFilterDropdown}></i>

          {isFilterDropdownOpen &&
            <div className="restock-products__filter-dropdown">
              <div className="restock-products__filter-dropdown-body">
                <div className="restock-products__filter-dropdown-field-wrapper">
                  <p className="restock-products__filter-label">Filter by</p>
                  <select
                    value={filters.filterBy}
                    onChange={(e) => setFilters({ ...filters, filterBy: e.target.value })}
                    className="restock-products__filter-field"
                  >
                    <option value="">Select</option>
                    <option value="name">Name (A - Z)</option>
                    <option value="brand">Brand (A - Z)</option>
                    <option value="quantity-high-to-low">Stocks (Highest - Lowest)</option>
                    <option value="quantity-low-to-high">Stocks (Lowest - Highest)</option>
                  </select>
                </div>
                <div className="restock-products__filter-dropdown-footer">
                  <p className="restock-products__filter-reset" onClick={resetFilters}>Reset Filters</p>
                </div>
              </div>
            </div>
          }
          
        </div>
      </div>

      <div className="restock-products__body">
        <div className="restock-products__content-wrapper">
          <div className="restock-products__inventory-wrapper">
            <div className="restock-products__inventory-table-wrapper">
              <table className="restock-products__table">
                <thead>
                  <tr>
                    <th className="restock-products__table-th">Name</th>
                    <th className="restock-products__table-th">Category</th>
                    <th className="restock-products__table-th">Brand</th>
                    <th className="restock-products__table-th">Model</th>
                    <th className="restock-products__table-th">Stocks</th>
                    <th className="restock-products__table-th"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr className="restock-products__table-tr" key={product.productId}>
                      <td className="restock-products__table-td">{product.productName}</td>
                      <td className="restock-products__table-td">{product.category}</td>
                      <td className="restock-products__table-td">{product.brand}</td>
                      <td className="restock-products__table-td">{product.model}</td>
                      <td className="restock-products__table-td">{product.quantity}</td>
                      <td className="restock-products__table-td">
                        <RestockProductRightIcon onClick={() => toggleAddToRestockModal(product)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {isAddToRestockModalOpen && (
              <AddToRestockListModal
                onClick={() => isSetAddToRestockModalOpen(false)}
                product={selectedProduct}
                addToRestockList={addToRestockList} // Use the restock list add function
              />
            )}
          </div>

          <div className="restock-products__restock-list-wrapper">
            <h5 className="restock-products__table-title">Restock list</h5>
            <div className="restock-products__restock-list-table-wrapper">
              <table className="restock-products__table">
                <thead>
                  <tr>
                    <th className="restock-products__table-th">Name</th>
                    <th className="restock-products__table-th">Quantity</th>
                    <th className="restock-products__table-th">Supplier</th>
                    <th className="restock-products__table-th">Product Price:</th>
                    <th className="restock-products__table-th"></th>
                  </tr>
                </thead>
                <tbody>
                  {restockList.map((item, index) => (
                    <tr className="restock-products__table-tr" key={index}>
                      <td className="restock-products__table-td">{item.productName}</td>
                      <td className="restock-products__table-td">{item.quantity}</td>
                      <td className="restock-products__table-td">{item.supplierName}</td>
                      <td className="restock-products__table-td">{item.unitPrice}</td>
                      <td className="restock-products__table-td">
                        <DeleteIcon onClick={() => removeRestockItem(index)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ButtonComponent buttonCustomClass='restock-products__submit-restock' label='Process Restock' onClick={handleRestockSubmit} /> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestockProducts;

