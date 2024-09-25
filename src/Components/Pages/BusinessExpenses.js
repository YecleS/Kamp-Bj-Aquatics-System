import React, {useRef, useState, useEffect} from 'react';
import '../Styles/BusinessExpenses.css';
import AddExpensesModal from '../UIComponents/AddExpensesModal';
import EditExpensesModal from '../UIComponents/EditExpensesModal';
import UpdateIcon from '../UIComponents/UpdateIcon';
import { ViewExpensesIcon } from '../UIComponents/ActionIcons';
import TextSlicer from '../Utils/TextSlicer';
import DatePicker from 'react-datepicker';

const BusinessExpenses = () => {
  const[isFilterDropdownOpen, isSetFilterDropdownOpen] = useState(false)
  const[isAddModalOpen, isSetAddModalOpen] = useState(false)
  const[isEditModalOpen, isSetEditModalOpen] = useState(false)
  const filterDropdownRef = useRef(null)

  //Initial Values For Filters Store In useState
  const[filters, setFilters] = useState({
    filterBy: '',
    startDate: '',
    endDate: '',
  })

  // Toggle Dropdowns
  const toggleFilterDropdown = () => {
    isSetFilterDropdownOpen(!isFilterDropdownOpen);
  }

  const toggleAddModal = () => {
    isSetAddModalOpen(!isAddModalOpen);
  }

  const toggleEditModal = () => {
    isSetEditModalOpen(!isEditModalOpen)
  }

  // Dummy Data For Table 
  const utilitiesData = [
    { id: 1, name: 'wifi', description:'Paid wifi bill for PLDT home communication', date: 'May/2002', time:'11:23', price: 1150.50 },
    { id: 2, name: 'Water Bill', description:'Paid Water bill for village water supply', date: 'Apr/2002', time:'12:23', price: 150.50 },
  ]

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

  //Reset Filters
  const resetFilters = () => {
    setFilters({
      filterBy: '',
      startDate: '',
      endDate: '',
    })
  }

  const handleMonthChange = (name, date) => {
    const selectedMonth = date.toLocaleDateString('default', { month: 'long', year: 'numeric' });

    setFilters({
      ...filters,
      [name]: selectedMonth
    })
  }



  return (
    <div className='business-expenses'>

      <div className='business-expenses__header'>
        <div className='business-expenses__left-controls-wrapper'>
          <div className='business-expenses__search-wrapper'>
            <input type='text' placeholder='Search' className='business-expenses__input-field'/>
          </div>
          <div className='business-expenses__filter-wrapper' ref={filterDropdownRef}>
            <i className="business-expenses__filter-icon fa-solid fa-filter" onClick={toggleFilterDropdown}></i>
            {isFilterDropdownOpen &&
              <div className='business-expenses__filter-dropdown'>
                <div className='business-expenses__filter-dropdown-body'>
                  <div className='business-expenses__filter-dropdown-field-wrapper'>
                    <p className='business-expenses__filter-label'>Filter by</p>
                    <select value={filters.filterBy} 
                      onChange={(e) => setFilters({ ...filters, filterBy: e.target.value })} 
                      className='business-expenses__filter-field'
                    >
                      <option></option>
                      <option value='name' >Name</option>
                      <option value='price' >Price</option>
                    </select>
                  </div>
                  <div className='business-expenses__filter-dropdown-field-wrapper'>

                    <p className='business-expenses__filter-label'>Starting Date</p>
                      <DatePicker
                        onChange={(date) => handleMonthChange('startDate', date)}
                        value={filters.startDate}
                        dateFormat="yyyy-MM-dd"
                        showMonthYearPicker
                        maxDate={new Date()}
                        placeholderText='Select A Month'
                        className='business-expenses__filter-field'
                      />

                    <p className='business-expenses__filter-label'>To</p>
                      <DatePicker
                        onChange={(date) => handleMonthChange('endDate', date)}
                        value ={filters.endDate}
                        dateFormat="yyyy-MM-dd"
                        showMonthYearPicker
                        maxDate={new Date()}
                        placeholderText='Select A Month'
                        className='business-expenses__filter-field'
                      />
                    <div className='modal__input-field-wrapper'>    
                </div>  
                  </div>
                </div>
                <div className='business-expenses__filter-dropdown-footer'>
                  <p className='business-expenses__filter-reset' onClick={resetFilters}>Reset Filters</p>
                </div>
              </div>
            }
          </div>
        </div>
        <div className='business-expenses__right-controls-wrapper'>
          <button className='business-expenses__insert'><i className="business-expenses__insert-icon fa-solid fa-plus" onClick={toggleAddModal}></i></button>
        </div>
      </div>

      <div className='business-expenses__body'>
      <div className='business-expenses__table-wrapper'>
          <table className='business-expenses__table'>
            <thead>
              <tr>
                <th className='business-expenses__table-th'>Name</th>
                <th className='business-expenses__table-th'>Description</th>
                <th className='business-expenses__table-th'>Date</th>
                <th className='business-expenses__table-th'>Time</th>
                <th className='business-expenses__table-th'>Total</th>
                <th className='business-expenses__table-th'></th>
              </tr>
            </thead>
            <tbody>
              {utilitiesData.map((utilities =>
                  <tr className='business-expenses__table-tr' key={utilities.id} >
                    <td className='business-expenses__table-td'>{utilities.name}</td>
                    <td className='business-expenses__table-td'><TextSlicer text={utilities.description} /></td>
                    <td className='business-expenses__table-td'>{utilities.date}</td>
                    <td className='business-expenses__table-td'>{utilities.time}</td>
                    <td className='business-expenses__table-td'>₱ {utilities.price}</td>
                    <td className='business-expenses__table-td'>
                      <UpdateIcon onClick={toggleEditModal}/>
                      <ViewExpensesIcon expenses={utilities} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {isAddModalOpen && <AddExpensesModal onClick={toggleAddModal}/>}
      {isEditModalOpen && <EditExpensesModal onClick={toggleEditModal} />}
    </div>
  )
}

export default BusinessExpenses
