import React, { useState, useRef, useEffect } from 'react';
import '../Styles/Categories.css';
import AddCategoriesModal from '../UIComponents/AddCategoriesModal';
import EditCategoriesModal from '../UIComponents/EditCategoriesModal';
import { EditIcon } from '../UIComponents/ActionIcons';

const Categories = () => {
    const[isFilterDropdownOpen, isSetFilterDropdownOpen] = useState(false);
    const [isAddCategoryModalOpen, isSetAddCategoryModalOpen] = useState(false);
    const [isEditCategoryModalOpen, isSetEditCategoryModalOpen] = useState(false);
    const filterDropdownRef = useRef(null);

    //Initial Values For Filters Store In useState
    const[filters, setFilters] = useState({
        filterBy: '',
    })

    // Toggle Dropdowns
    const toggleFilterDropdown = () => {
        isSetFilterDropdownOpen(!isFilterDropdownOpen);
    }

    const toggleAddCategoriesModal = () => {
        isSetAddCategoryModalOpen(!isAddCategoryModalOpen);
    }

    const toggleEditCategoryModal = () => {
        isSetEditCategoryModalOpen(!isEditCategoryModalOpen);
    }

    // Dummy Data For Table 
    const categoriesData = [
        { 
            id: 1, 
            categories: 'Equipment',        
        },
        { 
            id: 2, 
            categories: 'Accessories',         
        },
        { 
            id: 3, 
            categories: 'Essentials',
        },
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
  return (
    <div className='categories'>

      <div className='categories__header'>
        <div className='categories__left-controls-wrapper'>
          <div className='categories__search-wrapper'>
            <input type='text' placeholder='Search' className='categories__input-field'/>
          </div>
        </div>
        <div className='categories__right-controls-wrapper'>
          <button className='categories__insert' onClick={toggleAddCategoriesModal}><i className="categories__insert-icon fa-solid fa-plus"></i></button>
        </div>
      </div>

      <div className='categories__body'>
        <div className='categories__table-wrapper'>
          <table className='categories__table'>
            <thead>
              <tr>
                <th className='categories__table-th'>Categories</th>
                <th className='categories__table-th'></th>
              </tr>
            </thead>
            <tbody>
              {categoriesData.map((categories =>
                  <tr className='categories__table-tr' key={categories.id} >
                    <td className='categories__table-td'>{categories.categories}</td>
                    <td className='categories__table-td'><EditIcon onClick={toggleEditCategoryModal} /></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {isAddCategoryModalOpen && <AddCategoriesModal onClick={toggleAddCategoriesModal} />}
      {isEditCategoryModalOpen && <EditCategoriesModal onClick={toggleEditCategoryModal}  />}
    </div>
  )
}

export default Categories
