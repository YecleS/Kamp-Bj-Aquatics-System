import React from 'react';
import '../Styles/ProductListModal.css'
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

                        <div className='product-list-modal__table-wrapper'>
                            <table className='product-list-modal__table'>
                                <thead>
                                    <tr>
                                        <th className='product-list-modal__table-th'>Product</th>
                                        <th className='product-list-modal__table-th'>Brand</th>
                                        <th className='product-list-modal__table-th'>Category</th>
                                        <th className='product-list-modal__table-th'>Quantity</th>
                                        <th className='product-list-modal__table-th'>Unit Price</th>
                                        <th className='product-list-modal__table-th'>Supplier</th>
                                        <th className='product-list-modal__table-th'>Total Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(productList) && productList.length > 0 ? (
                                        productList.map((product, index) => (
                                            <tr className='product-list-modal__table-tr' key={index}>
                                                <td className='product-list-modal__table-td'>{product.productName}</td>
                                                <td className='product-list-modal__table-td'>{product.brandName}</td>
                                                <td className='product-list-modal__table-td'>{product.categoryName}</td>
                                                <td className='product-list-modal__table-td'>{product.quantity}</td>
                                                <td className='product-list-modal__table-td'>{product.unitPrice}</td>
                                                <td className='product-list-modal__table-td'>{product.supplier}</td>
                                                <td className='product-list-modal__table-td'>{product.totalPrice}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className='product-list-modal__table-td'>No products found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        
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
                        <table className='product-list-modal__table'>
                            <thead>
                                <tr>
                                    <th className='product-list-modal__table-th'>Product</th>
                                    <th className='product-list-modal__table-th'>Brand</th>
                                    <th className='product-list-modal__table-th'>Model</th>
                                    <th className='product-list-modal__table-th'>Unit Price</th>
                                    <th className='product-list-modal__table-th'>Quantity</th>
                                    <th className='product-list-modal__table-th'>Total Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(productList) && productList.length > 0 ? (
                                    productList.map((product, index) => (
                                        <tr className='product-list-modal__table-tr' key={index}>
                                            <td className='product-list-modal__table-td'>{product.productName}</td>
                                            <td className='product-list-modal__table-td'>{product.brand}</td>
                                            <td className='product-list-modal__table-td'>{product.model}</td>
                                            <td className='product-list-modal__table-td'>{product.price}</td>
                                            <td className='product-list-modal__table-td'>{product.quantity}</td>
                                            <td className='product-list-modal__table-td'>{product.total}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className='product-list-modal__table-td'>No products found</td>
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
