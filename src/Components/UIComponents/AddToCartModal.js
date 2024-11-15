import React from 'react';
import '../Styles/Modal.css';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';


const AddToCartModal = ({ onClick, product, onAddToCart }) => {
    const initialValues = { quantity: " " };

    const validationSchema = Yup.object({
        quantity: Yup.number()
            .required('Quantity is Required')
            .moreThan(0, 'Invalid Quantity'),
    });

    const addToCart = (values, { resetForm }) => {
        onAddToCart(product, values.quantity);
        resetForm();
        onClick();
    };

    return (
        <div className='modal'>
            <div className='modal__wrapper'>
                <i className="modal__close-icon fa-solid fa-xmark" onClick={onClick}></i>
                <div className='modal__body'>
                    <Formik initialValues={initialValues} onSubmit={addToCart} validationSchema={validationSchema}>
                        {() => (
                            <Form className='modal__form'>
                                <div className='modal__input-field-wrapper'>
                                    <Field type='number' name='quantity' placeholder='Enter Quantity' className='modal__input-field'/>
                                    <ErrorMessage name='quantity' component='span' className='modal__input-field-error'/>
                                </div>
                                <div className='modal__input-field-wrapper'>
                                    <Field as='select' name='batch' className='modal__input-field'>
                                        <option>BN001</option>
                                        <option>BN002</option>
                                        <option>BN003</option>
                                        <option>BN004</option>
                                    </Field>

                                    <ErrorMessage name='batch' component='span' className='modal__input-field-error'/>
                                </div>
                                        
                                <button type='submit' className='modal__insert'>Add To Cart</button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AddToCartModal;
