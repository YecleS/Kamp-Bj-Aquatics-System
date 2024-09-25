import React from 'react';
import '../Styles/Modal.css';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import CheckboxGroup from './CheckboxGroup';

const AddStaffModal = ({onClick}) => {
    const specialCharsRegex = /^[a-zA-Z0-9\s]*$/;

    //Initial Values 
    const initialValues = {
        roles: [],
        modules: [],
    }

    //Validation
    const validationSchema = Yup.object ({
        roles: Yup.array().min(1,'Roles Required'),
        modules: Yup.array().min(1,'Modules Required')
    })

    //Message for Successful Insertion
    const successMessage = () => {
        toast.success('Staff Added', {
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
    const insert = (Values, {resetForm}) => {
        if(Values.password === Values.reEnterPassword){
             // Log checked roles
            const checkedRoles = ['admin', 'manager', 'staff'].filter(roles => Values.roles.includes(roles));
            console.log('Roles:', checkedRoles);

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
          <Formik initialValues={initialValues} onSubmit={insert} validationSchema={validationSchema} >
            {() => (
              <Form className='modal__form'>

                <div className='modal__input-field-wrapper'>
                    <CheckboxGroup
                        label="Roles"
                        name="roles"
                        options={[
                                { label: 'Admin', value: 'admin' },
                                { label: 'Manager', value: 'manager' },
                                { label: 'Staff', value: 'staff' },
                        ]}
                    />   
                </div>

                <button type='submit' className='modal__insert'>Approve</button>
              </Form>
            )}        
          </Formik>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default AddStaffModal
