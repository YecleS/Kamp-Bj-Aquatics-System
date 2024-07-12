import React from 'react';
import '../Styles/Modal.css';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';

const AddUtilitiesModal = ({onClick}) => {
    //Initial Values 
    const initialValues = {
        name: "",
        date: "",
        total: "",
    }

    //Validation
    const validationSchema = Yup.object ({
        name: Yup.string().required('Utility Name is Required').matches(/^[a-zA-Z0-9\s]*$/, 'Special Chars are not Allowed'),
        date: Yup.string().required('Date is Required'),
        total: Yup.number().required('Total is Required').moreThan(0, 'Invalid Total'),
    })

    //Message for Successful Insertion
    const successMessage = () => {
        toast.success('Utility Added', {
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
    const insert = (Values, {resetForm}) => {
        successMessage();
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
                  <Field type='text' name='name' placeholder='Enter Utilites Name' className='modal__input-field'/>
                  <ErrorMessage name='name' component='span' className='modal__input-field-error' />
                </div>

                <div className='modal__input-field-wrapper'>
                  <Field type='date' name='date' className='modal__input-field'/>
                  <ErrorMessage name='date' component='span' className='modal__input-field-error' />
                </div>  

                <div className='modal__input-field-wrapper'>
                  <Field type='number' name='total' placeholder='Enter Total' className='modal__input-field'/>
                  <ErrorMessage name='total' component='span' className='modal__input-field-error' />
                </div>
                 
                <button type='submit' className='modal__insert'>Add Utility</button>
              </Form>
            )}        
          </Formik>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default AddUtilitiesModal
