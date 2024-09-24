import React from 'react';
import '../Styles/ViewExpensesModal.css';
import ButtonComponent from './ButtonComponent';
import ImagePreview from '../Assets/image-preview.png';

const ViewExpensesModal = ({expenses, onClick}) => {
  return (
    <div className='view-expenses-modal'>
      <div className='view-expenses-modal_wrapper'>
        <div className='view-expenses-modal__img-wrapper'>
          <img src={ImagePreview} className='view-expenses-modal__img'/>
        </div>
        <div className='view-expenses-modal__details-wrapper'>
          <h3 className='view-expenses-modal__title'>{expenses.name}</h3>
          <p className='view-expenses-modal__description'>{expenses.description}</p>
          
          <p className='view-expenses-modal__label'>Date</p>
          <p className='view-expenses-modal__brand'>{expenses.date}</p>

          <p className='view-expenses-modal__label'>Time</p>
          <p className='view-expenses-modal__model'>{expenses.time}</p>

          <p className='view-expenses-modal__label'>Price</p>
          <p className='view-expenses-modal__price'>₱ {expenses.price}</p>

          <ButtonComponent buttonCustomClass='view-expenses-modal__back-button' label='Back' onClick={onClick} />
        </div>
      </div>
    </div>
  )
}

export default ViewExpensesModal
