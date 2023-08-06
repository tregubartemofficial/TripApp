import React from 'react'
import { useSelector } from 'react-redux';

const TodayForecast = React.memo(() => {
  const { todayWeather } = useSelector((state) => state.weather);
  return (
    <section style={{ textAlign: "center" }}>
      {todayWeather?.address ? (
        <>
          <h1>{new Date().toLocaleDateString("en-us", { weekday: "long" })}</h1>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={`/images/weather/animated/${todayWeather.days[0].icon}.svg`}
              alt={`${todayWeather.days[0].icon} icon`}
              className="weatherIcon"
            />
            <h2>
              <span className="temp">{todayWeather.days[0].temp}</span>
            </h2>
          </div>
        </>
      ) : (
        <p>Select a trip to see the city's weather</p>
      )}
    </section>
  );
})

export default TodayForecast;