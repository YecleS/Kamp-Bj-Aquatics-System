import React from 'react';
import '../Styles/Modal.css';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';

const EditSupplierModal = ({onClick}) => {
    //Initial Values 
    const initialValues = {
        supplier: "",
        supplies: "",
        contact: "",
    }

    //Validation
    const validationSchema = Yup.object ({
      supplier: Yup.string().required('Supplier is Required').matches(/^[a-zA-Z0-9\s]*$/, 'Special Chars are not Allowed'),
      email: Yup.string().required('Email is Required').email('Invalid Email'),
      contact: Yup.string().required('Contact is Required').matches(/^\d+$/, 'Only Numbers are Allowed').length(11, 'Contact must be exactly 11 digits'),
      location: Yup.string().required('Location is Required')
    })

    //Message for Successful Insertion
    const successMessage = () => {
        toast.success('Supplier Record Updated', {
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
    const update = (Values, {resetForm}) => {
        successMessage();
        resetForm();
    }

  return (
    <div className='modal'>
    <div className='modal__wrapper'>
      <i className="modal__close-icon fa-solid fa-xmark" onClick={onClick}></i>
      <div className='modal__body'>
        <Formik initialValues={initialValues} onSubmit={update} validationSchema={validationSchema} >
          {() => (
            <Form className='modal__form'>
              
              <div className='modal__input-field-wrapper'>
                  <Field type='text' name='supplier' placeholder='Enter Supplier' className='modal__input-field'/>
                  <ErrorMessage name='supplier' component='span' className='modal__input-field-error' />
                </div>

                <div className='modal__input-field-wrapper'>
                  <Field type='email' name='email' placeholder='Enter Email' className='modal__input-field'/>
                  <ErrorMessage name='email' component='span' className='modal__input-field-error' />
                </div>

                <div className='modal__input-field-wrapper'>
                  <Field type='text' name='contact' placeholder='Enter Contact No.' className='modal__input-field'/>
                  <ErrorMessage name='contact' component='span' className='modal__input-field-error' />
                </div>

                <div className='modal__input-field-wrapper'>
                  <Field type='text' name='location' placeholder='Enter Location' className='modal__input-field'/>
                  <ErrorMessage name='location' component='span' className='modal__input-field-error' />
                </div>

                <button type='submit' className='modal__insert'>Update</button>
            </Form>
          )}        
        </Formik>
      </div>
    </div>
    <ToastContainer />
  </div>
  )
}

export default EditSupplierModal
