import React, { useState, useRef, useEffect } from 'react';
import '../Styles/BrandModel.css';
import AddBrandModal from '../UIComponents/AddBrandModal';
import EditBrandModal from './EditBrandModal';
import { EditIcon } from '../UIComponents/ActionIcons';

const BrandModel = () => {
    const[isFilterDropdownOpen, isSetFilterDropdownOpen] = useState(false);
    const [isAddBrandModalOpen, isSetAddBrandModalOpen] = useState(false);
    const [isEditBrandModalOpen, isSetEditBrandModalOpen] = useState(false);
    const filterDropdownRef = useRef(null);

    //Initial Values For Filters Store In useState
    const[filters, setFilters] = useState({
        filterBy: '',
    })

    // Toggle Dropdowns
    const toggleFilterDropdown = () => {
        isSetFilterDropdownOpen(!isFilterDropdownOpen);
    }

    const toggleAddBrandModal = () => {
        isSetAddBrandModalOpen(!isAddBrandModalOpen);
    }

    const toggleEditBrandModal = () => {
        isSetEditBrandModalOpen(!isEditBrandModalOpen);
    }

    // Dummy Data For Table 
    const brandModelData = [
        { id: 1, 
        brand: 'Suzuki',
        model: 'GX1033'
        },

        { id: 2, 
        brand: 'Suzuki', 
        model: 'ZX1033'
        },
        { id: 3, 
            brand: 'Kawasaki',
            model: 'DX103'
        },
        { id: 4, 
            brand: 'Kawasaki', 
            model: 'ZX1034X'
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
    <div className='brand-model'>

      <div className='brand-model__header'>
        <div className='brand-model__left-controls-wrapper'>
          <div className='brand-model__search-wrapper'>
            <input type='text' placeholder='Search' className='brand-model__input-field'/>
          </div>
        </div>
        <div className='brand-model__right-controls-wrapper'>
          <button className='brand-model__insert' onClick={toggleAddBrandModal}><i className="brand-model__insert-icon fa-solid fa-plus"></i></button>
        </div>
      </div>

      <div className='brand-model__body'>
        <div className='brand-model__table-wrapper'>
          <table className='brand-model__table'>
            <thead>
              <tr>
                <th className='brand-model__table-th'>Brands</th>
                <th className='brand-model__table-th'>Models</th>
                <th className='brand-model__table-th'></th>
              </tr>
            </thead>
            <tbody>
              {brandModelData.map((brandModel =>
                  <tr className='brand-model__table-tr' key={brandModel.id} >
                    <td className='brand-model__table-td'>{brandModel.brand}</td>
                    <td className='brand-model__table-td'>{brandModel.model}</td>
                    <td className='brand-model__table-td'><EditIcon onClick={toggleEditBrandModal} /></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
        {isAddBrandModalOpen && <AddBrandModal onClick={toggleAddBrandModal} />}
        {isEditBrandModalOpen && <EditBrandModal onClick={toggleEditBrandModal} />}
    </div>
  )
}

export default BrandModel
