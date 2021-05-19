import React, {useState, useEffect} from "react";
import Toggle from "./Toggle";
import Current from "./Current";

const API_KEY = process.env.REACT_APP_api_key;

const ZipBox = (props) => {

  const [hourWeather, setHourWeather] = useState([]); 
  const [hourTemps, setHourTemps] = useState([]);
  const [hourMains, setHourMains] = useState([]);
  const [dayTemps, setDayTemps] = useState([]);
  const [dayMains, setDayMains] = useState([]);
  const [dailyWeather, setDailyWeather] = useState([]);
  const [currentTemp, setCurrentTemp] = useState(0);
  const [currentMain, setCurrentMain] = useState("");

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [zipCode, setZipCode] = useState("");
  const [isZipSubmit, setIsZipSubmit] = useState(false);
  
  useEffect(() => {
    if(isZipSubmit){
    
    const urlW = new URL("https://api.openweathermap.org/data/2.5/weather");

    urlW.searchParams.append("appid", API_KEY);
    urlW.searchParams.append("zip", zipCode);
    urlW.searchParams.append("units", "imperial");
     
    fetch(urlW)
    .then((resp) => {
      return resp.json();
    })
    .then((res) => {
      if(res.cod === 200){
      setLatitude(res.coord.lat);
      setLongitude(res.coord.lon);
      }
    });
  }}, [isZipSubmit]);

  useEffect(() => {
    const urlO = new URL("https://api.openweathermap.org/data/2.5/onecall");

    urlO.searchParams.append("lat", latitude);
    urlO.searchParams.append("lon", longitude);
    urlO.searchParams.append("exclude", "minutely");
    urlO.searchParams.append("appid", API_KEY);
    urlO.searchParams.append("units", "imperial"); 

    fetch(urlO)
    .then((resp) => {
      return resp.json();
    })
    .then((obj) => {
      console.log(obj);
      // also important to check html error codes
      // 400 means errors
      if (obj.cod != 400 && isZipSubmit) {
        console.log(obj);
        setCurrentTemp(obj.current.temp);
        setCurrentMain(obj.current.weather[0].main);
        setHourWeather(obj.hourly);
        setDailyWeather(obj.daily);
     } else {
        if(isZipSubmit)
          alert("Please refresh and enter a valid ZipCode");
      }
    });
  }, [longitude, latitude]);

  useEffect(() => {
    let a = hourWeather.map(h => h.temp);
    setHourTemps(a);
    let b = hourWeather.map(h => h.weather[0].main);
    setHourMains(b);
  }, [hourWeather]);

  useEffect(() => {
    let a = dailyWeather.map(d => d.temp.day);
    setDayTemps(a);
    let b = dailyWeather.map(d => d.weather[0].main);
    setDayMains(b);
  }, [dailyWeather]);

  const onSubmit = (e) => {
    e.preventDefault();  
    setIsZipSubmit(true);
  }

  return (
    <div style={{ textAlign: "center" }}>
      {!isZipSubmit ? (
        <div className="ZipForm">
          <form onSubmit={onSubmit}>
            <h1>What's your zip?</h1>
            <p>Enter zip code:</p>
            <input
              className="zip"
              value={zipCode || ""}
              type="text"
              name="zip"
              id="zip"
              onChange={(event) => {
                const { value } = event.target;
                setZipCode(value.replace(/[^\d{5}]$/, "").substr(0, 5));
              }}
            />
          </form>
        </div>
      ) : (
        <>
          <div>
            <div className="Current">
              <Current temp={currentTemp} weather={currentMain} />
            </div>
          </div>
          <div>
            <div className="Toggle">
              <Toggle
                hourTemps={hourTemps}
                hourMains={hourMains}
                dayTemps={dayTemps}
                dayMains={dayMains}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ZipBox;