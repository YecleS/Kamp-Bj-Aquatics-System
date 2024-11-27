import React, { useEffect, useState } from 'react';
import { DateSelection } from '../UIComponents/DateControls';
import DashboardCards from '../UIComponents/DashboardCards';
import '../Styles/DashboardWeekly.css';
import { ToastError } from '../UIComponents/ToastComponent';
import { CustomTooltip } from '../UIComponents/CustomToolTip';
import { LegendFormatter } from '../UIComponents/LegendFormatter';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

const DashboardWeekly = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [weekRange, setWeekRange] = useState('');
  const [topProductsData, setTopProductsData] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [salesCount, setSalesCount] = useState(null);
  const [weeklySalesData, setWeeklySalesData] = useState([]);


  //To set default date based on the most current date
  useEffect(() => {
    const today = new Date();
    const end = new Date();
    end.setDate(today.getDate() - 6);

    const formatDate = (date) => date.toISOString().split('T')[0];
    const formattedStartingDate = formatDate(today);
    const formattedEndDate = formatDate(end);

    getTop5Products(formattedEndDate, formattedStartingDate );
    getTotalSales(formattedEndDate, formattedStartingDate );
    getTotalSalesCount(formattedEndDate, formattedStartingDate );
    getWeeklySales(formattedEndDate, formattedStartingDate );

    setWeekRange(`${today.toLocaleDateString()} - ${end.toLocaleDateString()}`);
  },[])

  const handleWeekChange = (selectedDate) => {
    const startingDate = new Date(selectedDate);
    const endDate = new Date();
    endDate.setDate(startingDate.getDate() - 6);
  
    // Format the dates to YYYY-MM-DD
    const formatDate = (date) => date.toISOString().split('T')[0];
  
    const formattedStartingDate = formatDate(startingDate);
    const formattedEndDate = formatDate(endDate);
  
    // Pass the formatted dates
    getTop5Products(formattedEndDate, formattedStartingDate );
    getTotalSales(formattedEndDate, formattedStartingDate );
    getTotalSalesCount(formattedEndDate, formattedStartingDate );
    getWeeklySales(formattedEndDate, formattedStartingDate );
  
    setWeekRange(`${startingDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`);
  };
  

  const getTop5Products = (start, end) => {
    fetch(`${apiUrl}/KampBJ-api/server/dataAnalysis/getTop5Products.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ startDate: start, endDate: end, timePeriod: 'weekly' }),
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

  const getTotalSales = (start, end) => {
    fetch(`${apiUrl}/KampBJ-api/server/dataAnalysis/getTotalSales.php`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ startDate: start, endDate: end, timePeriod: 'weekly' }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.status === 'success' && data.totalSales) {
          console.log(data);
          setTotalSales(data.totalSales); // Set the `totalSales` string directly
        } else {
          setTotalSales('0.00'); // Default value if data is invalid
          ToastError('No sales data found for the selected date.');
        }
      })
      .catch(error => {
        console.error("Fetch Error:", error);
        ToastError('Error fetching total sales: ' + error.message);
      });
  };

  const getTotalSalesCount = (start, end) => {
    fetch(`${apiUrl}/KampBJ-api/server/dataAnalysis/getTotalSalesCount.php`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ startDate: start, endDate: end, timePeriod: 'weekly' }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        setSalesCount(data.totalSalesCount); // Set the sales data
      } else {
        console.error('Error fetching sales data:', data.message);
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }

  const getWeeklySales = (start, end) => {
    // Construct the API URL for the PHP script
    const url = `${apiUrl}/KampBJ-api/server/dataAnalysis/fetchWeeklySales.php?startDate=${start}&endDate=${end}`;
  
    // Fetch weekly sales data from the PHP script
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.error) {
          // Handle error from PHP script
          ToastError('Error fetching weekly sales: ' + data.error);
        } else {
          // Set the weekly sales data for the graph
          setWeeklySalesData(data);
        }
      })
      .catch(error => {
        console.error("Fetch Error:", error);
        ToastError('Error fetching weekly sales data: ' + error.message);
      });
  };

  const truncateLabel = (label, maxLength = 12  ) => {
    if (label.length > maxLength) {
      return `${label.slice(0, maxLength)}...`;
    }
    return label;
  };
  

  return (
    <div className='dashboard-weekly'>
      <div className='dashboard-weekly__header'>
        <DateSelection 
          onChange={handleWeekChange}
          displayDate={weekRange}
        />
      </div>
      <div className='dashboard-weekly__body'>
        <DashboardCards icon='fa-peso-sign' title="Total Sales" subTitle="Sales Made in this Week" description={`₱ ${totalSales}`} />
        <DashboardCards icon='fa-cart-shopping' title="Sales in a Week" subTitle="Total Number of Sales Made" description={String(salesCount)} />

        <div className='graph-container weekly-total-sales'>
          <h3 className='graph-title'>Total Sales</h3>
          <ResponsiveContainer width="100%" height="96%">
            <AreaChart
              width={500}
              height={400}
              data={weeklySalesData} // Data for sales by day
              margin={{
                top: 30,
                right: 30,
                left: 0,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" dy={10} tick={{ fontSize: 14 }} />
              <YAxis tick={{ fontSize: 14 }} />
              <Tooltip  content={<CustomTooltip />}/>
              <Legend formatter={(value) => LegendFormatter(value, 'value', 'Total Sales  ')}/>
              <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className='graph-container weekly-most-sold-product'>
          <h3 className='graph-title'>Top 5 Most Sold Products</h3>
          <ResponsiveContainer width="100%" height="96%">
            <BarChart
              width={500}
              height={400}
              data={topProductsData}
              margin={{
                top: 30,
                right: 30,
                left: 0,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name"
                  fontSize={12} 
                  angle={-10}
                tick={({ x, y, payload }) => {
                  const label = truncateLabel(payload.value);  // Truncate label
                  return (
                    <text x={x} y={y} textAnchor="middle" dy={15} fontSize={14}>
                      {label}
                    </text>
                  );
                }}
              />
              <YAxis tick={{ fontSize: 14 }} />
              <Tooltip  content={<CustomTooltip />}/>
              <Legend formatter={(value) => LegendFormatter(value, 'Total_Sales', 'Total Product Sales')}/>
              <Bar dataKey="Total_Sales" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardWeekly;
