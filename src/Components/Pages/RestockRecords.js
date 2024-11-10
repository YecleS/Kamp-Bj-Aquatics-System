import React, { useRef, useState, useEffect } from 'react';
import '../Styles/RestockRecords.css';
import ProductListModal from '../UIComponents/ProductListModal';

const RestockRecords = () => {
    const [isFilterDropdownOpen, setFilterDropdownOpen] = useState(false);
    const filterDropdownRef = useRef(null);
    const [productList, setProductList] = useState([]);
    const [isProductListModalOpen, setIsProductListModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [filters, setFilters] = useState({
        filterBy: '',
        startDate: '',
        endDate: '',
    });
    const [restockData, setRestockData] = useState([]); // State to store fetched expense data

    // Fetch expense records from the API
    useEffect(() => {
        const fetchExpenseRecords = async () => {
            try {
                const response = await fetch('http://localhost/KampBJ-api/server/fetchRestockTransactions.php');
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

    const handleShowProducts = async (restockId) => {  
        try {
            const response = await fetch('http://localhost/KampBJ-api/server/fetchTransactionProductList.php', {
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

    const resetFilters = () => {
        setFilters({
            filterBy: '',
            startDate: '',
            endDate: '',
        });
    };

    return (
        <div className='restock-records'>
            {/* ...rest of your code, header and table for restock transactions */}
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
                        {restockData.map(restock => (
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
