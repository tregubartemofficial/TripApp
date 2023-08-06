import React from 'react'
import { useSelector } from 'react-redux';

const WeekForecast = () => {
  const { weekWeather} = useSelector(state => state.weather)
    return (
      <ul style={{ display: "flex", flexWrap: 'wrap', padding: "0" }}>
        {weekWeather?.days?.map((day) => {
          return (
            <li
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                maxWidth: "100px",
              }}
              key={day.datetime}
            >
              <p style={{ color: "var(--font-color-secondary)" }}>
                {new Date(day.datetime).toLocaleDateString("en-us", {
                  weekday: "long",
                })}
              </p>
              <img
                src={`/images/weather/animated/${day.icon}.svg`}
                alt={`${day.icon} icon`}
                className="weatherIcon"
              />

              <p style={{ color: "var(--font-color-secondary)" }}>
                {day.tempmax}&deg;/{day.tempmin}&deg;
              </p>
            </li>
          );
        })}
      </ul>
    );
}

export default WeekForecast