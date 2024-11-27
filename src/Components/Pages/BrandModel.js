import React, { useState, useRef, useEffect } from 'react';
import '../Styles/BrandModel.css';
import AddBrandModal from '../UIComponents/AddBrandModal';
import EditBrandModal from '../UIComponents/EditBrandModal';
import { EditIcon } from '../UIComponents/ActionIcons';
import { ToastSuccess, ToastError } from '../UIComponents/ToastComponent';

const BrandModel = () => {
    const [isAddBrandModalOpen, isSetAddBrandModalOpen] = useState(false);
    const [isEditBrandModalOpen, isSetEditBrandModalOpen] = useState(false);
    const [brandsData, setBrandsData] = useState([]); // State for brands
    const [selectedBrand, setSelectedBrand] = useState(null); // State for the selected brand for editing
    const [searchInput, setSearchInput] = useState(''); // State for search input
    const filterDropdownRef = useRef(null);
    const apiUrl = process.env.REACT_APP_API_URL;

    // Fetch brands from the API
    const fetchBrands = async () => {
        try {
            const response = await fetch(`${apiUrl}/KampBJ-api/server/fetchBrands.php`);
            const data = await response.json();
            setBrandsData(data.brands); // Assuming the response is { brands: [...] }
        } catch (error) {
            console.error('Error fetching brands:', error);
        }
    };

    // Insert a new brand via API call
    const handleAddBrand = async (brandName) => {
        // Check if the brand already exists
        const brandExists = brandsData.some(
            (brand) => brand.name.toLowerCase() === brandName.toLowerCase()
        );

        if (brandExists) {
            ToastError('This brand already exists.');
            return; // Exit if the brand exists
        }else{
            try {
                const response = await fetch(`${apiUrl}/KampBJ-api/server/insertBrand.php`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                        brand: brandName,
                        userId: localStorage.getItem('userId')
                    }),
                });
    
                const result = await response.json();
                if (result.status === 'success') {
                    ToastSuccess('Brand Added Succesfully');
                    fetchBrands(); // Refresh the brands after adding
                    console.log('Brand added:', result.message);
                } else {
                    console.error('Error adding brand:', result.message);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const handleEditBrand = async (brandId, newBrandName) => {
        // Check if the brand already exists
        const brandExists = brandsData.some(
            (brand) => brand.name.toLowerCase() === newBrandName.toLowerCase()
        );

        if (brandExists) {
            ToastError('This brand already exists.');
            return; // Exit if the brand exists
        }else{
            try {
                const prevBrand = selectedBrand.name;
                const response = await fetch(`${apiUrl}/KampBJ-api/server/updateBrand.php`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                        id: brandId,
                        brand: newBrandName,
                        prevBrand: prevBrand,
                        userId: localStorage.getItem('userId')
                    }),
                });
    
                const result = await response.json();
                if (result.status === 'success') {
                    fetchBrands(); // Refresh the brands after editing
                    ToastSuccess('Brand Successfully Updated');

                } else {
                    console.error('Error updating brand:', result.message);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    // Delete a brand via API call
    const handleDeleteBrand = async (brandId) => {
        if (window.confirm('Are you sure you want to delete this brand?')) {
            try {
                const response = await fetch(`${apiUrl}/KampBJ-api/server/deleteBrand.php`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                        id: brandId,
                    }),
                });

                const result = await response.json();
                if (result.status === 'success') {
                    fetchBrands(); // Refresh the brands after deletion
                    console.log('Brand deleted:', result.message);
                } else {
                    console.error('Error deleting brand:', result.message);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    // Handle opening the edit modal and setting the selected brand
    const openEditBrandModal = (brand) => {
        setSelectedBrand(brand); // Set the brand to be edited
        isSetEditBrandModalOpen(true); // Open the modal
    };

    // Fetch brands on component mount
    useEffect(() => {
        fetchBrands();
    }, []);

    // Handle search input change
    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    // Filtered brands based on search input
    const filteredBrands = brandsData.filter((brand) =>
        brand.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    return (
        <div className='brand-model'>
            <div className='brand-model__header'>
                <div className='brand-model__left-controls-wrapper'>
                    <div className='brand-model__search-wrapper'>
                        <input
                            type='text'
                            placeholder='Search'
                            className='brand-model__input-field'
                            value={searchInput}
                            onChange={handleSearchInputChange} // Set up change handler for the input
                        />
                    </div>
                </div>
                <div className='brand-model__right-controls-wrapper'>
                    <button className='brand-model__insert' title='Add Brand' onClick={() => isSetAddBrandModalOpen(true)}>
                        <i className="brand-model__insert-icon fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>

            <div className='brand-model__body'>
                <div className='brand-model__table-wrapper'>
                    <table className='brand-model__table'>
                        <thead>
                            <tr>
                                <th className='brand-model__table-th'>Brands</th>
                                <th className='brand-model__table-th'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBrands.map((brand) => ( // Use filtered brands for display
                                <tr className='brand-model__table-tr' key={brand.brandId}>
                                    <td className='brand-model__table-td'>{brand.name}</td>
                                    <td className='brand-model__table-td'>
                                        <EditIcon onClick={() => openEditBrandModal(brand)} />
                                        {/* <DeleteIcon onClick={() => handleDeleteBrand(brand.brandId)} /> */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isAddBrandModalOpen && (
                <AddBrandModal
                    onClick={() => isSetAddBrandModalOpen(false)}
                    onSubmit={handleAddBrand} // Pass the function to insert the brand
                />
            )}

            {isEditBrandModalOpen && selectedBrand && (
                <EditBrandModal
                    onClick={() => isSetEditBrandModalOpen(false)}
                    onSubmit={(newBrandName) => handleEditBrand(selectedBrand.brandId, newBrandName)} // Pass the function to handle editing a brand
                    initialBrand={selectedBrand.name} // Pass the current brand name for editing
                />
            )}
        </div>
    );
};

export default BrandModel;
