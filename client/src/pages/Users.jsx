import { Button } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../redux/helperSlice";
import { UserModal } from "../components/modals";

const Users = () => {
  const dispatch = useDispatch();
  const { isModalOpen } = useSelector((store) => store.helper);
  return (
    <div>
      <Button
        label="Register User"
        onClick={() => dispatch(toggleModal({ name: "user", status: true }))}
      />
      {isModalOpen.user && <UserModal />}
    </div>
  );
};
export default Users;
