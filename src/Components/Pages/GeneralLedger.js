import React,{ useState } from 'react';
import '../Styles/GeneralLedger.css';
import { YearSelection } from '../UIComponents/DateControls'
import html2pdf from 'html2pdf.js';

const GeneralLedger = () => {
  const [selectedYear, setSelectedYear] = useState(new Intl.DateTimeFormat('default', { year:'numeric' }).format(new Date()));

  const handleYearChange = (selectedYear) => {
    setSelectedYear( new Intl.DateTimeFormat('default', {year:'numeric'}).format(selectedYear));
  }

  const ledgerData = [
    { id:1 ,date: "01/01/2024", transactionId: "TXN001", referenceNo: "REF001", item: "Office Rent", description: "Paid monthly office rent", debit: 20000, credit: null, balance: 80000 },
    { id:2 ,date: "01/02/2024", transactionId: "TXN002", referenceNo: "REF002", item: "Product Sale", description: "Sold aquarium supplies", debit: null, credit: 50000, balance: 130000 },
    { id:3 ,date: "01/05/2024", transactionId: "TXN003", referenceNo: "REF003", item: "Utility Bill", description: "Paid electricity bill", debit: 5000, credit: null, balance: 125000 },
    { id:4 ,date: "01/07/2024", transactionId: "TXN004", referenceNo: "REF004", item: "Product Sale", description: "Sold pet accessories", debit: null, credit: 30000, balance: 155000 },
    { id:5 ,date: "01/10/2024", transactionId: "TXN005", referenceNo: "REF005", item: "Inventory", description: "Purchased new inventory", debit: 40000, credit: null, balance: 115000 }
  ];

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
            <input type='text' placeholder='Enter Capital' className='general-ledger__input-field' />
            <i className="general-ledger__input-icon fa-solid fa-right-to-bracket" title='Insert Capital'></i>
          </div>
          <i className="general-ledger__download-pdf-icon fa-solid fa-file-arrow-down" title='Download General Ledger' onClick={handleDownloadPDF}></i>
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
                <th className='general-ledger__table-th'>Transaction ID</th>
                <th className='general-ledger__table-th'>Reference No</th>
                <th className='general-ledger__table-th'>Item</th>
                <th className='general-ledger__table-th'>Description</th>
                <th className='general-ledger__table-th'>Debit</th>
                <th className='general-ledger__table-th'>Credit</th>
                <th className='general-ledger__table-th'>Balance</th>
              </tr>
            </thead>
            <tbody>
              {
               ledgerData.map(ledgerItem => (
                <tr className='inventory__table-tr' key={ledgerItem.id}>
                  <td className='inventory__table-td'>{ledgerItem.date}</td>
                  <td className='inventory__table-td'>{ledgerItem.transactionId}</td>
                  <td className='inventory__table-td'>{ledgerItem.referenceNo}</td>
                  <td className='inventory__table-td'>{ledgerItem.item}</td>
                  <td className='inventory__table-td'>{ledgerItem.description}</td>
                  <td className='inventory__table-td'>₱ {ledgerItem.debit}</td>
                  <td className='inventory__table-td'>₱ {ledgerItem.credit}</td>
                  <td className='inventory__table-td'>₱ {ledgerItem.balance}</td>
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
