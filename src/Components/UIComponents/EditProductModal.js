import React,{useState} from 'react';
import '../Styles/Modal.css';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { ToastContainer } from 'react-toastify';
import { ToastSuccess } from './ToastComponent';
import DefaultImagePreview from '../Assets/image-preview.png';

const EditProductModal = ({ onClick }) => {
  const [imagePreview, setImagePreview] = useState();

  //Initial Values 
  const initialValues = {
    productImage: "",
    brand: "",
    category:"",
    product: "",
    model: "",
    description: "",
    markupPercentage: 0
  }

  //Validation di ko nilagyan ng required validation ung brand and model kase may mga products na walang brand or model
  const validationSchema = Yup.object ({
    productImage: Yup.mixed().required('Product Image is Required'),
    brand: Yup.string().matches(/^[a-zA-Z0-9\s]*$/, 'Special Chars are not Allowed'),
    category: Yup.string().required('Category is required').matches(/^[a-zA-Z0-9\s]*$/, 'Special Chars are not Allowed'),
    product: Yup.string().required('Product Name is Required').matches(/^[a-zA-Z0-9\s]*$/, 'Special Chars are not Allowed'),
    model: Yup.string().matches(/^[a-zA-Z0-9\s]*$/, 'Special Chars are not Allowed'),
    description: Yup.string().required('Description is Required'),
    markupPercentage: Yup.number().required('Markup Percentage is Required').moreThan(0, 'Invalid Markup Percentage'),markupPercentage: Yup.number().required('Markup Percentage is Required').moreThan(0, 'Invalid Markup Percentage'),
})

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

    /* Call toast success and enter the message, import the ToastComponent.js FIRST */
    ToastSuccess('Product Updated');

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
                  <Field as='input' list='brand-list' name='brand' placeholder='Enter Brand' className='modal__input-field' />
                  <datalist id='brand-list'>
                    <option value='Nike' />
                    <option value='Adidas' />
                    <option value='Puma' />
                    <option value='Reebok' />
                    <option value='Under Armour' />
                  </datalist>
                  <ErrorMessage name='brand' component='span' className='modal__input-field-error' />
                </div>

                <div className='modal__input-field-wrapper'>
                  <Field as='input' list='category-list' name='category' placeholder='Enter Category' className='modal__input-field' />
                  <datalist id='category-list'>
                    <option value='Equipment' />
                    <option value='Pets' />
                  </datalist>
                  <ErrorMessage name='category' component='span' className='modal__input-field-error' />
                </div>

                <div className='modal__input-field-wrapper'>
                  <Field type='text' name='product' placeholder='Enter Product Name' className='modal__input-field'/>
                  <ErrorMessage name='product' component='span' className='modal__input-field-error' />
                </div>

                <div className='modal__input-field-wrapper'>
                  <Field type='text' name='model' placeholder='Enter Model' className='modal__input-field'/>
                  <ErrorMessage name='model' component='span' className='modal__input-field-error' />
                </div>  

                <div className='modal__input-field-wrapper'>
                  <Field component='textarea' name='description' placeholder='Enter Description' className='modal__input-field description'/>
                  <ErrorMessage name='description' component='span' className='modal__input-field-error' />
                </div>

                <div className='modal__input-field-wrapper'>
                  {/* changes made here, added a div for layout of the percentage label and markup-field, refer to modal.css*/}
                  {/* changes made on initial values and yup too, for error checking. Also change the name of the field as well as the ErrorMessage name */}
                  <div className='modal__markup-field-wrapper'>
                    <Field type='number' name='markupPercentage' placeholder='Enter Markup Percentage' className='modal__input-field markup-field'/>
                    <span className='modal__percentage-label'>%</span>
                  </div>
                  <ErrorMessage name='markupPercentage' component='span' className='modal__input-field-error' />
                </div>

                <button type='submit' className='modal__insert'>Update</button>
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
