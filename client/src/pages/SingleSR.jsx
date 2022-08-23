import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleSR, updateSR } from "../redux/serviceReqSlice";
import moment from "moment";
import { toast } from "react-toastify";
import { Loading } from "../components";

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
  const statusValue = ["Select Status", "Pending", "Close"];

  useEffect(() => {
    dispatch(getSingleSR(id));
    // eslint-disable-next-line
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (singleSR.status === "Close") {
      return toast.error("SR is already closed");
    }
    if (formValue.status === "Close") {
      formValue.comment = "All Job Done";
    }
    if (!formValue.comment || !formValue.status) {
      return toast.error("Please provide all values");
    }
    const comment = `${moment(new Date()).format("L")} - ${
      formValue.comment
    } by ${user.name}`;
    dispatch(
      updateSR({
        id,
        sr: { comment, status: formValue.status },
      })
    );
    setTimeout(() => {
      navigate(-1);
    }, 2000);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container my-3 mobile-sr">
      <div className="row">
        <div className="col-md-12 ">
          <h4>
            {singleSR.SRNumber} is{" "}
            <span
              className={`badge bg-${
                singleSR.status === "Open"
                  ? "danger"
                  : singleSR.status === "Pending"
                  ? "info"
                  : "success"
              }`}
            >
              {singleSR.status}
            </span> &amp;
            created by {singleSR.employee && singleSR.employee.name}
          </h4>
        </div>
      </div>
      <h4>{`Services - ${singleSR.pestService}`}</h4>
      <h4>{`Other Details - ${singleSR.otherDetails}`}</h4>
      {(user.role === "Admin" || user.role === "Epcorn") && (
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
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
            {formValue.status === "Pending" && (
              <div className="col-md-4">
                <textarea
                  className="form-control"
                  placeholder="Please provide some comment of the service"
                  name="comment"
                  value={formValue.comment}
                  onChange={handleChange}
                  style={{ height: 70 }}
                ></textarea>
              </div>
            )}
            <div className="col-md-2">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={singleSR.status === "Close"}
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
            <th className="text-center">Operator Comments</th>
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
