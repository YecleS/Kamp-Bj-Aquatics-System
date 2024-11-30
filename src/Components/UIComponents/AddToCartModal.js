import React, { useState, useEffect } from 'react';
import '../Styles/Modal.css';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';

const AddToCartModal = ({ onClick, product, onAddToCart }) => {
    const [batchNumbers, setBatchNumbers] = useState([]);
    const [selectedBatchDetails, setSelectedBatchDetails] = useState({ quantity: 0, sellingPrice: 0 });
    const initialValues = { quantity: '', batchNumber: "" };
    const apiUrl = process.env.REACT_APP_API_URL;

    // Fetch product batch data
    useEffect(() => {
        const fetchProductBatchData = async () => {
            if (product?.productId) {
                try {
                    const response = await fetch(`${apiUrl}/KampBJ-api/server/getProductBatchNum.php?productId=${product.productId}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch product batch data');
                    }
                    const data = await response.json();
                    setBatchNumbers(data);
                } catch (error) {
                    console.error('Error fetching product batch data:', error);
                    toast.error('Failed to load batch data.');
                }
            }
        };

        fetchProductBatchData();
    }, [product, apiUrl]);

    // Fetch batch details when batch number changes
    useEffect(() => {
        const fetchBatchDetails = async () => {
            if (selectedBatchDetails.batchNumber) {
                try {
                    const batchData = await getBatchDetails(product.productId, selectedBatchDetails.batchNumber);
                    if (batchData && batchData[0]) {
                        setSelectedBatchDetails({
                            quantity: batchData[0].quantity,
                            sellingPrice: batchData[0].sellingPrice,
                            batchNumber: selectedBatchDetails.batchNumber // Ensure batchNumber is set
                        });
                    }
                } catch (error) {
                    console.error('Error fetching batch details:', error);
                }
            }
        };

        if (selectedBatchDetails.batchNumber) {
            fetchBatchDetails();
        }
    }, [selectedBatchDetails.batchNumber, product.productId]);

    const getBatchDetails = async (productId, batchNumber) => {
        try {
            const response = await fetch(`${apiUrl}/KampBJ-api/server/getBatchDetails.php?productId=${productId}&batchNumber=${batchNumber}`);
            if (!response.ok) {
                throw new Error('Failed to fetch product batch data');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching product batch data:', error);
            toast.error('Failed to fetch batch details.');
            throw error;
        }
    };

    const validationSchema = Yup.object({
        quantity: Yup.number()
            .required('Quantity is required')
            .moreThan(0, 'Invalid Quantity')
            .integer('Invalid Quantity')
            .max(selectedBatchDetails.quantity, `Quantity cannot exceed available stock (${selectedBatchDetails.quantity})`), // Validate stock limit
    });

    const addToCart = (values, { resetForm }) => {
        if (values.quantity > selectedBatchDetails.quantity) {
            toast.error(`You cannot add more than the available stock: ${selectedBatchDetails.quantity}`);
            return; // Prevent adding to cart if quantity exceeds stock
        }

        onAddToCart(product, values.quantity, values.batchNumber);
        resetForm();
        onClick();
    };

    return (
        <div className="modal">
            <div className="modal__wrapper">
                <i className="modal__close-icon fa-solid fa-xmark" onClick={onClick}></i>
                <div className="modal__body">
                    <Formik initialValues={initialValues} onSubmit={addToCart} validationSchema={validationSchema}>
                        {({ setFieldValue, values }) => (
                            <Form className="modal__form">

                                <div className="modal__input-field-wrapper">
                                    <Field
                                        as="select"
                                        name="batchNumber"
                                        className="modal__input-field"
                                        onChange={e => {
                                            const { value } = e.target;
                                            setFieldValue("batchNumber", value);
                                            setSelectedBatchDetails(prev => ({ ...prev, batchNumber: value })); // Update local state
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
                                    <ErrorMessage name="batchNumber" component="span" className="modal__input-field-error" />
                                </div>

                                <div className="modal__input-field-wrapper">
                                    <Field type="number" name="quantity" placeholder="Enter Quantity" className="modal__input-field" />
                                    <ErrorMessage name="quantity" component="span" className="modal__input-field-error" />
                                </div>
                                
                                <div className='modal__details-wrapper'>
                                    <p className='modal__details'><span className='emphasized'>Available Stocks:</span> {selectedBatchDetails.quantity}</p>
                                    <p className='modal__details'><span className='emphasized'>Selling Price:</span> {selectedBatchDetails.sellingPrice}</p>
                                </div>
                                
                                <button type="submit" className="modal__insert">Add To Cart</button>
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
