import React, { useState } from 'react';
import '../Styles/GeneratePdf.css';
import html2pdf from "html2pdf.js";
import html2canvas from 'html2canvas';
import ButtonComponent from './ButtonComponent';

const GeneratePdf = ({elementId, date, reportTitle}) => {
  const [showPreview, setShowPreview] = useState(false);
  const [graphImages, setGraphImages] = useState([]);

  const convertGraphsToImage = async () => {
    const graphs = document.querySelectorAll(`.${elementId}`);

    if (graphs.length > 0) {
      const images = [];

      for (const graph of graphs) {
        try {
          const canvas = await html2canvas(graph, { scale: 2 });
          const imgData = canvas.toDataURL('image/jpg');
          images.push(imgData); // Add image data to the list
        } catch (error) {
          console.error('Error capturing image:', error);
        }
      }

      setGraphImages(images); // Update state with all generated images
      setShowPreview(true); // Show the preview

    } else {
      console.warn('No graph containers found.');
    }
  }

  return (
    <div className='generate-pdf'>
      <i className="generate-pdf__icon fa-solid fa-file-arrow-down" title='Generate Preview' onClick={convertGraphsToImage}></i>

      {
        showPreview && <Preview graphs={graphImages} date={date} closePreview={() => setShowPreview(false)} setShowPreview={setShowPreview} reportTitle={reportTitle}/>
      }
    </div>
  )
}

export default GeneratePdf



export const Preview = ({graphs, closePreview, date, setShowPreview, reportTitle}) => {
  const generatePdf = () => {
    let footer = document.querySelector(`.preview__footer`);
    const previewElement = document.getElementById('preview-body');
    const previewContainer = document.querySelector('.preview__graphs-container');
    const closeIcon = document.querySelector('.preview__close-icon');


    if (previewElement) {
      footer.style.display = 'none';  
      previewContainer.style.height = '150vh';
      closeIcon.style.display = 'none';
      previewElement.style.margin = '10px';

      html2pdf()
        .from(previewElement) // Convert the element with id 'preview-body' to PDF
        .save(`Inventory_Reports_${date}.pdf`);
        
    } else {
      console.error('Preview element not found!');
    }
    
    setTimeout(() => {
      footer.style.display = 'flex';
      previewContainer.style.height = '75vh';
      closeIcon.style.display = 'block';
      previewElement.style.margin = '';
    }, 500)
    
    setShowPreview(false);
  };

  return (
    <div className='preview'>
      <div className='preview__container'>
        <div className='preview__header'>

        </div>

        <div className="preview__body" id='preview-body'>
          <div className='preview__title-wrapper'>
            <h3>{reportTitle} Preview </h3>
            <p>{date}</p>
            <i className="preview__close-icon fa-solid fa-xmark" title='Close Preview' onClick={closePreview}></i>
          </div>

          <div className='preview__graphs-container'>
            {
              graphs && graphs.length > 0 ? (
                graphs.map((imgSrc, index) => (
                  <div className='preview__graphs-wrapper' key={index}>
                    <img  
                      src={imgSrc}
                      alt={`Graph Preview ${index + 1}`}
                      className="preview__image"
                    />
                  </div>
                ))
              ) : (
                <p>No graphs to preview</p>
              )
            }
          </div>

          <div className='preview__footer'>
            <ButtonComponent label='Print' onClick={generatePdf} />
            <ButtonComponent label='Cancel' onClick={closePreview} />
          </div>
         
        </div>
      </div>
    </div>
  )
}