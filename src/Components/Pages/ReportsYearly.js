import React, { useState, useRef } from 'react';
import '../Styles/ReportsYearly.css';
import { YearSelection } from '../UIComponents/DateControls';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
    ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import Select from 'react-select'

const ReportsYearly = () => {
  const contentRef = useRef();
  const [selectedYear, setSelectedYear] = useState(new Intl.DateTimeFormat('default', { year:'numeric' }).format(new Date()));
  const [selectedGraph, setSelectedGraph] = useState([]);

  const handleYearChange = (selectedYear) => {
    setSelectedYear( new Intl.DateTimeFormat('default', {year:'numeric'}).format(selectedYear));
  }

  const handleGraphFilter = (selectedOption) => {
    setSelectedGraph(selectedOption || [])
  }

  // Prepare selectedGraph values for easier checks// This will access the values in the useState
  const selectedGraphValues = selectedGraph.map(option => option.value);

  const graphOptions = [
    { value:'average-per-product', label:'Average Per Product Graph'},
    { value:'top-sold-products', label:'Top Sold Products Graph'},
    { value:'inventory-ratio', label:'Inventory Ratio Graph'},
    { value:'gmroi', label:'GMROI Graph'},
  ]

  const printContent = (contentRef) => {
    if (!contentRef.current) return;
  
    const content = contentRef.current;
    const printWindow = window.open('', '', 'width=800,height=600');
    
    printWindow.document.write('<html><head><title>Print</title>');
    printWindow.document.write('<link rel="stylesheet" href="path-to-your-styles.css">'); // Ensure styles are included
    printWindow.document.write('</head><body>');
    printWindow.document.write(content.innerHTML);
    printWindow.document.write('</body></html>');
    
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className='reports-yearly'>
      <div className='reports-yearly__header'>
        <YearSelection 
          onChange={handleYearChange}
          displayDate={selectedYear}
        />
      </div>
      <div className='graph-filter-wrapper'>
        <Select 
          options={graphOptions}
          value={selectedGraph}
          onChange={handleGraphFilter}
          isMulti={true}
          placeholder="Select a Graph to Show"
          className='graph-filter-input'
        />
        <div className='report-icon-wrapper' onClick={() => printContent(contentRef)}>
          <i className="report-icon fa-solid fa-print"></i>
        </div>
      </div>

      <div className='reports-yearly__body'>

        {/* If theres nothing selected in the graph filter */}
        {selectedGraph.length === 0 && (
            <>
              <AverageSellingTImeGraph selectedDate={selectedYear} />
              <MostSoldProducts selectedDate={selectedYear} />
              <InventoryTurnOverGraph selectedDate={selectedYear} />
              <GmroiGraph selectedDate={selectedYear} />
            </>
          )}

          {/* Conditional Render */}
          {selectedGraphValues.includes('average-per-product') && (
            <AverageSellingTImeGraph selectedDate={selectedYear} />
          )}
          {selectedGraphValues.includes('top-sold-products') && (
            <MostSoldProducts selectedDate={selectedYear} />
          )}
          {selectedGraphValues.includes('inventory-ratio') && (
            <InventoryTurnOverGraph selectedDate={selectedYear} />
          )}
          {selectedGraphValues.includes('gmroi') && (
            <GmroiGraph selectedDate={selectedYear} />
          )}
        
      </div>
    </div>
  )
}

export default ReportsYearly



export const AverageSellingTImeGraph = ({selectedYear}) => {
  //hours covert to decimal
  const average = [
    { name: 'Waterlights', time: 1.30 },
    { name: 'Submarine Pump', time: 2.15 },
    { name: 'Aquatic Filter', time: 3 },
    { name: 'Fish Tank Heater', time: 4.45 },
    { name: 'Aquarium Decor', time: 3.35 }
  ];

  return (
    <div className='graph-container'>
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
  )
}



export const MostSoldProducts = ({selectedYear}) => {
  const MostSoldProduct = [
    { name: 'Waterlights', quantity: 350 },
    { name: 'Submarine Pump', quantity: 288 },
    { name: 'Aquatic Filter', quantity: 459 },
    { name: 'Fish Tank Heater', quantity: 120 },
    { name: 'Aquarium Decor', quantity: 88 },
  ];

  return(
    <div className='graph-container'>
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
  )
}


export const InventoryTurnOverGraph = ({selectedYear}) => {

  const inventoryTurnRatio = [
    { time: '12 AM - 12 PM', ratio: 0.45 }, // Morning
    { time: '12 PM - 6 PM', ratio: 0.68 }, // Afternoon
    { time: '6 PM - 12 AM', ratio: 0.32 }, // Evening
  ];

  return(
      <div className='graph-container'>
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
  )
}


export const GmroiGraph = ({selectedYear}) => {
  const gmroiData = [
    { time: '12am - 12pm', gmroi: 1.5 },
    { time: '12pm - 6pm', gmroi: 2.0 },
    { time: '6pm - 12am', gmroi: 1.8 },
  ];

  return(
    <div className='graph-container'>
      <h3 className='graph-title'>Gross Margin Return on Investment</h3>
      <ResponsiveContainer width="100%" height="95%">
        <BarChart width={150} height={40} data={gmroiData}>
          <XAxis dataKey='time' tick={{ fontSize: 14 }} />
          <YAxis dataKey='gmroi' />
          <Bar dataKey="gmroi" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>  
  )
}