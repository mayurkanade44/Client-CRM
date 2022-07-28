import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { EmployeeRegister, SRtable, NewSR } from "../components";
import { employeeSR, hotelSR } from "../redux/serviceReqSlice";

const AllSR = () => {
  const { loading, user, allEmployees } = useSelector((store) => store.user);
  const { allEmployeeSR, allHotelSR } = useSelector(
    (store) => store.serviceRequest
  );
  const dispatch = useDispatch();
  const [showSR, setShowSR] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(hotelSR(id));
    } else if (user.role === "Hotel Admin") {
      dispatch(hotelSR(user.hotel));
    } else if (user.role === "Hotel Employee") {
      dispatch(employeeSR(user.empId));
    }
  }, [showSR, id]);

  return (
    <div className="container my-2">
      {user.role === "Hotel Admin" && (
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
      )}
      {user.role === "Hotel Employee" && (
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
          data={
            user.role === "Hotel Admin" ||
            user.role === "Admin" ||
            user.role === "Epcorn"
              ? allHotelSR
              : allEmployeeSR
          }
        />
      )}
    </div>
  );
};
export default AllSR;
