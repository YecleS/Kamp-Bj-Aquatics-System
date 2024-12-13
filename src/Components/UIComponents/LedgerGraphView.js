import React, { useState, useEffect } from 'react';
import {
    ComposedChart,
    Line,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from 'recharts';
import '../Styles/LedgerGraphView.css';
import { GoodMessage, WarningMessage } from './CustomMessages';

const LedgerGraphView = ({onClick, ledgerData}) => {
  const defaultDate = useState(new Date().toLocaleDateString('default', { month:'numeric', year:'numeric' }))
  const [structuredData, setStructuredData] = useState([]);
  const [balanceTrend, setBalanceTrend] = useState('');
  const [percentage, setPercentage] = useState();

  const cleanedData = [
    { Month: "2024-06", Account: "Sales Revenue", Debit: 0, Credit: 120000.00, Balance: 620000.00 },
    { Month: "2024-06", Account: "Expense", Debit: 15000, Credit: 0, Balance: 605000.00 },
    { Month: "2024-06", Account: "Inventory", Debit: 50000, Credit: 0, Balance: 550000.00 },
    { Month: "2024-07", Account: "Sales Revenue", Debit: 0, Credit: 135000.00, Balance: 755000.00 },
    { Month: "2024-07", Account: "Expense", Debit: 25000, Credit: 0, Balance: 730000.00 },
    { Month: "2024-07", Account: "Inventory", Debit: 40000, Credit: 0, Balance: 690000.00 },
    { Month: "2024-08", Account: "Sales Revenue", Debit: 0, Credit: 150000.00, Balance: 905000.00 },
    { Month: "2024-08", Account: "Expense", Debit: 20000, Credit: 0, Balance: 885000.00 },
    { Month: "2024-08", Account: "Inventory", Debit: 35000, Credit: 0, Balance: 850000.00 },
    { Month: "2024-09", Account: "Sales Revenue", Debit: 0, Credit: 100000.00, Balance: 1000000.00 },
    { Month: "2024-09", Account: "Expense", Debit: 30000, Credit: 0, Balance: 970000.00 },
    { Month: "2024-09", Account: "Inventory", Debit: 25000, Credit: 0, Balance: 945000.00 },
    { Month: "2024-10", Account: "Sales Revenue", Debit: 0, Credit: 50000.00, Balance: 1050000.00 },
    { Month: "2024-10", Account: "Expense", Debit: 10000, Credit: 0, Balance: 1040000.00 },
    { Month: "2024-10", Account: "Inventory", Debit: 30000, Credit: 0, Balance: 1010000.00 },
    { Month: "2024-11", Account: "Sales Revenue", Debit: 0, Credit: 233215.76, Balance: 733215.76 },
    { Month: "2024-11", Account: "Expense", Debit: 36924, Credit: 0, Balance: 696291.76 },
    { Month: "2024-11", Account: "Inventory", Debit: 268209.05, Credit: 0, Balance: 428082.71 },
    { Month: "2024-12", Account: "Sales Revenue", Debit: 0, Credit: 61038.30, Balance: 489121.01 },
    { Month: "2024-12", Account: "Expense", Debit: 6080, Credit: 0, Balance: 483041.01 },
    { Month: "2024-12", Account: "Inventory", Debit: 28051, Credit: 0, Balance: 454990.01 }
  ];

  const formatDate = () => {
    const splittedDate = defaultDate[0].split('/');
    const month = splittedDate[0].padStart(2, '0'); 
    const year = splittedDate[1];
    
    return `${year}-${month}`
  }
  
  //This is needed for dynamic date range to get the necessary data, for now disregard this, since it was just dummy data.
  const subtractMonths = (dateString) => {
    const [year, month] = dateString.split('-');
    const subtractedDate = new Date(year, month);
    subtractedDate.setMonth(subtractedDate.getMonth() - 6);

    const newYear = subtractedDate.getFullYear();
    const newMonth = subtractedDate.getMonth().toString().padStart(2, '0');
    
    return `${newYear}-${newMonth}`;
  }

  useEffect(() => {
    //Remove the current month from the data set, because we ar only getting the last 6 months
    const filterDataWithDate = cleanedData.filter(data => data.Month !== formatDate());

   

    const groupedData = cleanedData.reduce((acc, curr) => {
      // Check if the month already exists in the accumulator
      const existingMonth = acc.find(item => item.Month === curr.Month);

      if (existingMonth) {
        // Add to existing month's totals
        existingMonth.TotalDebit += curr.Debit;
        existingMonth.TotalCredit += curr.Credit;
        existingMonth.Balance = curr.Balance; // Use the last balance for the month
      } else {
        // Create a new entry for the month
        acc.push({
          Month: curr.Month,
          TotalDebit: curr.Debit,
          TotalCredit: curr.Credit,
          Balance: curr.Balance,
        });
      }

      console.log(acc);
      
       //This is the data after grouping 
      // {Month: '2024-06', TotalDebit: 65000, TotalCredit: 120000, Balance: 550000}
      // {Month: '2024-07', TotalDebit: 65000, TotalCredit: 135000, Balance: 690000}
      // {Month: '2024-08', TotalDebit: 55000, TotalCredit: 150000, Balance: 850000} 
      // {Month: '2024-09', TotalDebit: 55000, TotalCredit: 100000, Balance: 945000}
      // {Month: '2024-10', TotalDebit: 40000, TotalCredit: 50000, Balance: 1010000}
      // {Month: '2024-11', TotalDebit: 305133.05, TotalCredit: 233215.76, Balance: 428082.71} previous month
      // {Month: '2024-12', TotalDebit: 34131, TotalCredit: 61038.3, Balance: 454990.01} current month

      return acc;

      
    }, []);

    setStructuredData(groupedData);

    // Calculate overall percentage change based on first and last balance
    const startBalance = groupedData[0]?.Balance;
    const endBalance = groupedData[groupedData.length - 1]?.Balance;

    const overallPercentageChange = Math.abs(((endBalance - startBalance) / startBalance) * 100); // Use absolute value

    // Trend detection (Upward, Downward, or Flat)
    let trend = "Upward"; // Default to "Upward"
    let previousBalance = startBalance;

    // Array to store the percentage change for each month
    let monthPercentageChanges = 0;

    // Loop through the data to calculate the percentage change for each month
    for (let i = 1; i < groupedData.length; i++) {
      const currentBalance = groupedData[i]?.Balance;

      // Calculate the month-to-month percentage change and store it
      monthPercentageChanges = Math.abs(((currentBalance - previousBalance) / previousBalance) * 100); // Use absolute value for month-to-month

      // Check trend based on monthly comparisons
      if (currentBalance < previousBalance) {
        trend = "Downward"; // If any balance is lower, it's "Downward"
        break; // If trend is downward, stop the loop early
      } else if (currentBalance === previousBalance) {
        trend = "Flat"; // If balances are the same, it's "Flat"
      }

      previousBalance = currentBalance;
    }

    setBalanceTrend(`${trend}`);
    setPercentage(overallPercentageChange.toFixed(2))
  }, [])

  return (
    <div className='ledger-graph-view'>
      <div className='ledger-graph-view__wrapper'>
        <div className='ledger-graph-view__header'>
            <h3>General Ledger</h3>
            <p>Last 6 Months</p>
            <i className="ledger-graph-view__close-icon fa-solid fa-xmark" onClick={onClick}></i>
        </div>
        <div className='ledger-graph-view__body'>
            
            <div className='ledger-graph-view__graph-wrapper'>
                <ResponsiveContainer width="100%" height={400}>
                    <ComposedChart
                        width={500}
                        height={400}
                        data={structuredData}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 20,
                            bottom: 0,
                        }}
                    >
                    <Legend />
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Month" tick={{fontSize:12}}/>
                    <YAxis />
                    <Tooltip />

                    <Line 
                        type="monotone" 
                        dataKey="Balance" 
                        stroke="#8884d8" 
                        strokeWidth={3} 
                    />

                    <Line 
                        type="monotone" 
                        dataKey="TotalCredit" 
                        stroke="#82ca9d" 
                        strokeWidth={3} 
                    />

                    <Line 
                        type="monotone" 
                        dataKey="TotalDebit" 
                        stroke="#ffc658" 
                        strokeWidth={3} 
                    />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>

            <div className='ledger-graph-view__message-wrapper'>
              {
                balanceTrend === 'upward' ? (
                  <GoodMessage 
                    message={`Balance is on upward status, it was up by ${percentage}% from the previous month. This indicates that sales are strong, expenses are well-managed, and inventory is being effectively handled. The overall financial health is improving, suggesting a positive growth trend in the business.`} 
                  />
                ):(
                  <WarningMessage 
                    message={`The balance is in a downward trend, having decreased by ${percentage}% from the previous month. This suggests that sales may be slowing. It's best to avoid incurring unnecessary expenses and manage inventory wisely.`}
                  />
                )
              }
              
            </div>
            
        </div>
      </div>
    </div>
  )
}

export default LedgerGraphView
