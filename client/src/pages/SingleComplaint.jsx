import { useParams } from "react-router-dom";
import { useSingleComplaintQuery } from "../redux/serviceSlice";
import { AlertMessage, Button, Loading } from "../components";
import { progress } from "../utils/helperFunctions";
import { useSelector } from "react-redux";

const SingleComplaint = () => {
  const { user } = useSelector((store) => store.helper);
  const { id } = useParams();

  const { data, isLoading, error } = useSingleComplaintQuery(id);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        error && <AlertMessage>{error?.data?.msg || error.error}</AlertMessage>
      )}
      {data && (
        <div>
          <div className="flex justify-between md:block">
            <p>Complaint Number: {data.complaintDetails.number}</p>
            <div>
              <span className="pr-2 hidden md:inline-flex">Status:</span>
              <span
                className={`inline-flex items-center rounded-md px-2 font-medium ring-1 ring-gray-300
                      ${progress(data.complaintDetails.status)} `}
              >
                {data.complaintDetails.status}
              </span>
            </div>
          </div>
          <h4>Raised By: {data.complaintDetails.employeeName}</h4>
          <h4>Pest: {data.complaintDetails.service}</h4>
          <h4>Comment: {data.complaintDetails.comment}</h4>
          <div>
            Images:{" "}
            <div className="flex space-x-5">
              {data.complaintDetails.image.map((image) => (
                <img src={image} className="w-40 h-40" />
              ))}
            </div>
          </div>
          {data.complaintUpdate.length === 0 && (
            <div className="overflow-y-auto my-4">
              <table className="w-full border whitespace-nowrap border-neutral-500 bg-text">
                <thead>
                  <tr className="h-8 w-full leading-none">
                    <th className="font-bold text-center border-neutral-500 w-40 border-2 px-3">
                      Date
                    </th>
                    <th className="font-bold text-center border-neutral-500 border-2 px-3">
                      Image
                    </th>
                    <th className="font-bold text-center border-neutral-500 border-2 px-3">
                      Operator Comment
                    </th>
                    <th className="font-bold text-center border-neutral-500 border-2 w-32 px-3">
                      Updated By
                    </th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          )}
          {user.type === "PestEmployee" && <Button label='Update' />}
        </div>
      )}
    </div>
  );
};
export default SingleComplaint;
