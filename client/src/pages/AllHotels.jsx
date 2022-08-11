import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllHotels } from "../redux/hotelSlice";
import { Link } from "react-router-dom";
import { Loading, UserRegister } from "../components";

const AllHotels = () => {
  const { loading, allHotels } = useSelector((store) => store.hotel);
  const { user } = useSelector((store) => store.user);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllHotels());
    // eslint-disable-next-line
  }, []);

  if (loading) {
    <Loading />;
  }

  return (
    <div className="container my-3">
      {user.role === "Admin" && (
        <>
          <Link to={"/hotelRegistration"}>
            <button className="btn btn-primary me-3 mb-2">
              Hotel Registration
            </button>
          </Link>
          <button
            className="btn btn-primary mb-2"
            onClick={() => setShow(!show)}
          >
            Epcron Users
          </button>
        </>
      )}
      {show ? (
        <UserRegister />
      ) : (
        <table className="table table-bordered my-3 mobile-th">
          <thead>
            <tr>
              <th style={{ width: 50 }}>No</th>
              <th>Hotel Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allHotels &&
              allHotels.slice(1).map((item, index) => {
                return (
                  <tr key={item.id}>
                    <th>{index + 1}</th>
                    <td>{item.hotelName}</td>
                    <td className="mobile-btn">
                      <Link to={`/hotelDetails/${item.id}`}>
                        <button className="btn btn-primary me-2 mobile-table">
                          Details
                        </button>
                      </Link>
                      <Link to={`/allServiceRequests/${item.id}`}>
                        <button className="btn btn-info">
                          Service Requests
                        </button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default AllHotels;
