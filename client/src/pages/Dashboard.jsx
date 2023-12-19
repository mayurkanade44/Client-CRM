import { FaBug, FaUser } from "react-icons/fa";
import { IoLockClosed, IoLockOpen } from "react-icons/io5";

import { useSelector } from "react-redux";
import { AlertMessage, Loading } from "../components";
import { useClientAdminDashboardQuery } from "../redux/adminSlice";
import { Link } from "react-router-dom";
import { dateFormat, progress } from "../utils/helperFunctions";

const stats = [
  {
    id: 1,
    name: "Total Complaints",
    icon: <FaBug className="w-6 h-6" />,
    bg: "bg-gray-400",
  },
  {
    id: 2,
    name: "Open",
    icon: <IoLockOpen className="w-6 h-6" />,
    bg: "bg-blue-500",
  },
  {
    id: 3,
    name: "In Progress",
    icon: <FaUser className="h-6 w-6" />,
    bg: "bg-yellow-500",
  },
  {
    id: 4,
    name: "Closed",
    icon: <IoLockClosed className="w-6 h-6" />,
    bg: "bg-green-600",
  },
];

const Dashboard = () => {
  const { user } = useSelector((store) => store.helper);

  const { data, isLoading, error } = useClientAdminDashboardQuery();
  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        error && <AlertMessage>{error?.data?.msg || error.error}</AlertMessage>
      )}
      {!error && data && (
        <>
          <h1 className="text-2xl md:text-4xl font-semibold text-center ">
            Welcome {user.name}
          </h1>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item, index) => (
              <div
                key={item.id}
                className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 shadow-lg sm:px-6"
              >
                <dt>
                  <div className={`absolute rounded-md ${item.bg} p-3`}>
                    {item.icon}
                  </div>
                  <p className="ml-16 truncate font-medium text-gray-600">
                    {item.name}
                  </p>
                </dt>
                <dd className="ml-16 flex items-baseline pb-6">
                  <p className="text-xl font-semibold text-gray-900">
                    {data?.complaintData[index]}
                  </p>
                </dd>
              </div>
            ))}
          </div>
          <div className="overflow-y-auto my-4">
            <p className="mb-2 text-lg text-gray-600 font-medium mt-3">
              Latest Complaints Update
            </p>
            <table className="w-full border whitespace-nowrap border-neutral-500 bg-text">
              <thead>
                <tr className="h-8 w-full leading-none">
                  <th className="font-bold text-center border-neutral-500 w-40 border-2 px-3">
                    Complaint Number
                  </th>
                  <th className="font-bold text-center border-neutral-500 border-2 px-3">
                    Date
                  </th>
                  <th className="font-bold text-center border-neutral-500 border-2 px-3">
                    Location
                  </th>
                  <th className="font-bold text-center border-neutral-500 border-2 px-3">
                    Pest
                  </th>
                  <th className="font-bold text-center border-neutral-500 border-2 w-24 px-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.latestComplaints.map((complaint) => (
                  <tr
                    key={complaint._id}
                    className="h-8 text-[14px] border-b border-neutral-500 hover:bg-slate-200"
                  >
                    <td className="px-3 border-r text-center border-neutral-500">
                      <Link
                        to={`/complaint/${complaint._id}`}
                        className="hover:text-blue-700 hover:font-medium"
                      >
                        {complaint.complaintDetails.number}
                      </Link>
                    </td>
                    <td className="px-3 border-r text-center border-neutral-500">
                      {dateFormat(complaint.createdAt)}
                    </td>
                    <td className="px-3 border-r text-center border-neutral-500">
                      {user.role === "Admin"
                        ? complaint.client.name
                        : `${complaint.location.floor}, ${complaint.location.location}, ${complaint.location.subLocation}`}
                    </td>
                    <td className="px-3 border-r text-center border-neutral-500">
                      {complaint.complaintDetails.service?.join(", ")}
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
        </>
      )}
    </div>
  );
};
export default Dashboard;
