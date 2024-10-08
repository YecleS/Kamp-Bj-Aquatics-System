import React from 'react';
import '../Styles/Modal.css';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';

const VoidedProductsModal = ({onClick}) => {
    //Initial Values 
    const initialValues = {
        product: "",
        brand: "",
        model: "",
        quantity: "",
        description: "",
    }

    //Validation
    const validationSchema = Yup.object ({
        product: Yup.string().required('Product Name is Required').matches(/^[a-zA-Z0-9\s]*$/, 'Special Chars are not Allowed'),
        brand: Yup.string().matches(/^[a-zA-Z0-9\s]*$/, 'Special Chars are not Allowed'),
        model: Yup.string().matches(/^[a-zA-Z0-9\s]*$/, 'Special Chars are not Allowed'),
        quantity: Yup.number().required('Quantity is Required').moreThan(0, 'Invalid Quantity'),
        description: Yup.string().required('Description is Required'),
    })

    //Message for Successful Insertion
    const successMessage = () => {
        toast.success('Product Voided', {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        });
    } 

    //Method For Insertion of Values To Database
    //The Values Can Be Destructured To Store it Individually To the Database (if necessary)
    //Refer to Login.js 
    const voidProduct = (Values, {resetForm}) => {
        successMessage();
        resetForm();
    }
  return (
    <div className='modal'>
      <div className='modal__wrapper'>
        <i className="modal__close-icon fa-solid fa-xmark" onClick={onClick}></i>
        <div className='modal__body'>
          <Formik initialValues={initialValues} onSubmit={voidProduct} validationSchema={validationSchema} >
            {() => (
              <Form className='modal__form'>

                <div className='modal__input-field-wrapper'>
                  <Field type='text' name='product' placeholder='Enter Product Name' className='modal__input-field'/>
                  <ErrorMessage name='product' component='span' className='modal__input-field-error' />
                </div>

                <div className='modal__input-field-wrapper'>
                  <Field type='text' name='brand' placeholder='Enter Brand' className='modal__input-field'/>
                  <ErrorMessage name='brand' component='span' className='modal__input-field-error' />
                </div>

                <div className='modal__input-field-wrapper'>
                  <Field type='text' name='model' placeholder='Enter Model' className='modal__input-field'/>
                  <ErrorMessage name='model' component='span' className='modal__input-field-error' />
                </div>

                <div className='modal__input-field-wrapper'>
                  <Field type='number' name='quantity' placeholder='Enter Quantity' className='modal__input-field'/>
                  <ErrorMessage name='quantity' component='span' className='modal__input-field-error' />
                </div>

                <div className='modal__input-field-wrapper'>
                  <Field as='textarea' name='description' placeholder='Enter Description' className='modal__input-field'/>
                  <ErrorMessage name='description' component='span' className='modal__input-field-error' />
                </div>
                 
                <button type='submit' className='modal__insert'>Void</button>
              </Form>
            )}        
          </Formik>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default VoidedProductsModal
