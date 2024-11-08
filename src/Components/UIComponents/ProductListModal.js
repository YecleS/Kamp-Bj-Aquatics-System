import React from 'react';
import '../Styles/Modal.css';

const ProductListModal = ({ isOpen, onClose, title, productList, selectedTransaction }) => {
    if (!isOpen) return null;

    if (title === 'restock') {
        return (
            <div className='modal'>
                <div className='modal__wrapper'>
                    <i className="modal__close-icon fa-solid fa-xmark" onClick={onClose}></i>
                    <div className='modal__body'>
                        <h3 className='modal__title'>Products In Expense ID: {selectedTransaction}</h3>
                        <br />
                        <table className='expenses__table'>
                            <thead>
                                <tr>
                                    <th className='expenses__table-th'>Product</th>
                                    <th className='expenses__table-th'>Brand</th>
                                    <th className='expenses__table-th'>Category</th>
                                    <th className='expenses__table-th'>Quantity</th>
                                    <th className='expenses__table-th'>Unit Price</th>
                                    <th className='expenses__table-th'>Supplier</th>
                                    <th className='expenses__table-th'>Total Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(productList) && productList.length > 0 ? (
                                    productList.map((product, index) => (
                                        <tr className='expenses__table-tr' key={index}>
                                            <td className='expenses__table-td'>{product.productName}</td>
                                            <td className='expenses__table-td'>{product.brandName}</td>
                                            <td className='expenses__table-td'>{product.categoryName}</td>
                                            <td className='expenses__table-td'>{product.quantity}</td>
                                            <td className='expenses__table-td'>{product.unitPrice}</td>
                                            <td className='expenses__table-td'>{product.supplier}</td>
                                            <td className='expenses__table-td'>{product.totalPrice}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className='expenses__table-td'>No products found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    } else if (title === 'Sales') {
        return (
            <div className='modal'>
                <div className='modal__wrapper'>
                    <i className="modal__close-icon fa-solid fa-xmark" onClick={onClose}></i>
                    <div className='modal__body'>
                        <h3 className='modal__title'>Products In Sales ID: {selectedTransaction}</h3>
                        <br />
                        <table className='expenses__table'>
                            <thead>
                                <tr>
                                    <th className='expenses__table-th'>Product</th>
                                    <th className='expenses__table-th'>Brand</th>
                                    <th className='expenses__table-th'>Model</th>
                                    <th className='expenses__table-th'>Unit Price</th>
                                    <th className='expenses__table-th'>Quantity</th>
                                    <th className='expenses__table-th'>Total Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(productList) && productList.length > 0 ? (
                                    productList.map((product, index) => (
                                        <tr className='expenses__table-tr' key={index}>
                                            <td className='expenses__table-td'>{product.productName}</td>
                                            <td className='expenses__table-td'>{product.brand}</td>
                                            <td className='expenses__table-td'>{product.model}</td>
                                            <td className='expenses__table-td'>{product.price}</td>
                                            <td className='expenses__table-td'>{product.quantity}</td>
                                            <td className='expenses__table-td'>{product.total}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className='expenses__table-td'>No products found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
};

export default ProductListModal;
