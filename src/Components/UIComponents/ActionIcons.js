import React, { useState } from 'react';
import '../Styles/ActionIcons.css';
import ViewProductsModal from './ViewProductsModal';
import ViewExpensesModal from './ViewExpensesModal';

//For viewing of products
export const ViewProductIcon = ({products}) => {
    const [isViewProductsModalOpen, isSetViewProductsModalOpen] = useState(false);

    const toggleViewProductsModal = () => {
        isSetViewProductsModalOpen(!isViewProductsModalOpen);
    }

  return (
    <>
        <i className="action-icons fa-solid fa-eye" onClick={toggleViewProductsModal}></i>
        {isViewProductsModalOpen && <ViewProductsModal products={products} onClick={toggleViewProductsModal} />}
    </>
  )
}

//For viewing of expenses
export const ViewExpensesIcon = ({expenses}) => {
  const [isViewExpensesModalOpen, isSetViewExpensesModalOpen] = useState(false);

  const toggleViewExpensesModal = () => {
    isSetViewExpensesModalOpen(!isViewExpensesModalOpen);
  }

  return (
    <>
        <i className="action-icons fa-solid fa-eye" onClick={toggleViewExpensesModal}></i>
        {isViewExpensesModalOpen && <ViewExpensesModal expenses={expenses} onClick={toggleViewExpensesModal}/>}
    </>
  )
}

//For right icon
export const RestockProductRightIcon = ({onClick}) => {
  return (
    <i className="action-icons fa-solid fa-arrow-right" onClick={onClick}></i>
  )
}

//For delete icon
export const DeleteIcon = ({onClick}) => {
  return (
    <i className="action-icons fa-solid fa-trash" onClick={onClick}></i>
  )
}

//For Edit icon
export const EditIcon = ({onClick}) => {
  return (
    <i className="action-icons fa-solid fa-pen-to-square" onClick={onClick}></i>
  )
}