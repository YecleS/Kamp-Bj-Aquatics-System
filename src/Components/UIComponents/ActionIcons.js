import React, { useState } from 'react';
import '../Styles/ActionIcons.css';
import ViewVoidedProduct from './ViewVoidedProductsModal';
import ViewProductsModal from './ViewProductsModal';
import ViewExpensesModal from './ViewExpensesModal';

//For viewing of products
export const ViewProductIcon = ({ products }) => {
  const [isViewProductsModalOpen, setViewProductsModalOpen] = useState(false);

  const toggleViewProductsModal = () => {
    setViewProductsModalOpen(!isViewProductsModalOpen);
  };

  return (
    <>
      <i className="action-icons fa-solid fa-eye" title='View Product' onClick={toggleViewProductsModal}></i>
      {isViewProductsModalOpen && <ViewProductsModal products={products} onClick={toggleViewProductsModal} />}
    </>
  );
};

//For viewing of voided products
export const ViewVoidedProductIcon = ({ products }) => {
  const [isViewVoidedProductsModalOpen, setViewVoidedProductsModalOpen] = useState(false);

  const toggleViewVoidedProductsModal = () => {
    setViewVoidedProductsModalOpen(!isViewVoidedProductsModalOpen);
  };

  return (
    <>
      <i className="action-icons fa-solid fa-eye" onClick={toggleViewVoidedProductsModal}></i>
      {isViewVoidedProductsModalOpen && <ViewVoidedProduct products={products} onClick={toggleViewVoidedProductsModal} />}
    </>
  );
};

//For viewing of expenses
export const ViewExpensesIcon = ({ expenses }) => {
  const [isViewExpensesModalOpen, setViewExpensesModalOpen] = useState(false);

  const toggleViewExpensesModal = () => {
    setViewExpensesModalOpen(!isViewExpensesModalOpen);
  };

  return (
    <>
      <i className="action-icons fa-solid fa-eye" onClick={toggleViewExpensesModal}></i>
      {isViewExpensesModalOpen && <ViewExpensesModal expenses={expenses} onClick={toggleViewExpensesModal} />}
    </>
  );
};

//For right icon
export const RestockProductRightIcon = ({ onClick }) => {
  return (
    <i className="action-icons fa-solid fa-arrow-right" onClick={onClick}></i>
  );
};

//For delete icon
export const DeleteIcon = ({ onClick }) => {
  return (
    <i className="action-icons fa-solid fa-trash" onClick={onClick}></i>
  );
};

//For Edit icon
export const EditIcon = ({ onClick }) => {
  return (
    <i className="action-icons fa-solid fa-pen-to-square" onClick={onClick}></i>
  );
};
