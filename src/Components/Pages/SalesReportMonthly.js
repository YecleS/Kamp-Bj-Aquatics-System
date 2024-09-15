import React, { useState, useEffect } from 'react';
import { MonthSelection } from '../UIComponents/DateControls';

const SalesReportMonthly = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().toLocaleDateString('default', {month:'long', year:'numeric'}));

  const handleMonthChange = (selectedMonth) => {
    setSelectedMonth(selectedMonth.toLocaleDateString('default', { month:'long', year:'numeric' }));
  }


  return (
    <div className='sales-report-monthly'>
      <div className='sales-report-monthly__header'>
        <MonthSelection 
          onChange={handleMonthChange}
          displayDate={selectedMonth}
        />
      </div>
      <div className='sales-report-monthly__body'></div>
    </div>
  )
}

export default SalesReportMonthly
