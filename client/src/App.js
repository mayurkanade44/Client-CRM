import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  AllHotels,
  AllSR,
  EpcornLogin,
  HotelLogin,
  HotelRegister,
  SingleHotel,
} from "./pages";

function App() {
  return (
    <>
      <ToastContainer position="top-center" />
      <Router>
        <Routes>
          <Route path="/hotelLogin" element={<HotelLogin />} />
          <Route path="/epcornLogin" element={<EpcornLogin />} />
          <Route path="/allHotels" element={<AllHotels />} />
          <Route path="/hotelRegistration" element={<HotelRegister />} />
          <Route path="/allServiceRequests" element={<AllSR />} />
          <Route path="/allServiceRequests/:id" element={<AllSR />} />
          <Route path="/hotelDetails/:id" element={<SingleHotel />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
