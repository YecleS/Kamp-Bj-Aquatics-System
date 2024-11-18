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

  const fillMissingDates = (data, month, year) => {
    const daysInMonth = new Date(year, month, 0).getDate(); // Get the total days in the month
    const completeData = [];
  
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;
      const existingEntry = data.find(entry => entry.date === dateStr);
  
      if (existingEntry) {
        completeData.push(existingEntry);
      } else {
        completeData.push({ date: dateStr, sale: 0 });
      }
    }
  
    return completeData;
  };

  const data = [
    { date: '11/01/2024', sale: 88.97 },
    { date: '11/02/2024', sale: 62.72 },
    { date: '11/03/2024', sale: 147.39 },
    { date: '11/04/2024', sale: 84.21 },
    { date: '11/05/2024', sale: 164.82 },
    { date: '11/06/2024', sale: 158.75 },
    { date: '11/07/2024', sale: 93.03 },
    { date: '11/10/2024', sale: 78.96 },
    { date: '11/11/2024', sale: 179.88 },
    { date: '11/12/2024', sale: 180.84 },
    { date: '11/13/2024', sale: 184.96 },
    { date: '11/14/2024', sale: 159.82 },
    { date: '11/15/2024', sale: 114.38 },
    { date: '11/16/2024', sale: 129.17 },
    { date: '11/18/2024', sale: 150.39 },
    { date: '11/21/2024', sale: 82.21 },
    { date: '11/22/2024', sale: 163.11 },
    { date: '11/23/2024', sale: 99.34 },
    { date: '11/24/2024', sale: 163.83 },
    { date: '11/27/2024', sale: 172.02 },
    { date: '11/28/2024', sale: 173.07 },
    { date: '11/29/2024', sale: 103.75 },
    { date: '11/30/2024', sale: 76.2 },
  ];

  const completeData = fillMissingDates(data, 11, 2024);

  const weeks = {
    'Week 1': 0,
    'Week 2': 0,
    'Week 3': 0,
    'Week 4': 0,
    'Week 5': 0,
  };

  completeData.forEach((item) => {
    const day = new Date(item.date).getDate();
    if (day <= 7) weeks['Week 1'] += item.sale;
    else if (day <= 14) weeks['Week 2'] += item.sale;
    else if (day <= 21) weeks['Week 3'] += item.sale;
    else if (day <= 28) weeks['Week 4'] += item.sale;
    else weeks['Week 5'] += item.sale;
  });

  console.log(weeks);
  

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
        <DashboardCards icon='fa-cart-shopping' title="Number of  Units Sold" subTitle="Total Number of Units Sold" desription='120'/>

        <div className='graph-container monthly-total-sales'>
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

        <div className='graph-container monthly-most-sold-products'>
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

        <div className='graph-container monthly-sales-vs-restocks'>
          <h3 className='graph-title'>Sales vs Restocks</h3>
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

        <div className='graph-container monthly-expenses-breakdown'>
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
