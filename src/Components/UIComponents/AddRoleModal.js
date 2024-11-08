import React from 'react';
import '../Styles/Modal.css';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import CheckboxGroup from './CheckboxGroup';
import { ToastSuccess, ToastError } from '../UIComponents/ToastComponent';

const AddRoleModal = ({ onClick, refresh }) => {
    const specialCharsRegex = /^[a-zA-Z0-9\s]*$/;

    // Initial Values
    const initialValues = {
        roleName: "",
        modules: [], // Ensure this is always an array
    };

    // Validation Schema
    const validationSchema = Yup.object({
        roleName: Yup.string().required('Role name is Required').matches(specialCharsRegex, 'Special Chars are not Allowed'),
        modules: Yup.array().min(1, 'Modules are Required'),
    });

    const insert = async (values, { resetForm }) => {
        try {
            const response = await fetch('http://localhost/KampBJ-api/server/InsertRole.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();
            if (data.success) {
                onClick();
                refresh();
                ToastSuccess('New Role Created!')
                resetForm();
            } else {
                toast.error(data.message, {
                    position: "top-right",
                    autoClose: 1500,
                    theme: "light",
                });
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.', {
                position: "top-right",
                autoClose: 1500,
                theme: "light",
            });
        }
    };

    return (
        <div className='modal'>
            <div className='modal__wrapper'>
                <i className="modal__close-icon fa-solid fa-xmark" onClick={onClick}></i>
                <div className='modal__body'>

                    <Formik initialValues={initialValues} onSubmit={insert} validationSchema={validationSchema}>
                        {({ values }) => (
                            <Form className='modal__form'>

                                <div className='modal__input-field-wrapper'>
                                    <Field
                                        type='text'
                                        name='roleName'
                                        placeholder='Enter Role Name'
                                        className='modal__input-field'
                                        value={values.roleName || ''} // Ensures controlled behavior
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
                                    />
                                </div>

                                <button type='submit' className='modal__insert'>Add Role</button>
                            </Form>
                        )}
                    </Formik>

                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AddRoleModal;
