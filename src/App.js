import { useEffect,useState } from 'react';
import './App.scss';
import axios from 'axios';
import apiKey from './apikey';
import Currentlocation from './Currentlocation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [location , setLocation] = useState({lat:28.67, lan:77.22});
  const getPosition = (options) => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };
  const getLocation = () => {
    
    if (navigator.geolocation) {
      getPosition()
        //If user allow location service then will fetch data & send it to get-weather function.
        .then((position) => {
          getWeather(position.coords.latitude,position.coords.longitude);
        })
        .catch((err) => {
          //If user denied location service then standard location weather will le shown on basis of latitude & latitude.
         
          alert(
            "You have disabled location service. Allow 'This APP' to access your location. Your current location will be used for calculating Real time weather."
          );
        });
    } else {
      alert("Geolocation not available");
    }
  }

  const getWeather = async(lat,lon) => {
    const data = await axios.get(`${apiKey.base}/weather?lat=${lat}&lon=${lon}&appid=${apiKey.key}`);
    setLocation({
      lat: lat,
      lon: lon,
      city: data.data.name,
      temperatureC: Math.round(data.data.main.temp),
      temperatureF: Math.round(data.data.main.temp * 1.8 + 32),
      humidity: data.data.main.humidity,
      main: data.data.weather[0].main,
      country: data.data.sys.country,
    })

    
  }
 

  useEffect(() => {
    getLocation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  return (
    <div className="App">
      { location.temperatureC? (
        <Currentlocation location={location} />
      ):(
        <h1>You are not giving a location permission.</h1>
      )}
      <ToastContainer theme='dark'/>
    </div>
  );
}

export default App;
