import React, { useRef, useState, useEffect } from 'react';
import '../Styles/Suppliers.css';
import AddSupplierModal from '../UIComponents/AddSupplierModal';
import EditSupplierModal from '../UIComponents/EditSupplierModal';
import UpdateIcon from '../UIComponents/UpdateIcon';
import { ToastContainer, toast } from 'react-toastify';

const Suppliers = () => {
  const [isFilterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [supplierData, setSupplierData] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const filterDropdownRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;

  const [filters, setFilters] = useState({
    filterBy: '',
  });

  const toggleFilterDropdown = () => setFilterDropdownOpen(!isFilterDropdownOpen);
  const toggleAddModal = () => setAddModalOpen(!isAddModalOpen);
  const toggleEditModal = (supplier = null) => {
    setSelectedSupplier(supplier);
    setEditModalOpen(!!supplier); 
  };
  
    // Filter suppliers by name or category
    const filteredSupplierData = supplierData
    .filter(supplier => {
      if (searchTerm) {
        const matchesSupplierName = supplier.supplierName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategories = supplier.categories.some(category => category.categoryName.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesLocation = supplier.location.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSupplierName || matchesCategories || matchesLocation; // Match either supplier name or categories
      }
      return true;
    })
    .sort((a, b) => {
      if (filters.filterBy === 'location') {
        return a.location.localeCompare(b.location); // Sort by location alphabetically
      }
      return 0;
    });


  const fetchSuppliers = async () => {
    try {
      const response = await fetch(`${apiUrl}/KampBJ-api/server/fetchSupplier.php`);
      const data = await response.json();
      if (data.status === 'success') {
        setSupplierData(data.suppliers);
      } else {
        toast.error("Failed to fetch suppliers");
      }
    } catch (error) {
      console.error('Error fetching suppliers:', error);
      toast.error("Error fetching suppliers");
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(e.target)) {
        setFilterDropdownOpen(false);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  const resetFilters = () => setFilters({ filterBy: '' });

  return (
    <div className='suppliers'>
      <div className='suppliers__header'>
        <div className='suppliers__left-controls-wrapper'>
          <div className='suppliers__search-wrapper'>
            <input type='text' placeholder='Search Supplier, Categories or Location' value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}  className='suppliers__input-field' />
          </div>
        </div>
        <div className='suppliers__right-controls-wrapper'>
          <button className='suppliers__insert' onClick={toggleAddModal}>
            <i className="suppliers__insert-icon fa-solid fa-plus"></i>
          </button>
          {isAddModalOpen && <AddSupplierModal onClick={toggleAddModal} fetchSuppliers={fetchSuppliers} />}
        </div>
      </div>
      <div className='suppliers__body'>
        <div className='suppliers__table-wrapper'>
          <table className='suppliers__table'>
            <thead>
              <tr>
                <th className='suppliers__table-th'>Supplier</th>
                <th className='suppliers__table-th'>Goods Supplied (Categories)</th>
                <th className='suppliers__table-th'>Email</th>
                <th className='suppliers__table-th'>Contact</th>
                <th className='suppliers__table-th'>Location (City)</th>
                <th className='suppliers__table-th'></th>
              </tr>
            </thead>
            <tbody>
              {filteredSupplierData.map((supplier) => (
                <tr className='suppliers__table-tr' key={supplier.supplierId}>
                  <td className='suppliers__table-td'>{supplier.supplierName}</td>
                  <td className='suppliers__table-td'>
                    {supplier.categories.length > 0
                      ? supplier.categories.map(category => category.categoryName).join(', ')
                      : 'No categories'}
                  </td>
                  <td className='suppliers__table-td'>{supplier.email}</td>
                  <td className='suppliers__table-td'>{supplier.contactNum}</td>
                  <td className='suppliers__table-td'>{supplier.location}</td>
                  <td className='suppliers__table-td'>
                    <UpdateIcon onClick={() => toggleEditModal(supplier)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isEditModalOpen && selectedSupplier && (
        <EditSupplierModal 
        onClick={toggleEditModal} 
        supplierData={selectedSupplier} 
        fetchSuppliers={fetchSuppliers} 
      />
      )}
      <ToastContainer />
    </div>
  );
};

export default Suppliers;
