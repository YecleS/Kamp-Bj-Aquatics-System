import React, { useState } from 'react';
import { YearSelection } from '../UIComponents/DateControls';
import '../Styles/DashboardYearly.css'

const DashboardYearly = () => {
  const [selectedYear, setSelectedYear] = useState(new Intl.DateTimeFormat('default', { year:'numeric' }).format(new Date()));

  const handleYearChange = (selectedYear) => {
    setSelectedYear( new Intl.DateTimeFormat('default', {year:'numeric'}).format(selectedYear));
  }

  return (
    <div className='dashboard-yearly'>
      <div className='dashboard-yearly__header'>
        <YearSelection 
          onChange={handleYearChange}
          displayDate={selectedYear}
        />
      </div>
      <div className='dashboard-yearly__body'>
        Lagyan mo nalang ng mga graphs, tas i style ko nalang pag nalagay mona lahat
      </div>
    </div>
  )
}

export default DashboardYearly
