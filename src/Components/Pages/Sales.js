import React, {useRef, useState, useEffect} from 'react';
import '../Styles/Sales.css';

const Sales = () => {
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
    const salesData = [
        { id: 1, product: 'gatoradesd blue 25ml', brand: 'Oishi', model: '3XCCS5' , quantity: 320, date:'10/28/2024', total: 1250.23},
        { id: 2, product: 'gatoradedd green 25ml', brand: 'Oishi', model: '3XCCS5' , quantity: 32, date:'10/28/2024', total: 250.14},
        { id: 3, product: 'gatoradeee red 25ml', brand: 'Oishi', model: '3XCCS5' , quantity: 323, date:'10/28/2024', total: 1000},
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
    <div className='sales'>
        <div className='sales__header'>
            <div className='sales__left-controls-wrapper'>
                <div className='sales__search-wrapper'>
                    <input type='text' placeholder='Search' className='sales__input-field'/>
                </div>
                <div className='sales__filter-wrapper' ref={filterDropdownRef}>
                    <i className="sales__filter-icon fa-solid fa-filter" onClick={toggleFilterDropdown}></i>
                    {isFilterDropdownOpen &&
                        <div className='sales__filter-dropdown'>
                            <div className='sales__filter-dropdown-body'>
                                <div className='sales__filter-dropdown-field-wrapper'>
                                    <p className='sales__filter-label'>Filter by</p>
                                    <select value={filters.filterBy} 
                                    onChange={(e) => setFilters({ ...filters, filterBy: e.target.value })} 
                                    className='sales__filter-field'
                                    >
                                    <option></option>
                                    <option value='name' >Name</option>
                                    <option value='date' >Date</option>
                                    <option value='price' >Price</option>
                                    </select>
                                </div>
                                <div className='sales__filter-dropdown-field-wrapper'>
                                    <p className='sales__filter-label'>Starting Date</p>
                                    <input type='date' value={filters.startDate} onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}  className='sales__filter-field'/>
                                    <p className='sales__filter-label'>To</p>
                                    <input type='date'value={filters.endDate} onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}  className='sales__filter-field'/>
                                </div>
                            </div>
                            <div className='sales__filter-dropdown-footer'>
                            <p className='sales__filter-reset' onClick={resetFilters}>Reset Filters</p>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
        <div className='sales__body'>
            <div className='sales__table-wrapper'>
                <table className='sales__table'>
                    <thead>
                    <tr>
                        <th className='sales__table-th'>Name</th>
                        <th className='sales__table-th'>Brand</th>
                        <th className='sales__table-th'>Model</th>
                        <th className='sales__table-th'>Quantity</th>
                        <th className='sales__table-th'>Date</th>
                        <th className='sales__table-th'>Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    {salesData.map((sales =>
                        <tr className='sales__table-tr' key={sales.id} >
                            <td className='sales__table-td'>{sales.product}</td>
                            <td className='sales__table-td'>{sales.brand}</td>
                            <td className='sales__table-td'>{sales.model}</td>
                            <td className='sales__table-td'>{sales.quantity}</td>
                            <td className='sales__table-td'>{sales.date}</td>
                            <td className='sales__table-td'>{sales.total}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default Sales
