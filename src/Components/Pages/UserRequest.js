import React, { useRef, useState, useEffect } from 'react';
import '../Styles/UserRequest.css';
import AddStaffModal from '../UIComponents/AddStaffModal';
import ConfirmationMessageModal from '../UIComponents/ConfirmationMessageModal';
import ButtonComponent from '../UIComponents/ButtonComponent';
import { ToastSuccess } from '../UIComponents/ToastComponent';

const UserRequest = () => {
    const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [userRequests, setUserRequests] = useState([]); // State to store fetched data
    const [selectedUser, setSelectedUser] = useState();
    const [requestId, setRequestId] = useState();
    const filterDropdownRef = useRef(null);

    // Initial Values For Filters Store In useState
    const [filters, setFilters] = useState({
        filterBy: '',
    });

    const getRequests = () => {
        fetch('http://localhost/KampBJ-api/server/fetchUserRequests.php')
            .then(response => response.json())
            .then(data => {
                if (data.requests) {
                    setUserRequests(data.requests);
                } else {
                    console.error('Failed to fetch user requests');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    // Fetch user requests from the server
    useEffect(() => {
        getRequests();
    }, []);

    // Toggle Dropdowns
    const toggleFilterDropdown = () => {
        setIsFilterDropdownOpen(!isFilterDropdownOpen);
    };

    const toggleAddModal = (request) => {
        setSelectedUser(request);
        setIsAddModalOpen(!isAddModalOpen);
    };

    const toggleConfirmationModal = (requestId) => {
        setRequestId(requestId);
        setIsConfirmationModalOpen(!isConfirmationModalOpen);
    };

    // Handle Closing of Dropdowns When Clicked Outside of Its Div
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

    // Proceed with the declining of request
    const proceed = () => {
        if (!requestId) {
            console.error('No request ID selected');
            return;
        }
        fetch('http://localhost/KampBJ-api/server/deleteUserRequest.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ requestId: requestId })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                ToastSuccess('Request Denied!')
                // Update the userRequests state to remove the deleted request
                setUserRequests(prevRequests => prevRequests.filter(request => request.requestId !== requestId));
                setIsConfirmationModalOpen(false); // Close the modal
            } else {
                console.error('Failed to delete request:', data.message);
                alert('Failed to delete the request. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while trying to delete the request. Please try again.');
        });
    };


    return (
        <div className='user-request'>
            <div className='user-request__header'>
                <div className='user-request__left-controls-wrapper'>
                    <div className='user-request__search-wrapper'>
                        <input type='text' placeholder='Search' className='user-request__input-field' />
                    </div>
                    <div className='user-request__filter-wrapper' ref={filterDropdownRef}>
                        <i className="user-request__filter-icon fa-solid fa-filter" onClick={toggleFilterDropdown}></i>
                        {isFilterDropdownOpen &&
                            <div className='user-request__filter-dropdown'>
                                <div className='user-request__filter-dropdown-body'>
                                    <div className='user-request__filter-dropdown-field-wrapper'>
                                        <p className='user-request__filter-label'>Filter by</p>
                                        <select value={filters.filterBy}
                                            onChange={(e) => setFilters({ ...filters, filterBy: e.target.value })}
                                            className='user-request__filter-field'
                                        >
                                            <option></option>
                                            <option value='name'>Name</option>
                                            <option value='date'>Date</option>
                                            <option value='price'>Price</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='user-request__filter-dropdown-footer'>
                                    <p className='user-request__filter-reset' onClick={resetFilters}>Reset Filters</p>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className='user-request__body'>
                <div className='user-request__table-wrapper'>
                    <table className='user-request__table'>
                        <thead>
                            <tr>
                                <th className='user-request__table-th'>Name</th>
                                <th className='user-request__table-th'>Username</th>
                                <th className='user-request__table-th'>Age</th>
                                <th className='user-request__table-th'>Email</th>
                                <th className='user-request__table-th'>Contact Number</th>
                                <th className='user-request__table-th'>Gender</th>
                                <th className='user-request__table-th'>Address</th>
                                <th className='user-request__table-th'>Date Requested</th>
                                <th className='user-request__table-th'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {userRequests.map(request => (
                                <tr className='user-request__table-tr' key={request.requestId}>
                                    <td className='user-request__table-td'>{request.fullname}</td>
                                    <td className='user-request__table-td'>{request.username}</td>
                                    <td className='user-request__table-td'>{request.age}</td>
                                    <td className='user-request__table-td'>{request.email}</td>
                                    <td className='user-request__table-td'>{request.contactNum}</td>
                                    <td className='user-request__table-td'>{request.gender}</td>
                                    <td className='user-request__table-td'>{request.address}</td>
                                    <td className='user-request__table-td'>{request.dateRequested}</td>
                                    <td className='user-request__table-td'>
                                    <ButtonComponent buttonCustomClass='user-request__btn-approve' label='Approve' onClick={() =>toggleAddModal(request)} />
                                    <ButtonComponent buttonCustomClass='user-request__btn-approve' label='Decline' onClick={() =>toggleConfirmationModal(request.requestId)}/>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {isAddModalOpen && <AddStaffModal onClick={toggleAddModal} selectedUser={selectedUser} refresh={getRequests} />}
            {isConfirmationModalOpen && <ConfirmationMessageModal message='Are You Sure, You Want To Decline This Request ?' onClickProceed={proceed} onClickCancel={toggleConfirmationModal} />}
        </div>
    );
};

export default UserRequest;
