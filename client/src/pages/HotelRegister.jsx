import { InputRow } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { hotelRegistration } from "../redux/hotelSlice";

const initialState = {
  hotelName: "",
  hotelAddress: "",
  billToAddress: "",
  hotelEmail: "",
  contractNo: "",
  password: "",
};

const HotelRegister = () => {
  const { loading } = useSelector((store) => store.hotel);
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState(initialState);

  const {
    hotelName,
    hotelAddress,
    billToAddress,
    hotelEmail,
    contractNo,
    password,
  } = formValue;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(hotelRegistration(formValue));
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <InputRow
          label="Hotel Name"
          type="text"
          placeholder="Please provide full hotel name"
          name="hotelName"
          value={hotelName}
          handleChange={handleChange}
          required={true}
        />
        <InputRow
          label="Hotel Address"
          type="text"
          placeholder="Please provide full hotel address"
          name="hotelAddress"
          value={hotelAddress}
          handleChange={handleChange}
          required={true}
        />
        <InputRow
          label="Bill To Address"
          type="text"
          placeholder="Please provide billing address"
          name="billToAddress"
          value={billToAddress}
          handleChange={handleChange}
          required={true}
        />
        <InputRow
          label="Contract Number"
          type="text"
          placeholder="Please provide contract number"
          name="contractNo"
          value={contractNo}
          handleChange={handleChange}
          required={true}
        />
        <div className="row">
          <div className="col-md-6">
            <InputRow
              label="Hotel Email"
              type="email"
              placeholder="abc@xyz.com"
              name="hotelEmail"
              value={hotelEmail}
              handleChange={handleChange}
              required={true}
            />
          </div>
          <div className="col-md-6">
            <InputRow
              label="Password"
              type="password"
              placeholder="Password must be at least 5 characters"
              name="password"
              value={password}
              handleChange={handleChange}
              required={true}
            />
          </div>
            <button className='btn btn-dark text-center'>Register</button>
        </div>
      </form>
    </div>
  );
};
export default HotelRegister;
