import React, { useState } from 'react';
import { DateSelection } from '../UIComponents/DateControls';
import '../Styles/DashboardDaily.css'

const DashboardDaily = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString());

  const handleDatechange = (selectedDate) => {
    setSelectedDate(`${selectedDate.toLocaleDateString()}`);
  }
  
  return (
    <div className='dashboard-daily'>
      <div className='dashboard-daily__header'>
        <DateSelection
          onChange={handleDatechange}
          displayDate={selectedDate}
        />
      </div>
      <div className='dashboard-daily__body'>
        <p>Lagyan mo nalang ng mga graphs, tas i style ko nalang pag nalagay mona lahat</p>
        <p>nag install ako ng react datepicker, ( npm install react-datepicker )</p>
        <p>nag lagay din ako ng css para sa checkbox group, tas mga css files para sa daily, weekly, monthly, yearly</p>
        <p>Tas ung sa DateControls sa UIComponents nandun ung component ng react-datepicker, may css file din un</p>
        <p>Tas ung sa Ledger ala pakong nalagay di ko pa alam kung ano ano ilalagay sa loob ng table e</p>
      </div>
    </div>
  )
}

export default DashboardDaily
