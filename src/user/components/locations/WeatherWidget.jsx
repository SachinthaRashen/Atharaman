// import React, { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight, Sun, Cloud, CloudRain, SunSnow as Snow, Wind, Eye, Droplets, Thermometer } from 'lucide-react';
// import styles from '../../styles/WeatherWidget.module.css';

// const WeatherWidget = ({ location }) => {
//   const [currentWeekIndex, setCurrentWeekIndex] = useState(1); // 0: previous week, 1: current week, 2: next week
//   const [selectedDay, setSelectedDay] = useState(0);

//   // Mock weather data - replace with real API later
//   const generateWeatherData = (weekOffset = 0) => {
//     const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//     const weatherTypes = ['sunny', 'cloudy', 'rainy', 'snowy', 'windy'];
//     const weatherIcons = {
//       sunny: Sun,
//       cloudy: Cloud,
//       rainy: CloudRain,
//       snowy: Snow,
//       windy: Wind
//     };

//     return Array.from({ length: 7 }, (_, i) => {
//       const date = new Date();
//       date.setDate(date.getDate() + (weekOffset * 7) + i);
//       const weatherType = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
      
//       return {
//         day: days[date.getDay()],
//         date: date.getDate(),
//         month: date.toLocaleDateString('en', { month: 'short' }),
//         weather: weatherType,
//         icon: weatherIcons[weatherType],
//         temp: Math.floor(Math.random() * 20) + 15,
//         humidity: Math.floor(Math.random() * 40) + 40,
//         windSpeed: Math.floor(Math.random() * 15) + 5,
//         visibility: Math.floor(Math.random() * 5) + 5,
//         description: weatherType === 'sunny' ? 'Clear sky' : 
//                     weatherType === 'cloudy' ? 'Partly cloudy' :
//                     weatherType === 'rainy' ? 'Light rain' :
//                     weatherType === 'snowy' ? 'Light snow' : 'Windy'
//       };
//     });
//   };

//   const [weatherData, setWeatherData] = useState(generateWeatherData(currentWeekIndex - 1));

//   useEffect(() => {
//     setWeatherData(generateWeatherData(currentWeekIndex - 1));
//   }, [currentWeekIndex]);

//   const goToPreviousWeek = () => {
//     if (currentWeekIndex > 0) {
//       setCurrentWeekIndex(currentWeekIndex - 1);
//       setSelectedDay(0);
//     }
//   };

//   const goToNextWeek = () => {
//     if (currentWeekIndex < 2) {
//       setCurrentWeekIndex(currentWeekIndex + 1);
//       setSelectedDay(0);
//     }
//   };

//   const getWeekTitle = () => {
//     if (currentWeekIndex === 0) return 'Previous Week';
//     if (currentWeekIndex === 1) return 'This Week';
//     return 'Next Week';
//   };

//   const selectedDayData = weatherData[selectedDay];
//   const WeatherIcon = selectedDayData.icon;

//   return (
//     <div className={`bg-white rounded-2xl shadow-lg p-6 ${styles.weatherWidget}`}>
//       <div className={`flex items-center justify-between mb-6 ${styles.animateSlideInDown}`}>
//         <h3 className="text-xl font-semibold text-gray-900">Weather Forecast</h3>
//         <div className="flex items-center space-x-2">
//           <button
//             onClick={goToPreviousWeek}
//             disabled={currentWeekIndex === 0}
//             className={`p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all ${styles.weekNavButton}`}
//           >
//             <ChevronLeft size={16} />
//           </button>
//           <span className="text-sm font-medium text-gray-600 min-w-[100px] text-center">
//             {getWeekTitle()}
//           </span>
//           <button
//             onClick={goToNextWeek}
//             disabled={currentWeekIndex === 2}
//             className={`p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all ${styles.weekNavButton}`}
//           >
//             <ChevronRight size={16} />
//           </button>
//         </div>
//       </div>

//       {/* Current Day Weather */}
//       <div className={`bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white mb-6 ${styles.currentWeather} ${styles.animateSlideInUp}`}>
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="flex items-center space-x-3 mb-2">
//               <WeatherIcon size={32} className={`${styles.weatherIcon} ${styles[`animate${selectedDayData.weather}`]}`} />
//               <div>
//                 <h4 className="text-lg font-semibold">
//                   {selectedDayData.day}, {selectedDayData.month} {selectedDayData.date}
//                 </h4>
//                 <p className="text-blue-100 text-sm">{selectedDayData.description}</p>
//               </div>
//             </div>
//           </div>
//           <div className="text-right">
//             <div className={`text-3xl font-bold ${styles.temperature}`}>
//               {selectedDayData.temp}°C
//             </div>
//           </div>
//         </div>

