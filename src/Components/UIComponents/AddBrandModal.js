import React from 'react';
import '../Styles/Modal.css';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';


const AddBrandModal = ({ onClick, onSubmit }) => { // Added onSubmit prop

    // Initial Values 
    const initialValues = {
        brand: '',
    };

    // Validation
    const validationSchema = Yup.object({
        brand: Yup.string()
            .matches(/^[a-zA-Z0-9\s]*$/, 'Special characters are not allowed')
            .required('Brand name is required'), // Added required validation
    });

    const insert = async (values, { resetForm }) => {
        try {
            await onSubmit(values.brand);
            resetForm();
            onClick();
        } catch (error) {
            alert('Failed to add brand'); // Handle errors
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
                                <button type='submit' className='modal__insert'>Insert</button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default AddBrandModal;
