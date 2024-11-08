import React, { useState, useEffect } from 'react';
import '../Styles/Modal.css';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import { ToastSuccess } from './ToastComponent';
import CheckboxGroup from './CheckboxGroup';

const EditSupplierModal = ({ onClick, supplierData, fetchSuppliers }) => {
  const [categoriesData, setCategoriesData] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost/KampBJ-api/server/fetchCategories.php');
      const data = await response.json();
      setCategoriesData(data.categories || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const initialValues = {
    supplier: supplierData?.supplierName || "",
    email: supplierData?.email || "",
    contact: supplierData?.contactNum || "",
    location: supplierData?.location || "",
    categories: supplierData && supplierData.categories 
    ? supplierData.categories.map(cat => String(cat.categoryId))
    : [],
  };

  const validationSchema = Yup.object({
    supplier: Yup.string().required('Supplier is Required').matches(/^[a-zA-Z0-9\s]*$/, 'Special Chars are not Allowed'),
    email: Yup.string().required('Email is Required').email('Invalid Email'),
    contact: Yup.string().required('Contact is Required').matches(/^\d+$/, 'Only Numbers are Allowed').length(11, 'Contact must be exactly 11 digits'),
    location: Yup.string().required('Location is Required'),
    categories: Yup.array().min(1, 'At least one category must be selected'),
  });

  const update = async (values, { resetForm }) => {
    const formData = new URLSearchParams();
    formData.append('supplierId', supplierData.supplierId);
    formData.append('supplier', values.supplier);
    formData.append('email', values.email);
    formData.append('contact', values.contact);
    formData.append('location', values.location);
    formData.append('categories', values.categories.join(',')); // Send selected categories as a comma-separated string

    try {
      const response = await fetch('http://localhost/KampBJ-api/server/updateSupplier.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });
      const data = await response.json();

      if (data.status === "success") {
        ToastSuccess('Updated Successfully');
        resetForm();
        onClick(null); // Close the modal
        fetchSuppliers(); // Fetch the updated supplier list
      } else {
        toast.error(data.message || 'Error updating supplier');
      }
    } catch (error) {
      console.error("Error updating supplier:", error);
      toast.error('Error updating supplier');
    }
  };

  return (
    <div className='modal'>
      <div className='modal__wrapper'>
        <i className="modal__close-icon fa-solid fa-xmark" onClick={() => onClick(null)}></i>
        <div className='modal__body'>
          <Formik 
            initialValues={initialValues} 
            onSubmit={update} 
            validationSchema={validationSchema}
            enableReinitialize
          >
            {({ errors, touched }) => (
              <Form className='modal__form'>
                <div className='modal__input-field-wrapper'>
                  <label className='modal__input-field-label'>Supplier Name:</label>
                  <Field name="supplier" className='modal__input-field' />
                  <ErrorMessage name="supplier" component='span' className='modal__input-field-error' />
                </div>
                <div className='modal__input-field-wrapper'>
                  <label className='modal__input-field-label'>Email:</label>
                  <Field name="email" type="email" className='modal__input-field' />
                  <ErrorMessage name="email" component='span' className='modal__input-field-error' />
                </div>
                <div className='modal__input-field-wrapper'>
                  <label className='modal__input-field-label'>Contact Number:</label>
                  <Field name="contact" className='modal__input-field' />
                  <ErrorMessage name="contact" component='span' className='modal__input-field-error' />
                </div>
                <div className='modal__input-field-wrapper'>
                  <label className='modal__input-field-label'>Location:</label>
                  <Field name="location" className='modal__input-field' />
                  <ErrorMessage name="location" component='span' className='modal__input-field-error' />
                </div>
                <div className='modal__input-field-wrapper'>
                  <CheckboxGroup
                    label="Product Categories:"
                    name="categories"
                    options={categoriesData.map(category => ({ label: category.name, value: category.categoryId }))}
                    selectedCategories={initialValues.categories} // Pass selected categories to CheckboxGroup
                  />
                  {errors.categories && touched.categories ? (
                    <span className="modal__input-field-error">{errors.categories}</span>
                  ) : null}
                </div>

                <button type='submit' className='modal__insert'>Update</button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditSupplierModal;
