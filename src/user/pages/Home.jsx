import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ProductSection from '../components/ProductSection';
import AboutUs from '../components/AboutUs';
import Footer from '../components/Footer';
import { locations, guides, shops, hotels, vehicles } from '../data/travelData';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 64; // Match your navbar height
      const elementPosition = element.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onScrollToSection={scrollToSection} />
      
      <main className="overflow-hidden">
        <Hero onScrollToSection={scrollToSection} />

        <div className="space-y-20 py-12">
          <ProductSection 
            id="locations" 
            title="Top Locations" 
            data={locations} 
            type="location" 
          />
          <ProductSection 
            id="guides" 
            title="Top Guides" 
            data={guides} 
            type="guide" 
          />
          <ProductSection 
            id="shops" 
            title="Top Shops" 
            data={shops} 
            type="shop" 
          />
          <ProductSection 
            id="hotels" 
            title="Top Hotels" 
            data={hotels} 
            type="hotel" 
          />
          <ProductSection 
            id="vehicles" 
            title="Top Vehicles" 
            data={vehicles} 
            type="vehicle" 
          />
        </div>

        <AboutUs />
      </main>

      <Footer onScrollToSection={scrollToSection} />
    </div>
  );
}

export default Home;