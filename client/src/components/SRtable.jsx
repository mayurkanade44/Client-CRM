const SRtable = ({ data }) => {
  return (
    <table className="table table-bordered my-4">
      <thead>
        <tr>
          <th style={{ width: 200 }}>SR Number</th>
          <th style={{ width: 200 }}>Floor</th>
          <th style={{ width: 250 }}>Location</th>
          <th style={{ width: 450 }}>Service</th>
          <th style={{ width: 150 }}>Status</th>
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
