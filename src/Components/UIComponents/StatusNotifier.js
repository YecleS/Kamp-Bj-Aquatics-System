import React from 'react';
import '../Styles/StatusNotifier.css';

const StatusNotifier = ({ stocks, lowStockIndicator}) => {
    if (stocks == 0) {
        return (
            <>
                <i className="out-of-stocks fa-solid fa-circle-exclamation"></i>
            </>
        );
    } else if (stocks <= lowStockIndicator) {
        return (
            <>
                <i className="low-stocks fa-solid fa-circle-exclamation"></i>
            </>
        );
    } else if (stocks > lowStockIndicator) {
        return (
            <>
                <i className="high-stocks fa-solid fa-circle-exclamation"></i>
            </>
        );
    }
};

export default StatusNotifier;
