import React, {useRef, useState, useEffect} from 'react';
import '../Styles/Expenses.css';


const Expenses = () => {
    const[isFilterDropdownOpen, isSetFilterDropdownOpen] = useState(false)
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

    // Dummy Data For Table 
    const expenseData = [
        { id: 1, expense: 'gatorade red 25ml', brand: 'Oishi', model: '3XCCS5' , quantity: 320, date:'10/28/2024', total: 1250.23},
        { id: 2, expense: 'gatorade green 25ml', brand: 'Oishi', model: '3XCCS5' , quantity: 32, date:'10/28/2024', total: 250.14},
        { id: 3, expense: 'wifi', brand: '', model: '' , quantity: '', date:'10/28/2024', total: 1000},
        { id: 3, expense: 'electric bill', brand: '', model: '' , quantity: '', date:'10/28/2024', total: 1500},
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
  return (
    <div className='expenses'>
        <div className='expenses__header'>
            <div className='expenses__left-controls-wrapper'>
                <div className='expenses__search-wrapper'>
                    <input type='text' placeholder='Search' className='expenses__input-field'/>
                </div>
                <div className='expenses__filter-wrapper' ref={filterDropdownRef}>
                    <i className="expenses__filter-icon fa-solid fa-filter" onClick={toggleFilterDropdown}></i>
                    {isFilterDropdownOpen &&
                        <div className='expenses__filter-dropdown'>
                            <div className='expenses__filter-dropdown-body'>
                                <div className='expenses__filter-dropdown-field-wrapper'>
                                    <p className='expenses__filter-label'>Filter by</p>
                                    <select value={filters.filterBy} 
                                    onChange={(e) => setFilters({ ...filters, filterBy: e.target.value })} 
                                    className='expenses__filter-field'
                                    >
                                    <option></option>
                                    <option value='name' >Name</option>
                                    <option value='date' >Date</option>
                                    <option value='price' >Price</option>
                                    </select>
                                </div>
                                <div className='expenses__filter-dropdown-field-wrapper'>
                                    <p className='expenses__filter-label'>Starting Date</p>
                                    <input type='date' value={filters.startDate} onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}  className='expenses__filter-field'/>
                                    <p className='expenses__filter-label'>To</p>
                                    <input type='date'value={filters.endDate} onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}  className='expenses__filter-field'/>
                                </div>
                            </div>
                            <div className='expenses__filter-dropdown-footer'>
                            <p className='expenses__filter-reset' onClick={resetFilters}>Reset Filters</p>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
        <div className='expenses__body'>
            <div className='expenses__table-wrapper'>
                <table className='expenses__table'>
                    <thead>
                    <tr>
                        <th className='expenses__table-th'>Expense</th>
                        <th className='expenses__table-th'>Brand</th>
                        <th className='expenses__table-th'>Model</th>
                        <th className='expenses__table-th'>Quantity</th>
                        <th className='expenses__table-th'>Date</th>
                        <th className='expenses__table-th'>Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    {expenseData.map((expenses =>
                        <tr className='expenses__table-tr' key={expenses.id} >
                            <td className='expenses__table-td'>{expenses.expense}</td>
                            <td className='expenses__table-td'>{expenses.brand}</td>
                            <td className='expenses__table-td'>{expenses.model}</td>
                            <td className='expenses__table-td'>{expenses.quantity}</td>
                            <td className='expenses__table-td'>{expenses.date}</td>
                            <td className='expenses__table-td'>{expenses.total}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default Expenses
