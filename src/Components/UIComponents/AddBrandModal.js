import React, { useState } from 'react';
import '../Styles/Modal.css';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { ToastSuccess } from './ToastComponent';

const AddBrandModal = ({onClick}) => {

    //Initial Values 
    const initialValues = {
        brand: '',
        model: ''
    }

    //Validation di ko nilagyan ng required validation ung brand and model kase may mga products na walang brand or model
    const validationSchema = Yup.object ({
        brand: Yup.string().matches(/^[a-zA-Z0-9\s]*$/, 'Special Chars are not Allowed'),
        model: Yup.string().matches(/^[a-zA-Z0-9\s]*$/, 'Special Chars are not Allowed'),
    })

    const insert = (Values, {resetForm}) => {
        console.log(Values);
        ToastSuccess('Successfully Added');
        resetForm();
    }

  return (
    <div className='modal'>
      <div className='modal__wrapper'>
        <i className="modal__close-icon fa-solid fa-xmark" onClick={onClick}></i>
        <div className='modal__body'>
          <Formik initialValues={initialValues} onSubmit={insert} validationSchema={validationSchema} >

            {() => (
              <Form className='modal__form'>

                <div className='modal__input-field-wrapper'>     
                  <div className='modal__supplier-products-wrapper'>
                    <Field as='input' list='brand-list' name='brand' placeholder='Enter Brand' className='modal__input-field' />
                    <datalist id='brand-list'>
                      <option value='Suzuki' />
                      <option value='Kawasaki' />
                    </datalist>
                  </div>
                  <ErrorMessage name='brand' component='span' className='modal__input-field-error' />
                </div>

                <div className='modal__input-field-wrapper'>
                  <Field type='text' name='model' placeholder='Enter Model' className='modal__input-field'/>
                  <ErrorMessage name='model' component='span' className='modal__input-field-error' />
                </div>

                <button type='submit' className='modal__insert'>Insert</button>
              </Form>
            )}        
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default AddBrandModal
