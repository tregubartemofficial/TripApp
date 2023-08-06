import React from "react";
import TodayForecast from "./TodayForecast";
import TripCountdown from "./TripCountdown";

const Forecast = () => {
  return (
    <article className="forecast">
      <div>
        <img src="/images/avatar.png" alt="avatar" className="avatar" />
      </div>
      <div className="x1">
        <div className="cloud" />
      </div>
      <TodayForecast />
      <TripCountdown />
      <div className="x2">
        <div className="cloud" />
      </div>
    </article>
  );
};

export default Forecast;
