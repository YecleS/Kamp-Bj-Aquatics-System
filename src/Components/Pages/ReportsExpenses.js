import React, { useState, useEffect } from 'react';
import '../Styles/ReportsExpenses.css';
import { MonthSelection, YearSelection } from '../UIComponents/DateControls';
import GraphsImageDownloader from '../UIComponents/GraphsImageDownloader';
import GeneratePdf from '../UIComponents/GeneratePdf';
import { ToastError } from '../UIComponents/ToastComponent';
import { ComposedChart, Bar, BarChart, Legend, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CustomTooltip } from '../UIComponents/CustomToolTip';
import { LegendFormatter } from '../UIComponents/LegendFormatter';

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
    fetch(`${apiUrl}/KampBJ-api/server/dataAnalysis/getRatioExpensesToSalesMonthly.php`, {
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
                    date: item.date,
                    expenses: Number(item.total_expenses).toFixed(2),
                    sales: Number(item.total_sales).toFixed(2),
                    ratio: parseFloat(item.ratio).toFixed(2),
                }));
                console.log(formattedExpensesData);
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
        <GeneratePdf elementId='graphs-container' 
          date={displayedMonth} reportTitle='Expenses Report' 
          elementGraphsTable='graph-container__table' 
          elementsGraphsDescription='graph-container__description'
          elementGraphWrapper='graphs-container__chart-wrapper'
          graphWrapperHeight='500px'
        />
      </div>

      <div className='reports-expenses-component__body'>

        <div className='graphs-container graph-shadow'id='graph-ratio'>
          <div className='graphs-header'>
            <h3 className='graph-title'>Expenses To Sales Ratio</h3>
            <GraphsImageDownloader elementId='graph-ratio'/>
          </div>

          <div className='graphs-container__chart-wrapper' style={{ height: "500px", width: "100%" }}>
              <ResponsiveContainer>
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
                      <XAxis dataKey="date" dy={5} 
                        tick={({ x, y, payload }) => {
                          const label = truncateLabel(payload.value, 5);  // Truncate label
                          return (
                            <text x={x} y={y} textAnchor="middle" fontSize={13} dy={10}>
                              {label}
                            </text>
                          );
                        }} 
                      />
                      <YAxis tick={{ fontSize: 14 }} />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="ratio" stroke="#8884d8" fill="#8884d8" />
                  </AreaChart>
              </ResponsiveContainer>
          </div>

          <div className='graph-container__table'>
            <h4>Expenses To Sales Ratio Table</h4>
              <table className='graph-table'>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Total Expenses</th>
                    <th>Total Sales</th>
                    <th>Ratio</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    expensesRatio.map((items, index) => (
                      <tr key={index}>
                        <td>{items.date}</td>
                        <td>
                          ₱ {Number(items.expenses).toLocaleString(undefined, { 
                                minimumFractionDigits: 2, 
                                maximumFractionDigits: 2 
                            })}
                        </td>
                        <td>
                          ₱ {Number(items.sales).toLocaleString(undefined, { 
                                minimumFractionDigits: 2, 
                                maximumFractionDigits: 2 
                            })}
                        </td>
                        <td>{items.ratio}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
          </div>

          <div className='graph-container__description'>
            <p>Ratio of Expenses to Revenue visualizes the relationship between expenses and sales (revenue) over time. It helps businesses track how efficiently revenue is utilized to cover operational and other costs.</p>
            <p><span>High Ratio (&gt; 0.5) :</span> Indicates a large portion of sales revenue is being consumed by expenses.</p>
            <p><span>Balanced Ratio (0.3 - 0.5) :</span> Shows expenses are proportional to sales, which often reflects stable cost management and healthy revenue.</p>
            <p><span>Low Ratio ( &lt; 0.3):</span> Indicates a smaller portion of revenue is spent on expenses.</p>
          </div>

        </div>

        <div className='graphs-container graph-shadow' id='graph-expenses-breakdown'>
          <div className='graphs-header'>
            <h3 className='graph-title'>Expenses Breakdown</h3>
            <GraphsImageDownloader elementId='graph-expenses-breakdown' />
          </div>

          <div className='graphs-container__chart-wrapper' style={{ height: "500px", width: "100%" }}>
            <ResponsiveContainer>
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
                    const label = truncateLabel(payload.value, 2);  // Truncate label
                    return (
                      <text x={x} y={y} textAnchor="middle" fontSize={13} dy={10}>
                        {label}
                      </text>
                    );
                  }} 
                />
                <YAxis />
                <Tooltip  content={<CustomTooltip />}/>
                <Legend formatter={(value) => LegendFormatter(value, 'total', 'Total Expenses')}/>
                <Bar dataKey="total" barSize={30} fill="#413ea0" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>  

          <div className='graph-container__table'>
            <h4>Expenses Breakdown</h4>
              <table className='graph-table'>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Total Expenses</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    expensesBreakdown.map((items, index) => (
                      <tr key={index}>
                        <td>{items.name}</td>
                        <td>
                          ₱ {Number(items.total).toLocaleString(undefined, { 
                                minimumFractionDigits: 2, 
                                maximumFractionDigits: 2 
                            })}
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
          </div>

          <div className='graph-container__description'>
            <h4>Description</h4>
            <p>
              This chart provides a detailed breakdown of total expenses. It helps identify which areas have the highest spending, enabling better cost management and resource allocation.
            </p>
          </div>

        </div>

      </div>
    </div>
  )
}




