import React, { useState } from 'react';
import { DateSelection } from '../UIComponents/DateControls'

const ExpensesReportDaily = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString());

  const handleDateChange = (selectedDate) => {
    setSelectedDate(selectedDate.toLocaleDateString());
  }

  return (
    <div className='expenses-daily'>
      <div className='expenses-daily__header'>
        <DateSelection 
          onChange={handleDateChange}
          displayDate={selectedDate }
        />
      </div>
      <div className='expenses-daily__body'></div>
    </div>
  )
}

export default ExpensesReportDaily
