import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllHotels } from "../redux/hotelSlice";
import { Link } from "react-router-dom";
import { EpcornUserReg } from "../components";

const AllHotels = () => {
  const { loading, allHotels } = useSelector((store) => store.hotel);
  const { user } = useSelector((store) => store.epcorn);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllHotels());
  }, []);

  return (
    <div className="container my-3">
      {user.role === "Admin" && (
        <>
          <Link to={"/hotelRegistration"}>
            <button className="btn btn-primary me-3">Hotel Registration</button>
          </Link>
          <button className="btn btn-primary" onClick={() => setShow(!show)}>
            Epcron Users
          </button>
        </>
      )}
      {show && <EpcornUserReg />}
      <table className="table table-bordered my-4">
        <thead>
          <tr>
            <th style={{ width: 50 }}>No</th>
            <th className="text-center">Hotel Name</th>
            <th style={{ width: 260 }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {allHotels &&
            allHotels.map((item, index) => {
              return (
                <tr key={item.id}>
                  <th>{index + 1}</th>
                  <td>{item.hotelName}</td>
                  <td>
                    <Link to={`/hotelDetails/${item.id}`}>
                      <button className="btn btn-primary me-2">Details</button>
                    </Link>
                    <Link to={`/allServiceRequests/${item.id}`}>
                      <button className="btn btn-info">Service Requests</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
export default AllHotels;
