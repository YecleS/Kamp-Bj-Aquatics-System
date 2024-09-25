import React, {useRef, useState, useEffect} from 'react';
import '../Styles/UserRequest.css';
import AddStaffModal from '../UIComponents/AddStaffModal';
import ConfirmationMessageModal from '../UIComponents/ConfirmationMessageModal';
import ButtonComponent from '../UIComponents/ButtonComponent';

const UserRequest = () => {
    const[isFilterDropdownOpen, isSetFilterDropdownOpen] = useState(false)
    const[isAddModalOpen, isSetAddModalOpen] = useState(false)
    const[isConfirmationModalOpen, isSetConfirmationModalOpen] = useState(false)
    const filterDropdownRef = useRef(null)

    //Initial Values For Filters Store In useState
    const[filters, setFilters] = useState({
        filterBy: '',
    })

    // Toggle Dropdowns
    const toggleFilterDropdown = () => {
        isSetFilterDropdownOpen(!isFilterDropdownOpen);
    }

    const toggleAddModal = () => {
        isSetAddModalOpen(!isAddModalOpen);
    }

    const toggleConfirmationModal = () => {
        isSetConfirmationModalOpen(!isConfirmationModalOpen)
    }

     // Handle Closing of Dropdowns When Clicked Outside of Its Div
    useEffect(() => {
        let handler = (e) => {
        if(filterDropdownRef.current && !filterDropdownRef.current.contains(e.target)){
            isSetFilterDropdownOpen(false);
        }
        }
        document.addEventListener('click', handler);

        return () => document.removeEventListener('click', handler);
    }, []);

    // Dummy Data For Table 
    const staffData = [
        {id: 1, name:'steven yecla', username:'stevenyandre', age: 22, email:'stevenyecla@gmail.com', gender:'M', address:'Blk 2 Lot 31 Mahogany Phase 2 San Isidro Cabuyao Laguna', approval:'pending'},
        {id: 2, name:'steven yecla', username:'stevenyandre', age: 21, email:'stevenyecla@gmail.com', gender:'M', address:'Blk 2 Lot 31 Mahogany Phase 2 San Isidro Cabuyao Laguna', approval:'pending'},
    ]

    //Reset Filters
    const resetFilters = () => {
        setFilters({
        filterBy: '',
        })
    }

    //Proceed with the declining of request
    const proceed = () => {
        console.log('DECLINE');
    }

  return (
    <div className='user-request'>
      <div className='user-request__header'>
        <div className='user-request__left-controls-wrapper'>
          <div className='user-request__search-wrapper'>
            <input type='text' placeholder='Search' className='user-request__input-field'/>
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
                        <option value='name' >Name</option>
                        <option value='date' >Date</option>
                        <option value='price' >Price</option>
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
                <th className='user-request__table-th'>Gender</th>
                <th className='user-request__table-th'>Address</th>
                <th className='user-request__table-th'>Approval</th>
                <th className='user-request__table-th'></th>
              </tr>
            </thead>
            <tbody>
              {staffData.map((staff =>
                  <tr className='user-request__table-tr' key={staff.id} >
                    <td className='user-request__table-td'>{staff.name}</td>
                    <td className='user-request__table-td'>{staff.username}</td>
                    <td className='user-request__table-td'>{staff.age}</td>
                    <td className='user-request__table-td'>{staff.email}</td>
                    <td className='user-request__table-td'>{staff.gender}</td>
                    <td className='user-request__table-td'>{staff.address}</td>
                    <td className='user-request__table-td'>{staff.approval}</td>
                    <td className='user-request__table-td'>
                        <ButtonComponent buttonCustomClass='user-request__btn-approve' label='Approve' onClick={toggleAddModal} />
                        <ButtonComponent buttonCustomClass='user-request__btn-approve' label='Decline' onClick={toggleConfirmationModal}/>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {isAddModalOpen && <AddStaffModal onClick={toggleAddModal}/>}
      {isConfirmationModalOpen && <ConfirmationMessageModal message='Are You Sure, You Want To Decline This Request ?' onClickProceed={proceed} onClickCancel={toggleConfirmationModal} />}
    </div>
  )
}

export default UserRequest
