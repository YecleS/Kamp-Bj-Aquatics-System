import React, { useEffect, useState } from 'react';
import '../Styles/ReportsSales.css';
import { MonthSelection, YearSelection } from '../UIComponents/DateControls';
import { ToastError } from '../UIComponents/ToastComponent';
import { ComposedChart, Bar, Legend, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ReportsSales = () => {
  const [activeFilter, setFilter] = useState('monthly');

  const reportsValues = {
    'monthly': <ReportsSalesMonthly />,
    'yearly': <ReportsSalesYearly />
  }

  const handleOnChangeFilter = (e) => {
    setFilter(
      e.target.value
    )
  }

  return (
    <div className='reports-sales'>
      <div className='reports-sales__header'>
        <select className='reports__filter' onChange={handleOnChangeFilter}>
          <option value='monthly'>Monthly</option>
          <option value='yearly'>Yearly</option>
        </select>
      </div>

      <div className='reports-sales__body'>
        {reportsValues[activeFilter]}
      </div>
      
    </div>
  )
}

export default ReportsSales




export const ReportsSalesMonthly = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [topProductsData, setTopProductsData] = useState([]);
  const [leastProductData, setLeastProductData] = useState([]);
  const [displayedMonth, setDisplayedMonth] = useState(new Date().toLocaleDateString('default', { month:'long', year:'numeric' }));

  const handleMonthChange = (selectedMonth) => {
    setDisplayedMonth(selectedMonth.toLocaleDateString('default', { month: 'long', year: 'numeric' }));

    const year = selectedMonth.getFullYear();
    const month = (selectedMonth.getMonth() + 1).toString().padStart(2, '0'); // Format month
    const formattedMonth = `${year}-${month}`;

    getTop5Products(formattedMonth);
    getLeastProducts(formattedMonth);
  };

  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const formattedMonth = `${year}-${month}`;

    getTop5Products(formattedMonth);
    getLeastProducts(formattedMonth);
  },[])

  const getTop5Products = (formattedMonth) => {
    fetch(`${apiUrl}/KampBJ-api/server/dataAnalysis/getTop5Products.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ selectedMonth: formattedMonth, timePeriod: 'monthly' }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.length > 0) {
          const formattedData = data.map(item => ({
            name: item.productName,
            Total_Sales: parseFloat(item.Total_Sales),
          }));
          setTopProductsData(formattedData);
        } else {
          setTopProductsData([]);
        }
      })
      .catch(error => {
        console.error("Fetch Error:", error);
        ToastError('Error fetching data: ' + error.message);
      });
  }


  const getLeastProducts = (formattedMonth) => {
    // Fetch data from the PHP script with the selectedDate
    fetch(`${apiUrl}/KampBJ-api/server/dataAnalysis/getLeastSellingProductsMonthly.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ selectedDate: formattedMonth }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const formattedData = data.map(item => ({
            name: item.productName,
            sales: parseFloat(item.total_sales),
          }));

          setLeastProductData(formattedData);
        } else {
          setLeastProductData([]);
        }
      })
      .catch(error => {
        ToastError('Error fetching data:', error);
      });
  }

  const truncateLabel = (label, maxLength ) => {
    if (label.length > maxLength) {
      return `${label.slice(0, maxLength)}...`;
    }
    return label;
  };

  const average = [
    { name: 'Waterlights', time: 1.30 },
    { name: 'Submarine Pump', time: 2.15 },
    { name: 'Aquatic Filter', time: 3 },
    { name: 'Fish Tank Heater', time: 4.45 },
    { name: 'Aquarium Decor', time: 3.35 }
  ];

  
  return (
    <div className='reports-sales-component'>
      <div className='reports-sales-component__header'>
        <MonthSelection 
          onChange={handleMonthChange}
          displayDate={displayedMonth}
        />
        <i className="reports__download-report-icon fa-solid fa-file-arrow-down"></i>
      </div>

      <div className='reports-sales-component__body'>

        <div className='graphs-container graph-shadow'>
          <div className='graphs-header'>
            <h3 className='graph-title'>GMROI</h3>
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
            <h3 className='graph-title'>Gross Profit</h3>
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
            <h3 className='graph-title'>Top Selling Products (Top 5)</h3>
          </div>   
          <ResponsiveContainer width="100%" height="94%">
            <ComposedChart
              width={500}
              height={400}
              data={topProductsData}
              margin={{
                top: 30,
                right: 20,
                bottom: 0,
                left: 0,
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="name" scale="band" angle={-20} 
                tick={({ x, y, payload }) => {
                  const label = truncateLabel(payload.value, 8);  // Truncate label
                  return (
                    <text x={x} y={y} textAnchor="middle" fontSize={14} dy={10}>
                      {label}
                    </text>
                  );
                }}
              />
              <YAxis />
              <Tooltip />
              <Legend 
                formatter={(value) => {
                  if (value === "Total_Sales") return "Sales";
                  return value;
                }}
              />
              <Bar dataKey="Total_Sales" barSize={40} fill="#413ea0" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className='graphs-container graph-shadow'>
          <div className='graphs-header'>
            <h3 className='graph-title'>Least Selling Products (Top 5)</h3>
          </div>   
          <ResponsiveContainer width="100%" height="94%">
            <ComposedChart
              width={500}
              height={400}
              data={leastProductData}
              margin={{
                top: 30,
                right: 20,
                bottom: 0,
                left: 0,
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="name" scale="band" angle={-20}
                tick={({ x, y, payload }) => {
                  const label = truncateLabel(payload.value, 8);  // Truncate label
                  return (
                    <text x={x} y={y} textAnchor="middle" fontSize={14} dy={10}>
                      {label}
                    </text>
                  );
                }}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" barSize={40} fill="#413ea0" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  )
}



export const ReportsSalesYearly = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [topProductsData, setTopProductsData] = useState([]);
  const [leastProductData, setLeastProductData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Intl.DateTimeFormat('default', { year:'numeric' }).format(new Date()));

  const handleYearChange = (selectedYear) => {
    const formattedYear = new Intl.DateTimeFormat('default', {year:'numeric'}).format(selectedYear)
    setSelectedYear(formattedYear);
  }

  useEffect(() => {
    getTop5Products();
    getLeastProducts();
  }, [selectedYear])
  
  const getTop5Products = () => {
    fetch(`${apiUrl}/KampBJ-api/server/dataAnalysis/getTop5Products.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ selectedDate: parseInt(selectedYear), timePeriod: 'yearly' }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.length > 0) {
          const formattedData = data.map(item => ({
            name: item.productName,
            sales: parseFloat(item.Total_Sales),
          }));
          setTopProductsData(formattedData);
        } else {
          setTopProductsData([]);
        }
      })
      .catch(error => {
        console.error("Fetch Error:", error);
        ToastError('Error fetching data: ' + error.message);
      });
  }

  const getLeastProducts = () => {
    fetch(`${apiUrl}/KampBJ-api/server/dataAnalysis/getLeastSellingProductsYearly.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ selectedYear: parseInt(selectedYear) }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const formattedData = data.map(item => ({
            name: item.productName,
            sales: parseFloat(item.totalSales),
          }));
          setLeastProductData(formattedData);
        } else {
          setLeastProductData([]);
        }
      })
      .catch(error => {
        ToastError('Error fetching data:', error);
      });
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
    <div className='reports-inventory-component'>
      <div className='reports-inventory-component__header'>
        <YearSelection 
          onChange={handleYearChange}
          displayDate={selectedYear}
        />
        <i className="reports__download-report-icon fa-solid fa-file-arrow-down"></i>
      </div>

      <div className='reports-inventory-component__body'>

        <div className='graphs-container graph-shadow'>
          <div className='graphs-header'>
            <h3 className='graph-title'>GMROI</h3>
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

        <div className='graphs-container graph-shadow'>
          <div className='graphs-header'>
            <h3 className='graph-title'>Gross Profit</h3>
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

        <div className='graphs-container graph-shadow'>
          <div className='graphs-header'>
            <h3 className='graph-title'>Most Selling Products (Top 5)</h3>
          </div>   
          <ResponsiveContainer width="100%" height="94%">
            <ComposedChart
              width={500}
              height={400}
              data={topProductsData}
              margin={{
                top: 20,
                right: 20,
                bottom: 0,
                left: 0,
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="name" scale="band" angle={-20}
                tick={({ x, y, payload }) => {
                  const label = truncateLabel(payload.value, 5);  // Truncate label
                  return (
                    <text x={x} y={y} textAnchor="middle" fontSize={14} dy={10}>
                      {label}
                    </text>
                  );
                }}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" barSize={30} fill="#413ea0" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className='graphs-container graph-shadow'>
          <div className='graphs-header'>
            <h3 className='graph-title'>Least Selling Products (Top 5)</h3>
          </div>   
          <ResponsiveContainer width="100%" height="94%">
            <ComposedChart
              width={500}
              height={400}
              data={leastProductData}
              margin={{
                top: 20,
                right: 20,
                bottom: 0,
                left: 0,
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="name" scale="band" angle={-20}
                tick={({ x, y, payload }) => {
                  const label = truncateLabel(payload.value, 5);  // Truncate label
                  return (
                    <text x={x} y={y} textAnchor="middle" fontSize={14} dy={10}>
                      {label}
                    </text>
                  );
                }}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" barSize={30} fill="#413ea0" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  )
}