import React from 'react';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import '../Styles/Modal.css';

const EditUserModal = ({onClick}) => {
  return (
    <div className='modal'>
      <div className='modal__wrapper'>
        <i className="modal__close-icon fa-solid fa-xmark" onClick={onClick}></i>

        <div className='modal__body'>
            <Formik>
                <Form className='modal__form'>
                    <div className='modal__input-field-wrapper'>
                        <Field type='text' name='username' placeholder='username' className='modal__input-field' />
                        <ErrorMessage name='username' component='span' className='modal__input-field-error' />
                    </div>

                    <div className='modal__input-field-wrapper'>
                        <Field as='select' name='role' placeholder='Role' className='modal__input-field'>
                            <option>HR Manager</option>
                            <option>Product Manager</option>
                            <option>Manager</option>
                        </Field>
                        <ErrorMessage name='role' component='span' className='modal__input-field-error' />
                    </div>

                    <div className='modal__input-field-wrapper'>
                        <Field type='email' name='email' placeholder='Email' className='modal__input-field' />
                        <ErrorMessage name='email' component='span' className='modal__input-field-error' />
                    </div>

                    <div className='modal__input-field-wrapper'>
                        <Field type='text' name='contact' placeholder='Contact No.' className='modal__input-field' />
                        <ErrorMessage name='contact' component='span' className='modal__input-field-error' />
                    </div>

                    <div className='modal__input-field-wrapper'>
                        <Field type='text' name='address' placeholder='Address' className='modal__input-field' />
                        <ErrorMessage name='address' component='span' className='modal__input-field-error' />
                    </div>

                    <button type='submit' className='modal__insert'>Update</button>
                </Form>
            </Formik>
        </div>
      </div>
    </div>
  )
}

export default EditUserModal
