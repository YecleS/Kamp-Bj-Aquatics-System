import React, {useRef, useState, useEffect} from 'react';
import '../Styles/RestockRecords.css';

const RestockRecords = () => {
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
        { id: 1, name: 'gatorade red 25ml', brand: 'Oishi', model: '3XCCS5' , quantity: 320, date:'10/28/2024', total: 1250.23},
        { id: 2, name: 'gatorade green 25ml', brand: 'Oishi', model: '3XCCS5' , quantity: 32, date:'10/28/2024', total: 250.14},
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
    <div className='restock-records'>
        <div className='restock-records__header'>
            <div className='restock-records__left-controls-wrapper'>
                <div className='restock-records__search-wrapper'>
                    <input type='text' placeholder='Search' className='restock-records__input-field'/>
                </div>
                <div className='restock-records__filter-wrapper' ref={filterDropdownRef}>
                    <i className="restock-records__filter-icon fa-solid fa-filter" onClick={toggleFilterDropdown}></i>
                    {isFilterDropdownOpen &&
                        <div className='restock-records__filter-dropdown'>
                            <div className='restock-records__filter-dropdown-body'>
                                <div className='restock-records__filter-dropdown-field-wrapper'>
                                    <p className='restock-records__filter-label'>Filter by</p>
                                    <select value={filters.filterBy} 
                                    onChange={(e) => setFilters({ ...filters, filterBy: e.target.value })} 
                                    className='restock-records__filter-field'
                                    >
                                    <option></option>
                                    <option value='name' >Name</option>
                                    <option value='date' >Date</option>
                                    <option value='price' >Price</option>
                                    </select>
                                </div>
                                <div className='restock-records__filter-dropdown-field-wrapper'>
                                    <p className='restock-records__filter-label'>Starting Date</p>
                                    <input type='date' value={filters.startDate} onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}  className='restock-records__filter-field'/>
                                    <p className='restock-records__filter-label'>To</p>
                                    <input type='date'value={filters.endDate} onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}  className='restock-records__filter-field'/>
                                </div>
                            </div>
                            <div className='restock-records__filter-dropdown-footer'>
                            <p className='restock-records__filter-reset' onClick={resetFilters}>Reset Filters</p>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
        <div className='restock-records__body'>
            <div className='restock-records__table-wrapper'>
                <table className='restock-records__table'>
                    <thead>
                    <tr>
                        <th className='restock-records__table-th'>Name</th>
                        <th className='restock-records__table-th'>Brand</th>
                        <th className='restock-records__table-th'>Model</th>
                        <th className='restock-records__table-th'>Quantity</th>
                        <th className='restock-records__table-th'>Date</th>
                        <th className='restock-records__table-th'>Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    {expenseData.map((expenses =>
                        <tr className='restock-records__table-tr' key={expenses.id} >
                            <td className='restock-records__table-td'>{expenses.name}</td>
                            <td className='restock-records__table-td'>{expenses.brand}</td>
                            <td className='restock-records__table-td'>{expenses.model}</td>
                            <td className='restock-records__table-td'>{expenses.quantity}</td>
                            <td className='restock-records__table-td'>{expenses.date}</td>
                            <td className='restock-records__table-td'>{expenses.total}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default RestockRecords
