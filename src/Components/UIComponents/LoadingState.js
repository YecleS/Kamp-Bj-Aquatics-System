import React from 'react';
import '../Styles/LoadingState.css'

const LoadingState = () => {
  return (
    <div className='loading-state'>
      <div className='loading-state__wrapper'>
        <i className="loading-state__spinner fa-solid fa-spinner"></i>
      </div>
    </div>
  )
}

export default LoadingState
