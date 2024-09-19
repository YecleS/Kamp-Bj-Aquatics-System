import React,{useState} from 'react';
import '../Styles/Modal.css';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import DefaultImagePreview from '../Assets/image-preview.png';

const EditProductModal = ({ initialValues, onClick }) => {
  const [imagePreview, setImagePreview] = useState();

  //Validation
  const validationSchema = Yup.object ({
    productImage: Yup.mixed().required('Product Image is Required'),
    product: Yup.string().required('Product Name is Required').matches(/^[a-zA-Z0-9\s]*$/, 'Special Chars are not Allowed'),
    brand: Yup.string().matches(/^[a-zA-Z0-9\s]*$/, 'Special Chars are not Allowed'),
    model: Yup.string().matches(/^[a-zA-Z0-9\s]*$/, 'Special Chars are not Allowed'),
    quantity: Yup.number().required('Quantity is Required').moreThan(0, 'Invalid Quantity'),
    price: Yup.number().required('Price is Required').moreThan(0, 'Invalid Price'),
  })

  //Message for Successful Update
  const successMessage = () => {
    toast.success('Product Record Updated', {
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

  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    setFieldValue('productImage', file);

    if(file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result);
      }

      reader.readAsDataURL(file);
    }
  }
  
  //Method For Insertion of Values To Database
  //The Values Can Be Destructured To Store it Individually To the Database (if necessary)
  //Refer to Login.js 
  const update = (Values, {resetForm}) => {
    console.log(Values);
    setImagePreview();
    successMessage();
    resetForm();
  }

  return (
    <div className='modal'>
      <div className='modal__wrapper'>
        <i className="modal__close-icon fa-solid fa-xmark" onClick={onClick}></i>
        <div className='modal__body'>
          <Formik initialValues={initialValues} onSubmit={update} validationSchema={validationSchema} >
          {({ setFieldValue }) => (
              <Form className='modal__form'>

                <div className='modal__input-field-wrapper'>
                  <div className='modal__image-preview-wrapper'>
                    <img src = {imagePreview ? imagePreview : DefaultImagePreview} className='modal__image-preview' />                    
                  </div>              
                </div>

                <div className='modal__input-field-wrapper'>
                  <input
                    type='file'
                    name='productImage'
                    accept='image/jpg, image/jpeg, image/png'
                    onChange={(event) => handleImageChange(event, setFieldValue)}
                    id='fileInput'
                    style={{ display: 'none' }}
                  />
                  <div className='modal__upload-img-label-wrapper'>
                    <label htmlFor='fileInput' className='modal__upload-img-label'>
                      Upload Image
                    </label>
                  </div>
                  <ErrorMessage name='productImage' component='span' className='modal__input-field-error' />
                </div>

                <div className='modal__input-field-wrapper'>
                  <Field type='text' name='product' placeholder='Enter Product Name' className='modal__input-field'/>
                  <ErrorMessage name='product' component='span' className='modal__input-field-error' />
                </div>

                <div className='modal__input-field-wrapper'>
                  <Field type='text' name='brand' placeholder='Enter Brand' className='modal__input-field'/>
                  <ErrorMessage name='brand' component='span' className='modal__input-field-error' />
                </div>

                <div className='modal__input-field-wrapper'>
                  <Field type='text' name='model' placeholder='Enter Model' className='modal__input-field'/>
                  <ErrorMessage name='model' component='span' className='modal__input-field-error' />
                </div>

                <div className='modal__input-field-wrapper'>
                  <Field type='number' name='quantity' placeholder='Enter Quantity' className='modal__input-field'/>
                  <ErrorMessage name='quantity' component='span' className='modal__input-field-error' />
                </div>

                <div className='modal__input-field-wrapper'>
                  <Field type='number' name='price' placeholder='Enter Price' className='modal__input-field'/>
                  <ErrorMessage name='price' component='span' className='modal__input-field-error' />
                </div>
                 
                <button type='submit' className='modal__insert'>Add Product</button>
              </Form>
            )}           
          </Formik>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default EditProductModal
