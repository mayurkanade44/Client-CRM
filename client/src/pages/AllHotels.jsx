import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllHotel } from "../redux/hotelSlice";

const AllHotels = () => {
  const { loading, allHotels } = useSelector((store) => store.hotel);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllHotel());
  }, []);

  return (
    <div className="container">
      AllHotels
      <table className="table table-bordered">
        <thead>
          <tr>
            <th style={{ width: 50 }}>No</th>
            <th className="text-center">Hotel Name</th>
            <th style={{ width: 200 }}>Action</th>
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
                    <button className="btn btn-primary me-2">Details</button>
                    <button className="btn btn-info">Edit</button>
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
