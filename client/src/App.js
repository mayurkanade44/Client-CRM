import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navbar, ProtectedRoute } from "./components";

import {
  AllHotels,
  AllSR,
  HotelRegister,
  Landing,
  SingleHotel,
  SingleSR,
} from "./pages";

function App() {
  return (
    <>
      <ToastContainer position="top-center" />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/allHotels" element={<AllHotels />} />
          <Route path="/hotelRegistration" element={<HotelRegister />} />
          <Route
            path="/allServiceRequests"
            element={
              <ProtectedRoute>
                <AllSR />
              </ProtectedRoute>
            }
          />
          <Route path="/allServiceRequests/:id" element={<AllSR />} />
          <Route path="/singleSR/:id" element={<SingleSR />} />
          <Route path="/hotelDetails/:id" element={<SingleHotel />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
