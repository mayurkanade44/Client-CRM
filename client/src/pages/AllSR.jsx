import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { EmployeeRegister, SRtable } from "../components";
import { employeeSR, hotelSR } from "../redux/serviceReqSlice";
import NewSR from "./NewSR";

const AllSR = () => {
  const { loading, user, allEmployees } = useSelector(
    (store) => store.employee
  );
  const { allEmployeeSR, allHotelSR } = useSelector(
    (store) => store.serviceRequest
  );
  const dispatch = useDispatch();
  const [showSR, setShowSR] = useState(false);

  useEffect(() => {
    if (user.role) {
      dispatch(hotelSR(user.hotel));
    } else {
      dispatch(employeeSR(user.empId));
    }
  }, [showSR]);

  return (
    <div className="container my-2">
      {user.role ? (
        <>
          <button
            className="btn btn-primary"
            onClick={() => setShowSR(!showSR)}
          >
            {!showSR ? "Add Employee" : "Back"}
          </button>
          {showSR && (
            <EmployeeRegister id={user.hotel} employees={allEmployees} />
          )}
        </>
      ) : (
        <>
          <button
            className="btn btn-primary"
            onClick={() => setShowSR(!showSR)}
          >
            {!showSR ? "New SR" : "Back"}
          </button>
          {showSR && <NewSR />}
        </>
      )}
      {!showSR && (
        <SRtable
          role={user.role}
          data={user.role ? allHotelSR : allEmployeeSR}
        />
      )}
    </div>
  );
};
export default AllSR;
