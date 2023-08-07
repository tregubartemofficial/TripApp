import { createSlice } from "@reduxjs/toolkit";

const initialState = [{ city: "", startDate: "", endDate: "" }];

const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {
    setTrips: (state, { payload }) => {
      const sortedTrips = payload.sort((a, b) => (a.startDate - b.startDate))
      state.trips = sortedTrips;
    },
    setSelectedTrip: (state, {payload}) => {
      state.selectedTrip = payload
    }
  },
});

export const { setTrips, setSelectedTrip } = tripSlice.actions;
export default tripSlice.reducer;
