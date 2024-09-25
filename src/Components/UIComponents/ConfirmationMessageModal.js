import React from 'react';
import '../Styles/Modal.css';
import ButtonComponent from './ButtonComponent';


const ConfirmationMessageModal = ({message, onClickProceed, onClickCancel}) => {
  return (
    <div className='modal'>
        <div className='modal__wrapper confirmation-wrapper'>
            <h4 className='modal__message'>{message}</h4>

            <div className='modal__confirmation-button-wrapper'>
                <ButtonComponent buttonCustomClass='modal__btn-proceed' label='Proceed' onClick={onClickProceed} />
                <ButtonComponent buttonCustomClass='modal__btn-proceed' label='Cancel' onClick={onClickCancel} />
            </div>
        </div>
        
    </div>
  )
}

export default ConfirmationMessageModal
