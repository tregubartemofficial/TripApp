import React, { useState } from "react";
import RippleButton from "../button/RippleButton";
import { addTripToFirestore } from "../../app/firebase/firebaseService";
import "../../styles/Modal.css";

const CITY_OPTIONS = ["Vinnytsia", "Lviv", "Kyiv", "Paris", "Berlin"];

const TripModal = ({ active, setActive }) => {
  const [cityInput, setCityInput] = useState("");
  const [startDateInput, setStartDateInput] = useState("");
  const [endDateInput, setEndDateInput] = useState("");
  const todayFormattedDate = new Date().toISOString().split("T")[0];
  const maxFormattedDate = new Date(
    new Date().setDate(new Date().getDate() + 15)
  )
    .toISOString()
    .split("T")[0];

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      city: cityInput,
      startDate: new Date(startDateInput).getTime(),
      endDate: new Date(endDateInput).getTime(),
    };
    try {
      await addTripToFirestore(data);
      setActive(false)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={active ? "modal active" : "modal"}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? "modalContent active" : "modalContent"}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modalHeader">
          <p>Create trip</p>
          <img
            onClick={() => setActive(false)}
            src="/images/cancel.png"
            alt="cancel"
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modalInput">
            <label htmlFor="city">City</label>
            <select
              name="city"
              required
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
            >
              {CITY_OPTIONS.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div className="modalInput">
            <label htmlFor="startDate">Start date</label>
            <input
              id="startDate"
              type="date"
              name="startDate"
              required
              value={startDateInput}
              onChange={(e) => setStartDateInput(e.target.value)}
              min={todayFormattedDate}
              max={maxFormattedDate}
            />
          </div>
          <div className="modalInput">
            <label htmlFor="endDate">End date</label>
            <input
              id="endDate"
              type="date"
              name="endDate"
              required
              value={endDateInput}
              min={
                startDateInput &&
                new Date(startDateInput).toISOString().split("T")[0]
              }
              max={maxFormattedDate}
              onChange={(e) => setEndDateInput(e.target.value)}
            />
          </div>
          <div className="modalActions">
            <RippleButton
              className="cancelButton grey"
              onClick={() => setActive(false)}
              type="button"
            >
              Cancel
            </RippleButton>
            <RippleButton type="submit" className="submitButton blue">
              Save
            </RippleButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TripModal;
