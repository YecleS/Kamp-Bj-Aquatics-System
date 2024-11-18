import React, { useState, useEffect } from 'react';
import '../Styles/Modal.css';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import DefaultImagePreview from '../Assets/image-preview.png';
import { ToastSuccess, ToastError } from '../UIComponents/ToastComponent';

const AddVoidProductRecordModal = ({ onClick, exit, product, refresh }) => {
  const [imagePreview, setImagePreview] = useState(DefaultImagePreview);
  const [batchNumbers, setBatchNumbers] = useState([]);
  const [selectedBatchDetails, setSelectedBatchDetails] = useState({ quantity: 0, sellingPrice: 0, batchNumber: '' });
  const apiUrl = process.env.REACT_APP_API_URL;

  const initialValues = {
    receiptImage: null,
    description: '',
    quantity: '',
    date: '',
    batchNumber: '',
  };

  useEffect(() => {
    const fetchBatchNumbers = async () => {
      if (product?.productId) {
        try {
          const response = await fetch(`${apiUrl}/KampBJ-api/server/getProductBatchNum.php?productId=${product.productId}`);
          if (!response.ok) throw new Error('Failed to fetch batch data');
          const data = await response.json();
          setBatchNumbers(data);
        } catch (error) {
          toast.error('Failed to load batch data.');
        }
      }
    };

    fetchBatchNumbers();
  }, [product, apiUrl]);

  useEffect(() => {
    if (selectedBatchDetails.batchNumber) {
      const fetchBatchDetails = async () => {
        try {
          const response = await fetch(`${apiUrl}/KampBJ-api/server/getBatchDetails.php?productId=${product.productId}&batchNumber=${selectedBatchDetails.batchNumber}`);
          if (!response.ok) throw new Error('Failed to fetch batch details');
          const data = await response.json();
          if (data.length > 0) {
            setSelectedBatchDetails({
              ...selectedBatchDetails,
              quantity: data[0].quantity,
              sellingPrice: data[0].sellingPrice,
            });
          }
        } catch (error) {
          toast.error('Failed to fetch batch details.');
        }
      };
      fetchBatchDetails();
    }
  }, [selectedBatchDetails.batchNumber, product.productId, apiUrl]);

  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    setFieldValue('receiptImage', file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const validationSchema = Yup.object({
    receiptImage: Yup.mixed().required('Proof of product defect is required'),
    description: Yup.string().required('Reason for voiding is required'),
    batchNumber: Yup.string().required('Batch selection is required'),
    quantity: Yup.number()
      .required('Quantity is required')
      .positive('Invalid Input')
      .max(selectedBatchDetails.quantity, `Cannot exceed available stock (${selectedBatchDetails.quantity})`),
    date: Yup.date().required('Date is required'),
  });

  const insertRecord = async (values, { resetForm }) => {
    try {
      const formData = new FormData();
      formData.append('userId', localStorage.getItem('userId'));
      formData.append('productId', product.productId);
      formData.append('batchNumber', values.batchNumber);
      formData.append('name', product.productName);
      formData.append('description', values.description);
      formData.append('quantity', values.quantity);
      formData.append('date', values.date);
      if (values.receiptImage) formData.append('receiptImage', values.receiptImage);

      const response = await fetch(`${apiUrl}/KampBJ-api/server/insertVoidRecord.php`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        ToastSuccess(result.message);
        resetForm();
        onClick();
        refresh();
        exit();
      } else {
        ToastError(result.message);
      }
    } catch (error) {
      ToastError('Failed to save record. Try again.');
    }
  };

  return (
    <div className='modal'>
      <div className='modal__wrapper'>
        <i className="modal__close-icon fa-solid fa-xmark" onClick={onClick}></i>
        <div className='modal__body'>
          <Formik initialValues={initialValues} onSubmit={insertRecord} validationSchema={validationSchema}>
            {({ setFieldValue }) => (
              <Form className='modal__form'>
                <div className='modal__input-field-wrapper'>
                  <div className='modal__image-preview-wrapper'>
                    <img src={imagePreview} alt="Preview" className='modal__image-preview' />
                  </div>
                  <input
                    type='file'
                    name='receiptImage'
                    accept='image/jpg, image/jpeg, image/png'
                    onChange={(event) => handleImageChange(event, setFieldValue)}
                    className='modal__image-input'
                  />
                  <ErrorMessage name='receiptImage' component='span' className='modal__input-field-error' />
                </div>

                <div className='modal__input-field-wrapper'>
                  <Field type='text' name='description' placeholder='Description' className='modal__input-field' />
                  <ErrorMessage name='description' component='span' className='modal__input-field-error' />
                </div>

                <div className='modal__input-field-wrapper'>
                  <Field
                    as="select"
                    name="batchNumber"
                    className="modal__input-field"
                    onChange={e => {
                      const { value } = e.target;
                      setFieldValue("batchNumber", value);
                      setSelectedBatchDetails(prev => ({ ...prev, batchNumber: value }));
                    }}
                  >
                    <option value="">Select Batch</option>
                    {batchNumbers.length > 0 ? (
                      batchNumbers.map((batch, index) => (
                        <option key={index} value={batch.batchNumber}>
                          {batch.batchNumber}
                        </option>
                      ))
                    ) : (
                      <option value="" disabled>No batches available</option>
                    )}
                  </Field>
                  <ErrorMessage name='batchNumber' component='span' className='modal__input-field-error' />
                  <h3>Available Stocks: {selectedBatchDetails.quantity}</h3>
                </div>

                <div className='modal__input-field-wrapper'>
                  <Field type='number' name='quantity' placeholder='Enter number of items' className='modal__input-field' />
                  <ErrorMessage name='quantity' component='span' className='modal__input-field-error' />
                </div>

                <div className='modal__input-field-wrapper'>
                  <Field type='date' name='date' className='modal__input-field' />
                  <ErrorMessage name='date' component='span' className='modal__input-field-error' />
                </div>

                <button type='submit' className='modal__insert'>Save Record</button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddVoidProductRecordModal;
