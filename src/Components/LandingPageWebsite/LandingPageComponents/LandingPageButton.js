import React from 'react';
import '../LandingPageStyles/LandingPageButton.css'

const LandingPageButton = ({label, varietyClass, onClick}) => {
  return (
    <button className={`landing-page-button ${varietyClass}`} onClick={onClick}>{label}</button>
  )
}

export default LandingPageButton
