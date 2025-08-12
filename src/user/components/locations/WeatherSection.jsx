import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Thermometer, Droplets, Wind } from 'lucide-react';

export const WeatherSection = ({ weatherData }) => {
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);
  
  const todayIndex = Math.floor(weatherData.length / 2);
  
  const nextWeek = () => {
    setCurrentWeekOffset(prev => Math.min(prev + 1, 2));
  };

  const prevWeek = () => {
    setCurrentWeekOffset(prev => Math.max(prev - 1, -2));
  };

  const getVisibleWeather = () => {
    const centerIndex = todayIndex + (currentWeekOffset * 7);
    const start = Math.max(0, centerIndex - 3);
    const end = Math.min(weatherData.length, start + 7);
    return weatherData.slice(start, end);
  };

  const getCurrentWeather = () => {
    const centerIndex = todayIndex + (currentWeekOffset * 7);
    return weatherData[Math.max(0, Math.min(centerIndex, weatherData.length - 1))];
  };

  const getWeekLabel = () => {
    if (currentWeekOffset === 0) return "This Week";
    if (currentWeekOffset === -1) return "Last Week";
    if (currentWeekOffset === 1) return "Next Week";
    if (currentWeekOffset === -2) return "2 Weeks Ago";
    if (currentWeekOffset === 2) return "2 Weeks Ahead";
    return "Weather Forecast";
  };

  const visibleWeather = getVisibleWeather();
  const currentWeather = getCurrentWeather();
  const centerDayIndex = Math.floor(visibleWeather.length / 2);

  return (
    <div className="bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 -left-8 w-16 h-16 bg-white/5 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-4 right-1/3 w-8 h-8 bg-white/10 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold flex items-center space-x-2">
            <span>🌤️</span>
            <span>{getWeekLabel()}</span>
          </h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={prevWeek}
              disabled={currentWeekOffset <= -2}
              className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
                currentWeekOffset <= -2 
                  ? 'bg-white/10 text-white/50 cursor-not-allowed' 
                  : 'bg-white/20 hover:bg-white/30'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextWeek}
              disabled={currentWeekOffset >= 2}
              className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
                currentWeekOffset >= 2 
                  ? 'bg-white/10 text-white/50 cursor-not-allowed' 
                  : 'bg-white/20 hover:bg-white/30'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-3 mb-6">
          {visibleWeather.map((weather, index) => {
            const isCurrentDay = index === centerDayIndex && currentWeekOffset === 0;
            const isCenterDay = index === centerDayIndex;
            
            return (
              <div
                key={index}
                className={`bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center transition-all duration-300 transform hover:scale-105 ${
                  isCurrentDay ? 'ring-2 ring-yellow-300 scale-105 bg-white/30' : 
                  isCenterDay ? 'ring-2 ring-white/50 scale-105' : ''
                }`}
              >
                <div className="text-3xl mb-2 animate-bounce" style={{ animationDelay: `${index * 0.1}s` }}>
                  {weather.icon}
                </div>
                
                <div className="text-sm font-medium mb-1">
                  {isCurrentDay ? 'Today' : new Date(weather.date).toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                
                <div className="text-2xl font-bold mb-2">
                  {weather.temperature}°C
                </div>
                
                <div className="text-xs text-white/80 capitalize mb-2">
                  {weather.condition}
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex items-center justify-center space-x-1">
                    <Droplets className="w-3 h-3" />
                    <span>{weather.humidity}%</span>
                  </div>
                  <div className="flex items-center justify-center space-x-1">
                    <Wind className="w-3 h-3" />
                    <span>{weather.windSpeed}km/h</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-semibold mb-1">
                {currentWeekOffset === 0 ? 'Current Weather' : 'Selected Period Weather'}
              </h4>
              <p className="text-white/80">
                {currentWeekOffset === 0 
                  ? 'Perfect tropical conditions for exploring!' 
                  : `Weather conditions for ${getWeekLabel().toLowerCase()}`
                }
              </p>
              <div className="flex items-center space-x-4 mt-2 text-sm">
                <div className="flex items-center space-x-1">
                  <Thermometer className="w-4 h-4" />
                  <span>Feels like {currentWeather.temperature + Math.floor(Math.random() * 5 - 2)}°C</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Droplets className="w-4 h-4" />
                  <span>Humidity {currentWeather.humidity}%</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Wind className="w-4 h-4" />
                  <span>Wind {currentWeather.windSpeed}km/h</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-6xl mb-2 animate-pulse">{currentWeather.icon}</div>
              <div className="text-4xl font-bold">{currentWeather.temperature}°C</div>
              <div className="text-white/80 capitalize">{currentWeather.condition}</div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-4 space-x-2">
          {[-2, -1, 0, 1, 2].map((offset) => (
            <button
              key={offset}
              onClick={() => setCurrentWeekOffset(offset)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentWeekOffset === offset
                  ? 'bg-white scale-125'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};