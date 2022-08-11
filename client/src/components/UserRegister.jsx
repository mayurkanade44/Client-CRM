import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  allEpcornUsers,
  allHotelEmployees,
  employeeDeletion,
  epcornDelete,
  epcornRegister,
  hotelEmployeeRegistration,
} from "../redux/userSlice";
import InputRow from "./InputRow";
import Loading from "./Loading";

const initialState = {
  name: "",
  department: "",
  email: "",
  password: "",
  hotel: "",
};

const UserRegister = ({ s }) => {
  const dispatch = useDispatch();
  const { loading, user, allUsers } = useSelector((store) => store.user);
  const [formValue, setFormValue] = useState(initialState);
  const [update, setUpdate] = useState(false);
  const { name, department, email, password } = formValue;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({ ...formValue, [name]: value });
  };

  useEffect(() => {
    if (user.role === "Hotel Admin") {
      dispatch(allHotelEmployees(user.hotel));
    } else {
      dispatch(allEpcornUsers());
    }
  }, [update]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.role === "Hotel Admin") {
      formValue.hotel = user.hotel;
      dispatch(hotelEmployeeRegistration(formValue));
    }
    if (user.role === "Admin") {
      dispatch(epcornRegister({ name, email, password }));
    }

    setFormValue(initialState);
    setUpdate(!update);
  };

  const handleDelete = (id) => {
    if (user.role === "Hotel Admin") dispatch(employeeDeletion(id));
    if (user.role === "Admin") dispatch(epcornDelete(id));
    setUpdate(!update);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mt-3">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div
            className={user.role === "Hotel Admin" ? "col-md-6" : "col-md-4"}
          >
            <InputRow
              label="Full Name"
              type="text"
              placeholder="Please provide full name"
              name="name"
              value={name}
              handleChange={handleChange}
              required={true}
              labelW="auto"
            />
          </div>
          {user.role === "Hotel Admin" && (
            <div className="col-md-6">
              <InputRow
                label="Department"
                type="text"
                placeholder="Please provide department"
                name="department"
                value={department}
                handleChange={handleChange}
                required={true}
                labelW="auto"
              />
            </div>
          )}
          <div
            className={user.role === "Hotel Admin" ? "col-md-5" : "col-md-3"}
          >
            <InputRow
              label="Email"
              type="email"
              placeholder="abc@xyz.com"
              name="email"
              value={email}
              handleChange={handleChange}
              required={true}
              labelW="auto"
            />
          </div>
          <div
            className={user.role === "Hotel Admin" ? "col-md-5" : "col-md-4"}
          >
            <InputRow
              label="Password"
              type="password"
              name="password"
              value={password}
              handleChange={handleChange}
              required={true}
              labelW="auto"
            />
          </div>
          <div className="col-md-1">
            <button type="submit" className="btn btn-primary mt-1">
              Register
            </button>
          </div>
        </div>
      </form>
      <table className="table table-bordered my-4 mobile-th">
        <thead>
          <tr>
            <th style={{ width: 50 }}>No</th>
            <th style={{ width: 150 }}>
              Employee Name
            </th>
            <th style={{ width: 260 }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {allUsers &&
            allUsers.map((item, index) => {
              return (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>{item.name}</td>
                  <td className="mobile-btn">
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
export default UserRegister;
