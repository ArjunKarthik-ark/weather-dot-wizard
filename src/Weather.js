import React, { useState, useEffect } from 'react';
import './Weather.css';
import cloudyImage from './clouds.png';
import sunnyImage from './clear.png';
import rainImage from './rain.png';
import drizzleImage from './drizzle.png';
import mistImage from './mist.png';
import TextSlider from './TextSlider'

function Weather() {
  const [currentDate, setCurrentDate] = useState('');
  
  const updateCurrentDate = () => {
    const d = new Date();
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const month = monthNames[d.getMonth()];
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const cd = hours + ':' + minutes + ' - ' + d.getDate() + ' ' + month + ' ' + d.getFullYear();
    setCurrentDate(cd);
  };
  useEffect(() => {
    
    updateCurrentDate();
    const interval = setInterval(updateCurrentDate, 60000);
    return () => clearInterval(interval);
  },[]);

  const fetchWeatherData = async (city) => {
    const apikey = 'dcfd719b67d097d130c8a6feb9b25f4d';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apikey}`;

    try {
      const response = await fetch(apiUrl);
      if (response.status===404) {
        document.querySelector(".error").style.display = 'block';
        document.querySelectorAll('.city, .temp, #currentDate, .deg-img, .weather-details, .weather-info, .ruler, .details-head')
        .forEach((element) => {
          element.style.display = 'none';
        });
      }else{
        const data = await response.json();
        console.log(data);
        document.getElementById('city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°';
        document.getElementById('humidity').innerHTML = data.main.humidity + '%';
        document.getElementById('wind').innerHTML = data.wind.speed + ' Km/h';
  
        const weatherIcon = document.querySelector('.weather-icon');
        if (data.weather[0].main === 'Clouds') {
          weatherIcon.src = cloudyImage;
        } else if (data.weather[0].main === 'Clear') {
          weatherIcon.src = sunnyImage;
        } else if (data.weather[0].main === 'Rain') {
          weatherIcon.src = rainImage;
        } else if (data.weather[0].main === 'Drizzle') {
          weatherIcon.src = drizzleImage;
        } else if (data.weather[0].main === 'Haze') {
          weatherIcon.src = mistImage;
        }
  
        document.querySelectorAll('.city, .temp, #currentDate, .deg-img, .weather-details, .weather-info, .ruler, .details-head')
          .forEach((element) => {
            element.style.display = 'block';
          });
        document.querySelector(".error").style.display = 'none';
        document.querySelector(".text-slider").style.display = 'block';
      }
     
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = () => {
    const searchInput = document.querySelector('.glassbackground input');
    fetchWeatherData(searchInput.value);
  };

  return (
    <div>
      <div className="weather-background">
        <p className="logo">weather.wizard</p>
        <h1 className="temp">16°</h1>
        <p className="city" id="city">London</p>
        <p id="currentDate">{currentDate}</p>
        <div className="deg-img">
          <img src={cloudyImage} alt="Cloudy" className="weather-icon" />
          {/* <p className='deg-text'>Cloudy</p> */}
        </div>
        <div className="glassbackground">
          <input type="text" placeholder="Location" className="location" />
          <button className="search-btn" onClick={handleSearch}>
          <i className="fa-solid fa-magnifying-glass" id='search'/>
          </button>
          <div className='error'>
            <p>Invalid City Name</p>
          </div>
          <div>
            <p className="details-head">Weather Details</p>
            <div className="weather-details">
              <div className="row-details">
                <span className="t-label">Precipitation</span>
                <span className="t-value">31%</span>
              </div>
              <div className="row-details">
                <span className="t-label">Humidity</span>
                <span className="t-value" id="humidity">57%</span>
              </div>
              <div className="row-details">
                <span className="t-label">Wind</span>
                <span className="t-value" id="wind">2 km/h</span>
              </div>
            </div>
          </div>
          <hr className="ruler" />
          <div className="weather-info">
            <p className="details-head" id='facts'>Weather Facts</p>
          </div>
          <TextSlider className="text-slider"/>
          <hr className="ruler" />
          
        </div>
      </div>
    </div>
  );
}

export default Weather;
