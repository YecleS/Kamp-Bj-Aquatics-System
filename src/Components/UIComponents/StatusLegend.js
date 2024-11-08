import React from 'react';
import '../Styles/StatusLegend.css';

const StatusLegend = ({customClass}) => {
  return (
    <div className={`status-legend ${customClass}`}>
      <div className='status-legend__icon-wrapper'>
        <i className="out-of-stocks fa-solid fa-circle-exclamation"></i>
        <p className='status-legend__icon-description'>Out of Stocks</p>
      </div>
      <div className='status-legend__icon-wrapper'>
        <i className="low-stocks fa-solid fa-circle-exclamation"></i>
        <p className='status-legend__icon-description'>Low Stocks</p>
      </div>
      <div className='status-legend__icon-wrapper'>
        <i className="high-stocks fa-solid fa-circle-exclamation"></i>
        <p className='status-legend__icon-description'>High Stocks</p>
      </div>
    </div>
  )
}

export default StatusLegend
