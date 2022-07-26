import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Multiselect } from "../components";
import { hotelDetails } from "../redux/hotelSlice";
import { createServiceRequest } from "../redux/serviceReqSlice";

const initialState = {
  floor: "",
  locations: "",
  pestService: "",
  otherDetails: "",
};
const NewSR = () => {
  const { loading, user } = useSelector((store) => store.employee);
  const { singleHotel } = useSelector((store) => store.hotel);
  const dispatch = useDispatch();
  const [formValue, setFormValue] = useState(initialState);
  const { floor, locations, pestService, otherDetails } = formValue;
  const [loc, setLoc] = useState([]);
  const [value, setValue] = useState([]);
  const [pest, setPest] = useState([]);

  useEffect(() => {
    if (user && user.hotelId) {
      dispatch(hotelDetails(user.hotelId));
    }
  }, []);

  useEffect(() => {
    if (singleHotel && singleHotel.floor) {
      setLoc(
        singleHotel.locations.filter(
          (item, index) => index === singleHotel.floor.indexOf(floor)
        )
      );
      setPest(singleHotel.pestService.toString().split(","));
    }
  }, [floor]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({ ...formValue, [name]: value });
  };

  const objs = pest.map((x) => ({
    label: x,
    value: x,
  }));

  const handleOnchange = (val) => {
    setValue(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formValue.hotel = user.hotelId;
    formValue.employee = user.empId;
    formValue.pestService = value;
    dispatch(createServiceRequest(formValue));
    setFormValue(initialState);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-4">
            <div className="row mt-2">
              <div className="col-md-4">
                <h4>Floor</h4>
              </div>
              <div className="col-md-7">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="floor"
                  value={floor}
                  onChange={handleChange}
                >
                  {singleHotel &&
                    singleHotel.floor &&
                    singleHotel.floor.map((data, index) => {
                      return (
                        <option value={data} key={index}>
                          {data}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="row mt-2">
              <div className="col-md-4">
                <h4>Locations</h4>
              </div>
              <div className="col-md-7">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="locations"
                  value={locations}
                  onChange={handleChange}
                >
                  {loc &&
                    loc
                      .toString()
                      .split(",")
                      .map((data, index) => {
                        return (
                          <option value={data} key={index}>
                            {data}
                          </option>
                        );
                      })}
                </select>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="row mt-2">
              <div className="col-md-3">
                <div className="preview-values">
                  <h4>Services</h4>
                </div>
              </div>
              <div className="col-md-6">
                <Multiselect handleChange={handleOnchange} option={objs} />
              </div>
            </div>
          </div>
          <div className="col-md-6 mt-3">
            <div className="row">
              <div className="col-md-4">
                <label htmlFor="floatingTextarea2">
                  <h4>Other Details</h4>
                </label>
              </div>
              <div className="col-md-7">
                <textarea
                  className="form-control"
                  name="otherDetails"
                  value={otherDetails}
                  onChange={handleChange}
                  style={{ height: 100 }}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="col-md-6 mt-3">
            <button className="btn btn-success" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default NewSR;
