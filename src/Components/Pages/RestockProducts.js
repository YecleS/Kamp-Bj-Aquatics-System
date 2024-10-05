import React, { useState, useRef, useEffect } from 'react';
import '../Styles/RestockProducts.css';
import AddToRestockListModal from "../UIComponents/AddtoRestockListModal";
import { ToastContainer, toast } from 'react-toastify';


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

  // Fetch product data from backend
  useEffect(() => {
    fetch('http://localhost/KampBJ-api/server/populateRestockingProducts.php')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data); // Store the fetched product data
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  // Toggle Dropdowns
  const toggleFilterDropdown = () => {
    isSetFilterDropdownOpen(!isFilterDropdownOpen);
  };

  // Toggle AddToRestockModal and set the selected product
  const toggleAddToRestockModal = (product) => {
    setSelectedProduct(product);
    isSetAddToRestockModalOpen(!isAddToRestockModalOpen);
  };

  // Add to restock list
  const addToRestockList = (quantity, unitPrice) => {
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
        };
        return updatedRestockList;
      } else {
        // Add new product to the restock list
        const restockItem = {
          ...selectedProduct,
          quantity,
           unitPrice, // Add unitPrice
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
      toast.error('No items in the restock list.');
      return;
    }

    const restockData = {
      restockItems: restockList,
    };

    fetch('http://localhost/KampBJ-api/server/processRestock.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(restockData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          toast.success('Restock processed successfully');
          setRestockList([]); // Clear the restock list after successful submission
        } else {
          toast.error(`Error: ${data.message}`);
        }
      })
      .catch((error) => {
        console.error('Error during restock submission:', error);
        toast.error('An error occurred during restock submission.');
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
    <div className="pos">
      <div className="pos__header">
        <div className="pos__search-wrapper">
          <input
            type="text"
            placeholder="Search Name, Brand, or Model"
            className="pos__input-field"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update the search query as the user types
          />
        </div>
        <div className="pos__filter-wrapper" ref={filterDropdownRef}>
          <i className="pos__filter-icon fa-solid fa-filter" onClick={toggleFilterDropdown}></i>
          {isFilterDropdownOpen &&
            <div className="pos__filter-dropdown">
              <div className="pos__filter-dropdown-body">
                <div className="pos__filter-dropdown-field-wrapper">
                  <p className="pos__filter-label">Filter by</p>
                  <select
                    value={filters.filterBy}
                    onChange={(e) => setFilters({ ...filters, filterBy: e.target.value })}
                    className="pos__filter-field"
                  >
                    <option value="">Select</option>
                    <option value="name">Name (A - Z)</option>
                    <option value="brand">Brand (A - Z)</option>
                    <option value="quantity-high-to-low">Stocks (Highest - Lowest)</option>
                    <option value="quantity-low-to-high">Stocks (Lowest - Highest)</option>
                  </select>
                </div>
                <div className="pos__filter-dropdown-footer">
                  <p className="pos__filter-reset" onClick={resetFilters}>Reset Filters</p>
                </div>
              </div>
            </div>
          }
        </div>
      </div>

      <div className="pos__body">
        <div className="pos__content-wrapper">
          <div className="pos__inventory-wrapper">
            <h5 className="pos__table-title">Product Stocks:</h5>
            <div className="pos__inventory-table-wrapper">
              <table className="pos__table">
                <thead>
                  <tr>
                    <th className="pos__table-th">Name</th>
                    <th className="pos__table-th">Brand</th>
                    <th className="pos__table-th">Model</th>
                    <th className="pos__table-th">Stocks At Hand</th>
                    <th className="pos__table-th"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr className="pos__table-tr" key={product.productId}>
                      <td className="pos__table-td">{product.productName}</td>
                      <td className="pos__table-td">{product.brand}</td>
                      <td className="pos__table-td">{product.model}</td>
                      <td className="pos__table-td">{product.quantity}</td>
                      <td className="pos__table-td">
                        <i
                          className="pos__icon-td fa-solid fa-arrow-right"
                          onClick={() => toggleAddToRestockModal(product)}
                        ></i>
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

          <div className="pos__orders-wrapper">
            <h5 className="pos__table-title">Restock list</h5>
            <div className="pos__orders-table-wrapper">
              <table className="pos__table">
                <thead>
                  <tr>
                    <th className="pos__table-th">Name</th>
                    <th className="pos__table-th">Quantity</th>
                    <th className="pos__table-th"></th>
                  </tr>
                </thead>
                <tbody>
                  {restockList.map((item, index) => (
                    <tr className="pos__table-tr" key={index}>
                      <td className="pos__table-td">{item.productName}</td>
                      <td className="pos__table-td">{item.quantity}</td>
                      <td className="pos__table-td">
                        <i
                          className="pos__icon-td fa-solid fa-trash"
                          onClick={() => removeRestockItem(index)}
                        ></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="pos__checkout" onClick={handleRestockSubmit}>
              Submit Restock
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RestockProducts;

