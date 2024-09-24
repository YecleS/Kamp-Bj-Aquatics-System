import React from 'react';
import '../Styles/StatusNotifier.css';

const StatusNotifier = ({stocks}) => {

    if(stocks == 0){
        return (
            <>
                <i className="out-of-stocks fa-solid fa-circle-exclamation"></i>
            </>
        )

    }else if (stocks <= 10) {
        return (
            <>
                <i className="low-stocks fa-solid fa-circle-exclamation"></i>
            </>
        )
    }
}

export default StatusNotifier
