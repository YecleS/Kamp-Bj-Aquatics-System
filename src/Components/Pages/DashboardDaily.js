import React, { useState, useEffect } from 'react';
import { DateSelection } from '../UIComponents/DateControls';
import '../Styles/DashboardDaily.css';
import DashboardCards from '../UIComponents/DashboardCards';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart, Bar } from 'recharts';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { ComposedChart, Line, Legend, } from 'recharts';

const DashboardDaily = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString());
  const [topProductsData, setTopProductsData] = useState([]);

  const handleDatechange = (selectedDate) => {
    setSelectedDate(`${selectedDate.toLocaleDateString()}`);
  }

  useEffect(() => {
    // Fetch data from the PHP script
    fetch('http://localhost/KampBJ-api/server/dataAnalysis/getTop5Products.php')
      .then(response => response.json())
      .then(data => {
        // Transform the data to fit the chart format if necessary
        const formattedData = data.map(item => ({
          name: item.productName,
          quantity: parseFloat(item.Total_Sales)
        }));
        setTopProductsData(formattedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array to fetch data on component mount



  const data = [
    {name: 'Product 1', quantity: 350},
    {name: 'Product 2', quantity: 288},
    {name: 'Product 3', quantity: 459},
    {name: 'Product 4', quantity: 120},
    {name: 'Product 5', quantity: 88},
  ];

  const dataSalesExpenses = [
    {name: 'Sales',uv: 4000},
    {name: 'Expenses',pv: 1398},
  ];


  const dataExpensesDemographics = [
    {expense: 'Restocking', total: 120},
    {expense: 'Wifi', total: 98},
    {expense: 'Water Utility', total: 86},
    {expense: 'Electricity Utility', total: 99},
    {expense: 'Rent', total: 85},
  ];

  const dataLowStocksAlert = [
    {name: 'Item 1',quantity: 1},
    {name: 'Item 2',quantity: 4},
    {name: 'Item 3',quantity: 5},
    {name: 'Item 4',quantity: 2},
    {name: 'Item 5',quantity: 3},
    {name: 'Item 6',quantity: 3},
    {name: 'Item 7',quantity: 2},
    {name: 'Item 8',quantity: 5},
    {name: 'Item 9',quantity: 7},
    {name: 'Item 10',quantity: 3},
  ];
  
  return (
    <div className='dashboard-daily'>
      <div className='dashboard-daily__header'>
        <DateSelection
          onChange={handleDatechange}
          displayDate={selectedDate}
        />
      </div>
      <div className='dashboard-daily__body'>
        <DashboardCards title="Total Sales" subTitle="Today's Sales" desription='₱ 3500.00'/>
        <DashboardCards title="Total Restocks" subTitle="Today's Restocks" desription='₱ 400.00'/>
        <DashboardCards title="Total Goods Sold" subTitle="Today's Goods Sold" desription='300'/>
        <DashboardCards title="Trasanctions Made" subTitle="Today's Transactions Made" desription='400'/>
        <DashboardCards title="Total Utilities Expenses" subTitle="Today's Utilities Expenses" desription='₱ 5000.00'/>
        
        <div className='dashboard-daily__most-sold-goods-chart'>
          <p className='dashboard-daily__chart-title'>Most Sold Products (Top 5)</p>
          <ResponsiveContainer width="100%" height="90%">
            <AreaChart
              width={500}
              height={400}
              data={topProductsData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="quantity" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className='dashboard-daily__sales-vs-expenses'>
          <p className='dashboard-daily__chart-title'>Sales VS Expenses</p>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart 
              width={150} 
              height={40} 
              data={dataSalesExpenses}
              barSize={100}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="uv" fill="#8884d8" />
              <Bar dataKey="pv" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className='dashboard-daily__expenses-demographics'>
          <p className='dashboard-daily__chart-title'>Expenses Demographics</p>
          <ResponsiveContainer width="100%" height="90%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={dataExpensesDemographics}>
              <PolarGrid />
              <PolarAngleAxis dataKey="expense" />  {/* Use 'expense' as the data key */}
              <PolarRadiusAxis />
              <Radar name="Expenses" dataKey="total" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className='dashboard-daily__low-stock-alert'>
          <p className='dashboard-daily__chart-title'>Stocks Monitoring</p>
          <ResponsiveContainer width="100%" height="90%">
          <ComposedChart
            width={500}
            height={400}
            data={dataLowStocksAlert}
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
            <Bar dataKey="quantity" barSize={20} fill="#b80c0c" />
          </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default DashboardDaily
