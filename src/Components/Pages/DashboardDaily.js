import React, { useState, useEffect } from 'react';
import { DateSelection } from '../UIComponents/DateControls';
import '../Styles/DashboardDaily.css';
import DashboardCards from '../UIComponents/DashboardCards';
import TextSlicer from '../Utils/TextSlicer';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
        ResponsiveContainer, BarChart, Bar, Radar, RadarChart, PolarGrid, 
        PolarAngleAxis, Legend, Rectangle } from 'recharts';


const DashboardDaily = () => {    
  const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString());
  const [topProductsData, setTopProductsData] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleDatechange = (selectedDate) => {
    setSelectedDate(`${selectedDate.toLocaleDateString()}`);
  }

  useEffect(() => {
    // Fetch data from the PHP script
    fetch(`${apiUrl}/KampBJ-api/server/dataAnalysis/getTop5Products.php`)
      .then(response => response.json())
      .then(data => {
        // Transform the data to fit the chart format if necessary
        const formattedData = data.map(item => ({
          name: item.productName,
          Total_Sales: parseFloat(item.Total_Sales)
        }));
        setTopProductsData(formattedData);
        console.log(topProductsData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

  }, []); // Empty dependency array to fetch data on component mount

  const sales = [
    { name: '12 AM - 12 PM', value: 1200 },
    { name: '12 PM - 6 PM', value: 3000 },
    { name: '6 PM - 12 AM', value: 2000 },
  ];

  const expenses = [
    {name: 'today', sales:5320, expenses:300},
  ]

  const expensesBreakdown = [
    { name: 'Company Outing', total: 3000 },
    { name: 'water Bill', total: 500 },
    { name: 'Electricity Bill', total: 4500 },
  ]

  const truncateLabel = (label, maxLength = 12  ) => {
    if (label.length > maxLength) {
      return `${label.slice(0, maxLength)}...`;
    }
    return label;
  };


  return (
    <div className='dashboard-daily'>
      <div className='dashboard-daily__header'>
        <DateSelection
          onChange={handleDatechange}
          displayDate={selectedDate}
        />
      </div>
      <div className='dashboard-daily__body'>
        <DashboardCards icon='fa-peso-sign' title="Total Sales" subTitle="Today's Sales" desription='₱ 3500.00'/>
        <DashboardCards icon='fa-cart-shopping' title="Number of  Units Sold" subTitle="Total Number of Units Sold" desription='120'/>

        <div className='graph-container daily-total-sales'>
          <h3 className='graph-title'>Total Sales</h3>
          <ResponsiveContainer width="100%" height="96%">
            <AreaChart
              width={500}
              height={400}
              data={sales}
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
              <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className='graph-container daily-most-sold-products'>
          <h3 className='graph-title'>Most Sold Products</h3>
          <ResponsiveContainer width="100%" height="96%">
            <BarChart
              width={500}
              height={300}
              data={topProductsData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name"
                dy={10}
                angle={10}
                
                tick={({ x, y, payload }) => {
                  const label = truncateLabel(payload.value);  // Truncate label
                  return (
                    <text x={x} y={y} textAnchor="middle" fontSize={14} dy={10}>
                      {label}
                    </text>
                  );
                }}

              />
              <YAxis tick={{ fontSize: 14 }}/>
              <Tooltip />
              <Legend />
              <Bar dataKey="Total_Sales" stackId="a" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* <div className='graph-container daily-sales-vs-expenses'>
          <h3 className='graph-title'>Sales vs Expenses</h3>
          <ResponsiveContainer width="100%" height="95%">
            <BarChart
              width={500}
              height={300}
              data={expenses}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
              <Bar dataKey="expenses" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
            </BarChart>
          </ResponsiveContainer>
        </div> */}

        {/* <div className='graph-container daily-expenses-breakdown'>
          <h3 className='graph-title'>Expenses Breakdown</h3>
          <ResponsiveContainer width="100%" height="95%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={expensesBreakdown}>
              <Tooltip />
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <Radar dataKey="total" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        </div> */}
        
      </div>
    </div>
  )
}

export default DashboardDaily
