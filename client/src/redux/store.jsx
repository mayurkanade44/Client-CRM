import { configureStore } from "@reduxjs/toolkit";
import hotelEmpSlice from "./hotelEmpSlice";
import hotelSlice from "./hotelSlice";
import serviceReqSlice from "./serviceReqSlice";

export const store = configureStore({
  reducer: {
    hotel: hotelSlice,
    employee: hotelEmpSlice,
    serviceRequest: serviceReqSlice
  },
});
