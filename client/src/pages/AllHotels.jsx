import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllHotels } from "../redux/hotelSlice";
import { Link } from "react-router-dom";

const AllHotels = () => {
  const { loading, allHotels } = useSelector((store) => store.hotel);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllHotels());
  }, []);

  return (
    <div className="container">
      AllHotels
      <Link to={"/hotelRegistration"}>
        <button className="btn btn-primary">Hotel Registration</button>
      </Link>
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
                    <button className="btn btn-info">Service Requests</button>
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
