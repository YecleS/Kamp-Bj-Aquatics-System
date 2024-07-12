import React from 'react';
import '../Styles/Modal.css';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import CheckboxGroup from './CheckboxGroup';

const EditStaffModal = ({onClick}) => {
    const specialCharsRegex = /^[a-zA-Z0-9\s]*$/;

    //Initial Values 
    const initialValues = {
        fullName: "",
        username: "",
        password: "",
        reEnterPassword: "",
        permissions: [],
    }

    //Validation
    const validationSchema = Yup.object ({
        fullName: Yup.string().required('Fullname is Required').matches(specialCharsRegex, 'Special Chars are not Allowed').matches(/^[^\d]*$/, 'Numbers are not Allowed'),
        username: Yup.string().required('Username is Required').matches(specialCharsRegex, 'Special Chars are not Allowed'),
        password: Yup.string().required('Password is Required').matches(specialCharsRegex, 'Special Chars are not Allowed'),
        reEnterPassword: Yup.string().required('Password is Required').matches(specialCharsRegex, 'Special Chars are not Allowed'),
        permissions: Yup.array().min(1,'Permission Required')
    })

    //Message for Successful Insertion
    const successMessage = () => {
        toast.success('Staff Record Updated', {
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

    //Message for Invalid Insertion
    const errorMessage = () => {
        toast.error('Password Do Not Match', {
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
    //Here the values from checkbox are in an array, so you need to access it first
    const update = (Values, {resetForm}) => {
        if(Values.password === Values.reEnterPassword){
             // Log checked permissions
            const checkedPermissions = ['sales', 'expenses', 'restock'].filter(permission => Values.permissions.includes(permission));
            console.log('Checked Permissions:', checkedPermissions);

            successMessage();
            resetForm();
        }else {
            errorMessage();
        }
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
                  <Field type='text' name='fullName' placeholder='Enter Full Name' className='modal__input-field'/>
                  <ErrorMessage name='fullName' component='span' className='modal__input-field-error' />
                </div>

                <div className='modal__input-field-wrapper'>
                  <Field type='text' name='username' placeholder='Enter Username' className='modal__input-field'/>
                  <ErrorMessage name='username' component='span' className='modal__input-field-error' />
                </div>

                <div className='modal__input-field-wrapper'>
                  <Field type='password' name='password' placeholder='Enter Password' className='modal__input-field'/>
                  <ErrorMessage name='password' component='span' className='modal__input-field-error' />
                </div>

                <div className='modal__input-field-wrapper'>
                  <Field type='password' name='reEnterPassword' placeholder='Re-enter Password' className='modal__input-field'/>
                  <ErrorMessage name='reEnterPassword' component='span' className='modal__input-field-error' />
                </div>

                <div className='modal__input-field-wrapper'>
                    <CheckboxGroup
                        label="Permissions"
                        name="permissions"
                        options={[
                                { label: 'Admin', value: 'admin' },
                                { label: 'Manager', value: 'manager' },
                                { label: 'Staff', value: 'staff' },
                        ]}
                    />       
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

export default EditStaffModal
