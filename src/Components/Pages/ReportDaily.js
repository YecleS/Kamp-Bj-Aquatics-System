import React, { useState, useEffect } from 'react';
import { DateSelection } from '../UIComponents/DateControls';
import DashboardCards from '../UIComponents/DashboardCards';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
    ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import '../Styles/ReportsDaily.css';


const ReportDaily = () => {
    const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString());

    const handleDatechange = (selectedDate) => {
        setSelectedDate(`${selectedDate.toLocaleDateString()}`);
      }

      //hours covert to decimal
      const average = [
        { name: 'Waterlights', time: 1.30 },
        { name: 'Submarine Pump', time: 2.15 },
        { name: 'Aquatic Filter', time: 3 },
        { name: 'Fish Tank Heater', time: 4.45 },
        { name: 'Aquarium Decor', time: 3.35 }
      ];

      const MostSoldProduct = [
        { name: 'Waterlights', quantity: 350 },
        { name: 'Submarine Pump', quantity: 288 },
        { name: 'Aquatic Filter', quantity: 459 },
        { name: 'Fish Tank Heater', quantity: 120 },
        { name: 'Aquarium Decor', quantity: 88 },
      ];

      const inventoryTurnRatio = [
        { time: '12 AM - 12 PM', ratio: 0.45 }, // Morning
        { time: '12 PM - 6 PM', ratio: 0.68 }, // Afternoon
        { time: '6 PM - 12 AM', ratio: 0.32 }, // Evening
      ];

      const gmroiData = [
        { time: '12am - 12pm', gmroi: 1.5 },
        { time: '12pm - 6pm', gmroi: 2.0 },
        { time: '6pm - 12am', gmroi: 1.8 },
      ];
      
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

        <div className='graph-container average-per-product'>
          <h3 className='graph-title'>Avg Selling Time For Top Products</h3>
          <ResponsiveContainer width="100%" height="95%">
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

        <div className='graph-container top-sold-products'>
          <h3 className='graph-title'>Most Sold Products</h3>
          <ResponsiveContainer width="100%" height="95%">
            <BarChart
              width={500}
              height={300}
              data={MostSoldProduct}
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

        <div className='graph-container inventory-ratio'>
          <h3 className='graph-title'>Inventory Turn Over Ratio</h3>
          <ResponsiveContainer width="100%" height="95%">
            <BarChart
              width={500}
              height={300}
              data={inventoryTurnRatio}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              barSize={20}
            >
              <XAxis dataKey="time" scale="point" padding={{ left: 10, right: 10 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="ratio" fill="#8884d8" background={{ fill: '#eee' }} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className='graph-container gmroi'>
          <h3 className='graph-title'>Gross Margin Return on Investment</h3>
          <ResponsiveContainer width="100%" height="95%">
          <BarChart width={150} height={40} data={gmroiData}>
            <XAxis dataKey='time' tick={{ fontSize: 14 }} />
            <YAxis dataKey='gmroi' />
            <Bar dataKey="gmroi" fill="#8884d8" />
          </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  )
}

export default ReportDaily
