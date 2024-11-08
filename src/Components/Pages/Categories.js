import React, { useState, useRef, useEffect } from 'react';
import '../Styles/Categories.css';
import AddCategoriesModal from '../UIComponents/AddCategoriesModal';
import EditCategoriesModal from '../UIComponents/EditCategoriesModal';
import { EditIcon, DeleteIcon } from '../UIComponents/ActionIcons';

const Categories = () => {
    const [isFilterDropdownOpen, isSetFilterDropdownOpen] = useState(false);
    const [isAddCategoryModalOpen, isSetAddCategoryModalOpen] = useState(false);
    const [isEditCategoryModalOpen, isSetEditCategoryModalOpen] = useState(false);
    const [categoriesData, setCategoriesData] = useState([]); // State to store fetched categories
    const [filteredCategories, setFilteredCategories] = useState([]); // State to store filtered categories based on search input
    const [searchTerm, setSearchTerm] = useState(''); // State to store the search term
    const [selectedCategory, setSelectedCategory] = useState(null); // State to hold the selected category for editing
    const filterDropdownRef = useRef(null);

    // Fetch categories from the API
    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost/KampBJ-api/server/fetchCategories.php');
            const data = await response.json();
            setCategoriesData(data.categories); // Assuming the response is { categories: [...] }
            setFilteredCategories(data.categories); // Set initial filtered data to full list
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    // Insert a new category via API call
    const handleAddCategory = async (categoryName) => {
        try {
            const response = await fetch('http://localhost/KampBJ-api/server/insertCategory.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    category: categoryName,
                }),
            });

            const result = await response.json();
            if (result.status === 'success') {
                fetchCategories(); // Refresh the categories after adding a new one
                console.log('Category added:', result.message);
            } else {
                console.log('Error adding category:', result.message);
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    // Edit an existing category via API call
    const handleEditCategory = async (categoryId, newCategoryName) => {
        try {
            const response = await fetch('http://localhost/KampBJ-api/server/updateCategory.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    id: categoryId,
                    category: newCategoryName,
                }),
            });

            const result = await response.json();
            if (result.status === 'success') {
                fetchCategories();  // Refresh the categories after editing
                console.log('Category updated:', result.message);
            } else {
                console.error('Error updating category:', result.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Delete an existing category via API call
    const handleDeleteCategory = async (categoryId) => {
        try {
            const response = await fetch('http://localhost/KampBJ-api/server/deleteCategory.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    id: categoryId,
                }),
            });

            const result = await response.json();
            if (result.status === 'success') {
                fetchCategories(); // Refresh the categories after deletion
                console.log('Category deleted:', result.message);
            } else {
                console.error('Error deleting category:', result.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Handle opening the edit modal and setting the selected category
    const openEditCategoryModal = (category) => {
        setSelectedCategory(category); // Set the category to be edited
        isSetEditCategoryModalOpen(true); // Open the modal
    };

    // Confirm deletion of a category
    const confirmDeleteCategory = (categoryId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this category?');
        if (confirmDelete) {
            handleDeleteCategory(categoryId);
        }
    };

    // Filter categories based on search term
    const handleSearch = (e) => {
        const searchValue = e.target.value.toLowerCase(); // Convert search term to lowercase for case-insensitive matching
        setSearchTerm(searchValue);

        const filtered = categoriesData.filter(category =>
            category.name.toLowerCase().includes(searchValue)
        );

        setFilteredCategories(filtered); // Update the filtered categories based on the search input
    };

    // Handle closing of dropdowns when clicked outside
    useEffect(() => {
        fetchCategories(); // Fetch categories on component mount

        let handler = (e) => {
            if (filterDropdownRef.current && !filterDropdownRef.current.contains(e.target)) {
                isSetFilterDropdownOpen(false);
            }
        };

        document.addEventListener('click', handler);
        return () => document.removeEventListener('click', handler);
    }, []);

    return (
        <div className='categories'>
            <div className='categories__header'>
                <div className='categories__left-controls-wrapper'>
                    <div className='categories__search-wrapper'>
                        <input 
                            type='text' 
                            placeholder='Search' 
                            className='categories__input-field' 
                            value={searchTerm}
                            onChange={handleSearch} // Call the search handler on input change
                        />
                    </div>
                </div>
                <div className='categories__right-controls-wrapper'>
                    <button className='categories__insert' onClick={() => isSetAddCategoryModalOpen(true)}>
                        <i className="categories__insert-icon fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>

            <div className='categories__body'>
                <div className='categories__table-wrapper'>
                    <table className='categories__table'>
                        <thead>
                            <tr>
                                <th className='categories__table-th'>Product Categories</th>
                                <th className='categories__table-th'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCategories.length > 0 ? (
                                filteredCategories.map((category) => (
                                    <tr className='categories__table-tr' key={category.categoryId}>
                                        <td className='categories__table-td'>{category.name}</td>
                                        <td className='categories__table-td'>
                                            <EditIcon onClick={() => openEditCategoryModal(category)} />
                                            {/* <DeleteIcon onClick={() => confirmDeleteCategory(category.categoryId)} /> */}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="2" className="categories__table-td--no-results">No categories found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {isAddCategoryModalOpen && (
                <AddCategoriesModal 
                    onClick={() => isSetAddCategoryModalOpen(false)} 
                    onSubmit={handleAddCategory} // Pass the function to insert the category
                />
            )}
            
            {isEditCategoryModalOpen && selectedCategory && (
                <EditCategoriesModal 
                    onClick={() => isSetEditCategoryModalOpen(false)} 
                    initialCategory={selectedCategory.name} // Prepopulate with current category name
                    onSubmit={(newCategoryName) => handleEditCategory(selectedCategory.categoryId, newCategoryName)} // Handle category edit
                />
            )}
        </div>
    );
};

export default Categories;
