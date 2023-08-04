import React, { useEffect, useState } from 'react'
import axios from 'axios'
import apiKey from './apikey';
import {BsSearch, BsFillCloudHazeFill,BsFillCloudyFill,BsFillCloudLightningRainFill,BsFillCloudSnowFill,BsFillCloudSunFill,BsFillCloudDrizzleFill,BsFillCloudFog2Fill,BsFillCloudFogFill,BsTornado } from "react-icons/bs";
import { toast } from 'react-toastify';
function Forcast({location}) {
    const [query, setQuery] = useState(location.city);
    const [weather, setWeather] = useState({});

    const weatherIcons = {
        Haze: <BsFillCloudHazeFill />,
        Clouds: <BsFillCloudyFill />,
        Rain: <BsFillCloudLightningRainFill />,
        Snow: <BsFillCloudSnowFill />,
        Dust: <BsFillCloudSunFill />,
        Drizzle: <BsFillCloudDrizzleFill />,
        Fog: <BsFillCloudFog2Fill />,
        Smoke: <BsFillCloudFogFill />,
        Tornado: <BsTornado />
      };
    const search = async() => {
        await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey.key}`).then((data)=>{
            setWeather({
            temperatureC: Math.round(data.data.main.temp),
            temperatureF: Math.round(data.data.main.temp * 1.8 + 32),
            humidity: data.data.main.humidity,
            main: data.data.weather[0].main,
            city: data.data.name,
            country: data.data.sys.country,
            windSpeed: data.data.wind.speed,
            visibility: data.data.visibility
        })
        }).catch((err)=>{
            toast.error("Please enter valid city name")
        })
      
        
    }
    useEffect(() => {
        search()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[location.city])
  return (
    <div className='forecast'>
        <div className="icon">
        {weatherIcons[location.main] || <BsFillCloudHazeFill />}
        </div>
        <div className="main_status">
            <p>{location.main}</p>
        </div>
        <div className="divider"></div>
        <div className="search_input">
          <input className='search_box' spellCheck="true" type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for a city" />
          <div className="search_btn" onClick={()=> search()}>
            <BsSearch />
          </div>
        </div>
        <div className="info_container">
          <div className="city">
            <p>{weather.city} , {weather.country}</p>
            <div className="small_icon">
              {weatherIcons[weather.main] || <BsFillCloudHazeFill />}
            </div>
          </div>
          <div className="temperature">
            <p>Temperature</p>
            <p>{weather.temperatureC ? weather.temperatureC.toString().substring(0,2) : null}°C ({weather.main})</p>
          </div>
          <div className="temperature">
            <p>Humidity</p>
            <p>{weather.humidity}%</p>
          </div>
          <div className="temperature">
            <p>Visibility</p>
            <p>{weather.visibility}mi</p>
          </div>
          <div className="temperature">
            <p>Wind speed</p>
            <p>{weather.windSpeed} Km/h</p>
          </div>
        </div>
       
    </div>
  )
}

export default Forcast