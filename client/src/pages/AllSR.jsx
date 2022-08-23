import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  SRtable,
  NewSR,
  UserRegister,
  PieCharts,
  Loading,
} from "../components";
import {
  changePage,
  employeeSR,
  hotelSR,
  serviceStats,
} from "../redux/serviceReqSlice";

const AllSR = () => {
  const { user } = useSelector((store) => store.user);
  const { allEmployeeSR, allHotelSR, stats, loading, numOfPages, page } =
    useSelector((store) => store.serviceRequest);
  const dispatch = useDispatch();
  const [showSR, setShowSR] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [find, setFind] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Requests");
  const { id } = useParams();

  const statusOption = ["All Requests", "Open", "Pending", "Close"];

  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });

  useEffect(() => {
    if (id) {
      dispatch(hotelSR({ id, search, status }));
    } else if (user.role === "Hotel Admin") {
      dispatch(hotelSR({ id: user.hotel, search, status }));
    } else if (user.role === "Hotel Employee") {
      dispatch(employeeSR(user.empId));
    }
    // eslint-disable-next-line
  }, [showSR, id, find, page, status]);

  useEffect(() => {
    if (user && user.role === "Hotel Admin") {
      dispatch(serviceStats(user.hotel));
    }
    // eslint-disable-next-line
  }, [showStats]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container my-2">
      <div className="row gy-2">
        {user.role === "Hotel Admin" && (
          <div className="col-lg-3">
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
          </div>
        )}
        {user.role === "Hotel Employee" && (
          <div className="col-12 col-lg-3">
            <button
              className="btn btn-primary"
              onClick={() => setShowSR(!showSR)}
            >
              {!showSR ? "New SR" : "Back"}
            </button>
            {showSR && <NewSR />}
          </div>
        )}
        <div className="col-7 col-lg-3">
          <div className="input-group  ">
            <input
              type="text"
              className="form-control"
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
            />
            <button
              className="input-group-text"
              id="inputGroup-sizing-default"
              onClick={() => setFind(!find)}
            >
              Search
            </button>
          </div>
        </div>
        <div className="col-5 col-lg-2">
          <select
            className="form-select"
            aria-label="Default select example"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {statusOption.map((data) => {
              return (
                <option value={data} key={data}>
                  {data}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      {!showSR && (
        <>
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
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              {pages.map((pageNum) => {
                return (
                  <li
                    className={
                      pageNum === page ? "page-item active" : "page-item"
                    }
                    key={pageNum}
                  >
                    <button
                      className="page-link"
                      onClick={() => dispatch(changePage(pageNum))}
                    >
                      {pageNum}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </>
      )}
    </div>
  );
};
export default AllSR;
