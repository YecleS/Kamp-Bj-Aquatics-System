import React, { useState } from 'react';
import ReportsMonthly from '../Pages/ReportsMonthly';
import ReportsYearly from '../Pages/ReportsYearly';
import '../Styles/Reports.css'

const Reports = () => {
    const [activeFilter, setFilter] = useState('monthly');

    const dashboardStates = {
        'monthly': <ReportsMonthly />,
        'yearly': <ReportsYearly />
      };

      const handleOnChangeFilter = (e) => {
        setFilter(
          e.target.value
        )
      }

  return (
    <div className='reports'>
      <div className='reports__header'>
        <select className='reports__filter' onChange={handleOnChangeFilter}>
          <option value='monthly'>Monthly</option>
          <option value='yearly'>Yearly</option>
        </select>
          
      </div>

      <div className='reports__body'>
        {dashboardStates[activeFilter]}
      </div>
    </div>
  )
}

export default Reports
