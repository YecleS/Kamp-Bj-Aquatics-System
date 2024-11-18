import React, { useState } from 'react';
import { YearSelection } from '../UIComponents/DateControls';
import '../Styles/DashboardYearly.css'
import DashboardCards from '../UIComponents/DashboardCards';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, BarChart, Bar, Radar, RadarChart, PolarGrid, 
  PolarAngleAxis, Legend, Rectangle } from 'recharts';


const DashboardYearly = () => {
  const [selectedYear, setSelectedYear] = useState(new Intl.DateTimeFormat('default', { year:'numeric' }).format(new Date()));

  const handleYearChange = (selectedYear) => {
    setSelectedYear( new Intl.DateTimeFormat('default', {year:'numeric'}).format(selectedYear));
  }

  const dataYearlySales = [
    { month: 'Jan', sales: 13500 },
    { month: 'Feb', sales: 11200 },
    { month: 'Mar', sales: 6255 },
    { month: 'Apr', sales: 11853 },
    { month: 'May', sales: 3454 },
    { month: 'Jun', sales: 15500 },
    { month: 'Jul', sales: 17200 },
    { month: 'Aug', sales: 18255 },
    { month: 'Sep', sales: 3853 },
    { month: 'Oct', sales: 1454 },
    { month: 'Nov', sales: 15500 },
    { month: 'Dec', sales: 12200 },
  ];

  const mostProductSold = [
    { name: 'product1', quantity: 3500 },
    { name: 'product2', quantity: 1200 },
    { name: 'product3', quantity: 6255 },
    { name: 'product4', quantity: 1853 },
    { name: 'product5', quantity: 3454 },
  ];

  const dataSalesExpenses = [
    { month: 'Jan', sales: 1000, expenses: 1400 },
    { month: 'Feb', sales: 1200, expenses: 1200 },
    { month: 'Mar', sales: 2500, expenses: 2000 },
    { month: 'Apr', sales: 9050, expenses: 5000 },
    { month: 'May', sales: 4030, expenses: 6000 },
    { month: 'Jun', sales: 5030, expenses: 5000 },
    { month: 'Jul', sales: 4050, expenses: 8000 },
    { month: 'Aug', sales: 2002, expenses: 3000 },
    { month: 'Sep', sales: 3020, expenses: 1000 },
    { month: 'Oct', sales: 4500, expenses: 2000 },
    { month: 'Nov', sales: 4040, expenses: 6000 },
    { month: 'Dec', sales: 1240, expenses: 8000 },
  ];

  const expenses = [
    { name: 'Water Bill', total: 800 },
    { name: 'Electricity Bill', total: 1200 },
    { name: 'Equipment Repair', total: 4000 },
    { name: 'Company Outing', total: 1200 },
    { name: 'Staff Equipment', total: 5833 },
    { name: 'Cleaning Essentials', total: 3500 },
    { name: 'Internet Subscription', total: 1500 },
    { name: 'Office Furniture', total: 2900 },
    { name: 'Staff Training', total: 3300 },
    { name: 'Travel Expenses', total: 2800 },
    { name: 'Tax and Licenses', total: 5000 },
    { name: 'Maintenance Services', total: 2500 },
];


  return (
    <div className='dashboard-yearly'>
      <div className='dashboard-yearly__header'>
        <YearSelection 
          onChange={handleYearChange}
          displayDate={selectedYear}
        />
      </div>
      <div className='dashboard-yearly__body'>
        <DashboardCards icon='fa-peso-sign' title="Total Sales" subTitle="Today's Sales" desription='₱ 3500.00'/>
        <DashboardCards icon='fa-arrow-down-wide-short' title="Total Expenses" subTitle="Today's Expenses" desription='₱ 400.00'/>
        <DashboardCards icon='fa-cart-shopping' title="Number of Products" subTitle="Total Number of Products" desription='120'/>

        <div className='graph-container yearly-total-sales'>
          <h3 className='graph-title'>Total Sales</h3>
          <ResponsiveContainer width="100%" height="95%">
            <AreaChart
              width={500}
              height={400}
              data={dataYearlySales}
              margin={{
                top: 30,
                right: 30,
                left: 0,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 14, angle: -30, dy: 10, }} />
              <YAxis tick={{ fontSize: 14 }}/>
              <Tooltip />
              <Area type="monotone" dataKey="sales" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className='graph-container yearly-most-sold-products'>
          <h3 className='graph-title'>Most Sold Products</h3>
          <ResponsiveContainer width="100%" height="95%">
            <BarChart
              width={500}
              height={300}
              data={mostProductSold}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 14 }} dy={5} />
              <YAxis tick={{ fontSize: 14 }}/>
              <Tooltip />
              <Legend />
              <Bar dataKey="quantity" stackId="a" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className='graph-container yearly-sales-vs-restocks'>
          <h3 className='graph-title'>Sales vs Restocks</h3>
          <ResponsiveContainer width="100%" height="95%">
            <BarChart
              width={500}
              height={300}
              data={dataSalesExpenses}
              margin={{
                top: 5,
                right: 0,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" height={50} tick={{ fontSize: 14, angle: -30, dy: 10, }}/>
              <YAxis tick={{ fontSize: 14 }}/>
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
              <Bar dataKey="expenses" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className='graph-container yearly-expenses-breakdown'>
          <h3 className='graph-title'>Expenses Breakdown</h3>
          <ResponsiveContainer width="100%" height="95%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={expenses}>
              <Tooltip />
              <PolarGrid />
              <PolarAngleAxis dataKey="name" tick={{ fontSize: 14 }} />
              <Radar dataKey="total" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default DashboardYearly
