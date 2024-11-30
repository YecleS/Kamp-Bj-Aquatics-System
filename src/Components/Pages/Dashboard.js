import React, { useState } from 'react';
import '../Styles/Dashboard.css';
import DashboardDaily from '../Pages/DashboardDaily';
import DashboardWeekly from '../Pages/DashboardWeekly';
import DashboardMonthly from '../Pages/DashboardMonthly';
import DashboardYearly from '../Pages/DashboardYearly';

const Dashboard = () => {
  const [activeFilter, setFilter] = useState('daily');
  
  const dashboardStates = {
    'daily': <DashboardDaily />,
    'weekly': <DashboardWeekly />,
    'monthly': <DashboardMonthly />,
    'yearly': <DashboardYearly />
  };

  const handleOnChangeFilter = (e) => {
    setFilter(
      e.target.value
    )
  }

  return (
    <div className='dashboard'>
      <div className='dashboard__header'>
        <select className='dashboard__filter' onChange={handleOnChangeFilter}>
          <option value='daily'>Daily</option>
          <option value='weekly'>Last 7 Days</option>
          <option value='monthly'>Monthly</option>
          <option value='yearly'>Yearly</option>
        </select>
          
      </div>

      <div className='dashboard__body'>
        {dashboardStates[activeFilter]}
      </div>
    </div>
  )
}

export default Dashboard
