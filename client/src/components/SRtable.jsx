const SRtable = ({ data, role }) => {
  return (
    <table className="table table-bordered my-4">
      <thead>
        <tr>
          <th style={{ width: 160 }}>SR Number</th>
          <th style={{ width: 200 }}>Floor</th>
          <th style={{ width: 250 }}>Location</th>
          <th style={{ width: 450 }}>Services</th>
          {role && <th style={{ width: 300 }}>Name &amp; Department</th>}
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
                {role && (
                  <td>{`${item.employee.name.split(" ")[0]} / ${
                    item.employee.department
                  }`}</td>
                )}
                <td>
                  {item.statusOpen ? (
                    <button className="btn btn-danger">Open</button>
                  ) : (
                    <button className="btn btn-success">Closed</button>
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
