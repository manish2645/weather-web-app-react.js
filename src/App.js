import React, { useState } from 'react';
import './index';

const api = {
  key : "17031c8cec23d3cfc0bb4ab550bbf426",
  base : "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('');

  const search = evt => {
    if(evt.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result);
      });
    }
  }
  
  const dateBuilder = (d) => {
    let months = ["January","Febraury","March","April","May","June",
                  "July","August","September","October","November","December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  return (
      <div className={(typeof weather.main != "undefined")
       ? (weather.main.temp > 25)
        ? 'app warm' 
        : 'app' 
      : 'app'}>
          <main>
            <div className="search-box">
              <input 
                type="text" 
                className="search-bar" 
                placeholder="Search..."
                onChange={e => setQuery(e.target.value)}
                value={query}
                onKeyPress={search}
                />
            </div>
            {(typeof weather.main != "undefined") ? (

            <div>
                <div className="location-box">
                  <div className="location">{weather.name},{weather.sys.country}</div>
                  <div className="date">{dateBuilder(new Date())}</div>
                </div>
    
                <div className="weather-box">
                  <div className="temp">
                      {Math.round(weather.main.temp)}°C
                  </div>
                  <div className="weather">{weather.weather[0].main}</div>
                </div> 
                
            </div>
           ) : ('')}
          </main>
          <div className="name"><h5>By Manish Kumar Singh</h5></div>
      </div>
  );
}

export default App;
