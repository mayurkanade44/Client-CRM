import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Loading, PieCharts } from "../components";

import { hotelDetails } from "../redux/hotelSlice";
import { serviceStats } from "../redux/serviceReqSlice";

const SingleHotel = () => {
  const { loading, singleHotel } = useSelector((store) => store.hotel);
  const { stats } = useSelector((store) => store.serviceRequest);
  const dispatch = useDispatch();

  const [edit, setEdit] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    dispatch(hotelDetails(id));
    dispatch(serviceStats(id));
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container my-3">
      <div className="d-flex justify-content-around">
        <h2 className="text-center">{singleHotel.hotelName}</h2>
        <button className="btn btn-dark" onClick={() => setEdit(!edit)}>
          {edit ? "Save" : "Edit"}
        </button>
      </div>
      <h4>Hotel Address: {singleHotel.hotelAddress}</h4>
      <h4>Billing Address: {singleHotel.billToAddress}</h4>
      <div className="d-flex justify-content-between">
        <h4>Email Address: {singleHotel.hotelEmail}</h4>
        <h4>Contract Number: {singleHotel.contractNo}</h4>
        <h4>Services: {singleHotel.pestService}</h4>
      </div>
      <h4 className="text-center my-3">Treatment Locations</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th className="text-center" style={{ width: 200 }}>
              Floor
            </th>
            <th className="text-center">Locations</th>
          </tr>
        </thead>
        <tbody>
          {singleHotel.floor &&
            singleHotel.floor.map((item, index) => (
              <tr key={index}>
                <td>{item}</td>
                <td>
                  {singleHotel.locations &&
                    singleHotel.locations.filter((loc, num) => num === index)}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <PieCharts data={stats} />
    </div>
  );
};
export default SingleHotel;
