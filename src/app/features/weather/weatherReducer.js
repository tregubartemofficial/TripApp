import { createSlice } from "@reduxjs/toolkit"

const initialState = {todayWeather: {}, weekWeather: {}}

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setTodayWeather: (state, { payload }) => {
      state.todayWeather = payload;
    },
    setWeekWeather: (state, { payload }) => {
      state.weekWeather = payload;
    },
  },
});

export const { setTodayWeather, setWeekWeather } = weatherSlice.actions;
export default weatherSlice.reducer;
