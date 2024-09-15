import React, { useEffect, useState } from 'react';
import { DateSelection } from '../UIComponents/DateControls';
import '../Styles/DashboardWeekly.css';

const DashboardWeekly = () => {
  const [weekRange, setWeekRange] = useState('');

  //To set default date based on the most current date
  useEffect(() => {
    const today = new Date();
    const end = new Date();

    end.setDate(today.getDate() - 6);

    setWeekRange(`${today.toLocaleDateString()} - ${end.toLocaleDateString()}`);
  },[])

  const handleWeekChange = (selectedDate) => {
    const startingDate = new Date(selectedDate);
    const endDate = new Date();

    endDate.setDate(startingDate.getDate() - 6);

    setWeekRange(`${startingDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`);
  }

  return (
    <div className='dashboard-weekly'>
      <div className='dashboard-weekly__header'>
        <DateSelection 
          onChange={handleWeekChange}
          displayDate={weekRange}
        />
      </div>
      <div className='dashboard-weekly__body'>Lagyan mo nalang ng mga graphs, tas i style ko nalang pag nalagay mona lahat</div>
    </div>
  )
}

export default DashboardWeekly
