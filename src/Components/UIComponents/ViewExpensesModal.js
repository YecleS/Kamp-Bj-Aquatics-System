import React from 'react';
import '../Styles/ViewExpensesModal.css';
import ButtonComponent from './ButtonComponent';
import ImagePreview from '../Assets/image-preview.png';

const ViewExpensesModal = ({expenses, onClick}) => {

  const imageUrl = expenses.receiptImage
  ? `http://localhost/KampBJ-api/server/uploads/expenseReceipts/${expenses.receiptImage}` 
  : ImagePreview;

  return (
    <div className='view-expenses-modal'>
      <div className='view-expenses-modal_wrapper'>
        <div className='view-expenses-modal__img-wrapper'>
          <img src={imageUrl} alt={expenses.title} className='view-expenses-modal__img'/>
        </div>
        <div className='view-expenses-modal__details-wrapper'>
          <h3 className='view-expenses-modal__title'>{expenses.title}</h3>
          <h5 className='view-expenses-modal__title'>Reference Number : {expenses.reference}</h5>
          <p className='view-expenses-modal__description'>{expenses.description}</p>
          
          <p className='view-expenses-modal__label'>Date</p>
          <p className='view-expenses-modal__brand'>{expenses.date}</p>

          <p className='view-expenses-modal__label'>Price</p>
          <p className='view-expenses-modal__price'>₱ {expenses.total}</p>

          <ButtonComponent buttonCustomClass='view-expenses-modal__back-button' label='Back' onClick={onClick} />
        </div>
      </div>
    </div>
  )
}

export default ViewExpensesModal
