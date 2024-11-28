import React, { useState, useRef, useEffect } from 'react';
import '../Styles/UserMangementLog.css';

const UserManagementLog = () => {
    const [isFilterDropdownOpen, setFilterDropdownOpen] = useState(false);
    const [logs, setLogs] = useState([]); // State for logs
    const [filteredLogs, setFilteredLogs] = useState([]); // State for filtered logs
    const [isLoading, setIsLoading] = useState(true); // State for loading
    const [filters, setFilters] = useState({
        searchQuery: '',
        startDate: '',
        endDate: '',
    }); // Filters state
    const filterDropdownRef = useRef(null);
    const apiUrl = process.env.REACT_APP_API_URL;

    // Fetch logs from the server
    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await fetch(`${apiUrl}/KampBJ-api/server/fetchUserLogs.php`);
                if (!response.ok) {
                    throw new Error('Failed to fetch logs');
                }
                const data = await response.json();
                setLogs(data.logs);
                setFilteredLogs(data.logs); // Initially, show all logs
            } catch (error) {
                console.error('Error fetching logs:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLogs();
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

        return () => {
            document.removeEventListener('click', handler);
        };
    }, []);

    // Handle changes in the filter inputs
    const handleSearchChange = (e) => {
        setFilters({ ...filters, searchQuery: e.target.value });
    };

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    // Apply filters
  // Apply date range filter
  useEffect(() => {
    let filtered = [...logs];

    // Apply search query filter
    if (filters.searchQuery) {
        filtered = filtered.filter(log =>
            log.target.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
            log.action.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
            log.username.toLowerCase().includes(filters.searchQuery.toLowerCase())
        );
    }

    // Get the start and end date from the filter state
    const startDate = filters.startDate ? new Date(filters.startDate) : null;
    const endDate = filters.endDate ? new Date(filters.endDate) : null;

    
    if (startDate) {
        startDate.setHours(0, 0, 0, 999);
    }

    if (endDate) {
        endDate.setHours(23, 59, 59, 999);
    }

    // Filter logs based on the date range
    filtered = filtered.filter(log => {
        const logDate = new Date(log.dateExecuted);

        // Check if the log date falls within the date range (if specified)
        const matchesDate =
            (!startDate || logDate >= startDate) && 
            (!endDate || logDate <= endDate);

        return matchesDate;
    });

    setFilteredLogs(filtered);
}, [filters, logs]);



    // Reset Filters
    const resetFilters = () => {
        setFilters({
            searchQuery: '',
            startDate: '',
            endDate: '',
        });
        setFilteredLogs(logs); // Reset to original logs
    };

    return (
        <div className="user-management-log">
            <div className='user-management-log__header'>
                <div className='user-management-log__search-wrapper'>
                    <input
                        type='text'
                        placeholder='Search Target, Action, or Username'
                        className='user-management-log__input-field'
                        value={filters.searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
                <div className='user-management-log__filter-wrapper' title='Filter' ref={filterDropdownRef}>
                    <i className="user-management-log__filter-icon fa-solid fa-filter" onClick={toggleFilterDropdown}></i>
                    {isFilterDropdownOpen && (
                        <div className="user-management-log__filter-dropdown">
                            <div className="user-management-log__filter-dropdown-body">
                                <div className="user-management-log__filter-dropdown-field-wrapper">
                                    <p className="user-management-log__filter-label">Sort by</p>
                                    <div className='sales__filter-dropdown-field-wrapper'>
                                        <p className='sales__filter-label'>Starting Date</p>
                                        <input
                                            type='date'
                                            name="startDate"
                                            className='sales__filter-field'
                                            value={filters.startDate}
                                            onChange={handleDateChange}
                                        />
                                        <p className='sales__filter-label'>To</p>
                                        <input
                                            type='date'
                                            name="endDate"
                                            className='sales__filter-field'
                                            value={filters.endDate}
                                            onChange={handleDateChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="user-management-log__filter-dropdown-footer">
                                <p className="user-management-log__filter-reset" onClick={resetFilters}>Reset Filters</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className='user-management-log__body'>
                <div className='user-management-log__table-wrapper'>
                    {isLoading ? (
                        <p>Loading logs...</p>
                    ) : (
                        <table className='user-management-log__table'>
                            <thead>
                                <tr>
                                    <th className='user-management-log__table-th'>Target</th>
                                    <th className='user-management-log__table-th'>Action</th>
                                    <th className='user-management-log__table-th'>Executed By</th>
                                    <th className='user-management-log__table-th'>Date Executed</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredLogs.length > 0 ? (
                                    filteredLogs.map((log, index) => (
                                        <tr key={index} className='user-management-log__table-tr'>
                                            <td className='user-management-log__table-td'>{log.target}</td>
                                            <td className='user-management-log__table-td'>{log.action}</td>
                                            <td className='user-management-log__table-td'>{log.username}</td>
                                            <td className='user-management-log__table-td'>{new Date(log.dateExecuted).toLocaleString()}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className='user-management-log__table-td'>No logs available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserManagementLog;
