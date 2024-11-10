import React, { useState, useEffect } from 'react';
import '../Styles/Modal.css';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { ToastContainer } from 'react-toastify';
import { ToastSuccess } from './ToastComponent';
import DefaultImagePreview from '../Assets/image-preview.png';

const EditProductModal = ({ onClick, productData, refresh }) => {
  const [imagePreview, setImagePreview] = useState(DefaultImagePreview);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  // Fetch brands and categories from the backend
  useEffect(() => {
    fetch('http://localhost/KampBJ-api/server/fetchBrandCategory.php')
      .then((response) => response.json())
      .then((data) => {
        setBrands(data.brands);  // Set brands from the API response
        setCategories(data.categories);  // Set categories from the API response
      })
      .catch((error) => console.error('Error fetching brands and categories:', error));
  }, []);

  const initialValues = productData
    ? {
        productImage: '',
        brand: productData.brand || '',
        category: productData.category || '',
        product: productData.productName || '',
        model: productData.model || '',
        description: productData.description || '',
        markupPercentage: productData.markup || 0,
      }
    : {
        productImage: '',
        brand: '',
        category: '',
        product: '',
        model: '',
        description: '',
        markupPercentage: 0,
      };

      useEffect(() => {
        if (productData && productData.image) {
          setImagePreview(`http://localhost/KampBJ-api/server/uploads/products/${productData.image}`);
        }
      }, [productData]);
      

  const validationSchema = Yup.object({
    brand: Yup.string().matches(/^[a-zA-Z0-9\s]*$/, 'Special Chars are not Allowed'),
    category: Yup.string()
      .required('Category is required')
      .matches(/^[a-zA-Z0-9\s]*$/, 'Special Chars are not Allowed'),
    product: Yup.string()
      .required('Product Name is Required')
      .matches(/^[a-zA-Z0-9\s]*$/, 'Special Chars are not Allowed'),
    model: Yup.string().matches(/^[a-zA-Z0-9\s]*$/, 'Special Chars are not Allowed'),
    description: Yup.string().required('Description is Required'),
    markupPercentage: Yup.number()
      .required('Markup Percentage is Required')
      .moreThan(0, 'Invalid Markup Percentage'),
  });

  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    setFieldValue('productImage', file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const update = (values, { resetForm }) => {
    const selectedBrand = brands.find((brand) => brand.name === values.brand);
    const selectedCategory = categories.find((category) => category.name === values.category);
  
    const formData = new FormData();
    formData.append('userId', localStorage.getItem('userId'));
    formData.append('productId', productData.productId);
    formData.append('product', values.product);
    formData.append('brandId', selectedBrand.brandId);
    formData.append('categoryId', selectedCategory.categoryId);
    formData.append('model', values.model);
    formData.append('description', values.description);
    formData.append('markup', values.markupPercentage);
  
    // Use only one key: 'productImage'
    if (values.productImage instanceof File) {
      formData.append('productImage', values.productImage); // New image selected
    } else {
      formData.append('productImage', productData.image); // Use the existing image
    }
  
    fetch('http://localhost/KampBJ-api/server/updateProduct.php', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          ToastSuccess('Product Updated');
          resetForm();
          setImagePreview(DefaultImagePreview); // Optionally reset image preview
          onClick();
          refresh();
        } else {
          console.error('Error updating product:', data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  
  
  return (
    <div className='modal'>
      <div className='modal__wrapper'>
        <i className='modal__close-icon fa-solid fa-xmark' onClick={onClick}></i>
        <div className='modal__body'>
          <Formik
            initialValues={initialValues}
            onSubmit={update}
            validationSchema={validationSchema}
            enableReinitialize
          >
            {({ setFieldValue }) => (
              <Form className='modal__form'>
                <div className='modal__input-field-wrapper'>
                  <div className='modal__image-preview-wrapper'>
                    <img
                      src={imagePreview ? imagePreview : DefaultImagePreview}
                      className='modal__image-preview'
                    />
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
                  <label htmlFor='fileInput' className='modal__upload-img-label'>
                    Upload Image
                  </label>
                  <ErrorMessage name='productImage' component='span' className='modal__input-field-error' />
                </div>

                {/* Dynamic Brand Datalist */}
                <div className='modal__input-field-wrapper'>
                  <Field as='input' list='brand-list' name='brand' placeholder='Enter Brand' className='modal__input-field' />
                  <datalist id='brand-list'>
                    {brands.map((brand) => (
                      <option key={brand.brandId} value={brand.name} />
                    ))}
                  </datalist>
                  <ErrorMessage name='brand' component='span' className='modal__input-field-error' />
                </div>

                {/* Dynamic Category Datalist */}
                <div className='modal__input-field-wrapper'>
                  <Field as='input' list='category-list' name='category' placeholder='Enter Category' className='modal__input-field' />
                  <datalist id='category-list'>
                    {categories.map((category) => (
                      <option key={category.categoryId} value={category.name} />
                    ))}
                  </datalist>
                  <ErrorMessage name='category' component='span' className='modal__input-field-error' />
                </div>

                {/* Other form fields */}
                <div className='modal__input-field-wrapper'>
                  <Field type='text' name='product' placeholder='Enter Product Name' className='modal__input-field' />
                  <ErrorMessage name='product' component='span' className='modal__input-field-error' />
                </div>

                <div className='modal__input-field-wrapper'>
                  <Field type='text' name='model' placeholder='Enter Model' className='modal__input-field' />
                  <ErrorMessage name='model' component='span' className='modal__input-field-error' />
                </div>

                <div className='modal__input-field-wrapper'>
                  <Field component='textarea' name='description' placeholder='Enter Description' className='modal__input-field description' />
                  <ErrorMessage name='description' component='span' className='modal__input-field-error' />
                </div>

                <div className='modal__input-field-wrapper'>
                  <div className='modal__markup-field-wrapper'>
                    <Field
                      type='number'
                      name='markupPercentage'
                      placeholder='Enter Markup Percentage'
                      className='modal__input-field markup-field'
                    />
                    <span className='modal__percentage-label'>%</span>
                  </div>
                  <ErrorMessage name='markupPercentage' component='span' className='modal__input-field-error' />
                </div>

                <button type='submit' className='modal__insert'>
                  Update
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditProductModal;
