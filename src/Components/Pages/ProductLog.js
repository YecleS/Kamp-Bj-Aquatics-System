import React, { useRef, useState, useEffect } from 'react';
import '../Styles/ProductLog.css';

const ProductLog = () => {
  const [isFilterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [logs, setLogs] = useState([]);
  const filterDropdownRef = useRef(null);

  // Fetch logs from the backend
  useEffect(() => {
    fetch('http://localhost/KampBJ-api/server/fetchProductLogs.php')
      .then(response => response.json())
      .then(data => {
        if (data.logs) {
          setLogs(data.logs);
        } else {
          console.error('No logs found:', data);
        }
      })
      .catch(error => {
        console.error('Error fetching logs:', error);
      });
  }, []);

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
    <div className='product-log'>
      <div className='product-log__header'>
        <div className='product-log__search-wrapper'>
          <input 
            type='text' 
            placeholder='Search Name, Brand, or Model' 
            className='product-log__input-field' 
          />
        </div>
        <div className='product-log__filter-wrapper' ref={filterDropdownRef}>
          <i className="product-log__filter-icon fa-solid fa-filter" onClick={toggleFilterDropdown}></i>
          {isFilterDropdownOpen && (
            <div className="product-log__filter-dropdown">
              <div className="product-log__filter-dropdown-body">
                <div className="product-log__filter-dropdown-field-wrapper">
                  <p className="product-log__filter-label">Sort by</p>
                  <select className="product-log__filter-field">
                    <option value="">Select</option>
                  </select>
                </div>
              </div>
              <div className="product-log__filter-dropdown-footer">
                <p className="product-log__filter-reset">Reset Filters</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className='product-log__body'>
        <div className='product-log__table-wrapper'>
          <table className='product-log__table'>
            <thead>
              <tr>
                <th className='product-log__table-th'>Target</th>
                <th className='product-log__table-th'>Action</th>
                <th className='product-log__table-th'>Executed By</th>
                <th className='product-log__table-th'>Date Executed</th>
              </tr>
            </thead>
            <tbody>
              {logs.length > 0 ? (
                logs.map((log, index) => (
                  <tr key={index} className='product-log__table-tr'>
                    <td className='product-log__table-td'>{log.target}</td>
                    <td className='product-log__table-td'>{log.action}</td>
                    <td className='product-log__table-td'>{log.username}</td>
                    <td className='product-log__table-td'>{new Date(log.dateExecuted).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className='product-log__table-td' colSpan="3">No logs available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductLog;
