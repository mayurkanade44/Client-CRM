import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleSR } from "../redux/serviceReqSlice";

const SingleSR = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, singleSR } = useSelector((store) => store.serviceRequest);
  const [formValue, setFormValue] = useState({
    comment: "",
    status: "",
  });

  useEffect(() => {
    dispatch(getSingleSR(id));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({ ...formValue, [name]: value });
  };

  const statusValue = ["Select Status", "Open", "Pending", "Close"];

  return (
    <div className="container my-3">
      <div className="row">
        <div className="col-md-6">
          <h3>{singleSR.SRNumber}</h3>
        </div>
        <div className="col-md-6">
          <button
            className={`btn btn-${
              singleSR.status === "Open"
                ? "danger"
                : singleSR.status === "Pending"
                ? "info"
                : "success"
            }`}
          >
            {singleSR.status}
          </button>
        </div>
      </div>
      <h3>{`Services - ${singleSR.pestService}`}</h3>
      <h3>{`Other Details - ${singleSR.otherDetails}`}</h3>
      <form>
        <div className="row">
          <div className="col-md-2">
            <label htmlFor="floatingTextarea2">
              <h4>Comment</h4>
            </label>
          </div>
          <div className="col-md-4">
            <textarea
              className="form-control"
              name="comment"
              value={formValue.comment}
              onChange={handleChange}
              style={{ height: 100 }}
            ></textarea>
          </div>
          <div className="col-md-2">
            <select
              className="form-select"
              aria-label="Default select example"
              name="status"
              value={formValue.status}
              onChange={handleChange}
            >
              {statusValue.map((data) => {
                return (
                  <option value={data} key={data}>
                    {data}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};
export default SingleSR;
