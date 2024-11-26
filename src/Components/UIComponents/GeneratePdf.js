import React from 'react';
import '../Styles/GeneratePdf.css';
import html2pdf from "html2pdf.js";


const GeneratePdf = ({elementId}) => {
    const exportToPDF = async () => {
        const element = document.getElementById(elementId);
    
        const options = {
          margin: [10, 10, 10, 10], // Margins: top, right, bottom, left
          filename: 'report.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 }, // Increase scale for better quality
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }, // Portrait mode
        };
    
        html2pdf().set(options).from(element).save();
      };

  return (
    <div className='generate-pdf'>
      <i className="generate-pdf__icon fa-solid fa-file-arrow-down" onClick={exportToPDF}></i>
    </div>
  )
}

export default GeneratePdf
