import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleSR, updateSR } from "../redux/serviceReqSlice";
import moment from "moment";
import { toast } from "react-toastify";

const SingleSR = () => {
  const { id } = useParams();
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, singleSR } = useSelector((store) => store.serviceRequest);
  const [formValue, setFormValue] = useState({
    comment: "",
    status: "",
  });
  const statusValue = ["Select Status", "Open", "Pending", "Close"];

  useEffect(() => {
    dispatch(getSingleSR(id));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValue.comment || !formValue.status) {
      return toast.error("Please provide all values");
    }
    const comment = `${moment(new Date()).format("L")} - ${formValue.comment}`;
    dispatch(updateSR({ id, sr: { comment, status: formValue.status } }));
    setTimeout(() => {
      navigate(-1);
    }, 3000);
  };

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
      {(user.role === "Admin" || user.role === "Epcorn") && (
        <form onSubmit={handleSubmit}>
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
            <div className="col-md-2">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={singleSR.status === "Closed"}
              >
                Save
              </button>
            </div>
          </div>
        </form>
      )}
      <table className="table table-bordered my-4">
        <thead>
          <tr>
            <th>Operator Comments</th>
          </tr>
        </thead>
        <tbody>
          {singleSR.operatorComment &&
            singleSR.operatorComment.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
export default SingleSR;
