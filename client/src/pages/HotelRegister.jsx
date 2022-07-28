import { InputRow, Multiselect } from "../components";
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
  floor: ["Select Floor"],
  locations: ["Select Location"],
};

const HotelRegister = () => {
  const { loading } = useSelector((store) => store.hotel);
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState(initialState);
  const [tempFloor, setTempFloor] = useState("");
  const [tempLocations, setTempLocations] = useState("");
  const [value, setValue] = useState("");

  const {
    hotelName,
    hotelAddress,
    billToAddress,
    hotelEmail,
    contractNo,
    password,
    floor,
    locations
  } = formValue;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({ ...formValue, [name]: value });
  };

  const services = [
    { label: "Green Shield", value: "Green Shield" },
    { label: "Ratrid", value: "Ratrid" },
    { label: "Flyban", value: "Flyban" },
    { label: "Termiproof", value: "Termiproof" },
  ];

  const handleOnchange = (val) => {
    setValue(val);
  };

  const addLocations = (e) => {
    e.preventDefault();
    setFormValue({
      ...formValue,
      floor: [...formValue.floor, tempFloor],
      locations: [...formValue.locations, `Select,${tempLocations}`],
    });
    setTempFloor("");
    setTempLocations([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formValue.pestService = value;
    dispatch(hotelRegistration(formValue));
    setFormValue(initialState);
    setValue("");
  };

  return (
    <div className="container my-3">
      <form>
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
        <div className="row">
          <div className="col-md-6">
            <InputRow
              label="Contract Number"
              type="text"
              placeholder="Please provide contract number"
              name="contractNo"
              value={contractNo}
              handleChange={handleChange}
              required={true}
            />
          </div>
          <div className="col-md-6">
            <div className="row mt-2">
              <div className="col-md-3">
                <div className="preview-values">
                  <h4>Services</h4>
                </div>
              </div>
              <div className="col-md-6">
                <Multiselect handleChange={handleOnchange} option={services} />
              </div>
            </div>
          </div>

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
          <div className="col-md-4">
            <InputRow
              label="Floor Number"
              type="text"
              name="tempFloor"
              value={tempFloor}
              handleChange={(e) => setTempFloor(e.target.value)}
            />
          </div>
          <div className="col-md-7">
            <InputRow
              label="Locations"
              type="text"
              name="tempLocations"
              placeholder="Location should be comma separated"
              value={tempLocations}
              handleChange={(e) => setTempLocations(e.target.value)}
            />
          </div>
          <div className="col-md-1 mt-1">
            <button className="btn btn-primary" onClick={addLocations}>
              Add
            </button>
          </div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th className="text-center" style={{ width: 200 }}>
                  Floor
                </th>
                <th className="text-center">Locations</th>
              </tr>
            </thead>
            <tbody>
              {floor.map((item, index) => (
                <tr key={index}>
                  <td>{item}</td>
                  <td>
                    {locations.filter((loc, num) => num === index)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-dark text-center" onClick={handleSubmit}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
};
export default HotelRegister;
