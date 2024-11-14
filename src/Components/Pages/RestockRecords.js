import React, { useRef, useState, useEffect } from 'react';
import '../Styles/RestockRecords.css';
import ProductListModal from '../UIComponents/ProductListModal';

const RestockRecords = () => {
    const [isFilterDropdownOpen, setFilterDropdownOpen] = useState(false);
    const filterDropdownRef = useRef(null);
    const [productList, setProductList] = useState([]);
    const [isProductListModalOpen, setIsProductListModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // New state for search term
    const [filters, setFilters] = useState({
        filterBy: '',
        startDate: '',
        endDate: '',
    });
    const [restockData, setRestockData] = useState([]); // State to store fetched expense data
    const apiUrl = process.env.REACT_APP_API_URL;

    // Fetch expense records from the API
    useEffect(() => {
        const fetchExpenseRecords = async () => {
            try {
                const response = await fetch(`${apiUrl}/KampBJ-api/server/fetchRestockTransactions.php`);
                const data = await response.json();
                if (Array.isArray(data)) {
                    setRestockData(data);
                } else {
                    console.error('Unexpected response format:', data);
                }
            } catch (error) {
                console.error('Error fetching expense records:', error);
            }
        };
        fetchExpenseRecords();
    }, []);

    // Handle Closing of Dropdowns When Clicked Outside of Its Div
    useEffect(() => {
        const handler = (e) => {
            if (filterDropdownRef.current && !filterDropdownRef.current.contains(e.target)) {
                setFilterDropdownOpen(false);
            }
        };
        
        document.addEventListener('click', handler);
        return () => document.removeEventListener('click', handler);
    }, []);

    const handleShowProducts = async (restockId) => {  
        try {
            const response = await fetch(`${apiUrl}/KampBJ-api/server/fetchTransactionProductList.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ restockId })
            });
            const data = await response.json();
            if (Array.isArray(data)) {
                setProductList(data);
            } else {
                setProductList([]);
            }
            setSelectedTransaction(restockId);
            setIsProductListModalOpen(true);
        } catch (error) {
            console.error('Error fetching products for this expense:', error);
        }
    };

         // Filter and sort sales data based on search term, date, and total
         const filteredRestockData = restockData
         .filter(restock => {
             if (searchTerm) {
                 // Check if the restock matches the search term (ID or username)
                 const matchesSearch = restock.restockId.toString().includes(searchTerm) || 
                     restock.username.toLowerCase().includes(searchTerm.toLowerCase());
                 if (!matchesSearch) return false;
             }
     
             // Check if the restock falls within the date range (if specified)
             const restockDate = new Date(restock.date);
             const startDate = filters.startDate ? new Date(filters.startDate) : null;
             const endDate = filters.endDate ? new Date(filters.endDate) : null;
     
             const matchesDate = (!startDate || restockDate >= startDate) && 
                 (!endDate || restockDate <= endDate);
     
             return matchesDate;
         })
         .sort((a, b) => {
             if (filters.filterBy === 'total_high') {
                 return b.Total - a.Total; // Sort by total descending
             }
             if (filters.filterBy === 'total_low') {
                 return a.Total - b.Total; // Sort by total ascending
             }
             return 0; // No sorting applied
         });
     

    const resetFilters = () => {
        setFilters({
            filterBy: '',
            startDate: '',
            endDate: '',
        });
    };

    // Toggle Filter Dropdown
  const toggleFilterDropdown = () => {
    setFilterDropdownOpen(!isFilterDropdownOpen);
  };

    return (
        <div className='restock-records'>
            <div className='restock-records__header'>
                <div className='restock-records__search-wrapper'>
                    <input 
                        type='text' 
                        placeholder='Search ID or username' 
                        className='restock-records__input-field'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} 
                    />
                </div>
                <div className='restock-records__filter-wrapper' ref={filterDropdownRef}>
                    <i className="restock-records__filter-icon fa-solid fa-filter" onClick={toggleFilterDropdown}></i>
                    { isFilterDropdownOpen && 
                        <div className="restock-records__filter-dropdown">
                            <div className="restock-records__filter-dropdown-body">
                                <div className="restock-records__filter-dropdown-field-wrapper">
                                    <p className="restock-records__filter-label">Sort by</p>
                                    <select 
                                        className="restock-records__filter-field"
                                        value={filters.filterBy}
                                        onChange={(e) => setFilters({ ...filters, filterBy: e.target.value })}
                                    >
                                        <option value="">Select</option>
                                        <option value="total_high">Total (Highest - Lowest)</option>
                                        <option value="total_low">Total (Lowest - Highest)</option>
                                    </select>

                                </div>
                                <div className='restock-records__filter-dropdown-field-wrapper'>
                                    <p className='restock-records__filter-label'>Starting Date</p>
                                    <input type='date' value={filters.startDate} onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}  className='restock-records__filter-field' />
                                    <p className='restock-records__filter-label'>To</p>
                                    <input type='date' value={filters.endDate} onChange={(e) => setFilters({ ...filters, endDate: e.target.value })} className='restock-records__filter-field' />
                                </div>
                            </div>
                            <div className="restock-records__filter-dropdown-footer">
                                <p className="restock-records__filter-reset" onClick={resetFilters}>Reset Filters</p>
                            </div>
                        </div>
                    }

                </div>
            </div>
            <div className='restock-records__table-wrapper'>
                <table className='restock-records__table'>
                    <thead>
                        <tr>
                            <th className='restock-records__table-th'>Transaction ID</th>
                            <th className='restock-records__table-th'>Date</th>
                            <th className='restock-records__table-th'>Total</th>
                            <th className='restock-records__table-th'>Procesed By</th>
                            <th className='restock-records__table-th'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRestockData.map(restock => (
                            <tr className='restock-records__table-tr' key={restock.restockId}>
                                <td className='restock-records__table-td'>{restock.restockId}</td>
                                <td className='restock-records__table-td'>{restock.date}</td>
                                <td className='restock-records__table-td'>{restock.Total}</td>
                                <td className='restock-records__table-td'>{restock.username}</td>
                                <td className='restock-records__table-td'>
                                    <button 
                                        className='restock-records__show-products-btn'
                                        onClick={() => handleShowProducts(restock.restockId)}
                                    >
                                        Show Products
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ProductListModal
                isOpen={isProductListModalOpen}
                onClose={() => setIsProductListModalOpen(false)}
                title={"restock"}
                selectedTransaction = {selectedTransaction}
                productList={productList} // Pass productList as prop
            />
        </div>
    );
};

export default RestockRecords;
