import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { epcornRegister } from "../redux/epcornSlice";
import InputRow from "./InputRow";

const initialState = {
  name: "",
  password: "",
};

const EpcornUserReg = () => {
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
    setFormValue(initialState)
  };

  return (
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
  );
};
export default EpcornUserReg;
