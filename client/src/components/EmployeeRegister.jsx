import { useState } from "react";
import { useDispatch } from "react-redux";
import { hotelEmployeeRegistration } from "../redux/hotelEmpSlice";
import InputRow from "./InputRow";

const initialState = {
  name: "",
  department: "",
  username: "",
  password: "",
  hotel: "",
};

const EmployeeRegister = ({ id }) => {
  const dispatch = useDispatch();
  const [formValue, setFormValue] = useState(initialState);
  const { name, department, username, password } = formValue;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formValue.hotel = id;
    dispatch(hotelEmployeeRegistration(formValue));
    setFormValue(initialState);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <InputRow
              label="Full Name"
              type="text"
              placeholder="Please provide full name"
              name="name"
              value={name}
              handleChange={handleChange}
              required={true}
            />
          </div>
          <div className="col-md-6">
            <InputRow
              label="Department"
              type="text"
              placeholder="Please provide department"
              name="department"
              value={department}
              handleChange={handleChange}
              required={true}
            />
          </div>
          <div className="col-md-5">
            <InputRow
              label="Username"
              type="text"
              placeholder="Please provide username"
              name="username"
              value={username}
              handleChange={handleChange}
              required={true}
            />
          </div>
          <div className="col-md-5">
            <InputRow
              label="Password"
              type="password"
              name="password"
              value={password}
              handleChange={handleChange}
              required={true}
            />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-primary mt-1">
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default EmployeeRegister;
