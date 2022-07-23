import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  allHotelEmployees,
  hotelEmployeeRegistration,
} from "../redux/hotelEmpSlice";
import InputRow from "./InputRow";

const initialState = {
  name: "",
  department: "",
  username: "",
  password: "",
  hotel: "",
};

const EmployeeRegister = ({ id, employees }) => {
  const dispatch = useDispatch();
  const [formValue, setFormValue] = useState(initialState);
  const { name, department, username, password } = formValue;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({ ...formValue, [name]: value });
  };

  useEffect(() => {
    dispatch(allHotelEmployees(id));
  }, []);

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
      <table className="table table-bordered my-4">
        <thead>
          <tr>
            <th style={{ width: 50 }}>No</th>
            <th className="text-center">Hotel Name</th>
            <th style={{ width: 260 }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees &&
            employees.map((item, index) => {
              return (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>{item.name}</td>
                  <td>
                    <Link to={`/hotelDetails/${item._id}`}>
                      <button className="btn btn-primary me-2">Delete</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
export default EmployeeRegister;
