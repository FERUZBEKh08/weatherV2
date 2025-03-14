import { useState, useEffect } from "react";
import "./App.css";

import search from "../src/photos/search.png";
import local from "../src/photos/pin.png";

import temprature from "../src/photos/temperature.png";
import cloud from "../src/photos/cloud.png";

import humidity from "../src/photos/water-drop.png";
import pressure from "../src/photos/barometer.png";
import sunrise from "../src/photos/sunrise.png";
import sunset from "../src/photos/sunset (1).png";
import wind from "../src/photos/wind.png";
import visibility from "../src/photos/visibility.png";

export default function App() {
  const [api, setApi] = useState("");
  const [Cvalue, setCvalue] = useState("");
  const [data, setData] = useState(null);
  const [see, setSee] = useState(false);

  const [condition, setCondition] = useState("");

  const [error, setError] = useState("");



  const [dates, setDates] = useState("");


useEffect(() => { 
  const seew = {
    Clear: "Havo ochiq",
    Clouds: "Bulutli",
    Rain: "Yomg'ir",
    Drizzle: "Mayda yomg'ir",
    Thunderstorm: "Momaqaldiroq",
    Snow: "Qor",
    Mist: "Tuman",
    Smoke: "Tutun",
    Haze: "Tuman",
    Dust: "Chang",
    Fog: "Tuman",
    Sand: "Qum",
    Ash: "Kul",
    Squall: "Bo'ron",
    Tornado: "Tornado",
  }
  
  if (data && data.weather && data.weather[0]) {
    setCondition(seew[data.weather[0].main] || "Noma'lum");
  }
}, [data]);

  

  const city = () => {
    const cityName = Cvalue.toLowerCase();
    const webLink = "https://api.openweathermap.org/data/2.5/weather";
    const key = "651f4facecfe9d04168b0fe90783eb65";
    const queryParams = `?q=${cityName}&units=metric&appid=${key}`;
    setApi(webLink + queryParams);
    setSee(true);
    //
    console.log(dates);
    //
  };

const func = (event) => {
  if (event.key === "Enter") {
      city();
  }
}
  useEffect(() => {
    if (api) {
      console.log("API Link:", api);
  
      fetch(api)
        .then((response) => response.json())
        .then((data) => {
          if (data.cod === "404") {
            setError("Shahar topilmadi, qayta urinib ko‘ring!");
            setData(null); // Ma’lumotni tozalaymiz
          } else {
            setData(data);
            setError(""); // Xatoni tozalaymiz
            setDates(() => {
              const localTime = new Date(new Date().getTime() + data.timezone * 2400);
              return `${localTime.toLocaleString().slice(0, 9)}`;
            });
          }
        })
        .catch((error) => {
          console.error("Xatolik:", error);
          setError("Ma'lumot olishda xatolik yuz berdi!");
        });
    }
  }, [api]);
  


  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000); // Millisekundga o‘tkazish
    return date.toLocaleTimeString("uz-UZ", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <div className="container">
      <div className="Incont">
      <div className="top">
        <h1 className="weatherTop">Ob Havo</h1>

        <div>
          <input
            className="wInput"
            type="text"
            placeholder="Shahar nomini kiriting..."
            onChange={(e) => setCvalue(e.target.value)}
            onKeyDown={func}
          />
          <button onClick={city} className="btn">
            <img className="imgBtn" src={search} alt="" />
          </button>
        </div>
      </div>
      <div className="center">
        {see &&
          (data ? (
            <div className="in">
              <div className="one">
                <img className="local" src={local} alt="" />
                <h1>
                  {data.name}, {data.sys.country}
                </h1>
              </div>

              <div className="two">
                <img
                  src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                  alt=""
                />
                <span>
                  <h1>{String(data.main.temp).slice(0, 2).replace(".", "")}°</h1>
                  <p>{condition}</p>
                </span>
              </div>

              <div className="three">
                <span>
                  <img src={temprature} alt="" />
                  <p>
                    His qilinadi {String(data.main.feels_like).slice(0, 2).replace(".", "")}°c
                  </p>
                </span>

                <span>
                  <img src={cloud} alt="" />
                  <p>Bulutlar {String(data.clouds.all).slice(0, 2)}%</p>
                </span>
              </div>
            </div>
          ) : (
            <p></p>
          ))}
        {see &&
          (data ? (
            <div className="in2">
              <p className="Title">Bugungi tafsilotlar</p>

              <div className="bottom">
                <div>
                  <span>
                    <p>Namlik:</p>
                    <span>
                      <img src={humidity} alt="" />
                      <h1>{data.main.humidity} %</h1>
                    </span>
                  </span>

                  <span>
                    <p>Quyosh chiqishi:</p>
                    <span>
                      <img src={sunrise} alt="" />
                      <h1>{formatTime(data.sys.sunrise)}</h1>
                    </span>
                  </span>

                  <span>
                    <p>Bosim:</p>
                    <span>
                      <img src={pressure} alt="" />
                      <h1>{data.main.sea_level} hPa</h1>
                    </span>
                  </span>
                </div>

                <div>
                  <span>
                    <p>Shamol:</p>
                    <span>
                      <img src={wind} alt="" />
                      <h1>{data.wind.speed} m/s</h1>
                    </span>
                  </span>

                  <span>
                    <p>Quyosh botishi:</p>
                    <span>
                      <img src={sunset} alt="" />
                      <h1>{formatTime(data.sys.sunset)}</h1>
                    </span>
                  </span>

                  <span>
                    <p>Kurish:</p>
                    <span>
                      <img src={visibility} alt="" />
                      <h1>{data.visibility} m</h1>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <p></p>
          ))}
      </div>

        {see && (data ? 
              <div className="Boxthree">  
                <h1 className="Title">Ob-havo holati</h1>

                <div className="intwo">
                  <p>Bulutlilik: {data.clouds.all} %</p>
                  <span style={{ width: `${data?.clouds?.all}%`}}>
                    
                  </span>
                </div>

                <div className="bottom">
                  <div>
                    <p>Harorat:</p>
                    <h1>{String(data.main.temp).slice(0,2).replace(".", "")}°c</h1>
                  </div>
          
                  <div>
                    <p>His qilinishi :</p>
                    <h1>{String(data.main.feels_like).slice(0,2).replace(".", "")}°c</h1>
                  </div>

                  <div>
                    <p>Namlik :</p>
                    <h1>{String(data.main.humidity).replace(".", "")} %</h1>
                  </div>

                  <div>
                    <p>Shamol :</p>
                    <h1>{String(data.wind.speed)} m/s</h1>
                  </div>

                </div>
              </div>
        : <p></p>)}
      {error && <p className="error">{error}</p>}
      </div>


    </div>
  );
}

