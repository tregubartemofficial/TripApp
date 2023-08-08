import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import tripReducer from "./app/features/trip/tripReducer";
import weatherReducer from "./app/features/weather/weatherReducer";

const tripPersistConfig = {
  key: "trip",
  storage,
  whitelist: ["0", "trips"],
};

const persistedTripReducer = persistReducer(
  tripPersistConfig,
  tripReducer
);

export const store = configureStore({
  reducer: {
    trips: persistedTripReducer,
    weather: weatherReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);