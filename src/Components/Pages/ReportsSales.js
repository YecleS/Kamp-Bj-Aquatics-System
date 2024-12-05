import React, { useEffect, useState } from 'react';
import '../Styles/ReportsSales.css';
import { MonthSelection, YearSelection } from '../UIComponents/DateControls';
import { ToastError } from '../UIComponents/ToastComponent';
import GraphsImageDownloader from '../UIComponents/GraphsImageDownloader';
import GeneratePdf from '../UIComponents/GeneratePdf';
import { ComposedChart, Bar, Legend, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CustomTooltip } from '../UIComponents/CustomToolTip';

const ReportsSales = () => {
  const [activeFilter, setFilter] = useState('monthly');

  const reportsValues = {
    'monthly': <ReportsSalesMonthly />,
    'yearly': <ReportsSalesYearly />
  }

  const handleOnChangeFilter = (e) => {
    setFilter(
      e.target.value
    )
  }

  return (
    <div className='reports-sales'>
      <div className='reports-sales__header'>
        <select className='reports__filter' onChange={handleOnChangeFilter}>
          <option value='monthly'>Monthly</option>
          <option value='yearly'>Yearly</option>
        </select>
      </div>

      <div className='reports-sales__body'>
        {reportsValues[activeFilter]}
      </div>
      
    </div>
  )
}

export default ReportsSales




