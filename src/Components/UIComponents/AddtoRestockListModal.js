import React, { useEffect, useState } from 'react';
import '../Styles/Modal.css';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';

const AddToRestockListModal = ({ onClick, product, addToRestockList }) => {
  // Initial Values
  const initialValues = {
    quantity: 1,
    unitPrice: 0, // Default value for unitPrice
    supplier: '', // New field for supplier
  };

  const [suppliers, setSuppliers] = useState([]); // State for suppliers
  const apiUrl = process.env.REACT_APP_API_URL;

  // Validation
  const validationSchema = Yup.object({
    quantity: Yup.number().required('Quantity is Required').moreThan(0, 'Invalid Quantity'),
    unitPrice: Yup.number().required('Unit Price is Required').moreThan(0, 'Invalid Unit Price'),
    supplier: Yup.string().required('Supplier is Required'), // Add validation for supplier
  });

  // Fetch suppliers based on the product's category
  useEffect(() => {
    const fetchSuppliers = async () => {
      if (product && product.categoryId) {
        try {
          const response = await fetch(`${apiUrl}/KampBJ-api/server/fetchSupplierByCategory.php?categoryId=${product.categoryId}`);
          const data = await response.json();

          if (data.status === "success") {
            setSuppliers(data.suppliers);
          } else {
            toast.error(data.message); // Handle error messages from the server
          }
        } catch (error) {
          toast.error('Error fetching suppliers');
        }
      }
    };

    fetchSuppliers();
  }, [product]); // Run this effect when product changes

  // Method For Insertion of Values To Database
  const handleAddToRestockList = (values, { resetForm }) => {
    addToRestockList(values.quantity, values.unitPrice, values.supplier); // Pass quantity, unitPrice, and supplier to parent component
    resetForm();
    onClick();
  };

  return (
    <div className='modal'>
      <div className='modal__wrapper'>
        <i className="modal__close-icon fa-solid fa-xmark" onClick={onClick}></i>
        <div className='modal__body'>
          <div className='modal__product-name-wrapper'>
            <p className='modal__product-name'>{product?.productName}</p>
          </div>
          
          <Formik initialValues={initialValues} onSubmit={handleAddToRestockList} validationSchema={validationSchema}>
            {() => (
              <Form className='modal__form'>
                <div className='modal__input-field-wrapper'>
                  <Field type='number' name='quantity' placeholder='Enter Quantity' className='modal__input-field' />
                  <ErrorMessage name='quantity' component='span' className='modal__input-field-error' />
                </div>
                <div className='modal__input-field-wrapper'>
                  <Field type='number' name='unitPrice' placeholder='Enter Unit Price' className='modal__input-field' />
                  <ErrorMessage name='unitPrice' component='span' className='modal__input-field-error' />
                </div>
                <div className='modal__input-field-wrapper'>
                  <div className='modal__supplier-products-wrapper'>
                    <Field as='input' list='supplier-list' name='supplier' placeholder='Select Supplier' className='modal__input-field' />
                    <datalist id='supplier-list'>
                      {suppliers.map((supplier) => (
                        <option key={supplier.supplierId} value={supplier.supplierName}></option> // Ensure this matches your supplier name field
                      ))}
                    </datalist>
                  </div>
                  <ErrorMessage name='supplier' component='span' className='modal__input-field-error' /> {/* Corrected the name to 'supplier' */}
                </div>
                <button type='submit' className='modal__insert'>Add To Restock List</button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddToRestockListModal;
