import React, { useState } from 'react';
import { MonthSelection } from '../UIComponents/DateControls';
import '../Styles/DashboardMonthly.css'

const DashboardMonthly = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().toLocaleDateString('default', { month:'long', year:'numeric' }));

  const handleMonthChange = (selectedMonth) => {
    setSelectedMonth(selectedMonth.toLocaleDateString('default', { month: 'long', year: 'numeric' }));
  }

  return (
    <div className='dashboard-monthly'>
      <div className='dashboard-monthly__header'>
        <MonthSelection 
          onChange={handleMonthChange}
          displayDate={selectedMonth}
        />
      </div>
      <div className='dashboard-monthly__body'>
        Lagyan mo nalang ng mga graphs, tas i style ko nalang pag nalagay mona lahat
      </div>
    </div>
  )
}

export default DashboardMonthly
