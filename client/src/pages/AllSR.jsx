import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { SRtable, NewSR, UserRegister, PieCharts } from "../components";
import { employeeSR, hotelSR, serviceStats } from "../redux/serviceReqSlice";

const AllSR = () => {
  const { loading, user } = useSelector((store) => store.user);
  const { allEmployeeSR, allHotelSR, stats } = useSelector(
    (store) => store.serviceRequest
  );
  const dispatch = useDispatch();
  const [showSR, setShowSR] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(hotelSR(id));
    } else if (user.role === "Hotel Admin") {
      dispatch(hotelSR(user.hotel));
    } else if (user.role === "Hotel Employee") {
      dispatch(employeeSR(user.empId));
    }
    // eslint-disable-next-line
  }, [showSR, id]);

  useEffect(() => {
    if (user && user.role === "Hotel Admin") {
      dispatch(serviceStats(user.hotel));
    }
    // eslint-disable-next-line
  }, [showStats]);

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
          <button
            className="btn btn-info ms-3"
            onClick={() => setShowStats(!showStats)}
          >
            {!showStats ? "Show Stats" : "Back"}
          </button>
          {showSR && <UserRegister />}
          {showStats && <PieCharts data={stats} />}
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
