import React, { useState, useEffect } from 'react';
import '../Styles/Modal.css';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import DefaultImagePreview from '../Assets/image-preview.png';
import { ToastSuccess, ToastError } from '../UIComponents/ToastComponent';

const EditExpensesModal = ({ onClick, selectedExpense, refresh }) => {
    const [imagePreview, setImagePreview] = useState(DefaultImagePreview);
    const [expenseTitles, setExpenseTitles] = useState([]);
    const [isNewImageSelected, setIsNewImageSelected] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL;

    const initialValues = {
        receiptImage: "",
        expense: selectedExpense.title || "",
        reference: selectedExpense.reference || "",
        description: selectedExpense.description || "",
        date: selectedExpense.date ? new Date(selectedExpense.date) : "", 
        total: selectedExpense.total || "",
    };

    const validationSchema = Yup.object({
        receiptImage: Yup.mixed(),
        expense: Yup.string().required('Expense Type is required').matches(/^[a-zA-Z0-9\s]*$/, 'Special characters are not allowed'),
        description: Yup.string().required('Description is required'),
        date: Yup.date().required('Date is required'),
        total: Yup.number().required('Total amount is required').positive('Amount must be positive'),
    });

    useEffect(() => {
        fetch(`${apiUrl}/KampBJ-api/server/fetchExpenseTitles.php`)
            .then(response => response.json())
            .then(data => {
                setExpenseTitles(data);
            })
            .catch(error => {
                console.error('Error fetching expense titles:', error);
            });
    }, []);

    useEffect(() => {
        if (selectedExpense && selectedExpense.receiptImage) {
            setImagePreview(`${apiUrl}/KampBJ-api/server/uploads/expenseReceipts/${selectedExpense.receiptImage}`);
        }
    }, [selectedExpense]);

    const handleImageChange = (event, setFieldValue) => {
        const file = event.target.files[0];
        setFieldValue('receiptImage', file);
        setIsNewImageSelected(true);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const updateExpense = (values, { resetForm }) => {
        const formData = new FormData();
        formData.append('expenseId', selectedExpense.expenseId);
        formData.append('description', values.description);
        formData.append('total', values.total);
        formData.append('reference', values.reference);
        formData.append('date', values.date.toISOString().split("T")[0]);
        formData.append('expense', values.expense);

        if (isNewImageSelected) {
            formData.append('receiptImage', values.receiptImage);
        }

        fetch(`${apiUrl}/KampBJ-api/server/updateExpenseRecord.php`, {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
              ToastSuccess('Record Updated Succesfully!');
                resetForm();
                onClick();
                refresh();
            } else {
                toast.error('Failed to update expense');
            }
        })
        .catch(error => {
            console.error('Error updating expense:', error);
            toast.error('Error updating expense');
        });
    };

    return (
        <div className='modal'>
            <div className='modal__wrapper'>
                <i className="modal__close-icon fa-solid fa-xmark" onClick={onClick}></i>
                <div className='modal__body'>
                    <Formik initialValues={initialValues} onSubmit={updateExpense} validationSchema={validationSchema}>
                        {({ setFieldValue, values }) => (
                            <Form className='modal__form'>

                                <div className='modal__input-field-wrapper'>
                                    <div className='modal__image-preview-wrapper'>
                                        <img src={imagePreview} alt="Receipt Preview" className='modal__image-preview' />
                                    </div>
                                </div>
                                
                                <div className='modal__input-field-wrapper'>
                                    <input
                                        type='file'
                                        name='receiptImage'
                                        accept='image/jpg, image/jpeg, image/png'
                                        onChange={(event) => handleImageChange(event, setFieldValue)}
                                        id='fileInput'
                                        className='modal__image-input'
                                    />

                                    <ErrorMessage name='receiptImage' component='span' className='modal__input-field-error' />
                                </div>

                                <div className='modal__input-field-wrapper'>
                                    <Field as='input' list='expenses-list' name='expense' placeholder='Enter Expense Type' className='modal__input-field' />
                                    <datalist id='expenses-list'>
                                        {expenseTitles.map((title, index) => (
                                            <option key={index} value={title} />
                                        ))}
                                    </datalist>
                                    <ErrorMessage name='expense' component='span' className='modal__input-field-error' />
                                </div>

                                <div className='modal__input-field-wrapper'>
                                    <Field type='text' name='reference' placeholder='Reference Number' className='modal__input-field' />
                                    <ErrorMessage name='reference' component='span' className='modal__input-field-error' />
                                </div>
                                            
                                <div className='modal__input-field-wrapper'>
                                    <Field component='textarea' name='description' placeholder='Enter Description' className='modal__input-field description' />
                                    <ErrorMessage name='description' component='span' className='modal__input-field-error' />
                                </div>

                                <div className='modal__input-field-wrapper'>
                                    <DatePicker
                                        selected={values.date}
                                        onChange={(date) => setFieldValue('date', date)}
                                        dateFormat="yyyy-MM-dd"
                                        maxDate={new Date()}
                                        placeholderText='Select A Date'
                                        className='modal__input-field'
                                    />
                                    <ErrorMessage name='date' component='span' className='modal__input-field-error' />
                                </div>

                                <div className='modal__input-field-wrapper'>
                                    <Field type='number' name='total' placeholder='Enter Total' className='modal__input-field' />
                                    <ErrorMessage name='total' component='span' className='modal__input-field-error' />
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

export default EditExpensesModal;
