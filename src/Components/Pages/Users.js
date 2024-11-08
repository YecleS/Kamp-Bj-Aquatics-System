import React, { useRef, useState, useEffect } from 'react';
import '../Styles/Users.css';
import ConfirmationMessageModal from '../UIComponents/ConfirmationMessageModal';
import ButtonComponent from '../UIComponents/ButtonComponent';

const Users = () => {
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [userData, setUserData] = useState([]); // State to store fetched user data
  const filterDropdownRef = useRef(null);

  // Initial Values For Filters
  const [filters, setFilters] = useState({
    filterBy: '',
  });

  // Fetch user data from the server
  useEffect(() => {
    const fetchUsers = () => {
      fetch('http://localhost/KampBJ-api/server/fetchUserRecords.php')
        .then(response => response.json())
        .then(data => {
          if (data.users) {
            setUserData(data.users);
          } else {
            console.error('Failed to fetch user data');
          }
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    };

    fetchUsers();
  }, []);

  // Toggle Dropdowns
  const toggleFilterDropdown = () => {
    setIsFilterDropdownOpen(!isFilterDropdownOpen);
  };

  const toggleConfirmationModal = () => {
    setIsConfirmationModalOpen(!isConfirmationModalOpen);
  };

  // Handle Closing of Dropdowns When Clicked Outside
  useEffect(() => {
    const handler = (e) => {
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(e.target)) {
        setIsFilterDropdownOpen(false);
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

  const proceed = () => {
    console.log('REVOKE');
  };

  return (
    <div className='users'>
      <div className='users__header'>
        <div className='users__left-controls-wrapper'>
          <div className='users__search-wrapper'>
            <input type='text' placeholder='Search' className='users__input-field' />
          </div>
          <div className='users__filter-wrapper' ref={filterDropdownRef}>
            <i className="users__filter-icon fa-solid fa-filter" onClick={toggleFilterDropdown}></i>
            {isFilterDropdownOpen &&
              <div className='users__filter-dropdown'>
                <div className='users__filter-dropdown-body'>
                  <div className='users__filter-dropdown-field-wrapper'>
                    <p className='users__filter-label'>Filter by</p>
                    <select
                      value={filters.filterBy}
                      onChange={(e) => setFilters({ ...filters, filterBy: e.target.value })}
                      className='users__filter-field'
                    >
                      <option></option>
                      <option value='name'>Name</option>
                      <option value='date'>Date</option>
                      <option value='price'>Price</option>
                    </select>
                  </div>
                </div>
                <div className='users__filter-dropdown-footer'>
                  <p className='users__filter-reset' onClick={resetFilters}>Reset Filters</p>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
      <div className='users__body'>
        <div className='users__table-wrapper'>
          <table className='users__table'>
            <thead>
              <tr>
                <th className='users__table-th'>Username</th>
                <th className='users__table-th'>Role</th>
                <th className='users__table-th'>Salary</th>
                <th className='users__table-th'>Email</th>
                <th className='users__table-th'>Contact Number</th>
                <th className='users__table-th'>Address</th>
                <th className='users__table-th'>Status</th>
                <th className='users__table-th'></th>
              </tr>
            </thead>
            <tbody>
              {userData.map(user => (
                <tr className='users__table-tr' key={user.userId}>
                  <td className='users__table-td'>{user.username}</td>
                  <td className='users__table-td'>{user.roleTitle}</td>
                  <td className='users__table-td'>{user.salary}</td>
                  <td className='users__table-td'>{user.email}</td>
                  <td className='users__table-td'>{user.contactNum}</td>
                  <td className='users__table-td'>{user.address}</td>
                  <td className='users__table-td'>{user.status}</td>
                  <td className='users__table-td'>
                  <ButtonComponent buttonCustomClass='users__btn-approve' label='revoke' onClick={toggleConfirmationModal} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isConfirmationModalOpen && <ConfirmationMessageModal message='Are You Sure, You Want To Revoke This User ?' onClickProceed={proceed} onClickCancel={toggleConfirmationModal} />}
    </div>
  );
};

export default Users;
