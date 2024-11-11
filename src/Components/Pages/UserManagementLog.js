import React, { useState, useRef, useEffect } from 'react';
import '../Styles/UserMangementLog.css'

const UserManagementLog = () => {
    const [isFilterDropdownOpen, setFilterDropdownOpen] = useState(false);
    const filterDropdownRef = useRef(null);

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

  return (
        <div className="user-management-log">
            <div className='user-management-log__header'>
                <div className='user-management-log__search-wrapper'>
                <input 
                    type='text' 
                    placeholder='Search Name, Brand, or Model' 
                    className='user-management-log__input-field' 
                />
                </div>
                <div className='user-management-log__filter-wrapper' ref={filterDropdownRef}>
                <i className="user-management-log__filter-icon fa-solid fa-filter" onClick={toggleFilterDropdown}></i>
                {isFilterDropdownOpen && (
                    <div className="user-management-log__filter-dropdown">
                        <div className="user-management-log__filter-dropdown-body">
                            <div className="user-management-log__filter-dropdown-field-wrapper">
                                <p className="user-management-log__filter-label">Sort by</p>
                                    <div className='sales__filter-dropdown-field-wrapper'>
                                        <p className='sales__filter-label'>Starting Date</p>
                                        <input type='date' className='sales__filter-field' />
                                        <p className='sales__filter-label'>To</p>
                                        <input type='date' className='sales__filter-field' />
                                    </div>
                            </div>
                        </div>
                        <div className="user-management-log__filter-dropdown-footer">
                            <p className="user-management-log__filter-reset">Reset Filters</p>
                        </div>
                    </div>
                )}
                </div>
            </div>

            <div className='user-management-log__body'>
                <div className='user-management-log__table-wrapper'>
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
                        <tr className='user-management-log__table-tr'>
                            <td className='user-management-log__table-td'>asdasdas</td>
                            <td className='user-management-log__table-td'>asdasdas</td>
                            <td className='user-management-log__table-td'>asdasdsa</td>
                            <td className='user-management-log__table-td'>asdasdaas</td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </div>
        </div>
  )
}

export default UserManagementLog
