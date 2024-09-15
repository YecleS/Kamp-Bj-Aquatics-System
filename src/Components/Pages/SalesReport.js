import React, { useState } from 'react';
import '../Styles/SalesReport.css';
import ReportDaily from '../Pages/SalesReportDaily';
import ReportWeekly from '../Pages/SalesReportWeekly';
import ReportMonthly from '../Pages/SalesReportMonthly';
import ReportYearly from '../Pages/SalesReportYearly';


const SalesReport = () => {
  const [activeButton, setActiveButton] = useState('daily');
 
  const reportStates = {
    'daily': <ReportDaily />,
    'weekly': <ReportWeekly />,
    'monthly': <ReportMonthly />,
    'yearly': <ReportYearly />
  };
  
  return (
    <div className='sales-report'>
      <div className='sales-report__header'>
          <button className={`sales-report__control-button ${activeButton === 'daily' ? 'sales-report__control-button-active': ''}`} onClick={()=> setActiveButton('daily')}>Daily</button>
          <button className={`sales-report__control-button ${activeButton === 'weekly' ? 'sales-report__control-button-active': ''}`} onClick={()=> setActiveButton('weekly')}>Weekly</button>
          <button className={`sales-report__control-button ${activeButton === 'monthly' ? 'sales-report__control-button-active': ''}`} onClick={()=> setActiveButton('monthly')}>Monthly</button>
          <button className={`sales-report__control-button ${activeButton === 'yearly' ? 'sales-report__control-button-active': ''}`} onClick={()=> setActiveButton('yearly')}>Yearly</button>
      </div>
      <div className='sales-report__body'>
        {reportStates[activeButton]}
      </div>
    </div>
  )
}

export default SalesReport