//         {/* Weather Details */}
//         <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-white/20">
//           <div className={`text-center ${styles.weatherDetail}`}>
//             <Droplets size={16} className="mx-auto mb-1 text-blue-200" />
//             <div className="text-xs text-blue-200">Humidity</div>
//             <div className="font-semibold">{selectedDayData.humidity}%</div>
//           </div>
//           <div className={`text-center ${styles.weatherDetail}`}>
//             <Wind size={16} className="mx-auto mb-1 text-blue-200" />
//             <div className="text-xs text-blue-200">Wind</div>
//             <div className="font-semibold">{selectedDayData.windSpeed} km/h</div>
//           </div>
//           <div className={`text-center ${styles.weatherDetail}`}>
//             <Eye size={16} className="mx-auto mb-1 text-blue-200" />
//             <div className="text-xs text-blue-200">Visibility</div>
//             <div className="font-semibold">{selectedDayData.visibility} km</div>
//           </div>
//         </div>
//       </div>

//       {/* 7-Day Forecast */}
//       <div className={`${styles.animateSlideInUp} ${styles.animateStagger1}`}>
//         <h4 className="text-sm font-semibold text-gray-700 mb-3">7-Day Forecast</h4>
//         <div className="grid grid-cols-7 gap-1">
//           {weatherData.map((day, index) => {
//             const DayIcon = day.icon;
//             return (
//               <button
//                 key={index}
//                 onClick={() => setSelectedDay(index)}
//                 className={`p-3 rounded-lg text-center transition-all duration-200 ${
//                   selectedDay === index
//                     ? 'bg-blue-500 text-white shadow-lg scale-105'
//                     : 'hover:bg-gray-100 text-gray-700'
//                 } ${styles.dayButton} ${styles.animateSlideInCard}`}
//                 style={{ animationDelay: `${index * 0.1}s` }}
//               >
//                 <div className="text-xs font-medium mb-1">{day.day}</div>
//                 <DayIcon 
//                   size={20} 
//                   className={`mx-auto mb-1 ${styles.dayIcon} ${styles[`animate${day.weather}`]}`} 
//                 />
//                 <div className="text-xs font-semibold">{day.temp}°</div>
//               </button>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WeatherWidget;


import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sun, Cloud, CloudRain, SunSnow as Snow, Wind, Eye, Droplets } from 'lucide-react';
import styles from '../../styles/WeatherWidget.module.css';

