import { AiOutlineDelete } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button";

const DeleteModal = ({
  title,
  description,
  handleDelete,
  open,
  close,
  isLoading,
}) => {
  return (
    <>
      <div
        className={`fixed inset-0 flex justify-center items-center  transition-colors ${
          open ? "visible bg-black/20" : "invisible"
        }`}
      >
        <div
          className={`bg-white rounded-xl shadow p-5 transition-all ${
            open ? "scale-100 opacity-100" : "scale-125 opacity-0"
          }`}
        >
          <AiOutlineDelete className="text-red-500 mx-auto w-10 h-10" />
          <div className="mx-auto my-1">
            <h3 className="text-lg font-black text-gray-800">{title}</h3>
            <p className="text-sm text-gray-700 pt-1">
              Are you sure do you want to delete <b>{description}?</b>
            </p>
          </div>
          <div className="flex pt-2">
            <Button
              label="Delete"
              color="bg-red-600"
              onClick={handleDelete}
              disabled={isLoading}
              isLoading={isLoading}
              width="w-full"
            />

            <Button
              label="Cancel"
              color="bg-slate-500"
              onClick={close}
              disabled={isLoading}
              width="w-full"
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default DeleteModal;
