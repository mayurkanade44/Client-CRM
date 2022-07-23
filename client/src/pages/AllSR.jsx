import { useState } from "react";
import { useSelector } from "react-redux";
import { EmployeeRegister } from "../components";

const AllSR = () => {
  const { loading, user } = useSelector((store) => store.employee);
  const [show, setShow] = useState(false);

  return (
    <div className="container my-2">
      <button className="btn btn-primary" onClick={() => setShow(!show)}>
        Add Employee
      </button>
      {show && <EmployeeRegister id={user.hotel} />}
    </div>
  );
};
export default AllSR;
