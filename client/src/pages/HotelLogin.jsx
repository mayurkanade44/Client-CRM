import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { InputRow } from "../components";
import { hotelLogin } from "../redux/hotelEmpSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const initialState = {
  hotelEmail: "",
  password: "",
};

const HotelLogin = () => {
  const { loading, user } = useSelector((store) => store.employee);
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState(initialState);
  const { hotelEmail, password } = formValue;

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

    dispatch(hotelLogin(formValue));
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/allServiceRequests");
      }, 2000);
    }
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
          <button type="submit" className="btn btn-primary mt-2">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
export default HotelLogin;
