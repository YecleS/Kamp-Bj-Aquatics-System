import React, { useState, useEffect } from 'react';
import '../Styles/ReportsYearly.css';
import { YearSelection } from '../UIComponents/DateControls';
import DashboardCards from '../UIComponents/DashboardCards';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
    ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

const ReportsYearly = () => {
  const [selectedYear, setSelectedYear] = useState(new Intl.DateTimeFormat('default', { year:'numeric' }).format(new Date()));

  const handleYearChange = (selectedYear) => {
    setSelectedYear( new Intl.DateTimeFormat('default', {year:'numeric'}).format(selectedYear));
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
    { time: 'Jan', ratio: 0.45 },  // January
    { time: 'Feb', ratio: 0.68 }, // February
    { time: 'Mar', ratio: 0.32 },    // March
    { time: 'Apr', ratio: 0.50 },    // April
    { time: 'May', ratio: 0.60 },      // May
    { time: 'Jun', ratio: 0.55 },     // June
    { time: 'Jul', ratio: 0.48 },     // July
    { time: 'Aug', ratio: 0.62 },   // August
    { time: 'Sep', ratio: 0.70 },// September
    { time: 'Oct', ratio: 0.65 },  // October
    { time: 'Nov', ratio: 0.59 }, // November
    { time: 'Dec', ratio: 0.75 }, // December
  ];

  const gmroiData = [
    { time: 'Jan', gmroi: 1.5 },   // January
    { time: 'Feb', gmroi: 2.0 },  // February
    { time: 'Mar', gmroi: 1.8 },     // March
    { time: 'Apr', gmroi: 2.3 },     // April
    { time: 'May', gmroi: 2.0 },       // May
    { time: 'Jun', gmroi: 1.9 },      // June
    { time: 'Jul', gmroi: 2.2 },      // July
    { time: 'Aug', gmroi: 2.5 },    // August
    { time: 'Sep', gmroi: 2.3 }, // September
    { time: 'Oct', gmroi: 2.4 },   // October
    { time: 'Nov', gmroi: 2.6 },  // November
    { time: 'Dec', gmroi: 2.8 },  // December
  ];

  return (
    <div className='reports-yearly'>
      <div className='reports-yearly__header'>
        <YearSelection 
          onChange={handleYearChange}
          displayDate={selectedYear}
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

export default ReportsYearly
