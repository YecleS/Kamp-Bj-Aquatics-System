import React from 'react';
import LandingPageHeader from './LandingPageHeader';
import { Routes, Route } from 'react-router-dom';
import LandingPageHome from './LandingPageHome';
import LandingPageProducts from './LandingPageProducts';
import LandingPageContacts from './LandingPageContacts';
import LandingPageProductView from './LandingPageProductView';
import LandingPageFooter from './LandingPageFooter';

const LandingPage = () => {
  return (
    <div>
      <header>
        <LandingPageHeader />
      </header>
      <main>
        <Routes>
          <Route path='/' element={<LandingPageHome />} />
          <Route path='/products' element={<LandingPageProducts />} />
          <Route path='/contacts' element={<LandingPageContacts />} />
          <Route path='/product-view/:productId/:productName' element={<LandingPageProductView />} />
        </Routes> 
      </main>
      <footer>
        <LandingPageFooter />
      </footer>
    </div>
  )
}

export default LandingPage