export const ReportsExpensesYearly = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [expensesBreakdown, setExpensesBreakdown] = useState([]);
  const [expensesRatio, setExpensesRatio] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Intl.DateTimeFormat('default', { year:'numeric' }).format(new Date()));

  const handleYearChange = (selectedYear) => {
    const formattedYear = new Intl.DateTimeFormat('default', {year:'numeric'}).format(selectedYear)
    setSelectedYear(formattedYear);

    getRatio();
  }

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  useEffect(() => {
    getExpensesData(selectedYear);
    getRatio();
  }, [selectedYear]);

  const getRatio = () => {
    fetch(`${apiUrl}/KampBJ-api/server/dataAnalysis/getRatioExpensesToSalesYearly.php`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ selectedYear: selectedYear }),
      })
          .then(response => response.json())
          .then(data => {
            if (data.length > 0) {
              const formattedData = data.map(item => ({
                date: monthNames[item.month - 1 ],
                expenses: Number(item.total_expenses).toFixed(2),
                sales: Number(item.total_sales).toFixed(2),
                ratio: item.ratio === 'N/A' ? 0 : Number(item.ratio).toFixed(2),
              }));
              setExpensesRatio(formattedData);
            } else {
              setExpensesRatio([]);
            }
          })  
          .catch(error => console.error('Error fetching expenses breakdown:', error));
  }



  const getExpensesData = (selectedYear) => {
    fetch(`${apiUrl}/KampBJ-api/server/dataAnalysis/fetchExpensesBreakdown.php`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ selectedDate: parseInt(selectedYear) }),
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
        <GeneratePdf elementId='graphs-container' 
          date={selectedYear} 
          reportTitle='Expenses Report'
          elementGraphsTable='graph-container__table' 
          elementsGraphsDescription='graph-container__description'
          elementGraphWrapper='graphs-container__chart-wrapper'
          graphWrapperHeight='500px'
        />
      </div>

      <div className='reports-expenses-component__body'>

        <div className='graphs-container graph-shadow' id='graph-ratio'>
          <div className='graphs-header'>
            <h3 className='graph-title'>Ratio Of Expenses To Revenue</h3>
            <GraphsImageDownloader elementId='graph-ratio'/>
          </div>

          <div className='graphs-container__chart-wrapper' style={{ height: "500px", width: "100%" }}>
            <ResponsiveContainer>
              <AreaChart
                width={500}
                height={400}
                data={expensesRatio}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <Legend />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="ratio" stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className='graph-container__table'>
            <h4>Expenses Breakdown</h4>
              <table className='graph-table'>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Expenses</th>
                    <th>Sales</th>
                    <th>Ratio</th>
                  </tr>
                </thead>
                <tbody>
                {
                    expensesRatio.map((items, index) => (
                      <tr key={index}>
                        <td>{items.date}</td>
                        <td>
                          ₱ {Number(items.expenses).toLocaleString(undefined, { 
                                minimumFractionDigits: 2, 
                                maximumFractionDigits: 2 
                            })}
                        </td>
                        <td>
                          ₱ {Number(items.sales).toLocaleString(undefined, { 
                                minimumFractionDigits: 2, 
                                maximumFractionDigits: 2 
                            })}
                        </td>
                        <td>{items.ratio}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>

              <div className='graph-container__description'>
                <p>Ratio of Expenses to Revenue visualizes the relationship between expenses and sales (revenue) over time. It helps businesses track how efficiently revenue is utilized to cover operational and other costs.</p>
                <p><span>High Ratio (&gt; 0.5) :</span> Indicates a large portion of sales revenue is being consumed by expenses.</p>
                <p><span>Balanced Ratio (0.3 - 0.5) :</span> Shows expenses are proportional to sales, which often reflects stable cost management and healthy revenue.</p>
                <p><span>Low Ratio ( &lt; 0.3):</span> Indicates a smaller portion of revenue is spent on expenses.</p>
              </div>
          </div>
          
        </div>

        <div className='graphs-container graph-shadow' id='graph-expenses-breakdown'>
          <div className='graphs-header'>
            <h3 className='graph-title'>Expenses Breakdown</h3>
            <GraphsImageDownloader elementId='graph-expenses-breakdown'/>
          </div>

          <div className='graphs-container__chart-wrapper' style={{ height: "500px", width: "100%" }}>
            <ResponsiveContainer>
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
                <Tooltip content={<CustomTooltip />}  />
                <Legend formatter={(value) => LegendFormatter(value, 'total', 'Total Expenses')}/>
                <Bar dataKey="total" barSize={30} fill="#413ea0" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          
          <div className='graph-container__table'>
            <h4>Expenses Breakdown</h4>
              <table className='graph-table'>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Total Expenses</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    expensesBreakdown.map((items, index) => (
                      <tr key={index}>
                        <td>{items.name}</td>
                        <td>
                          ₱ {Number(items.total).toLocaleString(undefined, { 
                                minimumFractionDigits: 2, 
                                maximumFractionDigits: 2 
                            })}
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
          </div>

          <div className='graph-container__description'>
            <p>
              This chart provides a detailed breakdown of total expenses. It helps identify which areas have the highest spending, enabling better cost management and resource allocation.
            </p>
          </div> 

        </div>


      </div>
    </div>
  )
}