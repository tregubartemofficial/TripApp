import React, { useState } from "react";
import WeekForecast from "./WeekForecast";
import TripManager from "./TripManager";

const Trip = () => {
  const [searchTripInput, setSearchTripInput] = useState('')
  return (
    <article
      className="wrapper trip"
    >
      <h1>Weather Forecast</h1>
      <div style={{ position: "relative" }}>
        <img className="icon" src="/images/loop.png" alt="loop" />
        <input
          type="text"
          value={searchTripInput}
          onChange={(e)=> setSearchTripInput(e.target.value)}
          placeholder="Search your trip"
          className="searchInput"
        />
      </div>
      <TripManager />
      <p>Week</p>
      <WeekForecast />
    </article>
  );
};

export default Trip;
