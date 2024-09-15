import React, { useState } from 'react';
import '../Styles/ExpensesReport.css';
import ReportDaily from '../Pages/ExpensesReportDaily';
import ReportWeekly from '../Pages/ExpensesReporyWeekly';
import ReportMonthly from '../Pages/ExpensesReportMonthly';
import ReportYearly from '../Pages/ExpensesReportYearly';

const ExpensesReport = () => {
  const [activeButton, setActiveButton] = useState('daily');

  const reportStates = {
    'daily': <ReportDaily />,
    'weekly': <ReportWeekly />,
    'monthly': <ReportMonthly />,
    'yearly': <ReportYearly />,
  }

  return (
    <div className='expenses-report'>
      <div className='expenses-report__header'>
      <button className={`expenses-report__control-button ${activeButton === 'daily' ? 'expenses-report__control-button-active': ''}`} onClick={()=> setActiveButton('daily')}>Daily</button>
          <button className={`expenses-report__control-button ${activeButton === 'weekly' ? 'expenses-report__control-button-active': ''}`} onClick={()=> setActiveButton('weekly')}>Weekly</button>
          <button className={`expenses-report__control-button ${activeButton === 'monthly' ? 'expenses-report__control-button-active': ''}`} onClick={()=> setActiveButton('monthly')}>Monthly</button>
          <button className={`expenses-report__control-button ${activeButton === 'yearly' ? 'expenses-report__control-button-active': ''}`} onClick={()=> setActiveButton('yearly')}>Yearly</button>
      </div>
      <div className='exepenses-report__body'>
        {reportStates[activeButton]}
      </div>
    </div>
  )
}

export default ExpensesReport
