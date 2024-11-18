import React, { useState } from 'react';
import { MonthSelection } from '../UIComponents/DateControls';
import DashboardCards from '../UIComponents/DashboardCards';
import '../Styles/ReportsMonthly.css';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
    ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
    


const ReportsMonthly = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().toLocaleDateString('default', { month:'long', year:'numeric' }));

  const handleMonthChange = (selectedMonth) => {
    setSelectedMonth(selectedMonth.toLocaleDateString('default', { month: 'long', year: 'numeric' }));
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
    { time: 'Week 1', ratio: 0.45 }, // Week 1
    { time: 'Week 2', ratio: 0.68 }, // Week 2
    { time: 'Week 3', ratio: 0.32 }, // Week 3
    { time: 'Week 4', ratio: 0.50 }, // Week 4
  ];

  const gmroiData = [
    { time: 'Week 1', gmroi: 1.5 }, // Week 1
    { time: 'Week 2', gmroi: 2.0 }, // Week 2
    { time: 'Week 3', gmroi: 1.8 }, // Week 3
    { time: 'Week 4', gmroi: 2.3 }, // Week 4
  ];

  return (
    <div className='reports-monthly'>
      <div className='reports-monthly__header'>
        <MonthSelection 
          onChange={handleMonthChange}
          displayDate={selectedMonth}
        />
      </div>

      <div className='reports-monthly__body'>
        
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

export default ReportsMonthly
