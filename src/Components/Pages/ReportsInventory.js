import React, { useEffect, useRef, useState } from 'react';
import '../Styles/ReportsInventory.css';
import GraphsImageDownloader from '../UIComponents/GraphsImageDownloader';
import GeneratePdf from '../UIComponents/GeneratePdf';
import { MonthSelection, YearSelection } from '../UIComponents/DateControls';
import { ComposedChart, Bar, Legend, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ToastError } from '../UIComponents/ToastComponent';

const ReportsInventory = () => {
  
  const [activeFilter, setFilter] = useState('monthly');

  const reportsValues = {
    'monthly': <ReportsInventoryMonthly />,
    'yearly': <ReportsInventoryYearly />
  }

  const handleOnChangeFilter = (e) => {
    setFilter(
      e.target.value
    )
  }

  return (
    <div className='reports-inventory'>
      <div className='reports-inventory__header'>
        <select className='reports__filter' onChange={handleOnChangeFilter}>
          <option value='monthly'>Monthly</option>
          <option value='yearly'>Yearly</option>
        </select>
      </div>

      <div className='reports-inventory__body'>
        {reportsValues[activeFilter]}
      </div>
      
    </div>
  )
}

export default ReportsInventory



export const ReportsInventoryMonthly = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [mostRestockedProductsData, setMostRestockedProductsData] = useState([]);
  const [leastRestockedProductsData, setLeastRestockedProductsData] = useState([]);
  const [displayedMonth, setDisplayedMonth] = useState(new Date().toLocaleDateString('default', { month:'long', year:'numeric' }));

  const handleMonthChange = (selectedMonth) => {
    setDisplayedMonth(selectedMonth.toLocaleDateString('default', { month: 'long', year: 'numeric' }));

    const year = selectedMonth.getFullYear();
    const month = (selectedMonth.getMonth() + 1).toString().padStart(2, '0'); // Format month
    const formattedMonth = `${year}-${month}`;

    fetchMostRestockedProducts(formattedMonth);
    fetchLeastRestockedProducts(formattedMonth);
  };

  useEffect(() => {
    const currentDate = new Date(); 
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const formattedMonth = `${year}-${month}`;

    fetchMostRestockedProducts(formattedMonth);
    fetchLeastRestockedProducts(formattedMonth);
  },[])

  const fetchMostRestockedProducts = (selectedMonth) => {
    // Fetch data from the PHP script with the selectedDate
    fetch(`${apiUrl}/KampBJ-api/server/dataAnalysis/getMostRestockedProductsMonthly.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ selectedDate: selectedMonth }),
    })
      .then(response => response.json())
      .then(data => {
        setMostRestockedProductsData(data);
      })
      .catch(error => {
        ToastError('Error fetching data:', error);
      });
  }

  const fetchLeastRestockedProducts = (selectedMonth) => {
    // Fetch data from the PHP script with the selectedDate
    fetch(`${apiUrl}/KampBJ-api/server/dataAnalysis/getLeastRestockedProductsMonthly.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ selectedDate: selectedMonth }),
    })
      .then(response => response.json())
      .then(data => {
        setLeastRestockedProductsData(data);
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

  return(
    <div className='reports-inventory-component'>
      <div className='reports-inventory-component__header'>
        <MonthSelection 
          onChange={handleMonthChange}
          displayDate={displayedMonth}
        />
        
        <GeneratePdf elementId='component-body' />
      </div>

      <div className='reports-inventory-component__body' id='component-body'>

        <div className='graphs-container graph-shadow' id='graph-container-inventory-ratio'>
          <div className='graphs-header'>
            <h3 className='reports-inventory-graph-title'>Inventory Turn Over Ratio</h3>
            <GraphsImageDownloader elementId='graph-container-inventory-ratio' />
          </div>   
          <ResponsiveContainer width="100%" height="91%">
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

        <div className='graphs-container graph-shadow' id='graph-container-avg-selling-time'>
          <div className='graphs-header'>
            <h3 className='reports-inventory-graph-title'>Average Selling Time</h3>
            <GraphsImageDownloader elementId='graph-container-inventory-ratio' />
          </div>   
          <ResponsiveContainer width="100%" height="91%">
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

        <div className='graphs-container graph-shadow' id='graph-container-most-frequently-restocked'>
          <div className='graphs-header'>
            <h3 className='reports-inventory-graph-title'>Most Frequently Restocked Products (Top 5)</h3>
            <GraphsImageDownloader elementId='graph-container-most-frequently-restocked'/>
          </div>   
          <ResponsiveContainer width="100%" height="91%">
            <ComposedChart
              width={500}
              height={400}
              data={mostRestockedProductsData}
              margin={{
                top: 30,
                right: 20,
                bottom: 20,
                left: 5,
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="productName" scale="band" angle={-20} 
                tick={({ x, y, payload }) => {
                  const label = truncateLabel(payload.value, 5);  // Truncate label
                  return (
                    <text x={x} y={y} textAnchor="middle" fontSize={14} dy={10}>
                      {label}
                    </text>
                  );
                }}
              />
              <YAxis tick={{ fontSize: 14 }} />
              <Tooltip />
              <Legend 
                 formatter={(value) => {
                  if (value === "restockFrequency") return "Product Restock Frequency";
                  return value;
                }}
              />
              <Bar dataKey="restockFrequency" barSize={60} fill="#413ea0" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className='graphs-container graph-shadow' id='graph-container-least-frequently-restocked'>
          <div className='graphs-header'>
            <h3 className='reports-inventory-graph-title'>Least Frequently Restocked Products (Top 5)</h3>
            <GraphsImageDownloader elementId='graph-container-least-frequently-restocked' />
          </div>   
          <ResponsiveContainer width="100%" height="91%">
            <ComposedChart
              width={500}
              height={400}
              data={leastRestockedProductsData}
              margin={{
                top: 30,
                right: 20,
                bottom: 20,
                left: 5,
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="productName" scale="band" angle={-20} 
                tick={({ x, y, payload }) => {
                  const label = truncateLabel(payload.value, 5);  // Truncate label
                  return (
                    <text x={x} y={y} textAnchor="middle" fontSize={14} dy={10}>
                      {label}
                    </text>
                  );
                }}
              />
              <YAxis tick={{ fontSize: 14 }} />
              <Tooltip />
              <Legend 
                 formatter={(value) => {
                  if (value === "restockFrequency") return "Product Restock Frequency";
                  return value;
                }}
              />
              <Bar dataKey="restockFrequency" barSize={60} fill="#413ea0" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  )
}




export const ReportsInventoryYearly = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [mostRestockedProductsData, setMostRestockedProductsData] = useState([]);
  const [leastRestockedProductsData, setLeastRestockedProductsData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Intl.DateTimeFormat('default', { year:'numeric' }).format(new Date()));

  const handleYearChange = (selectedYear) => {
    const formattedYear = new Intl.DateTimeFormat('default', {year:'numeric'}).format(selectedYear)
    setSelectedYear(formattedYear);
  }


  useEffect(() => {
    fetchMostRestockedProducts();
    fetchLeastRestockedProducts();
  },[selectedYear])


  const fetchMostRestockedProducts = () => {
    // Fetch data from the PHP script with the selectedDate
    fetch(`${apiUrl}/KampBJ-api/server/dataAnalysis/getMostRestockedProductsYearly.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ selectedYear: selectedYear }),
    })
      .then(response => response.json())
      .then(data => {
        setMostRestockedProductsData(data);
      })
      .catch(error => {
        ToastError('Error fetching data:', error);
      });
  }


  const fetchLeastRestockedProducts = () => {
    // Fetch data from the PHP script with the selectedDate
    fetch(`${apiUrl}/KampBJ-api/server/dataAnalysis/getLeastRestockedProductsYearly.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ selectedYear: parseInt(selectedYear) }),
    })
      .then(response => response.json())
      .then(data => {
        setLeastRestockedProductsData(data);
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

  return(
    <div className='reports-inventory-component'>
      <div className='reports-inventory-component__header'>
        <YearSelection 
          onChange={handleYearChange}
          displayDate={selectedYear}
        />
        <i className="reports__download-report-icon fa-solid fa-file-arrow-down"></i>
      </div>

      <div className='reports-inventory-component__body'>

        <div className='graphs-container graph-shadow' id='graph-container-inventory-ratio'>
          <div className='graphs-header'>
            <h3 className='reports-inventory-graph-title'>Highest Inventory Turn Over Ratio</h3>
            <GraphsImageDownloader elementId='graph-container-inventory-ratio' />
          </div>   
          <ResponsiveContainer width="100%" height="91%">
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

        <div className='graphs-container graph-shadow' id='graph-container-avg-selling-time'>
          <div className='graphs-header'>
            <h3 className='reports-inventory-graph-title'>Average Selling Time</h3>
            <GraphsImageDownloader elementId='graph-container-inventory-ratio' />
          </div>   
          <ResponsiveContainer width="100%" height="91%">
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

        <div className='graphs-container graph-shadow' id='graph-container-most-frequently-restocked'>
          <div className='graphs-header'>
            <h3 className='reports-inventory-graph-title'>Most Frequently Restocked Products (Top 5)</h3>
            <GraphsImageDownloader elementId='graph-container-most-frequently-restocked'/>
          </div>   
          <ResponsiveContainer width="100%" height="91%">
            <ComposedChart
              width={500}
              height={400}
              data={mostRestockedProductsData}
              margin={{
                top: 30,
                right: 20,
                bottom: 20,
                left: 5,
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="productName" scale="band" angle={-20} 
                tick={({ x, y, payload }) => {
                  const label = truncateLabel(payload.value, 5);  // Truncate label
                  return (
                    <text x={x} y={y} textAnchor="middle" fontSize={14} dy={10}>
                      {label}
                    </text>
                  );
                }}
              />
              <YAxis tick={{ fontSize: 14 }} />
              <Tooltip />
              <Legend 
                 formatter={(value) => {
                  if (value === "restockFrequency") return "Product Restock Frequency";
                  return value;
                }}
              />
              <Bar dataKey="restockFrequency" barSize={60} fill="#413ea0" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className='graphs-container graph-shadow' id='graph-container-least-frequently-restocked'>
          <div className='graphs-header'>
            <h3 className='reports-inventory-graph-title'>Least Frequently Restocked Products (Top 5)</h3>
            <GraphsImageDownloader elementId='graph-container-least-frequently-restocked' />
          </div>   
          <ResponsiveContainer width="100%" height="91%">
            <ComposedChart
              width={500}
              height={400}
              data={leastRestockedProductsData}
              margin={{
                top: 30,
                right: 20,
                bottom: 20,
                left: 5,
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="productName" scale="band" angle={-20} 
                tick={({ x, y, payload }) => {
                  const label = truncateLabel(payload.value, 5);  // Truncate label
                  return (
                    <text x={x} y={y} textAnchor="middle" fontSize={14} dy={10}>
                      {label}
                    </text>
                  );
                }}
              />
              <YAxis tick={{ fontSize: 14 }} />
              <Tooltip />
              <Legend 
                 formatter={(value) => {
                  if (value === "restockFrequency") return "Product Restock Frequency";
                  return value;
                }}
              />
              <Bar dataKey="restockFrequency" barSize={60} fill="#413ea0" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  )
}