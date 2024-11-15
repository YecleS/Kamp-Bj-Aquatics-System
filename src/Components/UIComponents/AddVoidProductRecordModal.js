import React, { useState, useEffect } from 'react';
import '../Styles/Modal.css';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { ToastContainer } from 'react-toastify';
import DefaultImagePreview from '../Assets/image-preview.png';
import { ToastSuccess, ToastError } from '../UIComponents/ToastComponent';


const AddVoidProductRecordModal = ({ onClick, exit, product , refresh }) => {
  const [imagePreview, setImagePreview] = useState(DefaultImagePreview);
  const apiUrl = process.env.REACT_APP_API_URL;

  const initialValues = {
    receiptImage: null,
    description: '',
    quantity: '',
    date: '',
  };

  const validationSchema = Yup.object({
    receiptImage: Yup.mixed().required('Proof of product defect is required'),
    description: Yup.string().required('Reason for voiding is required'),
    quantity: Yup.number().required('Product quantity is required').positive('Invalid Input'),
    date: Yup.date().required('Date is required'),
  });

  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    setFieldValue('receiptImage', file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const insertRecord = async (values, { resetForm }) => {
    try {
      
      const formData = new FormData();
      formData.append('userId', localStorage.getItem('userId'));
      formData.append('productId', product.productId);
      formData.append('name', product.productName);
      formData.append('description', values.description);
      formData.append('quantity', values.quantity);
      formData.append('date', values.date);
      if (values.receiptImage) {
        formData.append('receiptImage', values.receiptImage);
      }
  
      const response = await fetch(`${apiUrl}ampBJ-api/server/insertVoidRecord.php`, {
        method: 'POST',
        body: formData,
      });
  
      const result = await response.json();
  
      if (result.success) {
        ToastSuccess(result.message);
        resetForm();
        onClick();
        refresh()
        exit();
      } else {
        ToastError(result.message);
      }
    } catch (error) {
      ToastError("Failed to save record. Try again.");
    }
  };
  

  return (
    <div className='modal'>
      <div className='modal__wrapper'>
        <i className="modal__close-icon fa-solid fa-xmark" onClick={onClick}></i>
        <div className='modal__body'>
          <Formik initialValues={initialValues} onSubmit={insertRecord} validationSchema={validationSchema}>
            {({ setFieldValue }) => (
              <Form className='modal__form'>

                <div className='modal__input-field-wrapper'>
                  <div className='modal__image-preview-wrapper'>
                    <img src={imagePreview} className='modal__image-preview' />
                  </div>

                  <input
                    type='file'
                    name='receiptImage'
                    accept='image/jpg, image/jpeg, image/png'
                    onChange={(event) => handleImageChange(event, setFieldValue)}
                    id='fileInput'
                    className='modal__image-input'
                  />
                  
                  <ErrorMessage name='receiptImage' component='span' className='modal__input-field-error' />
                </div>

                <div className='modal__input-field-wrapper'>
                  <Field type='text' name='description' placeholder='Description' className='modal__input-field' />
                  <ErrorMessage name='description' component='span' className='modal__input-field-error' />
                </div>

                <div className='modal__input-field-wrapper'>
                  <Field type='number' name='quantity' placeholder='Enter number of items' className='modal__input-field' />
                  <ErrorMessage name='quantity' component='span' className='modal__input-field-error' />
                </div>

                <div className='modal__input-field-wrapper'>
                  <Field type='date' name='date' className='modal__input-field' />
                  <ErrorMessage name='date' component='span' className='modal__input-field-error' />
                </div>

                <button type='submit' className='modal__insert'>Save Record</button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddVoidProductRecordModal;
