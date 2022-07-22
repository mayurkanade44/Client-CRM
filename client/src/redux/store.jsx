import { configureStore } from "@reduxjs/toolkit";
import hotelEmpSlice from "./hotelEmpSlice";
import hotelSlice from "./hotelSlice";

export const store = configureStore({
  reducer: {
    hotel: hotelSlice,
    employee: hotelEmpSlice,
  },
});
