import React, { useState } from 'react';
import { MonthSelection } from '../UIComponents/DateControls';
import '../Styles/DashboardMonthly.css';
import DashboardCards from '../UIComponents/DashboardCards';
import { ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LineChart, Brush, AreaChart } from 'recharts';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const DashboardMonthly = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().toLocaleDateString('default', { month:'long', year:'numeric' }));

  const handleMonthChange = (selectedMonth) => {
    setSelectedMonth(selectedMonth.toLocaleDateString('default', { month: 'long', year: 'numeric' }));
  }

  
  const dataSalesExpenses = [
    { day: 'Week 1', sales: 1000, expenses: 1400 },
    { day: 'Week 2', sales: 1200, expenses: 1200 },
    { day: 'Week 3', sales: 1500, expenses: 2000 },
    { day: 'Week 4', sales: 900, expenses: 5000 },
    { day: 'Week 5', sales: 400, expenses: 6000 },
  ];

  const dataMonthlygoodsSold = [
    { day: 'Week 1', quantity: 3500 },
    { day: 'Week 2', quantity: 1200 },
    { day: 'Week 3', quantity: 3255 },
    { day: 'Week 4', quantity: 8853 },
    { day: 'Week 5', quantity: 4454 },
  ];

  const dataMonthlySales = [
    { day: 'Week 1', sales: 3500 },
    { day: 'Week 2', sales: 1200 },
    { day: 'Week 3', sales: 3255 },
    { day: 'Week 4', sales: 8853 },
    { day: 'Week 5', sales: 4454 },
  ];

  const dataMonthlyExpensesDemographics = [
    { day: 'W1', restocks: 3533, utilities: 3500 },
    { day: 'W2', restocks: 2433, utilities: 1200 },
    { day: 'W3', restocks: 1433, utilities: 3255 },
    { day: 'W4', restocks: 7433, utilities: 8853 },
    { day: 'W5', restocks: 5433, utilities: 4454 },
  ];

  const dataMonthlyExpenses = [
    { day: 'Week 1', expenses: 3500 },
    { day: 'Week 2', expenses: 1200 },
    { day: 'Week 3', expenses: 3255 },
    { day: 'Week 4', expenses: 8853 },
    { day: 'Week 5', expenses: 4454 },
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
        <DashboardCards customCardsClass='card1' title="Total Sales" subTitle="Monthly Sales" desription='₱ 3500.00'/>
        <DashboardCards customCardsClass='card2' title="Total Expenses" subTitle="Monthly Expenses" desription='₱ 5000.00'/>

        <div className='dashboard-monthly__chart-container monthy-sales-expenses'>
          <p className='dashboard-monthly__chart-title'>Monthly Sales VS Expenses</p>
          <ResponsiveContainer width="100%" height="90%">
            <ComposedChart
              layout="vertical"
              width={500}
              height={400}
              data={dataSalesExpenses}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis type="number" />
              <YAxis dataKey="day" type="category" scale="band" />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" barSize={20} fill="#413ea0" />
              <Bar dataKey="expenses" barSize={20} fill="#413ea0" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className='dashboard-monthly__chart-container monthly-goods-sold'>
          <p className='dashboard-monthly__chart-title'>Monthly Goods Sold</p>
          <ResponsiveContainer width="100%" height="90%">
            <ComposedChart
              layout="vertical"
              width={500}
              height={400}
              data={dataMonthlygoodsSold}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis type="number" />
              <YAxis dataKey="day" type="category" scale="band" />
              <Tooltip />
              <Legend />
              <Bar dataKey="quantity" barSize={20} fill="#413ea0" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className='dashboard-monthly__chart-container monthly-sales'>
          <p className='dashboard-monthly__chart-title'>Monthly Sales</p>
          <ResponsiveContainer width="100%" height="90%">
            <AreaChart
              width={500}
              height={200}
              data={dataMonthlySales}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="sales" stroke="#82ca9d" fill="#82ca9d" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className='dashboard-monthly__chart-container monthly-expenses-demographics'>
          <p className='dashboard-monthly__chart-title'>Monthly Expenses Demographics</p>
          <ResponsiveContainer width="100%" height="90%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={dataMonthlyExpensesDemographics}>
            <PolarGrid />
            <PolarAngleAxis dataKey="day" />
            <PolarRadiusAxis />
            <Tooltip />
            <Legend />
            <Radar name="Re Stocks" dataKey="restocks" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            <Radar name="Utilities" dataKey="utilities" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className='dashboard-monthly__chart-container monthly-expenses'>
          <p className='dashboard-monthly__chart-title'>Monthly Expenses</p>
          <ResponsiveContainer width="100%" height="90%">
            <AreaChart
              width={500}
              height={200}
              data={dataMonthlyExpenses}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day"/>
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="expenses" stroke="#82ca9d" fill="#82ca9d" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default DashboardMonthly
