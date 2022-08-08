import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { InputRow } from "../components";
import {
  hotelEmployeeLogin,
  hotelLogin,
  epcornLogin,
} from "../redux/userSlice";
import { getAllHotelNames } from "../redux/hotelSlice";
import { useNavigate } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
  hotel: "Hotel Admin",
};

const Landing = () => {
  const [hotelUser, setHotelUser] = useState(false);
  const [epcornUser, setEpcornUser] = useState(false);
  const { loading, user } = useSelector((store) => store.user);
  const { allHotelsNames } = useSelector((store) => store.hotel);
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState(initialState);
  const { email, password, hotel } = formValue;

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("provide all values");
    }
    if (hotelUser) {
      if (hotel === "Hotel Admin" || hotel === "62e248cb62037f5644078a95") {
        dispatch(
          hotelLogin({
            hotelEmail: email,
            password: password,
            hotel: hotel,
          })
        );
      } else {
        dispatch(hotelEmployeeLogin(formValue));
      }
    }
    if (epcornUser) {
      dispatch(epcornLogin({ email, password }));
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        if (user.role === "Hotel Employee" || user.role === "Hotel Admin") {
          navigate("/allServiceRequests");
        }
        if (user.role === "Epcorn" || user.role === "Admin") {
          navigate("/allHotels");
        }
      }, 3000);
    }

    dispatch(getAllHotelNames());
    // eslint-disable-next-line
  }, [user]);

  return (
    <div className="container">
      <div className="position-absolute top-50 start-50 translate-middle border border-info p-4 mt-4">
        <div className="row">
          {!hotelUser && !epcornUser && (
            <>
              <button
                className="btn btn-primary mb-4"
                onClick={() => setHotelUser(true)}
              >
                Hotel Login
              </button>
              <button
                className="btn btn-info"
                onClick={() => setEpcornUser(true)}
              >
                Epcorn Login
              </button>{" "}
            </>
          )}
          {(hotelUser || epcornUser) && (
            <div className="d-flex justify-content-center">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <InputRow
                    label="Email Id"
                    type="email"
                    placeholder="abc@xyz.com"
                    name="email"
                    value={email}
                    handleChange={handleChange}
                    required={true}
                  />
                </div>
                <div className="mb-3">
                  <InputRow
                    label="Password"
                    type="password"
                    name="password"
                    placeholder="Must be 5 characters"
                    value={password}
                    handleChange={handleChange}
                    required={true}
                  />
                </div>
                {hotelUser && (
                  <div className="row mt-2">
                    <div className="col-md-4">
                      <h4>Hotel</h4>
                    </div>
                    <div className="col-md-7">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        name="hotel"
                        value={hotel}
                        onChange={handleChange}
                      >
                        {allHotelsNames.map((data) => {
                          return (
                            <option value={data.id} key={data.id}>
                              {data.hotelName}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                )}
                <button
                  type="submit"
                  className="btn btn-primary mt-2"
                  disabled={user ? true : false}
                >
                  Login
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Landing;
