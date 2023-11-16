import React from 'react'
import { useSelector } from 'react-redux';

const TodayForecast = React.memo(() => {
  const { todayWeather } = useSelector((state) => state.weather);
  return (
    <article style={{ textAlign: "center" }}>
      {todayWeather?.address ? (
        <>
          <h2>{new Date().toLocaleDateString("en-us", { weekday: "long" })}</h2>
          <figure style={{ display: "flex", alignItems: "center" }}>
            <img
              src={`/images/weather/animated/${todayWeather.days[0].icon}.svg`}
              alt={`${todayWeather.days[0].icon} icon`}
              className="weatherIcon"
            />
            <figcaption style={{fontWeight: 'bold', fontSize: 'large'}}>
              <span className="temp">{todayWeather.days[0].temp}</span>
            </figcaption>
          </figure>
        </>
      ) : (
        <h3>Select a trip to see the city's weather</h3>
      )}
    </article>
  );
})

export default TodayForecast;