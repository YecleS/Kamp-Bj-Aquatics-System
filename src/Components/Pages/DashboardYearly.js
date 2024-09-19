import React, { useState } from 'react';
import { YearSelection } from '../UIComponents/DateControls';
import '../Styles/DashboardYearly.css'
import DashboardCards from '../UIComponents/DashboardCards';
import { ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LineChart, Brush, AreaChart } from 'recharts';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { BarChart, Rectangle} from 'recharts';


const DashboardYearly = () => {
  const [selectedYear, setSelectedYear] = useState(new Intl.DateTimeFormat('default', { year:'numeric' }).format(new Date()));

  const handleYearChange = (selectedYear) => {
    setSelectedYear( new Intl.DateTimeFormat('default', {year:'numeric'}).format(selectedYear));
  }

  
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

  const dataYearlygoodsSold = [
    { month: 'Jan', quantity: 3500 },
    { month: 'Feb', quantity: 1200 },
    { month: 'Mar', quantity: 6255 },
    { month: 'Apr', quantity: 1853 },
    { month: 'May', quantity: 3454 },
    { month: 'Jun', quantity: 5500 },
    { month: 'Jul', quantity: 7200 },
    { month: 'Aug', quantity: 8255 },
    { month: 'Sep', quantity: 3853 },
    { month: 'Oct', quantity: 1454 },
    { month: 'Nov', quantity: 5500 },
    { month: 'Dec', quantity: 2200 },
  ];

  const dataYearlySales = [
    { month: 'Jan', sales: 3500 },
    { month: 'Feb', sales: 1200 },
    { month: 'Mar', sales: 6255 },
    { month: 'Apr', sales: 1853 },
    { month: 'May', sales: 3454 },
    { month: 'Jun', sales: 5500 },
    { month: 'Jul', sales: 7200 },
    { month: 'Aug', sales: 8255 },
    { month: 'Sep', sales: 3853 },
    { month: 'Oct', sales: 1454 },
    { month: 'Nov', sales: 5500 },
    { month: 'Dec', sales: 2200 },
  ];

  const dataYearlyExpensesDemographics = [
    { month: 'Jan', restocks: 3533, utilities: 3500 },
    { month: 'Feb', restocks: 2433, utilities: 1200 },
    { month: 'Mar', restocks: 1433, utilities: 3255 },
    { month: 'Apr', restocks: 7433, utilities: 8853 },
    { month: 'May', restocks: 5433, utilities: 4454 },
    { month: 'Jun', restocks: 2433, utilities: 1200 },
    { month: 'Jul', restocks: 1433, utilities: 3255 },
    { month: 'Aug', restocks: 7433, utilities: 8853 },
    { month: 'Sep', restocks: 5433, utilities: 4454 },
    { month: 'Oct', restocks: 2433, utilities: 1200 },
    { month: 'Nov', restocks: 5433, utilities: 4454 },
    { month: 'Dec', restocks: 2433, utilities: 1200 },
  ];

  const dataYearlyExpenses = [
    { month: 'Jan', expenses: 3500 },
    { month: 'Feb', expenses: 1200 },
    { month: 'Mar', expenses: 6255 },
    { month: 'Apr', expenses: 1853 },
    { month: 'May', expenses: 3454 },
    { month: 'Jun', expenses: 5500 },
    { month: 'Jul', expenses: 7200 },
    { month: 'Aug', expenses: 8255 },
    { month: 'Sep', expenses: 3853 },
    { month: 'Oct', expenses: 1454 },
    { month: 'Nov', expenses: 5500 },
    { month: 'Dec', expenses: 2200 },
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
        
      <DashboardCards customCardsClass='card1' title="Total Sales" subTitle="Yearly Sales" desription='₱ 3500.00'/>
      <DashboardCards customCardsClass='card2' title="Total Expenses" subTitle="Yearly Expenses" desription='₱ 5000.00'/>
      
      <div className='dashboard-yearly__chart-container yearly-sales-expenses'>
          <p className='dashboard-yearly__chart-title'>Yearly Sales VS Expenses</p>
          <ResponsiveContainer width="100%" height="90%">
            <ComposedChart
              layout="vertical"
              width={500}
              height={400}
              data={dataSalesExpenses}
              margin={{
                top: 5,
                right: 10,
                bottom: 5,
                left: 5,
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis type="number" />
              <YAxis dataKey="month" type="category" scale="band" tick={{ fontSize: 12, angle: -30, textAnchor: 'end' }} tickLine={false} interval={0} />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" barSize={7} fill="#413ea0" />
              <Bar dataKey="expenses" barSize={7} fill="#413ea0" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className='dashboard-yearly__chart-container yearly-goods-sold'>
          <p className='dashboard-yearly__chart-title'>Yearly Goods Sold</p>
          <ResponsiveContainer width="100%" height="90%">
            <ComposedChart
              layout="vertical"
              width={500}
              height={400}
              data={dataYearlygoodsSold}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis type="number" />
              <YAxis dataKey="month" type="category" scale="band" tick={{ fontSize: 12, angle: -30, textAnchor: 'end' }} tickLine={false} interval={0} />
              <Tooltip />
              <Legend />
              <Bar dataKey="quantity" barSize={10} fill="#413ea0" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className='dashboard-yearly__chart-container yearly-sales'>
          <p className='dashboard-yearly__chart-title'>Yearly Sales</p>
          <ResponsiveContainer width="100%" height="90%">
            <AreaChart
              width={500}
              height={200}
              data={dataYearlySales}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 12, angle: -30, textAnchor: 'end' }} tickLine={false} interval={0} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="sales" stroke="#82ca9d" fill="#82ca9d" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className='dashboard-yearly__chart-container yearly-expenses-demographics'>
          <p className='dashboard-yearly__chart-title'>Yearly Expenses Demographics</p>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart
              width={500}
              height={300}
              data={dataYearlyExpensesDemographics}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 12, angle: -30, textAnchor: 'end' }} tickLine={false} interval={0} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="restocks" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
              <Bar dataKey="utilities" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className='dashboard-yearly__chart-container yearly-expenses'>
          <p className='dashboard-yearly__chart-title'>Yearly Expenses</p>
          <ResponsiveContainer width="100%" height="90%">
            <AreaChart
              width={500}
              height={200}
              data={dataYearlyExpenses}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 12, angle: -30, textAnchor: 'end' }} tickLine={false} interval={0} />
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

export default DashboardYearly
