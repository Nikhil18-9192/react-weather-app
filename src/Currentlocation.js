import React,{useEffect,useState} from 'react'
import Forcast from './Forcast';

function Currentlocation({location}) {
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    
    useEffect(() => {
        // Function to update time and date
        const updateTimeAndDate = () => {
          const now = new Date();
    
          // Format time as hh:mm:ss
          const hours = String(now.getHours()).padStart(2, "0");
          const minutes = String(now.getMinutes()).padStart(2, "0");
          const seconds = String(now.getSeconds()).padStart(2, "0");
          const currentTime = `${hours}:${minutes}:${seconds}`;
    
          // Format date as day, date month year
          const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
          const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
          const currentDay = days[now.getDay()];
          const currentDate = now.getDate();
          const currentMonth = months[now.getMonth()];
          const currentYear = now.getFullYear();
          const currentDateFormatted = `${currentDay}, ${currentDate} ${currentMonth} ${currentYear}`;
    
          setTime(currentTime);
          setDate(currentDateFormatted);
        };
    
        // Update time and date every second
        const interval = setInterval(updateTimeAndDate, 1000);
    
        // Clear interval when component unmounts
        return () => clearInterval(interval);
      }, []);
  return (
    <div className='currentlocation'>
        
        <div className="left">
            <div className="top">
                <p className='city'>{location.city}</p>
                <p className='country'>{location.country}</p>
            </div>
            <div className="bottom">
                <div className="time_date">
                    <p className='time'>{time}</p>
                    <p className='date'>{date}</p>
                </div>
                <div className="temp">
                    <p>{location.temperatureC.toString().substring(0,2)}°<span>C</span></p>
                </div>
            </div>
        </div>
        <div className="right">
            <Forcast  location={location} />
        </div>
    </div>
  )
}

export default Currentlocation