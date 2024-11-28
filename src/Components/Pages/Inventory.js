import React, { useState, useRef, useEffect } from 'react';
import '../Styles/Inventory.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StatusNotifier from '../UIComponents/StatusNotifier';
import StatusLegend from '../UIComponents/StatusLegend';
import { ViewProductIcon } from '../UIComponents/ActionIcons';
import LoadingState from '../UIComponents/LoadingState';
const apiUrl = process.env.REACT_APP_API_URL;

const Inventory = () => {
  const [loading, setLoading] = useState(false);
  const [isFilterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const filterDropdownRef = useRef(null);

  // State for fetched inventory data
  const [inventoryData, setInventoryData] = useState([]);

  // State for filtered and sorted inventory data
  const [filteredInventory, setFilteredInventory] = useState([]);

  // State for search input
  const [searchTerm, setSearchTerm] = useState('');

  // State for filters
  const [filters, setFilters] = useState({
    sortBy: '', // Sorting criteria
  });

  // Fetch inventory data from PHP script when the component mounts
  useEffect(() => {
    fetch(`${apiUrl}/KampBJ-api/server/fetchInventoryProducts.php`) // Update with your actual URL
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          setInventoryData(data.data); // Update state with fetched data
          setFilteredInventory(data.data); // Initialize filtered inventory
        } else {
          toast.error('No products available');
        }
      })
      .catch(error => {
        console.error('Error fetching inventory:', error);
        toast.error('Error connecting to the server');
      });
  }, []);

  // Fetch total stocks for each product using the getProductTotalStocks API
  useEffect(() => {
    const fetchTotalStocks = async () => {
      setLoading(true); // Set loading to true at the start
      const updatedInventory = [...inventoryData];

      for (let item of updatedInventory) {
        try {
          const response = await fetch(`${apiUrl}/KampBJ-api/server/getProductTotalStocks.php?productId=${item.productId}`);
          const data = await response.json();
          if (data.length > 0) {
            const totalStocks = data.reduce((sum, batch) => parseInt(sum) + parseInt(batch.totalStocks), 0);
            item.totalStocks = totalStocks; // Add totalStocks to inventory item
          } else {
            item.totalStocks = 0; // If no data returned, set totalStocks to 0
          }
        } catch (error) {
          console.error('Error fetching total stocks:', error);
          toast.error('Failed to fetch total stocks.');
        }
      }

      setFilteredInventory(updatedInventory);
      setLoading(false);
    };

    if (inventoryData.length > 0) {
      fetchTotalStocks();
    }
  }, [inventoryData, apiUrl]);

  useEffect(() => {
    let filtered = inventoryData.filter(item =>
      item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.model.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort filtered inventory based on selected option
    switch (filters.sortBy) {
      case 'priceAsc':
        filtered = filtered.sort((a, b) => a.sellingPrice - b.sellingPrice);
        break;
      case 'priceDesc':
        filtered = filtered.sort((a, b) => b.sellingPrice - a.sellingPrice);
        break;
      case 'stocksAsc':
        filtered = filtered.sort((a, b) => a.totalStocks - b.totalStocks); // Sort by totalStocks
        break;
      case 'stocksDesc':
        filtered = filtered.sort((a, b) => b.totalStocks - a.totalStocks); // Sort by totalStocks
        break;
      case 'category':
        filtered = filtered.sort((a, b) => a.category.localeCompare(b.category));
        break;
      case 'brand':
        filtered = filtered.sort((a, b) => a.brand.localeCompare(b.brand));
        break;
      default:
        break;
    }

    setFilteredInventory(filtered);
  }, [searchTerm, filters.sortBy, inventoryData]);

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

    return () => {
      document.removeEventListener('click', handler);
    };
  }, []);

  // Reset filters
  const resetFilters = () => {
    setFilters({
      sortBy: '', // Reset sorting
    });
    setSearchTerm(''); // Optionally reset search term
  };

  return (
    <div className='inventory'>
      <div className='inventory__header'>
        <div className='inventory__controls-wrapper'>
          <div className='inventory__search-wrapper'>
            <input
              type='text'
              placeholder='Search product ...'
              className='inventory__input-field'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className='inventory__filter-wrapper' title='Filter' ref={filterDropdownRef}>
            <i className="inventory__filter-icon fa-solid fa-filter" onClick={toggleFilterDropdown}></i>
            {isFilterDropdownOpen && (
              <div className="inventory__filter-dropdown">
                <div className="inventory__filter-dropdown-body">
                  <div className="inventory__filter-dropdown-field-wrapper">
                    <p className="inventory__filter-label">Sort by</p>
                    <select
                      value={filters.sortBy}
                      onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                      className="inventory__filter-field"
                    >
                      <option value="">Select</option>
                      <option value="category">Category</option>
                      <option value="brand">Brand</option>
                      {/* <option value="priceAsc">Price (Lowest - Highest)</option>
                      <option value="priceDesc">Price (Highest - Lowest)</option> */}
                      <option value="stocksAsc">Stocks (Lowest - Highest)</option>
                      <option value="stocksDesc">Stocks (Highest - Lowest)</option>
                    </select>
                  </div>
                </div>
                <div className="inventory__filter-dropdown-footer">
                  <p className="inventory__filter-reset" onClick={resetFilters}>Reset Filters</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <StatusLegend customClass='inventory__status-legend' />
      </div>

      <div className='inventory__body'>
        <div className='inventory__table-wrapper'>
          <table className='inventory__table'>
            <thead>
              <tr>
                <th className='inventory__table-th'>Name</th>
                <th className='inventory__table-th'>Category</th>
                <th className='inventory__table-th'>Brand</th>
                <th className='inventory__table-th'>Model</th>
                <th className='inventory__table-th'>Stocks</th>
                <th className='inventory__table-th'>Status</th>
                <th className='inventory__table-th'>Actions</th>
              </tr>
            </thead>
            <tbody>
            {filteredInventory.length > 0 ? (
              filteredInventory.map((inventoryItem) => (
                <tr className='inventory__table-tr' key={inventoryItem.productId}>
                  <td className='inventory__table-td'>{inventoryItem.productName}</td>
                  <td className='inventory__table-td'>{inventoryItem.category}</td>
                  <td className='inventory__table-td'>{inventoryItem.brand}</td>
                  <td className='inventory__table-td'>{inventoryItem.model}</td>
                  <td className='inventory__table-td'>{inventoryItem.totalStocks || 0}</td> 
                  <td className='inventory__table-td'>
                    <StatusNotifier stocks={inventoryItem.totalStocks} lowStockIndicator={inventoryItem.lowStockIndicator} />
                  </td>
                  <td className='inventory__table-td'>
                    <ViewProductIcon products={inventoryItem} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="inventory__table-td">No products available</td>
              </tr>
            )}
          </tbody>

          </table>
        </div>
      </div>
      
        {loading && <LoadingState />}
    </div>
  );
};

export default Inventory;
