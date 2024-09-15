import React, { useState } from 'react';
import { MonthSelection } from '../UIComponents/DateControls';

const ExpensesReportMonthly = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().toLocaleDateString('default', {month:'long', year:'numeric'}))

  const handleMonthChange = (month) => {
    setSelectedMonth(month.toLocaleDateString('default', { month:'long', year:'numeric'}));
  }

  return (
    <div className='expenses-monthly'>
      <div className='expenses-monthly__header'>
        <MonthSelection 
          onChange={handleMonthChange}
          displayDate={selectedMonth}
        />
      </div>
      <div className='expenses-monthly__body'></div>
    </div>
  )
}

export default ExpensesReportMonthly
