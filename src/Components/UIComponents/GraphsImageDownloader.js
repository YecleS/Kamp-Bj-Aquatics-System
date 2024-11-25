import React, { useState } from 'react';
import '../Styles/GraphsImageDownloader.css';
import html2canvas from 'html2canvas';

const GraphsImageDownloader = ({elementId}) => {
  const [isVisible, isSetVisible] = useState(false);

  const downloadImageAsPng = async () => {
    const element = document.getElementById(elementId);
    const dropdown = document.querySelector('.graphs-image-download__dropdown');

    if (element) {
      try {
        dropdown.style.display = 'none';
        // Capture the element as a canvas
        const canvas = await html2canvas(element, { scale: 2 }); // Adjust scale for better quality
        const imgData = canvas.toDataURL('image/png'); // Get image data as PNG (can change to 'image/jpeg' for JPG)

        // Create an invisible link element to trigger the download
        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'graph.png'; // You can change the filename here
        link.click(); // Trigger the download

        dropdown.style.display = 'block';
      } catch (error) {
        console.error('Error capturing image:', error);
      }
    }

  };

  const downloadImageAsJpg = async () => {
    const element = document.getElementById(elementId);
    const dropdown = document.querySelector('.graphs-image-download__dropdown');

    if (element) {
      try {
        dropdown.style.display = 'none';
        // Capture the element as a canvas
        const canvas = await html2canvas(element, { scale: 2 }); // Adjust scale for better quality
        const imgData = canvas.toDataURL('image/jpg'); // Get image data as PNG (can change to 'image/jpeg' for JPG)

        // Create an invisible link element to trigger the download
        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'graph.jpg'; // You can change the filename here
        link.click(); // Trigger the download

        dropdown.style.display = 'block';
      } catch (error) {
        console.error('Error capturing image:', error);
      }
    }

  };
  
  return (
    <div className='graphs-image-downloader' onMouseEnter={() => isSetVisible(true)} onMouseLeave={() => isSetVisible(false)}>
      <i className="graphs-image-downloader__icon fa-solid fa-file-arrow-down"></i>
        { isVisible && (
          <div className='graphs-image-download__dropdown'>
            <li className='graphs-image-download__li' onClick={downloadImageAsPng}>Download as PNG</li>
            <li className='graphs-image-download__li' onClick={downloadImageAsJpg}>Download as JPG</li>
          </div>
        )}
    </div>
  )
}

export default GraphsImageDownloader
