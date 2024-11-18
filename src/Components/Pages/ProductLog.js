import React, { useRef, useState, useEffect } from 'react';
import '../Styles/ProductLog.css';

const ProductLog = () => {
  const [isFilterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [logs, setLogs] = useState([]);
  const filterDropdownRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    filterBy: '',
    startDate: '',
    endDate: '',
  });
  const apiUrl = process.env.REACT_APP_API_URL;

  // Fetch logs from the backend
  useEffect(() => {
    fetch(`${apiUrl}/KampBJ-api/server/fetchProductLogs.php`)
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

  const resetFilters = () => {
    setFilters({
      filterBy: '',
      startDate: '',
      endDate: '',
    });
  };

  // Filter and sort sales data based on search term, date, and total
  const filteredLogData = logs.filter(log => {
    if (searchTerm) {
      // Check if the restock matches the search term (ID or username)
      const matchesSearch =
        log.target.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.username.toLowerCase().includes(searchTerm.toLowerCase());
      if (!matchesSearch) return false;
    }

    // Check if the restock falls within the date range (if specified)
    const logDate = new Date(log.dateExecuted);
    const startDate = filters.startDate ? new Date(filters.startDate) : null;
    const endDate = filters.endDate ? new Date(filters.endDate) : null;
    
    if (endDate) {
      endDate.setHours(23, 59, 59, 999);
    }

    const matchesDate =
      (!startDate || logDate >= startDate) &&
      (!endDate || logDate <= endDate);

    return matchesDate;
  });

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
    <div className="product-log">
      <div className="product-log__header">
        <div className="product-log__search-wrapper">
          <input
            type="text"
            placeholder="Search Target or Username"
            className="product-log__input-field"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="product-log__filter-wrapper" ref={filterDropdownRef}>
          <i
            className="product-log__filter-icon fa-solid fa-filter"
            onClick={toggleFilterDropdown}
          ></i>
          {isFilterDropdownOpen && (
            <div className="product-log__filter-dropdown">
              <div className="product-log__filter-dropdown-body">
                <div className="restock-records__filter-dropdown-field-wrapper">
                  <p className="restock-records__filter-label">Starting Date</p>
                  <input
                    type="date"
                    value={filters.startDate}
                    onChange={(e) =>
                      setFilters({ ...filters, startDate: e.target.value })
                    }
                    className="restock-records__filter-field"
                  />
                  <p className="restock-records__filter-label">To</p>
                  <input
                    type="date"
                    value={filters.endDate}
                    onChange={(e) =>
                      setFilters({ ...filters, endDate: e.target.value })
                    }
                    className="restock-records__filter-field"
                  />
                </div>
              </div>
              <div className="product-log__filter-dropdown-footer">
                <p className="product-log__filter-reset" onClick={resetFilters}>
                  Reset Filters
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="product-log__body">
        <div className="product-log__table-wrapper">
          <table className="product-log__table">
            <thead>
              <tr>
                <th className="product-log__table-th">Target</th>
                <th className="product-log__table-th">Action</th>
                <th className="product-log__table-th">Executed By</th>
                <th className="product-log__table-th">Date Executed</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogData.length > 0 ? (
                filteredLogData.map((log, index) => (
                  <tr key={index} className="product-log__table-tr">
                    <td className="product-log__table-td">{log.target}</td>
                    <td className="product-log__table-td">{log.action}</td>
                    <td className="product-log__table-td">{log.username}</td>
                    <td className="product-log__table-td">
                      {new Date(log.dateExecuted).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="product-log__table-td" colSpan="3">
                    No logs available
                  </td>
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
