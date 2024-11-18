import React,{ useState } from 'react';
import '../Styles/GeneralLedger.css';
import { YearSelection } from '../UIComponents/DateControls'

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

  return (
    <div className='general-ledger'>
      <div className=''>
        <YearSelection 
          onChange={handleYearChange}
          displayDate={selectedYear}
        />
      </div>

      <div className='general-ledger__body'>
        <div className='general-ledger__table-wrapper'>
          <table className='general-ledger__table'>
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
