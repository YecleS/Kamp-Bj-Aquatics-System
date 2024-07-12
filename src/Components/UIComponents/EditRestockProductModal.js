import React from 'react';
import '../Styles/Modal.css';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';

const EditRestockProductModal = ({onClick}) => {
    //Initial Values 
    const initialValues = {
        product: "",
        brand: "",
        model: "",
        supplier: "",
        date: "",
        total: "",
    }

    //Validation
    const validationSchema = Yup.object ({
        product: Yup.string().required('Utilities Name is Required').matches(/^[a-zA-Z0-9\s]*$/, 'Special Chars are not Allowed'),
        brand: Yup.string().matches(/^[a-zA-Z0-9\s]*$/, 'Special Chars are not Allowed'),
        model: Yup.string().matches(/^[a-zA-Z0-9\s]*$/, 'Special Chars are not Allowed'),
        supplier: Yup.string().required('Supplier is Required').matches(/^[a-zA-Z0-9\s]*$/, 'Special Chars are not Allowed'),
        date: Yup.string().required('Date is Required'),
        quantity: Yup.number().required('Quantity is Required').moreThan(0, 'Invalid Quantity'),
        total: Yup.number().required('Total is Required').moreThan(0, 'Invalid Total'),
    })

    //Message for Successful Insertion
    const successMessage = () => {
        toast.success('Restock Record Updated', {
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
                  <Field as='select' name='product' className='modal__input-field'>
                    <option value='' disabled hidden>Enter Product Name</option>
                    <option value=''></option>
                    <option>gatorade</option>
                    <option>ice scream</option>
                  </Field>
                  <ErrorMessage name='product' component='span' className='modal__input-field-error' />
                </div>

                <div className='modal__input-field-wrapper'>
                  <Field as='select' name='brand' className='modal__input-field'>
                  <option value='' disabled hidden>Enter Brand</option>
                    <option value=''></option>
                    <option>bear brand</option>
                    <option>brandy</option>
                  </Field>
                  <ErrorMessage name='brand' component='span' className='modal__input-field-error' />
                </div>

                <div className='modal__input-field-wrapper'>
                  <Field as='select' name='model' className='modal__input-field'>
                  <option value='' disabled hidden>Enter Model</option>
                    <option value=''></option>
                    <option>mia khalifa</option>
                    <option>BINI Mika</option>
                  </Field>
                  <ErrorMessage name='model' component='span' className='modal__input-field-error' />
                </div>

                <div className='modal__input-field-wrapper'>
                  <Field as='select' name='supplier' className='modal__input-field'>
                  <option value='' disabled hidden>Enter Supplier</option>
                    <option value=''></option>
                    <option>oSideMafia</option>
                    <option>hev abi</option>
                  </Field>
                  <ErrorMessage name='supplier' component='span' className='modal__input-field-error' />
                </div>

                <div className='modal__input-field-wrapper'>
                  <Field type='date' name='date' className='modal__input-field'/>
                  <ErrorMessage name='date' component='span' className='modal__input-field-error' />
                </div>

                <div className='modal__input-field-wrapper'>
                  <Field type='number' name='quantity' placeholder='Enter quantity' className='modal__input-field'/>
                  <ErrorMessage name='quantity' component='span' className='modal__input-field-error' />
                </div>

                <div className='modal__input-field-wrapper'>
                  <Field type='number' name='total' placeholder='Enter Total' className='modal__input-field'/>
                  <ErrorMessage name='total' component='span' className='modal__input-field-error' />
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

export default EditRestockProductModal
