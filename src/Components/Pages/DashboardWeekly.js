import React, { useEffect, useState } from 'react';
import { DateSelection } from '../UIComponents/DateControls';
import DashboardCards from '../UIComponents/DashboardCards';
import '../Styles/DashboardWeekly.css';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ComposedChart, Bar, Legend} from 'recharts';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { BarChart,} from 'recharts';
import { Rectangle} from 'recharts';

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

  const dataSales = [
    { name: '6d ago', sales: 2133 },
    { name: '5d ago', sales: 6502 },
    {name: '4d ago', sales: 3200},
    {name: '3d ago', sales: 5000},
    {name: '2d ago', sales: 4000},
    {name: '1d ago', sales: 500},
    {name: 'Today', sales: 1200},
  ];

  const dataGoodsSold = [
    {name: '6d ago', sold: 2133},
    {name: '5d ago', sold: 6502},
    {name: '4d ago', sold: 3200},
    {name: '3d ago', sold: 5000},
    {name: '2d ago', sold: 4000},
    {name: '1d ago', sold: 500},
    {name: 'Today', sold: 1200},
  ];

  const dataTransactions = [
    { day: 'Today', transaction: 50 },
    { day: '1d ago', transaction: 189 },
    { day: '2d ago', transaction: 278 },
    { day: '3d ago', transaction: 200 },
    { day: '4d ago', transaction: 300 },
    { day: '5d ago', transaction: 300 },
    { day: '6d ago', transaction: 400 },
  ];

   const dataExpenseDemographics = [
    {days: '6d ago',restocks: 6535,utilities: 5553},
    {days: '5d ago',restocks: 5535,utilities: 1253},
    {days: '4d ago',restocks: 7535,utilities: 2553},
    {days: '3d ago',restocks: 3535,utilities: 5853},
    {days: '2d ago',restocks: 4535,utilities: 7553},
    {days: '1d ago',restocks: 3535,utilities: 9553},
    {days: 'today',restocks: 335,utilities: 1543},
  ];

  const dataSalesExpenses = [
    { days: '6d ago', sales: 5600, expenses: 4300},
    { days: '5d ago', sales: 2600, expenses: 2300},
    { days: '4d ago', sales: 4700, expenses: 2600},
    { days: '3d ago', sales: 3300, expenses: 7300},
    { days: '2d ago', sales: 1300, expenses: 3800},
    { days: '1d ago', sales: 4600, expenses: 8300},
    { days: 'today', sales: 8700, expenses: 9300},
  ];

  const dataExpenses = [
    {name: '6d ago', total: 5133},
    {name: '5d ago', total: 2502},
    {name: '4d ago', total: 5200},
    {name: '3d ago', total: 1000},
    {name: '2d ago', total: 4000},
    {name: '1d ago', total: 4450},
    {name: 'Today', total: 1200},
  ];

  const dataTopSellingProducts = [
    { id:1, name: 'Product 1', quantity: 350, total: 3500 },
    { id:2, name: 'Product 2', quantity: 120, total: 3600 },
    { id:3, name: 'Product 3', quantity: 61, total: 2155 },
    { id:4, name: 'Product 4', quantity: 775, total: 5577 },
    { id:5, name: 'Product 5', quantity: 123, total: 4443 },
    { id:6, name: 'Product 6', quantity: 665, total: 8775 },
    { id:7, name: 'Product 7', quantity: 877, total: 4321 },
    { id:8, name: 'Product 8', quantity: 334, total: 3500 },
    { id:9, name: 'Product 9', quantity: 350, total: 3500 },
    { id:10, name: 'Product 10', quantity: 350, total: 3500 },
  ];

  return (
    <div className='dashboard-weekly'>
      <div className='dashboard-weekly__header'>
        <DateSelection 
          onChange={handleWeekChange}
          displayDate={weekRange}
        />
      </div>
      <div className='dashboard-weekly__body'>
      <DashboardCards customCardsClass='card1' title="Total Sales" subTitle="Weekly Sales" desription='₱ 3500.00'/>
        <DashboardCards customCardsClass='card2' title="Total Expenses" subTitle="Weekly Expenses" desription='₱ 5000.00'/>
        <DashboardCards customCardsClass='card3' title="Trasanctions Made" subTitle="Weekly Transactions Made" desription='400'/>
        <div className='dashboard-weekly__goods-sold'>
          <p className='dashboard-weekly__chart-title'>Weekly Goods Sold</p>
          <ResponsiveContainer width="100%" height="90%">
            <ComposedChart
              layout="vertical"
              width={500}
              height={400}
              data={dataGoodsSold}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" scale="band" />
              <Tooltip />
              <Legend />
              <Bar dataKey="sold" barSize={20} fill="#413ea0" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className='dashboard-weekly__sales'>
          <p className='dashboard-weekly__chart-title'>Weekly Sales</p>
          <ResponsiveContainer width="100%" height="90%">
          <AreaChart
            width={500}
            height={400}
            data={dataSales}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="sales" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className='dashboard-weekly__transaction'>
          <p className='dashboard-weekly__chart-title'>Weekly Expenses Demographics</p>
          <ResponsiveContainer width="100%" height="90%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={dataExpenseDemographics}>
              <PolarGrid />
              <PolarAngleAxis dataKey="days" />
              <PolarRadiusAxis angle={30} domain={[0, 150]} />
              <Radar name="Re-Stocks" dataKey="restocks" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              <Radar name="Utilities" dataKey="utilities" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
              <Tooltip />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className='dashboard-weekly__expenses'>
          <p className='dashboard-weekly__chart-title'>Weekly Expenses</p>
            <ResponsiveContainer width="100%" height="90%">
            <AreaChart width={730} height={250} data={dataExpenses}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="total" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
              </AreaChart>
            </ResponsiveContainer>
        </div>

        <div className='dashboard-weekly__top-products-sold'>
          <p className='dashboard-weekly__chart-title'>Top Selling Products</p>
            <div className='dashboard-weekly__table-wrapper'>
              <table className='dashboard-weekly__table'>
                <thead>
                  <tr className='dashboard-weekly__thead-tr'>
                    <th className='dashboard-weekly__thead-th'>Product</th>
                    <th className='dashboard-weekly__thead-th'>Quantity</th>
                    <th className='dashboard-weekly__thead-th'>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {dataTopSellingProducts.map((products) => (
                    <tr className='dashboard-weekly__tbody-tr' key={products.id}>
                      <td className='dashboard-weekly__tbody-td'>{products.name}</td>
                      <td className='dashboard-weekly__tbody-td'>{products.quantity}</td>
                      <td className='dashboard-weekly__tbody-td'>{products.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </div>

        <div className='dashboard-weekly__sales-expenses'>
          <p className='dashboard-weekly__chart-title'>Weekly Sales vs Expenses</p>
          <ResponsiveContainer width="100%" height="90%">
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
              <XAxis dataKey="days" />
              <YAxis />
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
