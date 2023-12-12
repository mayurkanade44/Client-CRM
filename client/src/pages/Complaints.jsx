import { Link } from "react-router-dom";
import { AlertMessage, Loading } from "../components";
import { useAllClientComplaintsQuery } from "../redux/serviceSlice";

const Complaints = () => {
  const { data, isLoading, isFetching, error } = useAllClientComplaintsQuery();

  const progress = (status) => {
    let text = "text-blue-700 bg-blue-100";
    if (status === "Completed") text = "text-green-700 bg-green-100";
    else if (status === "In Progress") text = "text-gary-700 bg-gray-100";

    return text;
  };

  return (
    <>
      {isLoading || isFetching ? (
        <Loading />
      ) : (
        error && <AlertMessage>{error?.data?.msg || error.error}</AlertMessage>
      )}
      {data && (
        <div className="overflow-y-auto my-4">
          <table className="w-full border whitespace-nowrap border-neutral-500 bg-text">
            <thead>
              <tr className="h-8 w-full leading-none">
                <th className="font-bold text-center border-neutral-500 w-40 border-2 px-3">
                  Complaint Number
                </th>
                <th className="font-bold text-center border-neutral-500 border-2 px-3">
                  Location
                </th>
                <th className="font-bold text-center border-neutral-500 border-2 px-3">
                  Pest
                </th>
                <th className="font-bold text-center border-neutral-500 border-2 w-32 px-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((complaint) => (
                <tr
                  key={complaint._id}
                  className="h-8 text-[14px] border-b border-neutral-500 hover:bg-slate-200"
                >
                  <td className="px-3 border-r text-center border-neutral-500">
                    <Link to={`/complaint/${complaint._id}`} className="hover:text-blue-700 hover:font-medium">
                      {complaint.complaintDetails.number}
                    </Link>
                  </td>
                  <td className="px-3 border-r text-center border-neutral-500">
                    {`${complaint.location.floor}, ${complaint.location.subLocation}, ${complaint.location.location}`}
                  </td>
                  <td className="px-3 border-r text-center border-neutral-500">
                    {complaint.complaintDetails.service}
                  </td>
                  <td className="px-3 border-r text-center border-neutral-500">
                    <p
                      className={`inline-flex items-center rounded-md px-2 font-medium ring-1 ring-gray-300
                      ${progress(complaint.complaintDetails.status)} `}
                    >
                      {complaint.complaintDetails.status}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
export default Complaints;
