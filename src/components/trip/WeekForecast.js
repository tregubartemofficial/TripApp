import React from "react";
import { useSelector } from "react-redux";

const WeekForecast = () => {
  const { weekWeather } = useSelector((state) => state.weather);
  return (
    <ul className="weekForecastList">
      {weekWeather?.days?.map((day) => {
        return (
          <li key={day.datetime}>
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
};

export default WeekForecast;
