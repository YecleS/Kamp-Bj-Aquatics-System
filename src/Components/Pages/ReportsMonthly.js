import React, { useState, useRef } from 'react';
import { MonthSelection } from '../UIComponents/DateControls';
import '../Styles/ReportsMonthly.css';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
    ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import Select from 'react-select';
import html2pdf from "html2pdf.js";


const ReportsMonthly = () => {
  const contentRef = useRef();
  const [selectedMonth, setSelectedMonth] = useState(new Date().toLocaleDateString('default', { month:'long', year:'numeric' }));
  const [selectedGraph, setSelectedGraph] = useState([]);

  const handleMonthChange = (selectedMonth) => {
    setSelectedMonth(selectedMonth.toLocaleDateString('default', { month: 'long', year: 'numeric' }));
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
  
  const exportToPDF = async () => {
    const element = document.querySelector('#reports-body');
    const graphContainers = document.querySelectorAll('.graphs-monthly-container');
  
    // Clone the reports-body to preserve the original layout
    const clonedElement = element.cloneNode(true);
  
    // Remove 'graph-shadow' class before exporting in the cloned element
    const clonedGraphContainers = clonedElement.querySelectorAll('.graphs-monthly-container');
    clonedGraphContainers.forEach(container => {
      container.classList.remove('graph-shadow');
    });
  
    // Group graphs into pairs for each page in the cloned element
    const newElement = document.createElement('div');
    newElement.id = 'pdf-graph-wrapper';
  
    for (let i = 0; i < clonedGraphContainers.length; i += 2) {
      // Create a container for the pair of graphs (stacked vertically)
      const pageContainer = document.createElement('div');
      pageContainer.style.display = 'flex';
      pageContainer.style.flexDirection = 'column'; // Stack the graphs vertically
      pageContainer.style.marginBottom = '20px'; // Space between pairs of graphs
  
      // Add the first graph to the container
      pageContainer.appendChild(clonedGraphContainers[i]);
  
      // Add the second graph (if it exists) to the container
      if (clonedGraphContainers[i + 1]) {
        pageContainer.appendChild(clonedGraphContainers[i + 1]);
      }
  
      // Append the page container to the new element
      newElement.appendChild(pageContainer);
  
      // Add a page break after every pair (except the last one)
      if (i + 2 < clonedGraphContainers.length) {
        const pageBreak = document.createElement('div');
        pageBreak.style.pageBreakAfter = 'always'; // Force a page break
        newElement.appendChild(pageBreak);
      }
    }
  
    // Append the new element to the body for PDF generation (without affecting the original content)
    document.body.appendChild(newElement);
  
    // Initialize html2pdf options
    const options = {
      margin: 10,
      filename: 'report.pdf',
      image: { type: 'jpeg', quality: 1 },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait', // Portrait orientation
        putOnlyUsedFonts: true, // Optional: improves performance
      },
    };
  
    // Generate the PDF
    html2pdf().from(newElement).set(options).save();
  
    // Cleanup: Remove the dynamically created wrapper after saving the PDF
    newElement.remove();
  
    // Add the 'graph-shadow' class back after a delay in the original element
    setTimeout(() => {
      graphContainers.forEach(container => {
        container.classList.add('graph-shadow');
      });
    }, 100); // Adjust the delay as needed (e.g., 100ms)
  };
  
  

  return (
    <div className='reports-monthly'>
      <div className='reports-monthly__header'>
        <MonthSelection 
          onChange={handleMonthChange}
          displayDate={selectedMonth}
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
        <div className='report-icon-wrapper' onClick={exportToPDF}>
          <i className="report-icon fa-solid fa-print"></i>
        </div>
      </div>

      <div ref={contentRef} className='reports-monthly__body' id='reports-body'>

        {selectedGraph.length === 0 && (
            <>
              <AverageSellingTImeGraph selectedDate={selectedMonth} />
              <MostSoldProducts selectedDate={selectedMonth} />
              <InventoryTurnOverGraph selectedDate={selectedMonth} />
              <GmroiGraph selectedDate={selectedMonth} />
            </>
          )}

          {selectedGraphValues.includes('average-per-product') && (
            <AverageSellingTImeGraph selectedDate={selectedMonth} />
          )}
          {selectedGraphValues.includes('top-sold-products') && (
            <MostSoldProducts selectedDate={selectedMonth} />
          )}
          {selectedGraphValues.includes('inventory-ratio') && (
            <InventoryTurnOverGraph selectedDate={selectedMonth} />
          )}
          {selectedGraphValues.includes('gmroi') && (
            <GmroiGraph selectedDate={selectedMonth} />
          )}

      </div>
    </div>
  )
}

export default ReportsMonthly


export const AverageSellingTImeGraph = ({selectedDate}) => {
  //hours covert to decimal
  const average = [
    { name: 'Waterlights', time: 1.30 },
    { name: 'Submarine Pump', time: 2.15 },
    { name: 'Aquatic Filter', time: 3 },
    { name: 'Fish Tank Heater', time: 4.45 },
    { name: 'Aquarium Decor', time: 3.35 }
  ];

  return (
    <div className='graphs-monthly-container graph-shadow'>
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



export const MostSoldProducts = ({selectedDate}) => {
  const MostSoldProduct = [
    { name: 'Waterlights', quantity: 350 },
    { name: 'Submarine Pump', quantity: 288 },
    { name: 'Aquatic Filter', quantity: 459 },
    { name: 'Fish Tank Heater', quantity: 120 },
    { name: 'Aquarium Decor', quantity: 88 },
  ];

  return(
    <div className='graphs-monthly-container graph-shadow'>
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


export const InventoryTurnOverGraph = ({selectedDate}) => {

  const inventoryTurnRatio = [
    { time: '12 AM - 12 PM', ratio: 0.45 }, // Morning
    { time: '12 PM - 6 PM', ratio: 0.68 }, // Afternoon
    { time: '6 PM - 12 AM', ratio: 0.32 }, // Evening
  ];

  return(
      <div className='graphs-monthly-container graph-shadow'>
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


export const GmroiGraph = ({selectedDate}) => {
  const gmroiData = [
    { time: '12am - 12pm', gmroi: 1.5 },
    { time: '12pm - 6pm', gmroi: 2.0 },
    { time: '6pm - 12am', gmroi: 1.8 },
  ];

  return(
    <div className='graphs-monthly-container graph-shadow'>
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