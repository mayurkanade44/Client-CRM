import { Link } from "react-router-dom";
import { AlertMessage, Button, Loading } from "../components";
import NewClient from "../components/modals/NewClient";
import { useAllClientsQuery } from "../redux/clientSlice";

const Client = () => {
  const { data, isLoading, isFetching, error } = useAllClientsQuery();
  return (
    <>
      {isLoading || isFetching ? (
        <Loading />
      ) : (
        error && <AlertMessage>{error?.data?.msg || error.error}</AlertMessage>
      )}
      <div>
        <NewClient />
        <div className="overflow-y-auto my-4">
          <table className="w-full border whitespace-nowrap border-neutral-500  bg-white">
            <thead>
              <tr className="h-12 w-full text-md leading-none text-gray-600">
                <th className="font-bold text-left  border-neutral-800 border-2 px-3">
                  Client Name
                </th>
                <th className="font-bold text-left  border-neutral-800 border-2 px-3">
                  Address
                </th>
                <th className="font-bold text-center  border-neutral-800 border-2 w-32 px-3">
                  Contract No
                </th>
                <th className="font-bold max-w-[100px] text-center  border-neutral-800 border-2 w-40 px-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="w-full">
              {data?.map((client) => (
                <tr
                  key={client._id}
                  className="h-12 text-sm leading-none text-gray-700 border-b border-neutral-500 bg-white hover:bg-gray-100"
                >
                  <td className="px-3 border-r font-normal border-neutral-500">
                    {client.name}
                  </td>
                  <td className="px-3 border-r font-normal border-neutral-500">
                    {client.address}
                  </td>
                  <td className="px-3 border-r font-normal text-center border-neutral-500">
                    {client.contractNo}
                  </td>
                  <td className="px-3 border-r font-normal text-center border-neutral-500">
                    <Link to={`/dashboard/client/${client._id}`}>
                      <Button label="Details" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default Client;
