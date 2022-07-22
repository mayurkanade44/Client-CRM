import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AllHotels, HotelRegister } from "./pages";

function App() {
  return (
    <>
      <ToastContainer position="top-center" />
      <Router>
        <Routes>
          <Route path="/allHotels" element={<AllHotels />} />
          <Route path="/hotelRegistration" element={<HotelRegister />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
