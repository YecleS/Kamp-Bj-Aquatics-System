import React, { useState } from 'react';
import { YearSelection } from '../UIComponents/DateControls';

const ExpensesReportYearly = () => {
  const [selectedYear, setSelectedYear] = useState(new Intl.DateTimeFormat('default', {year:'numeric'}).format(new Date))

  const handleYearChange = (year) => {
    setSelectedYear(new Intl.DateTimeFormat('default', { year:'numeric'}).format(year));
  }

  


  return (
    <div className='expenses-yearly'>
      <div className='expenses-yearly__header'>
        <YearSelection
          onChange={handleYearChange}
          displayDate={selectedYear}
        />
      </div>
      <div className='expenses-yearly__body'>
        yearly
      </div>
    </div>
  )
}

export default ExpensesReportYearly
