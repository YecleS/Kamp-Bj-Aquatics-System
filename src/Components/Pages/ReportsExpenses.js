import React, { useState } from 'react';
import '../Styles/ReportsExpenses.css';
import { MonthSelection, YearSelection } from '../UIComponents/DateControls';
import { ComposedChart, Bar, Legend, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ReportsExpenses = () => {
  const [activeFilter, setFilter] = useState('monthly');

  const reportsValues = {
    'monthly': <ReportsExpensesMonthly />,
    'yearly': <ReportsExpensesYearly />
  }

  const handleOnChangeFilter = (e) => {
    setFilter(
      e.target.value
    )
  }

  return (
    <div className='reports-expenses'>
      <div className='reports-expenses__header'>
        <select className='reports__filter' onChange={handleOnChangeFilter}>
          <option value='monthly'>Monthly</option>
          <option value='yearly'>Yearly</option>
        </select>
      </div>

      <div className='reports-expenses__body'>
        {reportsValues[activeFilter]}
      </div>
      
    </div>
  )
}

export default ReportsExpenses




export const ReportsExpensesMonthly = () => {
  const [displayedMonth, setDisplayedMonth] = useState(new Date().toLocaleDateString('default', { month:'long', year:'numeric' }));

  const handleMonthChange = (selectedMonth) => {
    setDisplayedMonth(selectedMonth.toLocaleDateString('default', { month: 'long', year: 'numeric' }));
  };

  const average = [
    { name: 'Waterlights', time: 1.30 },
    { name: 'Submarine Pump', time: 2.15 },
    { name: 'Aquatic Filter', time: 3 },
    { name: 'Fish Tank Heater', time: 4.45 },
    { name: 'Aquarium Decor', time: 3.35 }
  ];

  return (
    <div className='reports-expenses-component'>
      <div className='reports-expenses-component__header'>
        <MonthSelection 
          onChange={handleMonthChange}
          displayDate={displayedMonth}
        />
        <i className="reports__download-report-icon fa-solid fa-file-arrow-down"></i>
      </div>

      <div className='reports-expenses-component__body'>
        <div className='graphs-container graph-shadow'>
          <div className='graphs-header'>
            <h3 className='graph-title'>Avg Selling Time For Top Products</h3>
          </div>   
          <ResponsiveContainer width="100%" height="96%">
            <AreaChart
              width={500}
              height={400}
              data={average}
              margin={{
                top: 30,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" dy={5} tick={{ fontSize: 14 }} />
              <YAxis tick={{ fontSize: 14 }}/>
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="time" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className='graphs-container graph-shadow'>
          <div className='graphs-header'>
            <h3 className='graph-title'>Most Restocked Products</h3>
          </div>   
          <ResponsiveContainer width="100%" height="96%">
            <ComposedChart
              width={500}
              height={400}
              data={average}
              margin={{
                top: 30,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="name" scale="band" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="time" barSize={20} fill="#413ea0" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}




export const ReportsExpensesYearly = () => {
  const [selectedYear, setSelectedYear] = useState(new Intl.DateTimeFormat('default', { year:'numeric' }).format(new Date()));

  const handleYearChange = (selectedYear) => {
    const formattedYear = new Intl.DateTimeFormat('default', {year:'numeric'}).format(selectedYear)
    setSelectedYear(formattedYear);
  }
  
  const average = [
    { name: 'Waterlights', time: 1.30 },
    { name: 'Submarine Pump', time: 2.15 },
    { name: 'Aquatic Filter', time: 3 },
    { name: 'Fish Tank Heater', time: 4.45 },
    { name: 'Aquarium Decor', time: 3.35 }
  ];

  return (
    <div className='reports-expenses-component'>
      <div className='reports-expenses-component__header'>
        <YearSelection 
          onChange={handleYearChange}
          displayDate={selectedYear}
        />
        <i className="reports__download-report-icon fa-solid fa-file-arrow-down"></i>
      </div>

      <div className='reports-expenses-component__body'>
        <div className='graphs-container graph-shadow'>
          <div className='graphs-header'>
            <h3 className='graph-title'>Avg Selling Time For Top Products</h3>
          </div>   
          <ResponsiveContainer width="100%" height="96%">
            <AreaChart
              width={500}
              height={400}
              data={average}
              margin={{
                top: 30,
                right: 30,
                left: 0,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" dy={10} tick={{ fontSize: 14 }} />
              <YAxis tick={{ fontSize: 14 }}/>
              <Tooltip />
              <Area type="monotone" dataKey="time" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className='graphs-container graph-shadow'>
          <div className='graphs-header'>
            <h3 className='graph-title'>Most Restocked Products</h3>
          </div>   
          <ResponsiveContainer width="100%" height="96%">
            <ComposedChart
              width={500}
              height={400}
              data={average}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="name" scale="band" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="time" barSize={20} fill="#413ea0" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}