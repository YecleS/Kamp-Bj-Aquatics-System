import React, { useState } from 'react';
import '../Styles/Modal.css';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import AddProductModal from '../UIComponents/AddProductModal';
import AddSupplierModal from './AddSupplierModal';

const RestockProductModal = ({onClick}) => {
  const [isAddProductModalOpen, isSetAddProductModalOpen] = useState(false);
  const [isSupplierModalOpen, isSetSupplierModalOpen] = useState(false);

    //Initial Values 
    const initialValues = {
        product: "",
        brand: "",
        model: "",
        supplier: "",
        date: "",
        total: "",
    }

    const toggleAddProductModal = () => {
      isSetAddProductModalOpen(!isAddProductModalOpen);
    }

    const toggleSupplierModal = () => {
      isSetSupplierModalOpen(!isSupplierModalOpen);
    }

    //Validation
    const validationSchema = Yup.object ({
      product: Yup.string().required('Product Name is Required'),
      brand: Yup.string().required('Brand Name is Required'),
      model: Yup.string().required('Model Name is Required'),
      supplier: Yup.string().required('Supplier is Required'),
      date: Yup.string().required('Date is Required'),
      quantity: Yup.number().required('Quantity is Required').moreThan(0, 'Invalid Quantity'),
      total: Yup.number().required('Total is Required').moreThan(0, 'Invalid Total'),
  })

    //Message for Successful Insertion
    const successMessage = () => {
        toast.success('Product Successfully Restocked', {
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
    
    const handleDropdownOnchange = (e, setFieldValue) => {
      const { name, value } = e.target;

      //Need to declare the setfield value because the onChange is overriding the formik forms
      setFieldValue(name, value);

      if(name == 'product' && value == 'others' || name == 'brand' && value == 'others' || name == 'model' && value == 'others'){
        toggleAddProductModal();
      }else if (name == 'supplier' && value == 'others'){
        toggleSupplierModal();
      }
    }

    //Method For Insertion of Values To Database
    //The Values Can Be Destructured To Store it Individually To the Database (if necessary)
    //Refer to Login.js 
    const insert = (Values, {resetForm}) => {
        console.log(Values);
        successMessage();
        resetForm();
    }

  return (
    <div className='modal'>
      <div className='modal__wrapper'>
        <i className="modal__close-icon fa-solid fa-xmark" onClick={onClick}></i>
        <div className='modal__body'>
          <Formik initialValues={initialValues} onSubmit={insert} validationSchema={validationSchema} >
            {({ setFieldValue  }) => (
              <Form className='modal__form'>

                <div className='modal__input-field-wrapper'>
                  <Field as='select' name='product' className='modal__input-field' onChange = {(e) => handleDropdownOnchange(e, setFieldValue)}>
                    <option value='' disabled hidden>Enter Product Name</option>
                    <option value='gatorade'>gatorade</option>
                    <option value='ice-scream'>ice scream</option>
                    <option value='others'>Others..</option>
                  </Field>
                  <ErrorMessage name='product' component='span' className='modal__input-field-error' />
                </div>

                <div className='modal__input-field-wrapper'>
                  <Field as='select' name='brand' className='modal__input-field' onChange = {(e) => handleDropdownOnchange(e, setFieldValue)}>
                    <option value='' disabled hidden>Enter Brand</option>
                    <option value=''></option>
                    <option value='bear-brand'>bear brand</option>
                    <option value='brandy'>brandy</option>
                    <option value='others'>Others..</option>
                  </Field>
                  <ErrorMessage name='brand' component='span' className='modal__input-field-error' />
                </div>

                <div className='modal__input-field-wrapper'>
                  <Field as='select' name='model' className='modal__input-field' onChange = {(e) => handleDropdownOnchange(e, setFieldValue)}>
                    <option value='' disabled hidden>Enter Model</option>
                    <option value=''></option>
                    <option value='mia'>mia khalifa</option>
                    <option value='bini'>BINI Mika</option>
                    <option value='others'>Others..</option>
                  </Field>
                  <ErrorMessage name='model' component='span' className='modal__input-field-error' />
                </div>

                <div className='modal__input-field-wrapper'>
                  <Field as='select' name='supplier' className='modal__input-field' onChange = {(e) => handleDropdownOnchange(e, setFieldValue)}>
                  <option value='' disabled hidden>Enter Supplier</option>
                    <option value='oside'>oSideMafia</option>
                    <option value='hevabi'>hev abi</option>
                    <option value='others'>Others..</option>
                  </Field>
                  <ErrorMessage name='supplier' component='span' className='modal__input-field-error' />
                </div>

                <div className='modal__input-field-wrapper'>
                  <Field type='date' name='date' className='modal__input-field'/>
                  <ErrorMessage name='date' component='span' className='modal__input-field-error' />
                </div>

                <div className='modal__input-field-wrapper'>
                  <Field type='number' name='procuredPrice' placeholder='Procured Price' className='modal__input-field'/>
                  <ErrorMessage name='procuredPrice' component='span' className='modal__input-field-error' />
                </div>

                <button type='submit' className='modal__insert'>Restock</button>
              </Form>
            )}        
          </Formik>
        </div>
      </div>

      {isAddProductModalOpen && <AddProductModal onClick={toggleAddProductModal} />}
      {isSupplierModalOpen && <AddSupplierModal onClick={toggleSupplierModal} />}
      <ToastContainer />
    </div>
  )
}

export default RestockProductModal
