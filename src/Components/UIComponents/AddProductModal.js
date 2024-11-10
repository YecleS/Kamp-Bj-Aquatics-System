import React, { useState, useEffect } from 'react';
import '../Styles/Modal.css';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { ToastContainer } from 'react-toastify';
import DefaultImagePreview from '../Assets/image-preview.png';
import { ToastSuccess, ToastError } from '../UIComponents/ToastComponent';

const AddProductModal = ({ onClick, refresh }) => {
  const [imagePreview, setImagePreview] = useState();
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  // Fetch brand and category data from the backend
  useEffect(() => {
    fetch('http://localhost/KampBJ-api/server/fetchBrandCategory.php')
      .then((response) => response.json())
      .then((data) => {
        setBrands(data.brands);
        setCategories(data.categories);
      })
      .catch((error) => console.error('Error fetching brand and category data:', error));
  }, []);

  const initialValues = {
    productImage: "",
    brand: "",
    category: "",
    product: "",
    lowStock: 0,
    model: "",
    description: "",
    markupPercentage: 0
  };

  const validationSchema = Yup.object({
    productImage: Yup.mixed().required('Product Image is Required'),
    brand: Yup.string().required('Brand is required'),
    category: Yup.string().required('Category is required'),
    product: Yup.string().required('Product Name is Required').matches(/^[a-zA-Z0-9\s]*$/, 'Special Chars are not Allowed'),
    lowStock: Yup.number().required('Low Stock Indicator is required!').moreThan(0, 'Invalid Input'),
    model: Yup.string().matches(/^[a-zA-Z0-9\s]*$/, 'Special Chars are not Allowed'),
    description: Yup.string().required('Description is Required'),
    markupPercentage: Yup.number().required('Markup Percentage is Required').moreThan(0, 'Invalid Markup Percentage'),
  });

  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    setFieldValue('productImage', file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const insert = (values, { resetForm }) => {
    // Find the corresponding brandId and categoryId based on selected names
    const selectedBrand = brands.find((brand) => brand.name === values.brand);
    const selectedCategory = categories.find((category) => category.name === values.category);

    if (!selectedBrand || !selectedCategory) {
      ToastError('Invalid brand or category selected');
      return;
    }

    const formData = new FormData();
    formData.append('userId', localStorage.getItem('userId'));
    formData.append('productImage', values.productImage);
    formData.append('brandId', selectedBrand.brandId);
    formData.append('categoryId', selectedCategory.categoryId);
    formData.append('product', values.product);
    formData.append('lowStock', values.lowStock);
    formData.append('model', values.model);
    formData.append('description', values.description);
    formData.append('markupPercentage', values.markupPercentage);

    fetch('http://localhost/KampBJ-api/server/insertProduct.php', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          ToastSuccess('Product Added');
          resetForm();
          onClick();
          setImagePreview(null);
          refresh();
        } else {
          ToastError('Failed to Add Product');
        }
      })
      .catch((error) => {
        console.error('Error inserting product:', error);
        ToastError('Error adding product');
      });
  };

  return (
    <div className='modal'>
      <div className='modal__wrapper'>
        <i className="modal__close-icon fa-solid fa-xmark" onClick={onClick}></i>
        <div className='modal__body'>
          <Formik initialValues={initialValues} onSubmit={insert} validationSchema={validationSchema}>
            {({ setFieldValue }) => (
              <Form className='modal__form'>

                <div className='modal__input-field-wrapper'>
                  <div className='modal__image-preview-wrapper'>
                    <img src={imagePreview ? imagePreview : DefaultImagePreview} className='modal__image-preview' />
                  </div>
                </div>

                <div className='modal__input-field-wrapper'>
                  <input
                    type='file'
                    name='productImage'
                    accept='image/jpg, image/jpeg, image/png'
                    onChange={(event) => handleImageChange(event, setFieldValue)}
                    id='fileInput'
                    // style={{ display: 'none' }}
                  />
                  {/* <label htmlFor='fileInput' className='modal__upload-img-label'>
                    Upload Image
                  </label> */}
                  <ErrorMessage name='productImage' component='span' className='modal__input-field-error' />
                </div>

                <div className='modal__input-field-wrapper'>
                  <div className='modal__supplier-products-wrapper'>
                    <Field as='input' list='brand-list' name='brand' placeholder='Enter Brand' className='modal__input-field' />
                    <datalist id='brand-list'>
                      {brands.map((brand) => (
                        <option key={brand.brandId} value={brand.name}></option>
                      ))}
                    </datalist>
                    {/* <button className='modal__btn-insert-supplier-products'>+</button> */}
                  </div>
                  <ErrorMessage name='brand' component='span' className='modal__input-field-error' />
                </div>

                <div className='modal__input-field-wrapper'>
                  <div className='modal__supplier-products-wrapper'>
                    <Field as='input' list='category-list' name='category' placeholder='Enter Category' className='modal__input-field' />
                    <datalist id='category-list'>
                      {categories.map((category) => (
                        <option key={category.categoryId} value={category.name}></option>
                      ))}
                    </datalist>
                    {/* <button className='modal__btn-insert-supplier-products'>+</button> */}
                  </div>
                  <ErrorMessage name='category' component='span' className='modal__input-field-error' />
                </div>

                <div className='modal__input-field-wrapper'>
                  <Field type='text' name='product' placeholder='Enter Product Name' className='modal__input-field' />
                  <ErrorMessage name='product' component='span' className='modal__input-field-error' />
                </div>

                <div className='modal__input-field-wrapper'>
                  <Field type='number' name='lowStock' placeholder='Enter Low Stock Indicator' className='modal__input-field' />
                  <ErrorMessage name='lowStock' component='span' className='modal__input-field-error' />
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
                    <Field type='number' name='markupPercentage' placeholder='Enter Markup Percentage' className='modal__input-field markup-field' />
                    <span className='modal__percentage-label'>%</span>
                  </div>
                  <ErrorMessage name='markupPercentage' component='span' className='modal__input-field-error' />
                </div>

                <button type='submit' className='modal__insert'>Add Product</button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddProductModal;
