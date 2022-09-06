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
    <Router>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        pauseOnFocusLoss={false}
      />
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/allHotels"
          element={
            <ProtectedRoute>
              <AllHotels />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hotelRegistration"
          element={
            <ProtectedRoute>
              <HotelRegister />
            </ProtectedRoute>
          }
        />
        <Route
          path="/allServiceRequests"
          element={
            <ProtectedRoute>
              <AllSR />
            </ProtectedRoute>
          }
        />
        <Route
          path="/allServiceRequests/:id"
          element={
            <ProtectedRoute>
              <AllSR />
            </ProtectedRoute>
          }
        />
        <Route
          path="/singleSR/:id"
          element={
            <ProtectedRoute>
              <SingleSR />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hotelDetails/:id"
          element={
            <ProtectedRoute>
              <SingleHotel />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
