import React, { useState } from 'react';
import { YearSelection } from '../UIComponents/DateControls';

const SalesReportYearly = () => {
  const [selectedYear, setSelectedYear] = useState(new Intl.DateTimeFormat('default', {year:'numeric'}).format(new Date));
  
  const handleYearChange = (selectedYear) => {
    setSelectedYear(new Intl.DateTimeFormat('default', { year:'numeric'}).format(selectedYear))
  }

  return (
    <div className='sales-report-yearly'>
      <div className='sales-report-yearly__header'>
        <YearSelection
          onChange={handleYearChange} 
          displayDate={selectedYear}
        />
      </div>
      <div className='sales-report-yearly__body'></div>
    </div>
  )
}

export default SalesReportYearly
