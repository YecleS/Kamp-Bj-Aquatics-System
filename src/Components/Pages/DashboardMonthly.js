import React, { useState } from 'react';
import { MonthSelection } from '../UIComponents/DateControls';
import '../Styles/DashboardMonthly.css';
import DashboardCards from '../UIComponents/DashboardCards';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, BarChart, Bar, Radar, RadarChart, PolarGrid, 
  PolarAngleAxis, Legend, Rectangle } from 'recharts';

const DashboardMonthly = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().toLocaleDateString('default', { month:'long', year:'numeric' }));

  const handleMonthChange = (selectedMonth) => {
    setSelectedMonth(selectedMonth.toLocaleDateString('default', { month: 'long', year: 'numeric' }));
  }

  const sales = [
    { day: 'Week 1', sales: 3500 },
    { day: 'Week 2', sales: 1200 },
    { day: 'Week 3', sales: 3255 },
    { day: 'Week 4', sales: 8853 },
    { day: 'Week 5', sales: 4454 },
  ];

  const mostProductSold = [
    { name: 'Product1', quantity: 3500 },
    { name: 'Product2', quantity: 1200 },
    { name: 'Product3', quantity: 3255 },
    { name: 'Product4', quantity: 8853 },
    { name: 'Product5', quantity: 4454 },
  ];

  const dataSalesExpenses = [
    { day: 'Week 1', sales: 1000, expenses: 1400 },
    { day: 'Week 2', sales: 1200, expenses: 1200 },
    { day: 'Week 3', sales: 1500, expenses: 2000 },
    { day: 'Week 4', sales: 900, expenses: 5000 },
    { day: 'Week 5', sales: 400, expenses: 6000 },
  ];

  const expenses = [
    { name: 'Water Bill', total: 800 },
    { name: 'Equipment Repair', total: 4000 },
    { name: 'Company Outing', total: 11200 },
    { name: 'Staff Equipment', total: 5833 },
    { name: 'Cleaning Essentials', total: 13500 },
    { name: 'Pet Essentials', total: 7500 },
    { name: 'Pet Feeds', total: 8500 },
  ];

  return (
    <div className='dashboard-monthly'>
      <div className='dashboard-monthly__header'>
        <MonthSelection 
          onChange={handleMonthChange}
          displayDate={selectedMonth}
        />
      </div>
      <div className='dashboard-monthly__body'>

        <DashboardCards icon='fa-peso-sign' title="Total Sales" subTitle="Today's Sales" desription='₱ 3500.00'/>
        <DashboardCards icon='fa-arrow-down-wide-short' title="Total Expenses" subTitle="Today's Expenses" desription='₱ 400.00'/>
        <DashboardCards icon='fa-cart-shopping' title="Number of Products" subTitle="Total Number of Products" desription='120'/>
        <DashboardCards icon='fa-users' title="Number of Staffs" subTitle="Total Number of Staffs" desription='5'/>

        <div className='graph-container total-sales'>
          <h3 className='graph-title'>Total Sales</h3>
          <ResponsiveContainer width="100%" height="95%">
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
              <XAxis dataKey="day" dy={10} tick={{ fontSize: 14 }} />
              <YAxis tick={{ fontSize: 14 }}/>
              <Tooltip />
              <Area type="monotone" dataKey="sales" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className='graph-container most-sold-products'>
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

        <div className='graph-container sales-vs-expenses'>
          <h3 className='graph-title'>Sales vs Expenses</h3>
          <ResponsiveContainer width="100%" height="95%">
            <BarChart
              width={500}
              height={300}
              data={dataSalesExpenses}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="days" tick={{ fontSize: 14 }}/>
              <YAxis tick={{ fontSize: 14 }}/>
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
              <Bar dataKey="expenses" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className='graph-container expenses-breakdown'>
          <h3 className='graph-title'>Expenses Breakdown</h3>
          <ResponsiveContainer width="100%" height="95%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={expenses}>
              <Tooltip />
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <Radar dataKey="total" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default DashboardMonthly
