import React, { useEffect, useState } from 'react';
import { DateSelection } from '../UIComponents/DateControls';

const SalesReportWeekly = () => {
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const currDate = new Date();
    const endDate = new Date();

    endDate.setDate(currDate.getDate() - 6);
    setSelectedDate(`${currDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`);
  }, [])

  const handleWeekChange = (selectedDate) => {
    const currDate = selectedDate;
    const endDate = new Date();

    endDate.setDate(currDate.getDate() - 6);
    setSelectedDate(`${currDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`);

  }


  return (
    <div className='sales-report-weekly'>
      <div className='sales-report-weekly__header'>
        <DateSelection 
          onChange={handleWeekChange}
          displayDate={selectedDate}
        />
      </div>
      <div className='sales-report-weekly__body'></div>
    </div>
  )
}

export default SalesReportWeekly
