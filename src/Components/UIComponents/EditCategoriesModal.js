import React, { useState } from 'react';
import '../Styles/Modal.css';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';

const EditCategoriesModal = ({ onClick, onSubmit, initialCategory }) => {
    // Set the initial values to the current category being edited
    const initialValues = {
        category: initialCategory, // Prepopulate the form with the current category name
    };

    // Validation schema
    const validationSchema = Yup.object({
        category: Yup.string()
            .matches(/^[a-zA-Z0-9\s]*$/, 'Special characters are not allowed')
            .required('Category is required'),
    });

    // Handle form submission
    const update = (values, { resetForm }) => {
        onSubmit(values.category); // Pass the updated category name back to the parent component
        resetForm();
        onClick(); // Close the modal after update
    };

    return (
        <div className='modal'>
            <div className='modal__wrapper'>
                <i className="modal__close-icon fa-solid fa-xmark" onClick={onClick}></i>
                <div className='modal__body'>
                    <Formik initialValues={initialValues} onSubmit={update} validationSchema={validationSchema}>
                        {() => (
                            <Form className='modal__form'>
                                <div className='modal__input-field-wrapper'>
                                    <Field
                                        type='text'
                                        name='category'
                                        placeholder='Enter Category'
                                        className='modal__input-field'
                                    />
                                    <ErrorMessage name='category' component='span' className='modal__input-field-error' />
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

export default EditCategoriesModal;
