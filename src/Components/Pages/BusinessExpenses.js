import React, { useRef, useState, useEffect } from 'react';
import '../Styles/BusinessExpenses.css';
import AddExpensesModal from '../UIComponents/AddExpensesModal';
import EditExpensesModal from '../UIComponents/EditExpensesModal';
import UpdateIcon from '../UIComponents/UpdateIcon';
import { ViewExpensesIcon } from '../UIComponents/ActionIcons';
import TextSlicer from '../Utils/TextSlicer';
import DatePicker from 'react-datepicker';

const BusinessExpenses = () => {
  const [isFilterDropdownOpen, isSetFilterDropdownOpen] = useState(false);
  const [isAddModalOpen, isSetAddModalOpen] = useState(false);
  const [isEditModalOpen, isSetEditModalOpen] = useState(false);
  const filterDropdownRef = useRef(null);
  
  const [expensesData, setExpensesData] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);

  // Initial Values For Filters Store In useState
  const [filters, setFilters] = useState({
    filterBy: '',
    startDate: '',
    endDate: '',
  });

  // Fetch expense records on component mount
  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await fetch('http://localhost/KampBJ-api/server/fetchExpenseRecords.php');
      const data = await response.json();
      if (Array.isArray(data)) {
        
        const expenses = data.map(expense => ({
          ...expense,
          total: parseFloat(expense.total)
        }));

        setExpensesData(expenses);
      } else {
        console.error('Error fetching expenses:', data.message);
      }
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  // Toggle Dropdowns
  const toggleFilterDropdown = () => {
    isSetFilterDropdownOpen(!isFilterDropdownOpen);
  };

  const toggleAddModal = () => {
    isSetAddModalOpen(!isAddModalOpen);
  };

  const toggleEditModal = () => {
    isSetEditModalOpen(!isEditModalOpen);
  };

  // Inside the BusinessExpenses component
const handleEditClick = (expense) => {
  // Set the selected expense for editing
  setSelectedExpense(expense);
  toggleEditModal();
};

  // Handle Closing of Dropdowns When Clicked Outside of Its Div
  useEffect(() => {
    const handler = (e) => {
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(e.target)) {
        isSetFilterDropdownOpen(false);
      }
    };
    document.addEventListener('click', handler);

    return () => document.removeEventListener('click', handler);
  }, []);

  // Reset Filters
  const resetFilters = () => {
    setFilters({
      filterBy: '',
      startDate: '',
      endDate: '',
    });
  };

  const handleMonthChange = (name, date) => {
    const selectedMonth = date.toLocaleDateString('default', { month: 'long', year: 'numeric' });

    setFilters({
      ...filters,
      [name]: selectedMonth
    });
  };

  return (
    <div className='business-expenses'>
      <div className='business-expenses__header'>
        <div className='business-expenses__left-controls-wrapper'>
          <div className='business-expenses__search-wrapper'>
            <input type='text' placeholder='Search' className='business-expenses__input-field' />
          </div>
          <div className='business-expenses__filter-wrapper' ref={filterDropdownRef}>
            <i className="business-expenses__filter-icon fa-solid fa-filter" onClick={toggleFilterDropdown}></i>
            {isFilterDropdownOpen && (
              <div className='business-expenses__filter-dropdown'>
                <div className='business-expenses__filter-dropdown-body'>
                  <div className='business-expenses__filter-dropdown-field-wrapper'>
                    <p className='business-expenses__filter-label'>Filter by</p>
                    <select
                      value={filters.filterBy}
                      onChange={(e) => setFilters({ ...filters, filterBy: e.target.value })}
                      className='business-expenses__filter-field'
                    >
                      <option></option>
                      <option value='name'>Name</option>
                      <option value='price'>Price</option>
                    </select>
                  </div>
                  <div className='business-expenses__filter-dropdown-field-wrapper'>
                    <p className='business-expenses__filter-label'>Starting Date</p>
                    <DatePicker
                      onChange={(date) => handleMonthChange('startDate', date)}
                      selected={filters.startDate}
                      dateFormat="yyyy-MM-dd"
                      showMonthYearPicker
                      maxDate={new Date()}
                      placeholderText='Select A Month'
                      className='business-expenses__filter-field'
                    />
                    <p className='business-expenses__filter-label'>To</p>
                    <DatePicker
                      onChange={(date) => handleMonthChange('endDate', date)}
                      selected={filters.endDate}
                      dateFormat="yyyy-MM-dd"
                      showMonthYearPicker
                      maxDate={new Date()}
                      placeholderText='Select A Month'
                      className='business-expenses__filter-field'
                    />
                  </div>
                </div>
                <div className='business-expenses__filter-dropdown-footer'>
                  <p className='business-expenses__filter-reset' onClick={resetFilters}>Reset Filters</p>
                </div>
              </div>
            )}
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
                <th className='business-expenses__table-th'>Title</th>
                <th className='business-expenses__table-th'>Description</th>
                <th className='business-expenses__table-th'>Date</th>
                <th className='business-expenses__table-th'>Total</th>
                <th className='business-expenses__table-th'></th>
              </tr>
            </thead>
            <tbody>
              {expensesData.map((expense) => (
                <tr className='business-expenses__table-tr' key={expense.expenseId}>
                  <td className='business-expenses__table-td'>{expense.title}</td>
                  <td className='business-expenses__table-td'><TextSlicer text={expense.description} /></td>
                  <td className='business-expenses__table-td'>{new Date(expense.date).toLocaleDateString()}</td>
                  <td className='business-expenses__table-td'>₱ {typeof expense.total === 'number' ? expense.total.toFixed(2) : '0.00'}</td>
                  <td className='business-expenses__table-td'>
                  <UpdateIcon onClick={() => handleEditClick(expense)} />
                    <ViewExpensesIcon expenses={expense} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isAddModalOpen && <AddExpensesModal onClick={toggleAddModal} refresh={fetchExpenses}/>}
      {isEditModalOpen && selectedExpense && <EditExpensesModal onClick={toggleEditModal} selectedExpense={selectedExpense} refresh={fetchExpenses} />}
    </div>
  );
};

export default BusinessExpenses;
