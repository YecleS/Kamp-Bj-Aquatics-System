import React, { useRef, useState, useEffect } from 'react';
import '../Styles/Users.css';
import ConfirmationMessageModal from '../UIComponents/ConfirmationMessageModal';
import ButtonComponent from '../UIComponents/ButtonComponent';
import { ToastSuccess, ToastError } from '../UIComponents/ToastComponent';
import EditUserModal from '../UIComponents/EditUserModal';

const Users = () => {
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userData, setUserData] = useState([]); // State to store fetched user data
  const [filteredData, setFilteredData] = useState([]); // State to store filtered user data
  const [selectedUser, setSelectedUser] = useState(null); // Updated to store a single user object
  const filterDropdownRef = useRef(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  // Initial Values For Filters
  const [filters, setFilters] = useState({
    filterBy: '',
    searchQuery: '',
  });

  // Fetch user data from the server
  useEffect(() => {
    const fetchUsers = () => {
      fetch(`${apiUrl}/KampBJ-api/server/fetchUserRecords.php`)
        .then(response => response.json())
        .then(data => {
          if (data.users) {
            setUserData(data.users);
            setFilteredData(data.users); // Set filteredData initially to all users
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

  const toggleConfirmationModal = (user) => {
    setSelectedUser(user); // Store the user data for confirmation
    setIsConfirmationModalOpen(!isConfirmationModalOpen);
  };

  const toggleEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen)
  }

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

  // Filter users based on search query and filter criteria
  const filterUsers = () => {
    let filtered = [...userData];

    // Apply search filter if present
    if (filters.searchQuery) {
      filtered = filtered.filter(user => 
        user.username.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        user.roleTitle.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }

    // Apply filter by status or salary
    if (filters.filterBy) {
      if (filters.filterBy === 'salary_high') {
        filtered = filtered.sort((a, b) => b.salary - a.salary);
      } else if (filters.filterBy === 'salary_low') {
        filtered = filtered.sort((a, b) => a.salary - b.salary);
      } else if (filters.filterBy === 'active') {
        filtered = filtered.filter(user => user.status === 'active');
      } else if (filters.filterBy === 'inactive') {
        filtered = filtered.filter(user => user.status === 'inactive');
      }
    }

    setFilteredData(filtered); // Update the filtered user data
  };

  // Reset Filters
  const resetFilters = () => {
    setFilters({
      filterBy: '',
      searchQuery: '',
    });
    setFilteredData(userData); // Reset filtered data to the original user data
  };

  const proceed = () => {
    if (selectedUser) {
      const { userId, username, status } = selectedUser;

      // Prepare data for the POST request
      const data = {
        executorId: localStorage.getItem('userId'), // Example: Replace with the actual executor ID (you may need to fetch it from context or user session)
        userId: userId,
        username: username,
        status: status,
      };

      fetch(`${apiUrl}/KampBJ-api/server/revokeUser.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(result => {
          if (result.status === 'success') {
            // Update the user data after the user status has been revoked
            setUserData(prevData =>
              prevData.map(user =>
                user.userId === userId
                  ? { ...user, status: status === 'active' ? 'inactive' : 'active' }
                  : user
              )
            );
            ToastSuccess('User status updated successfully!');
            setFilteredData(prevData =>
              prevData.map(user =>
                user.userId === userId
                  ? { ...user, status: status === 'active' ? 'inactive' : 'active' }
                  : user
              )
            );
          } else {
            ToastError('Failed to update user status');
          }
        })
        .catch(error => {
          console.error('Error revoking user:', error);
          ToastError('Error revoking user');
        })
        .finally(() => {
          // Close the confirmation modal
          setIsConfirmationModalOpen(false);
        });
    }
  };

  // Handle changes to the search input
  const handleSearchChange = (e) => {
    setFilters({ ...filters, searchQuery: e.target.value });
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    setFilters({ ...filters, filterBy: e.target.value });
  };

  // Run filtering when filters or search query change
  useEffect(() => {
    filterUsers();
  }, [filters]);

  return (
    <div className='users'>
      <div className='users__header'>
        <div className='users__left-controls-wrapper'>
          <div className='users__search-wrapper'>
            <input 
              type='text' 
              placeholder='Search Username or Role' 
              className='users__input-field'
              value={filters.searchQuery} 
              onChange={handleSearchChange} 
            />
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
                      onChange={handleFilterChange}
                      className='users__filter-field'
                    >
                      <option value="">Select</option>
                      <option value='salary_high'>Salary (highest)</option>
                      <option value='salary_low'>Salary (lowest)</option>
                      <option value='active'>Status (active)</option>
                      <option value='inactive'>Status (inactive)</option>
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
              {filteredData.map(user => (
                <tr className='users__table-tr' key={user.userId}>
                  <td className='users__table-td'>{user.username}</td>
                  <td className='users__table-td'>{user.roleTitle}</td>
                  <td className='users__table-td'>{user.salary}</td>
                  <td className='users__table-td'>{user.email}</td>
                  <td className='users__table-td'>{user.contactNum}</td>
                  <td className='users__table-td'>{user.address}</td>
                  <td className='users__table-td'>{user.status}</td>
                  <td className='users__table-td'>
                    <ButtonComponent buttonCustomClass='users__btn-edit' label='Edit' onClick={toggleEditModal}/>
                    <ButtonComponent buttonCustomClass='users__revoke-button' label='Revoke' onClick={() => toggleConfirmationModal(user)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isConfirmationModalOpen && <ConfirmationMessageModal message='Are you sure you want to change the status of this User ?' onClickProceed={proceed} onClickCancel={toggleConfirmationModal} />}
      {isEditModalOpen && <EditUserModal onClick={toggleEditModal} />}
    </div>
  );
};

export default Users;
