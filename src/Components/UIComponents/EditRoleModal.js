import React from 'react';
import '../Styles/Modal.css';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import CheckboxGroup from './CheckboxGroup';

const EditRoleModal = ({ currentRole, onClose, onSubmit }) => {
  const specialCharsRegex = /^[a-zA-Z0-9\s]*$/;

  // Map module names to accessIds
  const moduleAccessMap = {
    'Dashboard': '1',
    'Inventory': '2',
    'Products': '3',
    'POS': '4',
    'Expenses': '5',
    'Supplier': '6',
    'User Management': '7',
    'Reports': '8',
    'Ledger': '9',
  };

  // Initial values with fallback to current role or empty values
  const initialValues = {
    roleId: currentRole ? currentRole.roleId : "", // Add roleId
    roleName: currentRole ? currentRole.title : "",
    modules: currentRole 
      ? currentRole.access.map(module => moduleAccessMap[module]) // Convert module names to accessIds
      : [], 
  };

  // Validation schema
  const validationSchema = Yup.object({
    roleName: Yup.string()
      .required('Role name is Required')
      .matches(specialCharsRegex, 'Special Chars are not Allowed'),
    modules: Yup.array().min(1, 'Modules Required')
  });

  // Message for successful update
  const successMessage = () => {
    toast.success('Role Updated', {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div className='modal'>
      <div className='modal__wrapper'>
        <i className="modal__close-icon fa-solid fa-xmark" onClick={onClose}></i>
        <div className='modal__body'>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              onSubmit(values); // Pass updated values to onSubmit
              successMessage(); // Show success message
              onClose(); // Close the modal
            }}
          >
            {({ values }) => (
              <Form className='modal__form'>

                <div className='modal__input-field-wrapper'>
                  <Field
                    type='text'
                    name='roleName'
                    placeholder='Enter Role Name'
                    className='modal__input-field'
                  />
                  <ErrorMessage name='roleName' component='span' className='modal__input-field-error' />
                </div>

                <div className='modal__input-field-wrapper'>
                  <CheckboxGroup
                    label="Access"
                    name="modules"
                    options={[
                      { label: 'Dashboard', value: '1' },
                      { label: 'Inventory', value: '2' },
                      { label: 'Products', value: '3' },
                      { label: 'POS', value: '4' },
                      { label: 'Expenses', value: '5' },
                      { label: 'Supplier', value: '6' },
                      { label: 'User Management', value: '7' },
                      { label: 'Reports', value: '8' },
                      { label: 'Ledger', value: '9' },
                    ]}
                    selectedValues={initialValues.modules} // Pre-select checkboxes
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
  );
};

export default EditRoleModal;
