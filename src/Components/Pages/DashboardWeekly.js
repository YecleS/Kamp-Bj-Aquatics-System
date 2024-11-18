import React, { useEffect, useState } from 'react';
import { DateSelection } from '../UIComponents/DateControls';
import DashboardCards from '../UIComponents/DashboardCards';
import '../Styles/DashboardWeekly.css';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, BarChart, Bar, Radar, RadarChart, PolarGrid, 
  PolarAngleAxis, Legend, Rectangle } from 'recharts';

const DashboardWeekly = () => {
  const [weekRange, setWeekRange] = useState('');

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

  const sales = [
    { name: 'Sun', sales: 5133 },
    { name: 'Mon', sales: 6502 },
    { name: 'Tue', sales: 3200},
    { name: 'Wed', sales: 4020},
    { name: 'Thu', sales: 14000},
    { name: 'Fri', sales: 10000},
    { name: 'Sat', sales: 13200},
  ];

  const mostSoldProducts = [
    { name: 'product 1', sold: 2133},
    { name: 'product 2', sold: 6502},
    { name: 'product 3', sold: 3200},
    { name: 'product 4', sold: 5000},
    { name: 'product 5', sold: 4000},
  ];

  const sales_vs_expenses = [
    { days: 'Sun', sales: 5600, expenses: 4300},
    { days: 'Mon', sales: 2600, expenses: 2300},
    { days: 'Tue', sales: 4700, expenses: 2600},
    { days: 'Wed', sales: 3300, expenses: 7300},
    { days: 'Thu', sales: 1300, expenses: 3800},
    { days: 'Fri', sales: 4600, expenses: 8300},
    { days: 'Sat', sales: 8700, expenses: 9300},
  ];

  const expenses = [
    { name: 'Water Bill', total: 800 },
    { name: 'Equipment Repair', total: 4000 },
    { name: 'Company Outing', total: 1200 },
    { name: 'Staff Equipment', total: 5833 },
    { name: 'Cleaning Essentials', total: 3500 },
  ];

  const data = [
    { date: '11/18/2024', sale: 1432.05 },
    { date: '11/19/2024', sale: 3355.05 },
    { date: '11/20/2024', sale: 102.05 },
    { date: '11/21/2024', sale: 5532.05 },
    { date: '11/22/2024', sale: 4432.05 },
    { date: '11/23/2024', sale: 552.05 },
    { date: '11/24/2024', sale: 1232.05 },
  ];

  const convertedData = data.map((item) => {
    const dayLabel = new Date(item.date).toLocaleDateString('en-US', { weekday: 'short' }); // 'Mon', 'Tue', etc.
    return { ...item, label: dayLabel }; // Add the label to each object
  });

  console.log(convertedData);

  return (
    <div className='dashboard-weekly'>
      <div className='dashboard-weekly__header'>
        <DateSelection 
          onChange={handleWeekChange}
          displayDate={weekRange}
        />
      </div>
      <div className='dashboard-weekly__body'>
        <DashboardCards icon='fa-peso-sign' title="Total Sales" subTitle="Today's Sales" desription='₱ 3500.00'/>
        <DashboardCards icon='fa-cart-shopping' title="Number of  Units Sold" subTitle="Total Number of Units Sold" desription='120'/>

        <div className='graph-container weekly-total-sales'>
          <h3 className='graph-title'>Total Sales</h3>
          <ResponsiveContainer width="100%" height="95%">
            <AreaChart
              width={500}
              height={400}
              data={data}
              margin={{
                top: 30,
                right: 30,
                left: 0,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" dy={10} tick={{ fontSize: 14 }} />
              <YAxis tick={{ fontSize: 14 }}/>
              <Tooltip />
              <Area type="monotone" dataKey="sale" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className='graph-container weekly-most-sold-product'>
          <h3 className='graph-title'>Most Sold Products</h3>
          <ResponsiveContainer width="100%" height="95%">
            <BarChart
              width={500}
              height={300}
              data={mostSoldProducts}
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
              <Bar dataKey="sold" stackId="a" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className='graph-container weekly-sales-vs-restocks'>
          <h3 className='graph-title'>Sales vs Restocks</h3>
          <ResponsiveContainer width="100%" height="95%">
            <BarChart
              width={500}
              height={300}
              data={sales_vs_expenses}
              margin={{
                top: 5,
                right: 10,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="days" height={50} tick={{ fontSize: 14, angle: -30, dy: 10 }}/>
              <YAxis tick={{ fontSize: 14 }}/>
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
              <Bar dataKey="expenses" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  )
}

export default DashboardWeekly
