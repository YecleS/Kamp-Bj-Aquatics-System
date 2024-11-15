import React, { useState, useEffect } from 'react';
import { DateSelection } from '../UIComponents/DateControls';
import DashboardCards from '../UIComponents/DashboardCards';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
    ResponsiveContainer, BarChart, Bar, Radar, RadarChart, PolarGrid, 
    PolarAngleAxis, Legend, Rectangle } from 'recharts';
import '../Styles/ReportsDaily.css';


const ReportDaily = () => {
    const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString());

    const handleDatechange = (selectedDate) => {
        setSelectedDate(`${selectedDate.toLocaleDateString()}`);
      }
      
  return (
    <div className='report-daily'>
      <div className='report-daily__header'>
        <DateSelection
          onChange={handleDatechange}
          displayDate={selectedDate}
        />
      </div>

      <div className='report-daily__body'>
        <DashboardCards icon='fa-peso-sign' title="Total Sales" subTitle="Today's Sales" desription='₱ 3500.00'/>
        <DashboardCards icon='fa-arrow-down-wide-short' title="Total Expenses" subTitle="Today's Expenses" desription='₱ 400.00'/>
        <DashboardCards icon='fa-cart-shopping' title="Number of Products" subTitle="Total Number of Products" desription='120'/>
        <DashboardCards icon='fa-users' title="Number of Staffs" subTitle="Total Number of Staffs" desription='5'/>

        <div className='graph-container daily-average-per-product'>
          <h3 className='graph-title'>Avg Selling Time For Top Products</h3>
          <ResponsiveContainer width="100%" height="95%">
            <AreaChart
              width={500}
              height={400}
              // data={sales}
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

        <div className='graph-container daily-top-sold-products'>
          <h3 className='graph-title'>Most Sold Products</h3>
          <ResponsiveContainer width="100%" height="95%">
            <BarChart
              width={500}
              height={300}
              // data={MostSoldProduct}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 14 }} dy={10} />
              <YAxis tick={{ fontSize: 14 }}/>
              <Tooltip />
              <Legend />
              <Bar dataKey="quantity" stackId="a" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  )
}

export default ReportDaily
