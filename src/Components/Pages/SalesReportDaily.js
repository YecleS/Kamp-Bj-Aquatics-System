import React, { useState } from 'react';
import { DateSelection } from '../UIComponents/DateControls';

const SalesReportDaily = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString());

  const handleDateChange = (selectedDate) => {
    setSelectedDate(selectedDate.toLocaleDateString());
  }

  return (
    <div className='sales-report-daily'>
      <div className='sales-report-daily__header'>
        <DateSelection 
          onChange={handleDateChange}
          displayDate={selectedDate}
        />
      </div>
      <div className='sales-report-daily__body'></div>
    </div>
  )
}

export default SalesReportDaily
