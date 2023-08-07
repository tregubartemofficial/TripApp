import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TripCountdown = () => {
  const { selectedTrip } = useSelector((state) => state.trips);
  const tripStartDate = useCallback(
    () => new Date(selectedTrip?.startDate),
    [selectedTrip]
  );
  const calculateTimeLeft = useCallback(() => {
    const difference = tripStartDate().getTime() - new Date().getTime();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }, [tripStartDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    if (!selectedTrip) {
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedTrip, calculateTimeLeft]);

  return (
    selectedTrip?.startDate && (
      <section className="timeLeft">
        {timeLeft.days ? (
          <>
            <div>
              <h3>{timeLeft.days}</h3>
              <p>DAYS</p>
            </div>
            <div>
              <h3>{timeLeft.hours}</h3>
              <p>HOURS</p>
            </div>
            <div>
              <h3>{timeLeft.minutes}</h3>
              <p>MINUTES</p>
            </div>
            <div>
              <h3>{timeLeft.seconds}</h3>
              <p>SECONDS</p>
            </div>
          </>
        ) : (
          <div>
            <h3>Trip Started</h3>
          </div>
        )}
      </section>
    )
  );
};

export default TripCountdown;
