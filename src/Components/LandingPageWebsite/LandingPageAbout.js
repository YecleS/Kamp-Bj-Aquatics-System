import React from 'react';
import './LandingPageStyles/LandingPageAbout.css';
import AboutUsImg from '../Assets/about-us-img.png';
import LandingPageSectionComponent from './LandingPageComponents/LandingPageSectionComponent';
import LandingPageButton from './LandingPageComponents/LandingPageButton';
import { useNavigate } from 'react-router-dom';

const LandingPageAbout = () => {
  const navigate = useNavigate();

  return (
    <LandingPageSectionComponent 
        sectionId='about-us-section'
        sectionTitle="About Us"
        sectionSubtitle="Get To Know Us"
    >
      <div className='landing-page-about__content-wrapper'>
        <div className='landing-page-about__img-wrapper'>
          <img src={AboutUsImg} alt='about us image' className='landing-page-about__img' />
        </div>
        <div className='landing-page-about__details-wrapper'>
          <div className='landing-page-about__text-box-wrapper'>
            <p className='landing-page-about__title'>Greetings</p>
            <p className='landing-page-about__description'>Welcome to Kamp BJ Aquatics, your ultimate destination for all things aquatic. Striving to be a one-stop shop for your aquatic pet needs, we are passionate about providing you with the finest selection of fish, plants, and equipment to create and maintain your underwater oasis.</p>
          </div>
          <div className='landing-page-about__text-box-wrapper'>
            <p className='landing-page-about__title'>Our Mission</p>
            <p className='landing-page-about__description'>At Kamp BJ Aquatics, our mission is to support and inspire aquatic enthusiasts of all levels. Whether you're a seasoned aquarist or just starting your journey, we offer a wide range of high-quality products and expert advice to ensure the health and happiness of your aquatic pets.</p>
          </div>
          <div className='landing-page-about__button-wrapper'>
            <LandingPageButton label='Reach Out' varietyClass='landing-page-about__reach-out' onClick={() => navigate('/contacts')}/>
          </div>
        </div>
      </div>
    </LandingPageSectionComponent>
  )
}

export default LandingPageAbout
