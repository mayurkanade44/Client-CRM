import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { InputRow } from "..";
import { useDispatch, useSelector } from "react-redux";
import FormModal from "./FormModal";
import { toggleModal } from "../../redux/helperSlice";
import {
  useChangePasswordMutation,
  useRegisterUserMutation,
} from "../../redux/adminSlice";

const UserModal = ({ userDetails }) => {
  const dispatch = useDispatch();
  const { isModalOpen, user } = useSelector((store) => store.helper);

  const [addUser, { isLoading: addLoading }] = useRegisterUserMutation();
  const [changePassword, { isLoading: updateLoading }] =
    useChangePasswordMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: userDetails || {
      name: "",
      department: "",
      email: "",
      password: "",
    },
  });

  const submit = async (data) => {
    let res;
    if (data.password.length < 5)
      return toast.error("Password must be of 5 characters or greater");
    if (user.role === "Admin") data.department = "Pest Control";
    try {
      if (userDetails) {
        res = await changePassword({
          id: userDetails._id,
          data,
        }).unwrap();
      } else {
        res = await addUser(data).unwrap();
      }
      toast.success(res.msg);
      reset();
      dispatch(toggleModal({ name: "user", status: false }));
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.msg || error.error);
    }
  };

  const formBody = (
    <div className="grid gap-x-4 mb-4 w-[300px]">
      <div>
        <InputRow
          label="Full Name"
          id="name"
          errors={errors}
          register={register}
          disabled={addLoading || userDetails}
        />
        <p className="text-xs text-red-500 -bottom-4 pl-1">
          {errors.name && "Name is required"}
        </p>
      </div>
      {user.role === "ClientAdmin" && (
        <div>
          <InputRow
            label="Department"
            id="department"
            errors={errors}
            register={register}
            disabled={addLoading || userDetails}
          />
          <p className="text-xs text-red-500 -bottom-4 pl-1">
            {errors.department && "Department is required"}
          </p>
        </div>
      )}
      <div>
        <InputRow
          label="Email"
          id="email"
          errors={errors}
          register={register}
          disabled={addLoading || userDetails}
          type="email"
        />
        <p className="text-xs text-red-500 -bottom-4 pl-1">
          {errors.email && "Email is required"}
        </p>
      </div>
      <div>
        <InputRow
          label="Password"
          id="password"
          errors={errors}
          register={register}
          disabled={addLoading}
        />
        <p className="text-xs text-red-500 -bottom-4 pl-1">
          {errors.password && "Password is required"}
        </p>
      </div>
    </div>
  );

  return (
    <FormModal
      onSubmit={handleSubmit(submit)}
      title={`${userDetails ? "Update" : "Register"} User`}
      formBody={formBody}
      submitLabel={userDetails ? "Update Password" : "Add User"}
      handleClose={() => dispatch(toggleModal({ name: "user", status: false }))}
      disabled={addLoading}
      isLoading={addLoading}
      open={isModalOpen.user}
    />
  );
};
export default UserModal;
