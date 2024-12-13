import React from 'react';
import '../Styles/Modal.css';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';


const GeneralLedgerEnterCapital = ({onClick, onSubmit}) => {
    
    // Initial Values 
    const initialValues = {
        capital: '',
    };

    // Validation
    const validationSchema = Yup.object({
        capital: Yup.number()
            .required('Capital is required'),
    });

    const insert = async (values, { resetForm }) => {
        try {
            console.log(values);
            resetForm();
            onClick();
        } catch (error) {
            alert('Failed to add brand');
        }
    };
  return (
    <div className='modal'>
            <div className='modal__wrapper'>
                <i className="modal__close-icon fa-solid fa-xmark" onClick={onClick}></i>
                <div className='modal__body'>
                    <Formik initialValues={initialValues} onSubmit={insert} validationSchema={validationSchema}>
                        {() => (
                            <Form className='modal__form'>
                                <div className='modal__input-field-wrapper'>
                                    <Field type='number' step="0.01" name='capital' placeholder='Enter Capital' className='modal__input-field' />
                                    <ErrorMessage name='capital' component='span' className='modal__input-field-error' />
                                </div>
                                <button type='submit' className='modal__insert'>Insert Capital</button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
  )
}

export default GeneralLedgerEnterCapital