export const ReportsSalesMonthly = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [topProductsData, setTopProductsData] = useState([]);
  const [leastProductData, setLeastProductData] = useState([]);
  const [grossMargin, setGrossMargin] = useState([]);
  const [gmroiData, setgmroiData] = useState([]);
  const [displayedMonth, setDisplayedMonth] = useState(new Date().toLocaleDateString('default', { month:'long', year:'numeric' }));

  const handleMonthChange = (selectedMonth) => {
    setDisplayedMonth(selectedMonth.toLocaleDateString('default', { month: 'long', year: 'numeric' }));

    const year = selectedMonth.getFullYear();
    const month = (selectedMonth.getMonth() + 1).toString().padStart(2, '0'); // Format month
    const formattedMonth = `${year}-${month}`;

    getTop5Products(formattedMonth);
    getLeastProducts(formattedMonth);
    getGrossMargin(formattedMonth);
    getGMROI(formattedMonth);
  };

  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const formattedMonth = `${year}-${month}`;

    getTop5Products(formattedMonth);
    getLeastProducts(formattedMonth);
    getGrossMargin(formattedMonth);
    getGMROI(formattedMonth);
  },[])

  const getTop5Products = (formattedMonth) => {
    fetch(`${apiUrl}/KampBJ-api/server/dataAnalysis/getTop5Products.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ selectedMonth: formattedMonth, timePeriod: 'monthly' }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.length > 0) {
          const formattedData = data.map(item => ({
            name: item.productName,
            Total_Sales: parseFloat(item.Total_Sales),
          }));
          setTopProductsData(formattedData);
        } else {
          setTopProductsData([]);
        }
      })
      .catch(error => {
        console.error("Fetch Error:", error);
        ToastError('Error fetching data: ' + error.message);
      });
  }


  const getLeastProducts = (formattedMonth) => {
    // Fetch data from the PHP script with the selectedDate
    fetch(`${apiUrl}/KampBJ-api/server/dataAnalysis/getLeastSellingProductsMonthly.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ selectedDate: formattedMonth }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const formattedData = data.map(item => ({
            name: item.productName,
            sales: parseFloat(item.total_sales),
          }));

          setLeastProductData(formattedData);
        } else {
          setLeastProductData([]);
        }
      })
      .catch(error => {
        ToastError('Error fetching data:', error);
      });
  }

  const getGrossMargin = (formattedMonth) => {
    fetch(`${apiUrl}/KampBJ-api/server/dataAnalysis/getGrossMargin.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ selectedDate: formattedMonth }) // Change to desired month/year
    })
      .then(response => response.json())
      .then(data => {
        setGrossMargin(data); // Assuming you use useState to manage chart data
      })
      .catch(error => console.error('Error fetching gross margin data:', error));
                  
  }

  const getGMROI = (formattedMonth) => {
    fetch(`${apiUrl}/KampBJ-api/server/dataAnalysis/getGMROI.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ selectedDate: formattedMonth }) // Change to desired month/year
    })
      .then(response => response.json())
      .then(data => {
        setgmroiData(data); // Assuming you use useState to manage chart data
      })
      .catch(error => console.error('Error fetching gross margin data:', error));
                  
  }

  const truncateLabel = (label, maxLength ) => {
    if (label.length > maxLength) {
      return `${label.slice(0, maxLength)}...`;
    }
    return label;
  };
  
  return (
    <div className='reports-sales-component'>
      <div className='reports-sales-component__header'>
        <MonthSelection 
          onChange={handleMonthChange}
          displayDate={displayedMonth}
        />

        <GeneratePdf elementId='graphs-container' 
          date={displayedMonth} 
          reportTitle='Sales Report'
          elementGraphsTable='graph-container__table' 
          elementsGraphsDescription='graph-container__description'
          elementGraphWrapper='graphs-container__chart-wrapper'
          graphWrapperHeight='300px'
        />
      </div>

      <div className='reports-sales-component__body'>

        <div className='graphs-container graph-shadow' id='graph-gmroi'>
          <div className='graphs-header'>
            <h3 className='graph-title'>GMROI</h3>
            <GraphsImageDownloader elementId='graph-gmroi' />
          </div>
          <div className='graphs-container__chart-wrapper' style={{ height: "300px", width: "100%" }}>
            <ResponsiveContainer>
              <AreaChart
                width={500}
                height={400}
                data={gmroiData}
                margin={{
                  top: 30,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="productName" dy={5} tick={{ fontSize: 14 }} />
                <YAxis tick={{ fontSize: 14 }}/>
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="Gross_Margin_Multiplier" stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
            </ResponsiveContainer>
          </div>   
          
        </div>

        <div className='graphs-container graph-shadow' id='graph-gross-profit'>
          <div className='graphs-header'>
            <h3 className='graph-title'>Gross Profit</h3>
            <GraphsImageDownloader elementId='graph-gross-profit' />
          </div>
          <div className='graphs-container__chart-wrapper' style={{ height: "300px", width: "100%" }}>
            <ResponsiveContainer>
              <AreaChart
                width={500}
                height={400}
                data={grossMargin}
                margin={{
                  top: 30,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="productName" dy={5} tick={{ fontSize: 14 }} />
                <YAxis tick={{ fontSize: 14 }}/>
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="Total_Gross_Margin" stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
            </ResponsiveContainer>
          </div>   
          
        </div>

        <div className='graphs-container graph-shadow' id='graph-top-selling-products'>
          <div className='graphs-header'>
            <h3 className='graph-title'>Top Selling Products (Top 5)</h3>
            <GraphsImageDownloader elementId='graph-top-selling-product' />
          </div>   
          <div className='graphs-container__chart-wrapper' style={{ height: "300px", width: "100%" }}>
            <ResponsiveContainer>
              <ComposedChart
                width={500}
                height={400}
                data={topProductsData}
                margin={{
                  top: 30,
                  right: 20,
                  bottom: 0,
                  left: 0,
                }}
              >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="name" scale="band" angle={-20} 
                  tick={({ x, y, payload }) => {
                    const label = truncateLabel(payload.value, 14);  // Truncate label
                    return (
                      <text x={x} y={y} textAnchor="middle" fontSize={14} dy={10}>
                        {label}
                      </text>
                    );
                  }}
                />
                <YAxis />
                <Tooltip content={<CustomTooltip />}/>
                <Legend 
                  formatter={(value) => {
                    if (value === "Total_Sales") return "Sales";
                    return value;
                  }}
                />
                <Bar dataKey="Total_Sales" barSize={40} fill="#413ea0" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          
          <div className='graph-container__table'>
            <h4>Top Selling Products By Total Sales Table</h4>
              <table className='graph-table'>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Total Sales</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    topProductsData.map((items, index) => (
                      <tr key={index}>
                        <td>{items.name}</td>
                        <td>
                          ₱ {Number(items.Total_Sales).toLocaleString(undefined, { 
                                minimumFractionDigits: 2, 
                                maximumFractionDigits: 2 
                            })}
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
          </div>
          
          <div className='graph-container__description'>
            <p>
              This chart provides a detailed breakdown of top selling products based on their total sales.
            </p>
          </div> 

        </div>

        <div className='graphs-container graph-shadow' id='graph-least-selling-products'>
          <div className='graphs-header'>
            <h3 className='graph-title'>Least Selling Products</h3>
            <GraphsImageDownloader elementId='graph-least-selling-products' />
          </div>
          <div className='graphs-container__chart-wrapper' style={{ height: "300px", width: "100%" }}>
            <ResponsiveContainer>
              <ComposedChart
                width={500}
                height={400}
                data={leastProductData}
                margin={{
                  top: 30,
                  right: 20,
                  bottom: 0,
                  left: 0,
                }}
              >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="name" scale="band" angle={-20}
                  tick={({ x, y, payload }) => {
                    const label = truncateLabel(payload.value, 14);  // Truncate label
                    return (
                      <text x={x} y={y} textAnchor="middle" fontSize={14} dy={10}>
                        {label}
                      </text>
                    );
                  }}
                />
                <YAxis />
                <Tooltip content={<CustomTooltip />}/>
                <Legend />
                <Bar dataKey="sales" barSize={40} fill="#413ea0" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>   
          
          <div className='graph-container__table'>
            <h4>Least Selling Products By Total Sales Table</h4>
              <table className='graph-table'>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Total Sales</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    leastProductData.map((items, index) => (
                      <tr key={index}>
                        <td>{items.name}</td>
                        <td>
                          ₱ {Number(items.sales).toLocaleString(undefined, { 
                                minimumFractionDigits: 2, 
                                maximumFractionDigits: 2 
                            })}
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
          </div>
          
          <div className='graph-container__description'>
            <p>
            This chart provides a detailed breakdown of least selling products based on their total sales.
            </p>
          </div> 

        </div>

      </div>
    </div>
  )
}



export const ReportsSalesYearly = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [topProductsData, setTopProductsData] = useState([]);
  const [leastProductData, setLeastProductData] = useState([]);
  const [grossMargin, setGrossMargin] = useState([]);
  const [gmroiData, setgmroiData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Intl.DateTimeFormat('default', { year:'numeric' }).format(new Date()));

  const handleYearChange = (selectedYear) => {
    const formattedYear = new Intl.DateTimeFormat('default', {year:'numeric'}).format(selectedYear)
    setSelectedYear(formattedYear);
  }

  useEffect(() => {
    getTop5Products();
    getLeastProducts();
    getGrossMargin();
    getGMROI();
  }, [selectedYear])
  
  const getTop5Products = () => {
    fetch(`${apiUrl}/KampBJ-api/server/dataAnalysis/getTop5Products.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ selectedDate: selectedYear, timePeriod: 'yearly' }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.length > 0) {
          const formattedData = data.map(item => ({
            name: item.productName,
            sales: parseFloat(item.Total_Sales),
          }));
          setTopProductsData(formattedData);
        } else {
          setTopProductsData([]);
        }
      })
      .catch(error => {
        console.error("Fetch Error:", error);
        ToastError('Error fetching data: ' + error.message);
      });
  }

  const getLeastProducts = () => {
    fetch(`${apiUrl}/KampBJ-api/server/dataAnalysis/getLeastSellingProductsYearly.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ selectedYear: selectedYear }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const formattedData = data.map(item => ({
            name: item.productName,
            sales: parseFloat(item.totalSales),
          }));
          setLeastProductData(formattedData);
        } else {
          setLeastProductData([]);
        }
      })
      .catch(error => {
        ToastError('Error fetching data:', error);
      });
  }

  const getGrossMargin = () => {
    fetch(`${apiUrl}/KampBJ-api/server/dataAnalysis/getGrossMargin.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ selectedDate: selectedYear }) // Change to desired month/year
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setGrossMargin(data); // Assuming you use useState to manage chart data
      })
      .catch(error => console.error('Error fetching gross margin data:', error));
                  
  }

  const getGMROI = () => {
    fetch(`${apiUrl}/KampBJ-api/server/dataAnalysis/getGMROI.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ selectedDate: selectedYear })  // Change to desired month/year
    })
      .then(response => response.json())
      .then(data => {
        setgmroiData(data); // Assuming you use useState to manage chart data
      })
      .catch(error => console.error('Error fetching gross margin data:', error));
                  
  }

  const average = [
    { name: 'Waterlights', time: 1.30 },
    { name: 'Submarine Pump', time: 2.15 },
    { name: 'Aquatic Filter', time: 3 },
    { name: 'Fish Tank Heater', time: 4.45 },
    { name: 'Aquarium Decor', time: 3.35 }
  ];

  const truncateLabel = (label, maxLength ) => {
    if (label.length > maxLength) {
      return `${label.slice(0, maxLength)}...`;
    }
    return label;
  };

  return (
    <div className='reports-inventory-component'>
      <div className='reports-inventory-component__header'>
        <YearSelection 
          onChange={handleYearChange}
          displayDate={selectedYear}
        />
        <GeneratePdf 
          elementId='graphs-container' 
          date={selectedYear} 
          reportTitle='Sales Report'
          elementGraphsTable='graph-container__table' 
          elementsGraphsDescription='graph-container__description'
          elementGraphWrapper='graphs-container__chart-wrapper'
          graphWrapperHeight='300px'
        />
      </div>

      <div className='reports-inventory-component__body'>

        <div className='graphs-container graph-shadow'id='graph-gmroi'>
          <div className='graphs-header'>
            <h3 className='graph-title'>GMROI</h3>
            <GraphsImageDownloader elementId='graph-gmroi' />
          </div>
          <div className='graphs-container__chart-wrapper' style={{ height: "300px", width: "100%" }}>
            <ResponsiveContainer>
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
        </div>

        <div className='graphs-container graph-shadow' id='graph-gross-profit'>
          <div className='graphs-header'>
            <h3 className='graph-title'>Gross Profit</h3>
            <GraphsImageDownloader elementId='graph-gross-profit' />
          </div>
          <div className='graphs-container__chart-wrapper' style={{ height: "300px", width: "100%" }}>
            <ResponsiveContainer>
              <AreaChart
                width={500}
                height={400}
                data={grossMargin}
                margin={{
                  top: 30,
                  right: 30,
                  left: 0,
                  bottom: 10,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="productName" dy={10} tick={{ fontSize: 14 }} />
                <YAxis tick={{ fontSize: 14 }}/>
                <Tooltip />
                <Area type="monotone" dataKey="Total_Gross_Margin" stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
            </ResponsiveContainer>
          </div>   
        </div>

        <div className='graphs-container graph-shadow' id='graph-most-selling-products'>
          <div className='graphs-header'>
            <h3 className='graph-title'>Top Selling Products (Top 5)</h3>
            <GraphsImageDownloader elementId='graph-most-selling-products' />
          </div>
          <div className='graphs-container__chart-wrapper' style={{ height: "300px", width: "100%" }}>
           <ResponsiveContainer>
              <ComposedChart
                width={500}
                height={400}
                data={topProductsData}
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 0,
                  left: 0,
                }}
              >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="name" scale="band" angle={-20}
                  tick={({ x, y, payload }) => {
                    const label = truncateLabel(payload.value, 10);  // Truncate label
                    return (
                      <text x={x} y={y} textAnchor="middle" fontSize={14} dy={10}>
                        {label}
                      </text>
                    );
                  }}
                />
                <YAxis />
                <Tooltip content={<CustomTooltip />}/>
                <Legend />
                <Bar dataKey="sales" barSize={40} fill="#413ea0" />
              </ComposedChart>
            </ResponsiveContainer> 
          </div>

          <div className='graph-container__table'>
            <h4>Top Selling Products By Total Sales Table</h4>
              <table className='graph-table'>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Total Sales</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    topProductsData.map((items, index) => (
                      <tr key={index}>
                        <td>{items.name}</td>
                        <td>
                          ₱ {Number(items.sales).toLocaleString(undefined, { 
                                minimumFractionDigits: 2, 
                                maximumFractionDigits: 2 
                            })}
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
          </div> 

          <div className='graph-container__description'>
            <p>
              This chart provides a detailed breakdown of top selling products based on their total sales.
            </p>
          </div>  
          
        </div>

        <div className='graphs-container graph-shadow' id='graph-least-selling-products'>
          <div className='graphs-header'>
            <h3 className='graph-title'>Least Selling Products (Top 5)</h3>
            <GraphsImageDownloader elementId='graph-least-selling-products' />
          </div>
          <div className='graphs-container__chart-wrapper' style={{ height: "300px", width: "100%" }}>
            <ResponsiveContainer>
              <ComposedChart
                width={500}
                height={400}
                data={leastProductData}
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 0,
                  left: 0,
                }}
              >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="name" scale="band" angle={-20}
                  tick={({ x, y, payload }) => {
                    const label = truncateLabel(payload.value, 10);  // Truncate label
                    return (
                      <text x={x} y={y} textAnchor="middle" fontSize={14} dy={10}>
                        {label}
                      </text>
                    );
                  }}
                />
                <YAxis />
                <Tooltip content={<CustomTooltip />}/>
                <Legend />
                <Bar dataKey="sales" barSize={40} fill="#413ea0" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div className='graph-container__table'>
            <h4>Least Selling Products By Total Sales Table</h4>
              <table className='graph-table'>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Total Sales</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    leastProductData.map((items, index) => (
                      <tr key={index}>
                        <td>{items.name}</td>
                        <td>
                          ₱ {Number(items.sales).toLocaleString(undefined, { 
                                minimumFractionDigits: 2, 
                                maximumFractionDigits: 2 
                            })}
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
          </div>

          <div className='graph-container__description'>
            <p>
              This chart provides a detailed breakdown of least selling products based on their total sales.
            </p>
          </div>
          
        </div>

      </div>
    </div>
  )
}