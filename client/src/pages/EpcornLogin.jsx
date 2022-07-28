import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { InputRow } from "../components";
import { epcornLogin } from "../redux/epcornSlice";

const initialState = {
  name: "",
  password: "",
};

const EpcornLogin = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { loading, user } = useSelector((store) => store.epcorn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { name, password } = formValue;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(epcornLogin(formValue));
  };

  useEffect(() => {
    if (user && user.role === "Admin") {
      setTimeout(() => {
        navigate("/allHotels");
      }, 2000);
    }
  }, [user]);

  return (
    <div className="position-absolute top-50 start-50 translate-middle border border-info p-4 mt-4">
      <h1 className="text-center mb-4">Login</h1>
      <div className="d-flex justify-content-center">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <InputRow
              label="name"
              type="text"
              placeholder="abc@xyz.com"
              name="name"
              value={name}
              handleChange={handleChange}
              required={true}
            />
          </div>
          <div className="mb-3">
            <InputRow
              label="Password"
              type="password"
              name="password"
              value={password}
              handleChange={handleChange}
              required={true}
            />
            <span className="form-text">Must be 5 characters long.</span>
          </div>
          <button type="submit" className="btn btn-primary mt-2">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
export default EpcornLogin;
