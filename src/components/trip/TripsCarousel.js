import React, { useEffect, useState } from "react";
import RippleButton from "../button/RippleButton";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedTrip, setTrips } from "../../app/features/trip/tripReducer";
import { listenToTripsFromFirestore } from "../../app/firebase/firebaseService";
import {
  setTodayWeather,
  setWeekWeather,
} from "../../app/features/weather/weatherReducer";
import "../../styles/Carousel.css";

const apiKey = "245E45XT5YP3F2RGFTSUWZ5KB";

const TripsCarousel = ({ searchTripInput }) => {
  const [current, setCurrent] = useState(0);
  const dispatch = useDispatch();
  const { trips } = useSelector((state) => state.trips);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const searchedTrips = trips?.filter((trip) =>
    trip.city.toLowerCase().includes(searchTripInput.toLowerCase())
  );

  useEffect(() => {
    setCurrent(0);
  }, [searchTripInput]);

  useEffect(() => {
    const unsubscribe = listenToTripsFromFirestore((tripsData) => {
      dispatch(setTrips(tripsData));
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handlePrevious = () => {
    const newIndex = current - 1;
    setCurrent(newIndex < 0 ? searchedTrips?.length - 1 : newIndex);
  };

  const handleNext = () => {
    const newIndex = current + 1;
    setCurrent(newIndex >= searchedTrips?.length ? 0 : newIndex);
  };

  async function fetchWeather(city, startDate, endDate) {
    try {
      const formattedStartDate = new Date(startDate)
        .toISOString()
        .split("T")[0];
      const formattedEndDate = new Date(endDate).toISOString().split("T")[0];
      const todayWeatherResponse = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/today?unitGroup=metric&include=days&key=${apiKey}&contentType=json`
      );
      const todayWeather = await todayWeatherResponse.json();
      const weekWeatherResponse = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${formattedStartDate}/${formattedEndDate}?unitGroup=metric&include=days&key=${apiKey}&contentType=json`
      );
      const weekWeather = await weekWeatherResponse.json();
      dispatch(setWeekWeather(weekWeather));
      dispatch(setTodayWeather(todayWeather));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="tripCarousel">
      {searchedTrips?.length > 0 && (
        <RippleButton
          onClick={handlePrevious}
          className="submitButton blue"
          name="previous trip"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 320 512"
          >
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
          </svg>
        </RippleButton>
      )}
      <ul className="tripList">
        {!!trips &&
          searchedTrips.map((trip, index) => {
            const formattedStartDate = new Date(trip.startDate)
              .toLocaleDateString("en-GB")
              .replace(/\//g, ".");
            const formattedEndDate = new Date(trip.endDate)
              .toLocaleDateString("en-GB")
              .replace(/\//g, ".");
            const isVisible =
              ((viewportWidth > 1200 ||
                (viewportWidth < 1000 && viewportWidth > 750)) &&
                index === (current + 1) % searchedTrips.length) ||
              index === current;
            if (isVisible) {
              return (
                <li key={index}>
                  <button
                    className="tripCard"
                    onClick={() => {
                      fetchWeather(trip.city, trip.startDate, trip.endDate);
                      dispatch(setSelectedTrip(trip));
                    }}
                  >
                    <img
                      src={`/images/cities/${trip.city}.jpg`}
                      alt={trip.city}
                    />
                    <p className="tripCardTitle">{trip.city}</p>
                    <p className="tripCardBody">
                      {formattedStartDate} - {formattedEndDate}
                    </p>
                  </button>
                </li>
              );
            }
            return null;
          })}
        {searchedTrips?.length === 0 && (
          <li>
            <h2 className="tripCardTitle">No cities match</h2>
          </li>
        )}
      </ul>
      {searchedTrips?.length > 0 && (
        <RippleButton
          onClick={handleNext}
          className="submitButton blue"
          name="next trip"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 320 512"
          >
            <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
          </svg>
        </RippleButton>
      )}
    </div>
  );
};

export default TripsCarousel;
