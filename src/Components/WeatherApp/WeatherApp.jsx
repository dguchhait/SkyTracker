import React, { useState } from 'react';
import './WeatherApp.css';


import search_icon from "../assests/search.png";
import clear_icon from "../assests/clear.png";
import cloud_icon from "../assests/cloud.png";
import drizzle_icon from "../assests/drizzle.png";
import rain_icon from "../assests/rain.png";
import snow_icon from "../assests/snow.png";
import wind_icon from "../assests/wind.png";
import humidity_icon from "../assests/humidity.png";


const WeatherApp = () => {

  let api_key = "94a853de2bdef0215517416a5f11fc3e";

  const [wicon, setWicon] = useState(cloud_icon);

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&APPID=${api_key}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const humidity = document.getElementsByClassName("humidity-percent");
      const wind = document.getElementsByClassName("wind-rate");
      const temprature = document.getElementsByClassName("weather-temp");
      const location = document.getElementsByClassName("weather-location");

      humidity[0].innerHTML = data.main.humidity + " %";
      wind[0].innerHTML = Math.floor(data.wind.speed) + " km/h";
      temprature[0].innerHTML = Math.floor(data.main.temp) + "°C";
      location[0].innerHTML = data.name;

      if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
        setWicon(clear_icon);
      }
      else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
        setWicon(cloud_icon);
      }
      else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
        setWicon(drizzle_icon);
      }
      else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
        setWicon(drizzle_icon);
      }
      else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
        setWicon(rain_icon);
      }
      else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
        setWicon(rain_icon);
      }
      else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
        setWicon(snow_icon);
      }
      else {
        setWicon(clear_icon);
      }
    }
    catch (error) {
      console.error('Error fetching weather data:,error');
    }
  }
  return (
    <div className='container'>
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder='Search' />
        <div className="search-icon" onClick={() => { search() }}>
          <img src={search_icon} alt="" />
        </div>
      </div>
      <div className="weather-image">
        <img src={cloud_icon} alt="" />
      </div>
      <div className="weather-temp"> 0°C</div>
      <div className="weather-location">Location</div>
      <div className=" data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent">0%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="wind-rate">0km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
      <h2>Made By ❤ Debanjan </h2>
    </div>
  )
}

export default WeatherApp
