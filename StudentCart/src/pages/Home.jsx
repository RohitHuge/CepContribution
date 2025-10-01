import React from 'react';
import { AppProvider } from '../contexts/AppContext';
import Header from '../components/Header';
import Hub from '../components/Hub';
import Archives from '../components/Archives';
// import VideoSection from '../components/VideoSection';
import LoginModal from '../components/LoginModal';
import CartModal from '../components/CartModal';
import OrdersModal from '../components/OrdersModal';
import AddressModal from '../components/AddressModal';
import CheckoutModal from '../components/CheckoutModal';
import CustomCursor from '../components/CustomCursor';
import ParticleBackground from '../components/ParticleBackground';

const Home = () => {
  return (
    <AppProvider>
      <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0D0D0D] text-[#212529] dark:text-[#f7f4f4] font-['Inter'] overflow-x-hidden">
        {/* Custom Cursor */}
        <CustomCursor />
        
        {/* Particle Background */}
        <ParticleBackground />
        
        {/* Fixed Header */}
        <Header />
        
        {/* Main Content */}
        <main className="container mx-auto px-6 pt-24">
          {/* Section 1: The Hub */}
          <Hub />
          
          {/* Section 2: The Archives */}
          <Archives />
          
          {/* Section 3: Video Section - COMMENTED OUT */}
          {/* <VideoSection /> */}
        </main>
        
        {/* Modals */}
        <LoginModal />
        <CartModal />
        <OrdersModal />
        <AddressModal />
        <CheckoutModal />
      </div>
    </AppProvider>
  );
};

export default Home;
