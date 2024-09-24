import React, { useState, useRef, useEffect } from 'react';
import '../Styles/Pos.css';
import AddToCartModal from '../UIComponents/AddToCartModal';
import ProductCard from '../UIComponents/ProductCard';

const Pos = () => {
    const[isFilterDropdownOpen, isSetFilterDropdownOpen] = useState(false)
    const[isAddToCartModalOpen, isSetAddToCartOpen] = useState(false)
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

    //Toggle AddToCartModal
    const toggleAddToCartModal = () => {
      isSetAddToCartOpen(!isAddToCartModalOpen);
    }
   

    //Dummy Data 
    const dummyData = [
      { id: 1, product: 'gatoradesd blue 25ml', description:" A refreshing sports drink, Gatorade Blue (25ml) is perfect for hydration and replenishing electrolytes. With its crisp blue flavor, it's a great choice for staying energized during workouts or daily activities. ", 
          brand: 'Oishi', 
          model: '3XCCS5',
          category: 'Equipment',
          supplier: 'supplier',
          stocks: 30,
          procured: 540.54,
          markup: '10%',      
          price: 25
      },

      { id: 2, product: 'gatoradesd blue 25ml', description:" A refreshing sports drink, Gatorade Blue (25ml) is perfect for hydration and replenishing electrolytes. With its crisp blue flavor, it's a great 		choice for staying energized during workouts or daily activities. ", 
          brand: 'Oishi', 
          model: '3XCCS5',
          category: 'Equipment',
          supplier: 'supplier',
          stocks: 30,
          procured: 540.54,
          markup: '10%',      
          price: 25
      },

      { id: 3, product: 'gatoradesd blue 25ml', description:" A refreshing sports drink, Gatorade Blue (25ml) is perfect for hydration and replenishing electrolytes. With its crisp blue flavor, it's a great choice for staying energized during workouts or daily activities. ", 
          brand: 'Oishi', 
          model: '3XCCS5',
          category: 'Equipment',
          supplier: 'supplier',
          stocks: 30,
          procured: 540.54,
          markup: '10%',      
          price: 25
      },

      { id: 4, product: 'gatoradesd blue 25ml', description:" A refreshing sports drink, Gatorade Blue (25ml) is perfect for hydration and replenishing electrolytes. With its crisp blue flavor, it's a great choice for staying energized during workouts or daily activities. ", 
        brand: 'Oishi', 
        model: '3XCCS5',
        category: 'Equipment',
        supplier: 'supplier',
        stocks: 30,
        procured: 540.54,
        markup: '10%',      
        price: 25
    },

    { id: 5, product: 'gatoradesd blue 25ml', description:" A refreshing sports drink, Gatorade Blue (25ml) is perfect for hydration and replenishing electrolytes. With its crisp blue flavor, it's a great 		choice for staying energized during workouts or daily activities. ", 
        brand: 'Oishi', 
        model: '3XCCS5',
        category: 'Equipment',
        supplier: 'supplier',
        stocks: 30,
        procured: 540.54,
        markup: '10%',      
        price: 25
    },

    { id: 6, product: 'gatoradesd blue 25ml', description:" A refreshing sports drink, Gatorade Blue (25ml) is perfect for hydration and replenishing electrolytes. With its crisp blue flavor, it's a great choice for staying energized during workouts or daily activities. ", 
        brand: 'Oishi', 
        model: '3XCCS5',
        category: 'Equipment',
        supplier: 'supplier',
        stocks: 30,
        procured: 540.54,
        markup: '10%',      
        price: 25
    },

    {id: 7, product: 'gatoradesd blue 25ml', description:" A refreshing sports drink, Gatorade Blue (25ml) is perfect for hydration and replenishing electrolytes. With its crisp blue flavor, it's a great choice for staying energized during workouts or daily activities. ", 
      brand: 'Oishi', 
      model: '3XCCS5',
      category: 'Equipment',
      supplier: 'supplier',
      stocks: 30,
      procured: 540.54,
      markup: '10%',      
      price: 25
    },

    {id: 8, product: 'gatoradesd blue 25ml', description:" A refreshing sports drink, Gatorade Blue (25ml) is perfect for hydration and replenishing electrolytes. With its crisp blue flavor, it's a great choice for staying energized during workouts or daily activities. ", 
      brand: 'Oishi', 
      model: '3XCCS5',
      category: 'Equipment',
      supplier: 'supplier',
      stocks: 30,
      procured: 540.54,
      markup: '10%',      
      price: 25
    },

    {id: 9, product: 'gatoradesd blue 25ml', description:" A refreshing sports drink, Gatorade Blue (25ml) is perfect for hydration and replenishing electrolytes. With its crisp blue flavor, it's a great choice for staying energized during workouts or daily activities. ", 
      brand: 'Oishi', 
      model: '3XCCS5',
      category: 'Equipment',
      supplier: 'supplier',
      stocks: 30,
      procured: 540.54,
      markup: '10%',      
      price: 25
    },
      
  ]
    
    
    // Handle Closing of Dropdowns When Clicked Outside of Its Div
    useEffect (() => {
        let handler = (e) => {
        if(filterDropdownRef.current && !filterDropdownRef.current.contains(e.target)){
            isSetFilterDropdownOpen(false);
          };
        };
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
    <div className='pos'>
      <div className='pos__header'>
        <div className='pos__search-wrapper'>
            <input type='text' placeholder='Search' className='pos__input-field'/>
         </div>
        <div className='pos__filter-wrapper' ref={filterDropdownRef}>
            <i className="pos__filter-icon fa-solid fa-filter" onClick={toggleFilterDropdown}></i>
            {isFilterDropdownOpen &&
                <div className='pos__filter-dropdown'>
                    <div className='pos__filter-dropdown-body'>
                        <div className='pos__filter-dropdown-field-wrapper'>
                            <p className='pos__filter-label'>Filter by</p>
                            <select value={filters.filterBy} 
                            onChange={(e) => setFilters({ ...filters, filterBy: e.target.value })} 
                            className='pos__filter-field'
                            >
                                <option></option>
                                <option value='name' >Name</option>
                                <option value='date' >Date</option>
                                <option value='price' >Price</option>
                            </select>
                        </div>
                    </div>
                    <div className='pos__filter-dropdown-footer'>
                    <p className='pos__filter-reset' onClick={resetFilters}>Reset Filters</p>
                    </div>
                </div>
            }
        </div>
      </div>

      <div className='pos__body'>
        <div className='pos__content-wrapper'>
          <div className='pos__inventory-wrapper'>
            {dummyData.map((products => 
              <ProductCard 
                key={products.id} 
                product={products}
                
              />
            ))}
          </div>

          <div className='pos__orders-wrapper'>
            <h5 className='pos__table-title'>Orders list</h5>
            <div className='pos__orders-table-wrapper'>
              <table className='pos__table'>
                <thead>
                  <tr>
                    <th className='pos__table-th'>Name</th>
                    <th className='pos__table-th'>Brand</th>
                    <th className='pos__table-th'>Model</th>
                    <th className='pos__table-th'>Price</th>
                    <th className='pos__table-th'></th>
                  </tr>
                </thead>
                <tbody>
                    <tr className='pos__table-tr'>
                      <td className='pos__table-td'>asdasd</td>
                      <td className='pos__table-td'>asdasd</td>
                      <td className='pos__table-td'>asdasd</td>
                      <td className='pos__table-td'>asdasdasd</td>
                      <td className='suppliers__table-td'><i className="pos__icon-td fa-solid fa-trash"></i></td>
                    </tr>
                </tbody>
              </table>
            </div>
            <div className='pos__orders-details'>
              <div className='pos__billing-details-wrapper'>
                <p className='pos__bill-label'>Sub Total</p>
                <p className='pos__bill-label'>₱ 325.00</p>
              </div>
              <div className='pos__billing-details-wrapper'>
                <p className='pos__bill-label'>Total</p>
                <p className='pos__bill-label'>₱ 325.00</p>
              </div>
              <button className='pos__checkout'>Checkout</button>
            </div>     
          </div>
          
        </div>    
        
      </div>
      {isAddToCartModalOpen && <AddToCartModal onClick={toggleAddToCartModal}/>}
    </div>
  )
}

export default Pos
