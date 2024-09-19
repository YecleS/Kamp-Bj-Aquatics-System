import React, { useEffect, useState } from 'react';
import { DateSelection } from '../UIComponents/DateControls';

const ExpensesReporyWeekly = () => {
  const [selectedDate, setSelectedDate] = useState('')

  useEffect(() => {
    const currDate = new Date();
    const endDate = new Date();

    endDate.setDate(currDate.getDate() - 6);
    setSelectedDate(`${currDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`);
  }, [])

  const handleWeekChange = (date) => {
    const pickedDate = date;
    const endDate = new Date();

    endDate.setDate(pickedDate.getDate() - 6);
    setSelectedDate(`${pickedDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`);
  }

  return (
    <div className='expenses-weekly'>
      <div className='expenses-weekly__header'>
        <DateSelection
          onChange={handleWeekChange}
          displayDate={selectedDate}
        />
      </div>
      <div className='expenses-weekly__body'>
        
      </div>
    </div>
  )
}

export default ExpensesReporyWeekly
