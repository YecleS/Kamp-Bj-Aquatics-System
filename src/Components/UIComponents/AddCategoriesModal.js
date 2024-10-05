import React, { useState } from 'react';
import '../Styles/Modal.css';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { ToastSuccess } from './ToastComponent';

const AddCategoriesModal = ({onClick}) => {
   //Initial Values 
   const initialValues = {
    categories: '',
  }

  //Validation di ko nilagyan ng required validation ung brand and model kase may mga products na walang brand or model
  const validationSchema = Yup.object ({
    categories: Yup.string().matches(/^[a-zA-Z0-9\s]*$/, 'Special Chars are not Allowed'),
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
                  <Field type='text' name='categories' placeholder='Enter Category' className='modal__input-field'/>
                  <ErrorMessage name='categories' component='span' className='modal__input-field-error' />
                </div>

                <button type='submit' className='modal__insert'>Insert Category</button>
              </Form>
            )}        
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default AddCategoriesModal
