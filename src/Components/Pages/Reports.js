import React, { useState } from 'react';
import ReportsDaily from '../Pages/ReportDaily';
import ReportsWeekly from '../Pages/ReportsWeekly';
import ReportsMonthly from '../Pages/ReportsMonthly';
import ReportsYearly from '../Pages/ReportsYearly';
import '../Styles/Reports.css'

const Reports = () => {
    const [activeFilter, setFilter] = useState('daily');

    const dashboardStates = {
        'daily': <ReportsDaily />,
        'weekly': <ReportsWeekly />,
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
          <option value='daily'>Daily</option>
          <option value='weekly'>Weekly</option>
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
