import { useState } from "react";
import { useDispatch } from "react-redux";
import { epcornDelete, epcornRegister } from "../redux/userSlice";
import InputRow from "./InputRow";

const initialState = {
  name: "",
  password: "",
};

const EpcornUserReg = ({ allUsers }) => {
  const [formValue, setFormValue] = useState(initialState);
  const { name, password } = formValue;
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(epcornRegister(formValue));
    setFormValue(initialState);
  };

  return (
    <>
      <form className="my-3" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-5">
            <InputRow
              label="Name"
              type="text"
              placeholder="Please enter your name"
              name="name"
              value={name}
              handleChange={handleChange}
              required={true}
            />
          </div>
          <div className="col-md-5">
            <InputRow
              label="Password"
              type="password"
              placeholder="password must be 5 characters long"
              name="password"
              value={password}
              handleChange={handleChange}
              required={true}
            />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-primary mt-2">
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
          {allUsers &&
            allUsers.map((item, index) => {
              return (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>{item.name}</td>
                  <td>
                    <button
                      className="btn btn-danger me-2"
                      onClick={() => dispatch(epcornDelete(item._id))}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};
export default EpcornUserReg;
