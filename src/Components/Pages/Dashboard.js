import React, { useState } from 'react';
import '../Styles/Dashboard.css';
import DashboardDaily from '../Pages/DashboardDaily';
import DashboardWeekly from '../Pages/DashboardWeekly';
import DashboardMonthly from '../Pages/DashboardMonthly';
import DashboardYearly from '../Pages/DashboardYearly';

const Dashboard = () => {
  const [activeButton, setActiveButton] = useState('daily');
  
  const dashboardStates = {
    'daily': <DashboardDaily />,
    'weekly': <DashboardWeekly />,
    'monthly': <DashboardMonthly />,
    'yearly': <DashboardYearly />
  };

  return (
    <div className='dashboard'>
      <div className='dashboard__header'>
          <button className={`dashboard__control-button ${activeButton === 'daily' ? 'dashboard__control-button-active': ''}`} onClick={()=> setActiveButton('daily')}>Daily</button>
          <button className={`dashboard__control-button ${activeButton === 'weekly' ? 'dashboard__control-button-active': ''}`} onClick={()=> setActiveButton('weekly')}>Weekly</button>
          <button className={`dashboard__control-button ${activeButton === 'monthly' ? 'dashboard__control-button-active': ''}`} onClick={()=> setActiveButton('monthly')}>Monthly</button>
          <button className={`dashboard__control-button ${activeButton === 'yearly' ? 'dashboard__control-button-active': ''}`} onClick={()=> setActiveButton('yearly')}>Yearly</button>
      </div>

      <div className='dashboard__body'>
        {dashboardStates[activeButton]}
      </div>
    </div>
  )
}

export default Dashboard
