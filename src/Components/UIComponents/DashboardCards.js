import React from 'react';
import '../Styles/DashboardCards.css';

const DashboardCards = ({ customCardsClass, icon, title, subTitle, description }) => {
  // Convert description to string
  const descriptionString = String(description);

  return (
    <div className={`dashboard-cards ${customCardsClass}`}>
        <div className='dashboard-cards__header'>
            <div className='dashboard-cards__title-wrapper'>
                <p className='dashboard-cards__card-title'>{title}</p>
                <p className='dashboard-cards__card-sub-title'>{subTitle}</p>
            </div>
            <div className='dashboard-cards__icon-wrapper'>
                <i className={`dashboard-cards__icon fa-solid ${icon}`}></i>
            </div>
        </div>
        <p className='dashboard-cards__card-description'>{descriptionString}</p>
    </div>
  )
}

export default DashboardCards;
