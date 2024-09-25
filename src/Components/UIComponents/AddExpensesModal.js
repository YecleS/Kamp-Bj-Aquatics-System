import React from 'react';
import '../Styles/Modal.css';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import DatePicker from 'react-datepicker';

const AddUtilitiesModal = ({onClick}) => {
    //Initial Values 
    const initialValues = {
        expenses: "",
        description: "",
        date: "",
        total: "",
    }

    //Validation
    const validationSchema = Yup.object ({
        expenses: Yup.string().required('Expenses Name is Required').matches(/^[a-zA-Z0-9\s]*$/, 'Special Chars are not Allowed'),
        description: Yup.string().required('Description is Required').matches(/^[a-zA-Z0-9\s]*$/, 'Special Chars are not Allowed'),
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
        console.log(Values);
        successMessage();
        resetForm();
    }

  return (
    <div className='modal'>
      <div className='modal__wrapper'>
        <i className="modal__close-icon fa-solid fa-xmark" onClick={onClick}></i>
        <div className='modal__body'>
          <Formik initialValues={initialValues} onSubmit={insert} validationSchema={validationSchema} >
            {({ setFieldValue, values }) => (
              <Form className='modal__form'>

                <div className='modal__input-field-wrapper'>
                  <Field as='input' list='expenses-list' name='expenses' placeholder='Enter Expenses' className='modal__input-field' />
                  <datalist id='expenses-list'>
                    <option value='Wifi' />
                    <option value='Water Bill' />
                    <option value='Company Outing' />
                    <option value='Maintenance' />
                  </datalist>
                  <ErrorMessage name='expenses' component='span' className='modal__input-field-error' />
                </div>

                <div className='modal__input-field-wrapper'>
                  <Field component='textarea' name='description' placeholder='Enter Description' className='modal__input-field description'/>
                  <ErrorMessage name='description' component='span' className='modal__input-field-error' />
                </div>

                <div className='modal__input-field-wrapper'>
                      <DatePicker
                        value={values.date} // Bind to Formik value
                        onChange={(date) => setFieldValue('date', date.toLocaleDateString('default', { month:'short', year:'numeric' }))} // Use Formik's setFieldValue to update
                        dateFormat="yyyy-MM-dd"
                        showMonthYearPicker
                        maxDate={new Date()}
                        placeholderText='Select A Month'
                        className='modal__monthly-input-field'
                      />
                  <ErrorMessage name='date' component='span' className='modal__input-field-error' />
                </div>  

                <div className='modal__input-field-wrapper'>
                  <Field type='number' name='total' placeholder='Enter Total' className='modal__input-field'/>
                  <ErrorMessage name='total' component='span' className='modal__input-field-error' />
                </div>
                 
                <button type='submit' className='modal__insert'>Add Expenses</button>
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
