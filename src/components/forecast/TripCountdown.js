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
            <section>
              <time className="timeUnit">{timeLeft.days}</time>
              <p>DAYS</p>
            </section>
            <section>
              <time className="timeUnit">{timeLeft.hours}</time>
              <p>HOURS</p>
            </section>
            <section>
              <time className="timeUnit">{timeLeft.minutes}</time>
              <p>MINUTES</p>
            </section>
            <section>
              <time className="timeUnit">{timeLeft.seconds}</time>
              <p>SECONDS</p>
            </section>
          </>
        ) : (
          <section>
            <h3>Trip Started</h3>
          </section>
        )}
      </section>
    )
  );
};

export default TripCountdown;
