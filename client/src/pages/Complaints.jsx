import { Link } from "react-router-dom";
import { AlertMessage, Button, Loading } from "../components";
import { useAllComplaintsQuery } from "../redux/serviceSlice";
import { dateFormat, progress } from "../utils/helperFunctions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggleModal } from "../redux/helperSlice";
import { ComplaintModal } from "../components/modals";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";

const Complaints = () => {
  const [page, setPage] = useState(1);
  const [tempSearch, setTempSearch] = useState("");
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { user, isModalOpen } = useSelector((store) => store.helper);

  const { data, isLoading, isFetching, error } = useAllComplaintsQuery({
    search,
    page
  });

  
  const pages = Array.from({ length: data?.pages }, (_, index) => index + 1);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(tempSearch);
  };

  const clearSearch = () => {
    setTempSearch("");
    setSearch("");
  };
  return (
    <>
      {isLoading || isFetching ? (
        <Loading />
      ) : (
        error && <AlertMessage>{error?.data?.msg || error.error}</AlertMessage>
      )}
      <div className="md:flex justify-around">
        <form onSubmit={handleSearch} className="flex items-center">
          <div className="flex items-center px-1 bg-white border w-full md:w-60 lg:w-80 rounded border-gray-300 mr-3">
            <AiOutlineSearch />
            <input
              type="text"
              className="py-1 md:py-1.5 pl-1 w-full focus:outline-none text-sm rounded text-gray-600 placeholder-gray-500"
              placeholder="Complaint number"
              value={tempSearch}
              onChange={(e) => setTempSearch(e.target.value)}
            />
            {tempSearch && (
              <button type="button" onClick={clearSearch}>
                <AiOutlineClose color="red" />
              </button>
            )}
          </div>
          <Button type="submit" label="Search" color="bg-black" height="h-8" />
        </form>
        <Button
          label="New Complaint"
          height="h-9"
          onClick={() =>
            dispatch(toggleModal({ name: "complaint", status: true }))
          }
        />
      </div>
      {isModalOpen.complaint && <ComplaintModal locationId="New Complaint" />}
      {data?.complaints?.length < 1 && (
        <p className="text-center pt-2 text-red-600 font-semibold text-lg">
          No Complaint Found
        </p>
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
              {data.complaints.map((complaint) => (
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
          {pages.length > 1 && (
            <nav className="mb-4">
              <ul className="list-style-none flex justify-center mt-2">
                {pages.map((item) => (
                  <li className="pr-1" key={item}>
                    <button
                      className={`relative block rounded px-3 py-1.5 text-sm transition-all duration-30  ${
                        page === item ? "bg-blue-400" : "bg-neutral-700"
                      } text-white hover:bg-blue-400`}
                      onClick={() => setPage(item)}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      )}
    </>
  );
};
export default Complaints;
