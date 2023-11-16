import React from "react";
import TodayForecast from "./TodayForecast";
import TripCountdown from "./TripCountdown";
import { socialLogin } from "../../app/firebase/firebaseService";

const Forecast = () => {
  return (
    <article className="forecast">
      <img src="/images/avatar.png" alt="avatar" className="avatar" onClick={() => socialLogin()}/>
      <section className="x1">
        <div className="cloud" />
      </section>
      <TodayForecast />
      <TripCountdown />
      <section className="x2">
        <div className="cloud" />
      </section>
    </article>
  );
};

export default Forecast;
