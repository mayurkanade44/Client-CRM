import { configureStore } from "@reduxjs/toolkit";
import hotelSlice from "./hotelSlice";
import serviceReqSlice from "./serviceReqSlice";
import userSlice from "./userSlice";

export const store = configureStore({
  reducer: {
    hotel: hotelSlice,
    serviceRequest: serviceReqSlice,
    user: userSlice,
  },
});
