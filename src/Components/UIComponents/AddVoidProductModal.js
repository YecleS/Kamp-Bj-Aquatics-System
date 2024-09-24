import React, { useState } from 'react';
import '../Styles/Modal.css';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { ToastContainer } from 'react-toastify';
import { ToastSuccess } from '../UIComponents/ToastComponent';

const AddVoidProductModal = ({onClick}) => {

    //Initial Values 
    const initialValues = {
        product: "",
        brand: "",
        model: "",
        quantity: 0,
        reason: "",
    }

    //Validation di ko nilagyan ng required validation ung brand and model kase may mga products na walang brand or model
    const validationSchema = Yup.object ({
        product: Yup.string().required('Product Name is Required').matches(/^[a-zA-Z0-9\s]*$/, 'Special Chars are not Allowed'),
        brand: Yup.string().matches(/^[a-zA-Z0-9\s]*$/, 'Special Chars are not Allowed'),
        model: Yup.string().matches(/^[a-zA-Z0-9\s]*$/, 'Special Chars are not Allowed'),
        quantity: Yup.number().required('Quantity is Required').moreThan(0, 'Invalid Quantity'),    
        reason: Yup.string().required('Description is Required'),
    })

    const insert = (Values, {resetForm}) => {
        console.log(Values);

        /* Call toast success and enter the message, import the ToastComponent.js FIRST */
        ToastSuccess('Product Added');

        resetForm();
    }

  return (
    <div className='modal'>
      <div className='modal__wrapper'>
        <i className="modal__close-icon fa-solid fa-xmark" onClick={onClick}></i>
        <div className='modal__body'>
          <Formik initialValues={initialValues} onSubmit={insert} validationSchema={validationSchema} >

            {({ setFieldValue }) => (
              <Form className='modal__form'>

                <div className='modal__input-field-wrapper'>
                  <Field as='input' list='product-list' name='product' placeholder='Enter product' className='modal__input-field' />
                  <datalist id='product-list'>
                    <option value='Nike' />
                    <option value='Adidas' />
                    <option value='Puma' />
                    <option value='Reebok' />
                    <option value='Under Armour' />
                  </datalist>
                  <ErrorMessage name='product' component='span' className='modal__input-field-error' />
                </div>

                <div className='modal__input-field-wrapper'>
                  <Field as='input' list='brand-list' name='brand' placeholder='Enter brand' className='modal__input-field' />
                  <datalist id='brand-list'>
                    <option value='Equipment' />
                    <option value='Pets' />
                  </datalist>
                  <ErrorMessage name='brand' component='span' className='modal__input-field-error' />
                </div>

                <div className='modal__input-field-wrapper'>
                  <Field as='input' list='model-list' name='model' placeholder='Enter model' className='modal__input-field' />
                  <datalist id='model-list'>
                    <option value='XXCZ2' />
                    <option value='ZXCCDDD' />
                  </datalist>
                  <ErrorMessage name='model' component='span' className='modal__input-field-error' />
                </div>
                
                <div className='modal__input-field-wrapper'>
                  <Field type='number' name='quantity' placeholder='Enter quantity' className='modal__input-field'/>
                  <ErrorMessage name='quantity' component='span' className='modal__input-field-error' />
                </div>

                <div className='modal__input-field-wrapper'>
                  <Field component='textarea' name='reason' placeholder='Enter reason' className='modal__input-field description'/>
                  <ErrorMessage name='reason' component='span' className='modal__input-field-error' />
                </div>

                <button type='submit' className='modal__insert'>Void Product</button>
              </Form>
            )}        
          </Formik>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default AddVoidProductModal
