import React, { useState } from 'react'
import TripModal from "../modal/TripModal";
import TripCarousel from './TripsCarousel';

const TripManager = () => {
  const [isOpenTripModal, setIsOpenTripModal] = useState(false);

  return (
    <>
      <div className='tripManager'>
        <TripCarousel />
        <button
          onClick={() => setIsOpenTripModal(true)}
          className="addTripButton"
        >
          <h1>+</h1>
          <p>Add trip</p>
        </button>
      </div>
      <TripModal active={isOpenTripModal} setActive={setIsOpenTripModal} />
    </>
  );
};

export default TripManager;