import React,{ useEffect, useState } from 'react';
import '../Styles/GeneralLedger.css';
import { YearSelection } from '../UIComponents/DateControls'
import html2pdf from 'html2pdf.js';
import { ToastSuccess, ToastError } from '../UIComponents/ToastComponent';

const GeneralLedger = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [ledgerData, setLedgerData] = useState([]);
  const [balance, setBalance] = useState();
  const [capitalInput, setCapitalInput] = useState();
  const [selectedYear, setSelectedYear] = useState(new Intl.DateTimeFormat('default', { year:'numeric' }).format(new Date()));
  let currentBalance = balance;

  const handleYearChange = (selectedYear) => {
    setSelectedYear( new Intl.DateTimeFormat('default', {year:'numeric'}).format(selectedYear));
  }

  useEffect(() => {
    getSalesAndExpenses();
  }, [selectedYear])

  const getSalesAndExpenses = () => {
    // Fetch data from the PHP script with the selectedDate
    fetch(`${apiUrl}/KampBJ-api/server/dataAnalysis/getSalesAndExpenses.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ selectedYear: selectedYear }),
    })
      .then(response => response.json())
      .then(data => {
        setLedgerData(data);
      })
      .catch(error => {
        ToastError('Error fetching data:', error);
      });
  }

  const handleInputCapitalChange = (e) => {
    const convertToFloat = e.target.value ? parseFloat(e.target.value) : 0;
    setCapitalInput(convertToFloat);
    
  }

  const handleCapitalSubmit = () => {

    if(isNaN(capitalInput) || capitalInput <= 0 ) {
      ToastError('Please Enter A Valid Capital Amount');
    }else {
      setBalance(capitalInput);
    }
  }

  // Handle updating balance based on debit and credit
  const handleBalance = (credit, debit) => {
    if(isNaN(currentBalance)){
      return `₱ 00.00`;
    }

    if (!isNaN(credit) && credit > 0) {
      currentBalance += credit;
    }

    if (!isNaN(debit) && debit > 0) {
      currentBalance -= debit;
    }
    
    // Format the balance to two decimal places
    const formattedBalance = currentBalance.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return `₱ ${formattedBalance}`;
  };

  const handleDownloadPDF = async () => {
    const table = document.getElementById('general-ledger-table'); // Get the table element
    const tableWidth = table.offsetWidth;  // Get the table's current width
    const pageWidth = 210;  // A4 page width in mm (for landscape, it’s 297mm)
  
    // Calculate the scale factor to fit the table width to the PDF page width
    const scale = pageWidth / tableWidth;
  
    const options = {
      filename: 'General_Ledger.pdf',  // Optional: specify the filename for the PDF
      margin: 10,  // Set margins for the PDF (top, left, bottom, right)
      html2canvas: {
        scale: 2,  // Automatically scale to fit the width
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'landscape',  // Set the PDF orientation to landscape for wide tables
      },
    };
  
    // Generate and save the PDF
    html2pdf().from(table).set(options).save();
  };

  return (
    <div className='general-ledger'>
      <div className='general-ledger__header'>

        <div className='general-ledger__controls'>
          <div className='general-ledger__input-field-wrapper'>
            <input type='number' placeholder='Enter Capital' className='general-ledger__input-field' onChange={handleInputCapitalChange} step="0.01"/>
            <i className="general-ledger__input-icon fa-solid fa-right-to-bracket" title='Insert Capital' onClick={handleCapitalSubmit}></i>
          </div>
          <i className="general-ledger__download-pdf-icon fa-solid fa-file-arrow-down" title='Download General Ledger' onClick={handleCapitalSubmit}></i>
        </div>
        <YearSelection 
          onChange={handleYearChange}
          displayDate={selectedYear}
        />

      </div>

      <div className='general-ledger__body'>
        <div className='general-ledger__table-wrapper'>
          <table className='general-ledger__table' id='general-ledger-table'>
            <thead>
              <tr>
                <th className='general-ledger__table-th'>Date</th>
                <th className='general-ledger__table-th'>Time</th>
                <th className='general-ledger__table-th'>Transaction ID</th>
                <th className='general-ledger__table-th'>Reference No</th>
                <th className='general-ledger__table-th'>Title</th>
                <th className='general-ledger__table-th'>Debit</th>
                <th className='general-ledger__table-th'>Credit</th>
                <th className='general-ledger__table-th'>Balance</th>
              </tr>
            </thead>
            <tbody>
              {
               ledgerData.map((ledgerItem, index) => (
                <tr className='inventory__table-tr' key={index}>
                  <td className='inventory__table-td'>{HandleDateDisplay(ledgerItem.date)}</td>
                  <td className='inventory__table-td'>{HandleTimeDisplay(ledgerItem.date)}</td>
                  <td className='inventory__table-td'>{ledgerItem.transactionId}</td>
                  <td className='inventory__table-td'>{ledgerItem.referenceNumber}</td>
                  <td className='inventory__table-td'>{HandleNullForTitle(ledgerItem.title, ledgerItem.date)}</td>
                  <td className='inventory__table-td'>{HandleNullForDebit(ledgerItem.debit)}</td>
                  <td className='inventory__table-td'>{HandleNullForCredit(ledgerItem.credit)}</td>
                  <td className='inventory__table-td'>{handleBalance(ledgerItem.credit, ledgerItem.debit)}</td>
                </tr>
               ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default GeneralLedger

export const HandleDateDisplay = (date) => {
  const formatDate = date.split(' ')[0];

  return formatDate;
}

export const HandleTimeDisplay = (date) => {
  const formatTime = date.split(' ')[1];

  return formatTime;
}

export const HandleNullForTitle = (title, date) => {
  // Ensure date is valid and not undefined
  const formattedDate = date.split(' ')[0]

  return title ? title:`Sales Transaction on ${formattedDate}`;
}

export const HandleNullForDebit = (debit) => {
  // Ensure debit is a valid number before applying formatting
  const numericDebit = parseFloat(debit);
  if (isNaN(numericDebit)) return '-';

  // Format the number first, then apply toFixed for decimal places
  const formattedDebit = numericDebit.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `₱ ${formattedDebit}`;
};

export const formatCurrency = (currency) => {
  // Ensure debit is a valid number before applying formatting
  const numericCurrency = parseFloat(currency);

  // Format the number first, then apply toFixed for decimal places
  const formattedCurrency = numericCurrency.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `₱ ${formattedCurrency}`;
};


export const HandleNullForCredit = (credit) => {
  // Ensure credit is a valid number before applying toFixed
  const numericCredit = parseFloat(credit);

  if (isNaN(numericCredit)) return '-';

  // Format the number first, then apply toFixed for decimal places
  const formattedCredit = numericCredit.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `₱ ${formattedCredit}`;
};


