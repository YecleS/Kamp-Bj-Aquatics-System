import React from 'react';
import LandingPageHero from './LandingPageHero';
import LandingPageAbout from './LandingPageAbout';
import LandingPageOffers from './LandingPageOffers';
import LandingPageFeaturedProducts from './LandingPageFeaturedProducts';
import LandingPageTestimonials from './LandingPageTestimonials';
import ScrollToTop from '../Utils/ScrollToTop'

const LandingPageHome = () => {
  //Scroll to top upon navigating to this component
  ScrollToTop();

  return (
    <div>
        <LandingPageHero />
        <LandingPageAbout />
        <LandingPageOffers />
        <LandingPageFeaturedProducts />
        <LandingPageTestimonials />
    </div>
  )
}

export default LandingPageHome
