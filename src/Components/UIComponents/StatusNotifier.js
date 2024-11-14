import React from 'react';
import '../Styles/StatusNotifier.css';

const StatusNotifier = ({ stocks, lowStockIndicator}) => {
    const stock = parseInt(stocks);
    const indicator = parseInt(lowStockIndicator);
    if (stock == 0) {
        return (
            <>
                <i className="out-of-stocks fa-solid fa-circle-exclamation"></i>
            </>
        );
    } else if (stock <= indicator) {
        
        return (
            <>
                <i className="low-stocks fa-solid fa-circle-exclamation"></i>
            </>
        );
    } else if (stock > indicator) {
        return (
            <>
                <i className="high-stocks fa-solid fa-circle-exclamation"></i>
            </>
        );
    }
};

export default StatusNotifier;
