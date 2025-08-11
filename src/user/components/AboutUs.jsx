import React from 'react';
import { Award, Users, Globe, Heart } from 'lucide-react';

const AboutUs = () => {
  const features = [
    {
      icon: <Award className="size-12" />,
      title: "Expert Guides",
      description: "Certified professionals with years of experience in adventure tourism"
    },
    {
      icon: <Users className="size-12" />,
      title: "Community Driven",
      description: "Join thousands of adventurers sharing experiences and creating memories"
    },
    {
      icon: <Globe className="size-12" />,
      title: "Global Destinations",
      description: "Access to exclusive locations and hidden gems around the world"
    },
    {
      icon: <Heart className="size-12" />,
      title: "Safety First",
      description: "Your safety and comfort are our top priorities in every adventure"
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Adventure camping"
              className="rounded-2xl shadow-2xl w-full h-96 object-cover animate-fade-in [animation-delay:100ms]"
              loading="lazy"
            />
            <div className="absolute -bottom-6 -right-6 size-24 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center animate-float [animation-delay:300ms]">
              <Award className="size-8 text-white" />
            </div>
          </div>

          {/* Content */}
          <div className="animate-fade-in [animation-delay:200ms]">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              About Atharaman
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              At Atharaman, we believe that every journey should be an adventure worth remembering. 
              Founded by passionate travelers and outdoor enthusiasts, we've dedicated ourselves to 
              connecting adventurers with extraordinary experiences across the globe.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Whether you're seeking the thrill of mountain peaks, the serenity of desert landscapes, 
              or the excitement of jungle expeditions, we provide everything you need for your perfect adventure.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="text-center p-6 rounded-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 animate-fade-in"
                  style={{ animationDelay: `${index * 100 + 300}ms` }}
                >
                  <div className="text-orange-500 mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;