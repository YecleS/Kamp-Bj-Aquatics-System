import React, { useState, useEffect } from 'react';
import '../Styles/ReportsExpenses.css';
import { MonthSelection, YearSelection } from '../UIComponents/DateControls';
import GraphsImageDownloader from '../UIComponents/GraphsImageDownloader';
import GeneratePdf from '../UIComponents/GeneratePdf';
import { ToastSuccess, ToastError } from '../UIComponents/ToastComponent';
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
  const apiUrl = process.env.REACT_APP_API_URL;
  const [expensesRatio, setExpensesRatio] = useState([]);
  const [expensesBreakdown, setExpensesBreakdown] = useState([]);
  const [displayedMonth, setDisplayedMonth] = useState(new Date().toLocaleDateString('default', { month:'long', year:'numeric' }));

  const handleMonthChange = (selectedMonth) => {
    setDisplayedMonth(selectedMonth.toLocaleDateString('default', { month: 'long', year: 'numeric' }));

    const year = selectedMonth.getFullYear();
    const month = (selectedMonth.getMonth() + 1).toString().padStart(2, '0'); // Format month
    const formattedMonth = `${year}-${month}`;

    getExpensesData(formattedMonth);
    getRatio(formattedMonth);
  };

  useEffect(() => {
    const currentDate = new Date(); 
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const formattedMonth = `${year}-${month}`;

    getExpensesData(formattedMonth);
    getRatio(formattedMonth)
  }, []);

  const getExpensesData = (selectedMonth) => {
    fetch(`${apiUrl}/KampBJ-api/server/dataAnalysis/fetchExpensesBreakdown.php`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ selectedDate: selectedMonth }),
      })
          .then(response => response.json())
          .then(data => {
            if (data.status === 'success' && data.data) {
              const formattedExpensesData = data.data.map(item => ({
                name: item.name,
                total: item.total,
              }));
              setExpensesBreakdown(formattedExpensesData);
            } else {
              setExpensesBreakdown([]);
              ToastError('No expense data found for the selected Month.');
            }
          })
          .catch(error => console.error('Error fetching expenses breakdown:', error));
  }

  const getRatio = (selectedMonth) => {
    fetch(`${apiUrl}/KampBJ-api/server/dataAnalysis/getRatioOfSalesToRevenue.php`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ selectedDate: selectedMonth }),
      })
          .then(response => response.json())
          .then(data => {
            // Check if the data contains results (array with items)
            if (Array.isArray(data) && data.length > 0) {
                // If data is available, format it
                const formattedExpensesData = data.map(item => ({
                    date: item.date,  // Adjusted field from 'name' to 'date'
                    ratio: item.ratio.toFixed(2),  // Adjusted field from 'total' to 'ratio'
                }));
                setExpensesRatio(formattedExpensesData); // Set state with formatted data
            } else if (data.message && data.message === "No data found.") {
                // If no data found message is returned, set state to empty array
                setExpensesRatio([]);
            } else {
                // Handle unexpected response format or other cases
                setExpensesRatio([]);
                console.log("Unexpected data format:", data);
            }
          })
          .catch(error => console.error('Error fetching expenses breakdown:', error));
  }

  const average = [
    { name: 'Waterlights', time: 1.30 },
    { name: 'Submarine Pump', time: 2.15 },
    { name: 'Aquatic Filter', time: 3 },
    { name: 'Fish Tank Heater', time: 4.45 },
    { name: 'Aquarium Decor', time: 3.35 }
  ];

  const truncateLabel = (label, maxLength ) => {
    if (label.length > maxLength) {
      return `${label.slice(0, maxLength)}...`;
    }
    return label;
  };

  return (
    <div className='reports-expenses-component'>
      <div className='reports-expenses-component__header'>
        <MonthSelection 
          onChange={handleMonthChange}
          displayDate={displayedMonth}
        />
        <GeneratePdf elementId='graphs-container' date={displayedMonth} reportTitle='Expenses'/>
      </div>

      <div className='reports-expenses-component__body'>

        <div className='graphs-container graph-shadow'id='graph-ratio'>
          <div className='graphs-header'>
            <h3 className='graph-title'>Expenses To Sales Ratio</h3>
            <GraphsImageDownloader elementId='graph-ratio'/>
          </div>   
          <ResponsiveContainer width="100%" height="94%">
            <AreaChart
              width={500}
              height={400}
              data={expensesRatio}
              margin={{
                top: 30,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" dy={5} tick={{ fontSize: 14 }} />
              <YAxis tick={{ fontSize: 14 }}/>
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="ratio" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className='graphs-container graph-shadow' id='graph-expenses-breakdown'>
          <div className='graphs-header'>
            <h3 className='graph-title'>Expenses Breakdown</h3>
            <GraphsImageDownloader elementId='graph-expenses-breakdown' />
          </div>   
          <ResponsiveContainer width="100%" height="94%">
            <ComposedChart
              width={500}
              height={400}
              data={expensesBreakdown}
              margin={{
                top: 30,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="name" scale="band" angle={-50} 
                tick={({ x, y, payload }) => {
                  const label = truncateLabel(payload.value, 5);  // Truncate label
                  return (
                    <text x={x} y={y} textAnchor="middle" fontSize={13} dy={10}>
                      {label}
                    </text>
                  );
                }} 
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" barSize={30} fill="#413ea0" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}




export const ReportsExpensesYearly = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [expensesBreakdown, setExpensesBreakdown] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Intl.DateTimeFormat('default', { year:'numeric' }).format(new Date()));

  const handleYearChange = (selectedYear) => {
    const formattedYear = new Intl.DateTimeFormat('default', {year:'numeric'}).format(selectedYear)
    setSelectedYear(formattedYear);
  }

  useEffect(() => {
    getExpensesData(selectedYear);
  }, [selectedYear]);

  const getExpensesData = (selectedYear) => {
    fetch(`${apiUrl}/KampBJ-api/server/dataAnalysis/fetchExpensesBreakdown.php`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ selectedDate: selectedYear }),
      })
          .then(response => response.json())
          .then(data => {
            if (data.status === 'success' && data.data) {
              const formattedExpensesData = data.data.map(item => ({
                name: item.name,
                total: item.total,
              }));
              console.log(formattedExpensesData);
              setExpensesBreakdown(formattedExpensesData);
            } else {
              setExpensesBreakdown([]);
              ToastError('No expense data found for the selected Month.');
            }
          })
          .catch(error => console.error('Error fetching expenses breakdown:', error));
  }
  
  const average = [
    { name: 'Waterlights', time: 1.30 },
    { name: 'Submarine Pump', time: 2.15 },
    { name: 'Aquatic Filter', time: 3 },
    { name: 'Fish Tank Heater', time: 4.45 },
    { name: 'Aquarium Decor', time: 3.35 }
  ];

  const truncateLabel = (label, maxLength ) => {
    if (label.length > maxLength) {
      return `${label.slice(0, maxLength)}...`;
    }
    return label;
  };

  return (
    <div className='reports-expenses-component'>
      <div className='reports-expenses-component__header'>
        <YearSelection 
          onChange={handleYearChange}
          displayDate={selectedYear}
        />
        <GeneratePdf elementId='graphs-container' date={selectedYear} reportTitle='Expenses'/>
      </div>

      <div className='reports-expenses-component__body'>

        <div className='graphs-container graph-shadow' id='graph-ratio'>
          <div className='graphs-header'>
            <h3 className='graph-title'>Ratio Of Expenses To Revenue</h3>
            <GraphsImageDownloader elementId='graph-ratio'/>
          </div>   
          <ResponsiveContainer width="100%" height="94%">
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

        <div className='graphs-container graph-shadow' id='graph-expenses-breakdown'>
          <div className='graphs-header'>
            <h3 className='graph-title'>Expenses Breakdown</h3>
            <GraphsImageDownloader elementId='graph-expenses-breakdown'/>
          </div>   
          <ResponsiveContainer width="100%" height="94%">
            <ComposedChart
              width={500}
              height={400}
              data={expensesBreakdown}
              margin={{
                top: 30,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="name" scale="band" angle={-50} 
                tick={({ x, y, payload }) => {
                  const label = truncateLabel(payload.value, 3);  // Truncate label
                  return (
                    <text x={x} y={y} textAnchor="middle" fontSize={13} dy={10}>
                      {label}
                    </text>
                  );
                }} 
              />
              <YAxis/>
              <Tooltip />
              <Legend />
              <Bar dataKey="total" barSize={30} fill="#413ea0" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  )
}