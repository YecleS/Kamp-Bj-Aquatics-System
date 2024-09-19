import React from 'react';
import '../Styles/Modal.css';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import CheckboxGroup from './CheckboxGroup';

const EditRoleModal = ({onClick}) => {
    const specialCharsRegex = /^[a-zA-Z0-9\s]*$/;

    //Initial Values 
    const initialValues = {
        roleName: "",
        modules: [],
    }

    //Validation
    const validationSchema = Yup.object ({
        roleName: Yup.string().required('Role name is Required').matches(specialCharsRegex, 'Special Chars are not Allowed'),
        modules: Yup.array().min(1,'Modules Required')
    })

    //Message for Successful Insertion
    const successMessage = () => {
        toast.success('Role Added', {
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

  return (
    <div className='modal'>
      <div className='modal__wrapper'>
        <i className="modal__close-icon fa-solid fa-xmark" onClick={onClick}></i>
        <div className='modal__body'>

          <Formik initialValues={initialValues} validationSchema={validationSchema}>
            {() => (
              <Form className='modal__form'>
                
                <div className='modal__input-field-wrapper'>
                  <Field type='text' name='roleName' placeholder='Enter Role Name' className='modal__input-field'/>
                  <ErrorMessage name='roleName' component='span' className='modal__input-field-error' />
                </div>

                <div className='modal__input-field-wrapper'>
                    <CheckboxGroup
                        label="Access"
                        name="access"
                        options={[
                            { label: 'Inventory', value: 'inventory' },
                            { label: 'Products', value: 'products' },
                            { label: 'POS', value: 'pos' },
                            { label: 'Expenses', value: 'expenses' },
                            { label: 'Supplier', value: 'supplier' },
                            { label: 'User Management', value: 'user-management' },
                            { label: 'Reports', value: 'reports' },
                            { label: 'Ledger', value: 'ledger' },
                        ]}
                    />   
                </div>
                 
                <button type='submit' className='modal__insert'>Update Role</button>
              </Form>
            )}        
          </Formik>

        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default EditRoleModal
