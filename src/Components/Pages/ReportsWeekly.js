import React, { useState, useEffect } from 'react';
import { DateSelection } from '../UIComponents/DateControls';
import DashboardCards from '../UIComponents/DashboardCards';
import '../Styles/ReportsWeekly.css';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
    ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

const ReportsWeekly = () => {
    const [weekRange, setWeekRange] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString());

    //To set default date based on the most current date
    useEffect(() => {
        const today = new Date();
        const end = new Date();

        end.setDate(today.getDate() - 6);

        setWeekRange(`${today.toLocaleDateString()} - ${end.toLocaleDateString()}`);
    },[])


    const handleWeekChange = (selectedDate) => {
        const startingDate = new Date(selectedDate);
        const endDate = new Date();
    
        endDate.setDate(startingDate.getDate() - 6);
    
        setWeekRange(`${startingDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`);
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
        { day: 'Sun', ratio: 0.45 }, // Sunday
        { day: 'Mon', ratio: 0.50 }, // Monday
        { day: 'Tue', ratio: 0.60 }, // Tuesday
        { day: 'Wed', ratio: 0.55 }, // Wednesday
        { day: 'Thu', ratio: 0.65 }, // Thursday
        { day: 'Fri', ratio: 0.70 }, // Friday
        { day: 'Sat', ratio: 0.40 }, // Saturday
      ];

      const gmroiData = [
        { day: 'Sun', gmroi: 1.5 }, // Sunday
        { day: 'Mon', gmroi: 2.0 }, // Monday
        { day: 'Tue', gmroi: 1.8 }, // Tuesday
        { day: 'Wed', gmroi: 2.2 }, // Wednesday
        { day: 'Thu', gmroi: 2.5 }, // Thursday
        { day: 'Fri', gmroi: 1.9 }, // Friday
        { day: 'Sat', gmroi: 1.7 }, // Saturday
      ];

  return (
    <div className='report-weekly'>
      <div className='report-weekly__header'>
        <DateSelection 
          onChange={handleWeekChange}
          displayDate={weekRange}
        />
      </div>

      <div className='report-weekly__body'>
        
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
              <XAxis dataKey="day" scale="point" padding={{ left: 10, right: 10 }} />
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
            <XAxis dataKey='day' tick={{ fontSize: 14 }} />
            <YAxis dataKey='gmroi' />
            <Bar dataKey="gmroi" fill="#8884d8" />
          </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  )
}

export default ReportsWeekly
