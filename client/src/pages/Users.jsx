import { AlertMessage, Button, Loading } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../redux/helperSlice";
import { DeleteModal, UserModal } from "../components/modals";
import { useAllUserQuery, useDeleteUserMutation } from "../redux/adminSlice";
import { useState } from "react";
import { toast } from "react-toastify";

const Users = () => {
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState(null);
  const { isModalOpen } = useSelector((store) => store.helper);

  const { data, isLoading, isFetching, error } = useAllUserQuery();
  const [deleteUser, { isLoading: deleteLoading }] = useDeleteUserMutation();

  const handleUpdateUserModal = (user) => {
    setUserDetails(user);
    dispatch(toggleModal({ name: "user", status: true }));
  };

  const handleNewUserModal = () => {
    setUserDetails(null);
    dispatch(toggleModal({ name: "user", status: true }));
  };

  const handleDelete = async () => {
    try {
      const res = await deleteUser(isModalOpen.delete).unwrap();
      toast.success(res.msg);
      dispatch(toggleModal({ name: "delete", status: false }));
    } catch (error) {
      console.log(error);
      toast.error("Error");
    }
  };

  return (
    <>
      {isLoading || isFetching ? (
        <Loading />
      ) : (
        error && <AlertMessage>{error?.data?.msg || error.error}</AlertMessage>
      )}
      {!error && data && (
        <div>
          <Button
            label="Register User"
            height="h-10"
            onClick={() => handleNewUserModal()}
          />
          {isModalOpen.user && <UserModal userDetails={userDetails} />}
          <div className="overflow-y-auto my-4">
            <table className="w-full border whitespace-nowrap border-neutral-500 bg-text">
              <thead>
                <tr className="h-10 w-full text-md md:text-lg leading-none">
                  <th className="font-bold text-center border-neutral-500 border-2 px-3">
                    Name
                  </th>
                  <th className="font-bold text-center border-neutral-500 border-2 w-32 px-3">
                    Email
                  </th>
                  <th className="font-bold text-center border-neutral-500 border-2 px-3">
                    Department
                  </th>
                  <th className="font-bold max-w-[100px] text-center border-neutral-500 border-2 w-40 px-2">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="w-full">
                {data.map((user) => (
                  <tr
                    key={user._id}
                    className="h-10 text-sm leading-none bg-text border-b border-neutral-500 hover:bg-slate-200"
                  >
                    <td className="px-3 border-r font-normal border-neutral-500">
                      {user.name}
                    </td>
                    <td className="px-3 border-r font-normal border-neutral-500">
                      {user.email}
                    </td>
                    <td className="px-3 border-r font-normal border-neutral-500">
                      {user.department}
                    </td>
                    <td className="px-3 flex border-r font-normal border-neutral-500">
                      <Button
                        label="Password"
                        color="bg-indigo-500"
                        onClick={() => handleUpdateUserModal(user)}
                      />
                      {user.role !== "ClientAdmin" && (
                        <DeleteModal
                          label="Delete"
                          title={`Delete ${user.name}`}
                          description={`user ${user.name}`}
                          handleDelete={handleDelete}
                          isLoading={deleteLoading}
                          id={user._id}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};
export default Users;
