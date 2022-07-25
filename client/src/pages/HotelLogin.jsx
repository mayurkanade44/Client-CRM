import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { InputRow } from "../components";
import { hotelEmployeeLogin, hotelLogin } from "../redux/hotelEmpSlice";
import { getAllHotel } from "../redux/hotelSlice";
import { useNavigate } from "react-router-dom";

const initialState = {
  hotelEmail: "",
  password: "",
  hotel: "admin",
};

const HotelLogin = () => {
  const { loading, user } = useSelector((store) => store.employee);
  const { allHotels } = useSelector((store) => store.hotel);
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState(initialState);
  const { hotelEmail, password, hotel } = formValue;

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!hotelEmail || !password) {
      return toast.error("provide all values");
    }
    if (hotel === "admin") {
      dispatch(hotelLogin(formValue));
    } else {
      dispatch(
        hotelEmployeeLogin({
          email: hotelEmail,
          password: password,
          hotel: hotel,
        })
      );
    }
  };

  useEffect(() => {
    if (user && user.role) {
      setTimeout(() => {
        navigate("/allServiceRequests");
      }, 2000);
    } else if (user && !user.role) {
      setTimeout(() => {
        navigate("/newServiceRequest");
      }, 2000);
    }
    dispatch(getAllHotel());
    // eslint-disable-next-line
  }, [user]);

  return (
    <div className="position-absolute top-50 start-50 translate-middle border border-info p-4 mt-4">
      <h1 className="text-center mb-4">Login</h1>
      <div className="d-flex justify-content-center">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <InputRow
              label="Email Id"
              type="email"
              placeholder="abc@xyz.com"
              name="hotelEmail"
              value={hotelEmail}
              handleChange={handleChange}
              required={true}
            />
          </div>
          <div className="mb-3">
            <InputRow
              label="Password"
              type="password"
              name="password"
              value={password}
              handleChange={handleChange}
              required={true}
            />
            <span className="form-text">Must be 5 characters long.</span>
          </div>
          <div className="row mt-2">
            <div className="col-md-4">
              <h4>Hotel</h4>
            </div>
            <div className="col-md-7">
              <select
                className="form-select"
                aria-label="Default select example"
                name="hotel"
                value={hotel}
                onChange={handleChange}
              >
                {allHotels.map((data) => {
                  return (
                    <option value={data.id} key={data.id}>
                      {data.hotelName}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-2">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
export default HotelLogin;
