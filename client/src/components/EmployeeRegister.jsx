import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  allHotelEmployees,
  employeeDeletion,
  hotelEmployeeRegistration,
} from "../redux/hotelEmpSlice";
import InputRow from "./InputRow";

const initialState = {
  name: "",
  department: "",
  email: "",
  password: "",
  hotel: "",
};

const EmployeeRegister = ({ id, employees }) => {
  const dispatch = useDispatch();
  const [formValue, setFormValue] = useState(initialState);
  const [update, setUpdate] = useState(false);
  const { name, department, email, password } = formValue;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({ ...formValue, [name]: value });
  };

  useEffect(() => {
    dispatch(allHotelEmployees(id));
  }, [update]);

  const handleSubmit = (e) => {
    e.preventDefault();
    formValue.hotel = id;
    dispatch(hotelEmployeeRegistration(formValue));
    setFormValue(initialState);
    setUpdate(!update);
  };

  const handleDelete = (id) => {
    dispatch(employeeDeletion(id));
    setUpdate(!update);
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
              label="Email"
              type="text"
              placeholder="Please provide email"
              name="email"
              value={email}
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
            <th className="text-center">Employee Name</th>
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
                    <button
                      className="btn btn-danger me-2"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
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
