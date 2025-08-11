import React from 'react';
import { ChevronDown } from 'lucide-react';

const Hero = ({ onScrollToSection }) => {
  return (
    <section 
      id="home" 
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Lazy Loading */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)',
        }}
      >
        {/* Overlay with new opacity syntax */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 animate-fade-in [animation-delay:200ms]">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Discover Your Next
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
            Adventure
          </span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
          Explore breathtaking destinations, connect with expert guides, and create unforgettable memories with Atharaman
        </p>
        <button
          onClick={() => onScrollToSection('locations')}
          className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-orange-500/30"
          aria-label="Explore more destinations"
        >
          Explore More
        </button>
      </div>

      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
        onClick={() => onScrollToSection('locations')}
        aria-label="Scroll down"
      >
        <ChevronDown 
          className="size-8 text-white/70 hover:text-white transition-colors"
        />
      </div>

      {/* Optional: Animated gradient border */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-red-500 to-green-500 animate-gradient-x"></div>
    </section>
  );
};

export default Hero;