import { Link } from "react-router-dom";

const SRtable = ({ data, role }) => {
  return (
    <table className="table table-bordered my-4 mobile-th">
      <thead>
        <tr>
          <th style={{ width: 160 }}>SR Number</th>
          <th style={{ width: 200 }}>Floor</th>
          <th style={{ width: 250 }}>Location</th>
          <th style={{ width: 450 }}>Services</th>
          {(role === "Hotel Admin" || role === "Admin") && (
            <th className="mobile-table" style={{ width: 300 }}>
              Name &amp; Department
            </th>
          )}
          <th style={{ width: 120 }}>Status</th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((item) => {
            return (
              <tr key={item._id}>
                <th>{item.SRNumber}</th>
                <td>{item.floor}</td>
                <td>{item.locations}</td>
                <td>{item.pestService}</td>
                {(role === "Hotel Admin" || role === "Admin") && (
                  <td className="mobile-table">{`${
                    item.employee.name.split(" ")[0]
                  } / ${item.employee.department}`}</td>
                )}
                <td className="mobile-btn">
                  {item.status === "Open" && (
                    <Link to={`/singleSR/${item._id}`}>
                      <button className="btn btn-danger">Open</button>
                    </Link>
                  )}
                  {item.status === "Close" && (
                    <Link to={`/singleSR/${item._id}`}>
                      <button className="btn btn-success ">Closed</button>
                    </Link>
                  )}
                  {item.status === "Pending" && (
                    <Link to={`/singleSR/${item._id}`}>
                      <button className="btn btn-primary">Pending</button>
                    </Link>
                  )}
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};
export default SRtable;
