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
  },
});

export const { setTrips } = tripSlice.actions;
export default tripSlice.reducer;
