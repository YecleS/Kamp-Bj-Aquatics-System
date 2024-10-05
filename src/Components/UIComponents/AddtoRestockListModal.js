import React from 'react';
import '../Styles/Modal.css';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';

const AddToRestockListModal = ({ onClick, product, addToRestockList }) => {
  // Initial Values
  const initialValues = {
    quantity: 1,
    unitPrice: 0, // Default value for unitPrice
  };

  // Validation
  const validationSchema = Yup.object({
    quantity: Yup.number().required('Quantity is Required').moreThan(0, 'Invalid Quantity'),
    unitPrice: Yup.number().required('Unit Price is Required').moreThan(0, 'Invalid Unit Price'),
  });

  // Method For Insertion of Values To Database
  const handleAddToRestockList = (values, { resetForm }) => {
    addToRestockList(values.quantity, values.unitPrice); // Pass quantity and unitPrice to parent component
    resetForm();
    onClick();
  };

  return (
    <div className='modal'>
      <div className='modal__wrapper'>
        <i className="modal__close-icon fa-solid fa-xmark" onClick={onClick}></i>
        <div className='modal__body'>
          <p className='modal__product-name'>{product?.productName}</p>
          <Formik initialValues={initialValues} onSubmit={handleAddToRestockList} validationSchema={validationSchema}>
            {() => (
              <Form className='modal__form'>
                <div className='modal__input-field-wrapper'>
                  <Field type='number' name='quantity' placeholder='Enter Quantity' className='modal__input-field' />
                  <ErrorMessage name='quantity' component='span' className='modal__input-field-error' />
                </div>
                <div className='modal__input-field-wrapper'>
                  <Field type='number' name='unitPrice' placeholder='Enter Unit Price' className='modal__input-field' />
                  <ErrorMessage name='unitPrice' component='span' className='modal__input-field-error' />
                </div>
                <button type='submit' className='modal__insert'>Add To Restock List</button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default AddToRestockListModal;
