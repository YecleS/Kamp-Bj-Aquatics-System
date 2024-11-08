import React from 'react';
import '../Styles/Modal.css';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { ToastSuccess, ToastError } from '../UIComponents/ToastComponent'; // Ensure you have ToastError for error handling

const EditBrandModal = ({ onClick, onSubmit, initialBrand }) => { // Added onSubmit and initialBrand props

    // Initial Values 
    const initialValues = {
        brand: initialBrand || '', // Set initial value from the passed prop
    };

    // Validation
    const validationSchema = Yup.object({
        brand: Yup.string()
            .matches(/^[a-zA-Z0-9\s]*$/, 'Special characters are not allowed')
            .required('Brand is Required'),
    });

    const insert = async (values, { resetForm }) => {
        try {
            await onSubmit(values.brand); // Call the onSubmit function passed as prop
            ToastSuccess('Successfully Updated');
            resetForm();
            onClick();
        } catch (error) {
            ToastError('Failed to update brand'); // Handle errors
        }
    };

    return (
        <div className='modal'>
            <div className='modal__wrapper'>
                <i className="modal__close-icon fa-solid fa-xmark" onClick={onClick}></i>
                <div className='modal__body'>
                    <Formik initialValues={initialValues} onSubmit={insert} validationSchema={validationSchema} >
                        {() => (
                            <Form className='modal__form'>
                                <div className='modal__input-field-wrapper'>
                                    <Field type='text' name='brand' placeholder='Enter Brand' className='modal__input-field' />
                                    <ErrorMessage name='brand' component='span' className='modal__input-field-error' />
                                </div>
                                <button type='submit' className='modal__insert'>Update</button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default EditBrandModal;