const WeatherWidget = ({ location }) => {
  const [currentWeekIndex, setCurrentWeekIndex] = useState(1); // 0: previous, 1: current, 2: next
  const [selectedDay, setSelectedDay] = useState(0);
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);

  const weatherIcons = {
    Clear: Sun,
    Clouds: Cloud,
    Rain: CloudRain,
    Snow: Snow,
    Wind: Wind
  };

  useEffect(() => {
    const fetchWeather = async () => {
      if (!location?.latitude || !location?.longitude) return;

      try {
        setLoading(true);
        const apiKey = "cafdfa49dd82a8f2ba489c9ed2ea11ac"; // replace with your OpenWeather API key
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${location.latitude}&lon=${location.longitude}&units=metric&appid=${apiKey}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data?.list) {
          // Group forecast by day
          const daysMap = {};
          data.list.forEach(entry => {
            const date = new Date(entry.dt * 1000);
            const dayKey = date.toLocaleDateString("en", { weekday: "short", month: "short", day: "numeric" });

            if (!daysMap[dayKey]) {
              daysMap[dayKey] = {
                date: date.getDate(),
                day: date.toLocaleDateString("en", { weekday: "short" }),
                month: date.toLocaleDateString("en", { month: "short" }),
                temps: [],
                humidities: [],
                winds: [],
                weather: entry.weather[0].main,
                description: entry.weather[0].description,
              };
            }

            daysMap[dayKey].temps.push(entry.main.temp);
            daysMap[dayKey].humidities.push(entry.main.humidity);
            daysMap[dayKey].winds.push(entry.wind.speed);
          });

          const formatted = Object.values(daysMap).slice(0, 5).map(day => {
            const weatherKey = day.weather.charAt(0).toUpperCase() + day.weather.slice(1);
            const Icon = weatherIcons[day.weather] || Cloud;
            return {
              day: day.day,
              date: day.date,
              month: day.month,
              weather: weatherKey,
              icon: Icon,
              temp: Math.round(day.temps.reduce((a, b) => a + b, 0) / day.temps.length),
              humidity: Math.round(day.humidities.reduce((a, b) => a + b, 0) / day.humidities.length),
              windSpeed: Math.round(day.winds.reduce((a, b) => a + b, 0) / day.winds.length),
              visibility: 10,
              description: day.description,
            };
          });

          setWeatherData(formatted);
          setSelectedDay(0);
        }
      } catch (error) {
        console.error("Error fetching weather:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [location]);

  const goToPreviousWeek = () => {
    if (currentWeekIndex > 0) {
      setCurrentWeekIndex(currentWeekIndex - 1);
      setSelectedDay(0);
    }
  };

  const goToNextWeek = () => {
    if (currentWeekIndex < 2) {
      setCurrentWeekIndex(currentWeekIndex + 1);
      setSelectedDay(0);
    }
  };

  const getWeekTitle = () => {
    if (currentWeekIndex === 0) return "Previous Week";
    if (currentWeekIndex === 1) return "This Week";
    return "Next Week";
  };

  if (loading) {
    return (
      <div className={`bg-white rounded-2xl shadow-lg p-6 ${styles.weatherWidget}`}>
        <p className="text-center text-gray-500">Loading weather...</p>
      </div>
    );
  }

  if (!weatherData.length) {
    return (
      <div className={`bg-white rounded-2xl shadow-lg p-6 ${styles.weatherWidget}`}>
        <p className="text-center text-gray-500">No weather data available</p>
      </div>
    );
  }

  const selectedDayData = weatherData[selectedDay];
  const WeatherIcon = selectedDayData.icon;

  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 ${styles.weatherWidget}`}>
      {/* Header */}
      <div className={`flex items-center justify-between mb-6 ${styles.animateSlideInDown}`}>
        <h3 className="text-xl font-semibold text-gray-900">Weather Forecast</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={goToPreviousWeek}
            disabled={currentWeekIndex === 0}
            className={`p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all ${styles.weekNavButton}`}
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-sm font-medium text-gray-600 min-w-[100px] text-center">
            {getWeekTitle()}
          </span>
          <button
            onClick={goToNextWeek}
            disabled={currentWeekIndex === 2}
            className={`p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all ${styles.weekNavButton}`}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Current Day Weather */}
      <div className={`bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white mb-6 ${styles.currentWeather} ${styles.animateSlideInUp}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 mb-2">
            <WeatherIcon size={32} className={`${styles.weatherIcon} ${styles[`animate${selectedDayData.weather}`]}`} />
            <div>
              <h4 className="text-lg font-semibold">
                {selectedDayData.day}, {selectedDayData.month} {selectedDayData.date}
              </h4>
              <p className="text-blue-100 text-sm">{selectedDayData.description}</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-3xl font-bold ${styles.temperature}`}>
              {selectedDayData.temp}°C
            </div>
          </div>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-white/20">
          <div className={`text-center ${styles.weatherDetail}`}>
            <Droplets size={16} className="mx-auto mb-1 text-blue-200" />
            <div className="text-xs text-blue-200">Humidity</div>
            <div className="font-semibold">{selectedDayData.humidity}%</div>
          </div>
          <div className={`text-center ${styles.weatherDetail}`}>
            <Wind size={16} className="mx-auto mb-1 text-blue-200" />
            <div className="text-xs text-blue-200">Wind</div>
            <div className="font-semibold">{selectedDayData.windSpeed} km/h</div>
          </div>
          <div className={`text-center ${styles.weatherDetail}`}>
            <Eye size={16} className="mx-auto mb-1 text-blue-200" />
            <div className="text-xs text-blue-200">Visibility</div>
            <div className="font-semibold">{selectedDayData.visibility} km</div>
          </div>
        </div>
      </div>

      {/* 5-Day Forecast */}
      <div className={`${styles.animateSlideInUp} ${styles.animateStagger1}`}>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">5-Day Forecast</h4>
        <div className="grid grid-cols-5 gap-1">
          {weatherData.map((day, index) => {
            const DayIcon = day.icon;
            return (
              <button
                key={index}
                onClick={() => setSelectedDay(index)}
                className={`p-3 rounded-lg text-center transition-all duration-200 ${
                  selectedDay === index
                    ? "bg-blue-500 text-white shadow-lg scale-105"
                    : "hover:bg-gray-100 text-gray-700"
                } ${styles.dayButton} ${styles.animateSlideInCard}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-xs font-medium mb-1">{day.day}</div>
                <DayIcon size={20} className={`mx-auto mb-1 ${styles.dayIcon} ${styles[`animate${day.weather}`]}`} />
                <div className="text-xs font-semibold">{day.temp}°</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;


