import { useForm, Controller } from "react-hook-form";
import InputRow from "../InputRow";
import Button from "../Button";
import { useState } from "react";
import Modal from "./Modal";
import { useRegisterClientMutation } from "../../redux/clientSlice";
import { toast } from "react-toastify";
import { toggleModal } from "../../redux/helperSlice";
import { useDispatch, useSelector } from "react-redux";

const NewClient = () => {
  const { openModal } = useSelector((store) => store.helper);
  const dispatch = useDispatch();

  const [addClient, { isLoading }] = useRegisterClientMutation();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    getValues,
    setValue,
    control,
  } = useForm({
    defaultValues: {
      name: "",
      address: "",
      contractNo: "",
      email: "",
      password: "",
    },
  });

  const submit = async (data) => {
    try {
      const res = await addClient(data).unwrap();
      toast.success(res.msg);
      dispatch(toggleModal());
      reset();
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.msg || error.error);
    }
  };

  const formBody = (
    <div className="grid grid-cols-2 gap-x-4">
      <div>
        <InputRow
          label="Client Name"
          id="name"
          errors={errors}
          register={register}
        />
        <p className="text-xs text-red-500 -bottom-4 pl-1">
          {errors.name && "Name is required"}
        </p>
      </div>
      <div>
        <InputRow
          label="Client Contract No"
          id="contractNo"
          errors={errors}
          register={register}
        />
        <p className="text-xs text-red-500 -bottom-4 pl-1">
          {errors.contractNo && "Contract No is required"}
        </p>
      </div>
      <div className="col-span-2">
        <InputRow
          label="Client Address"
          id="address"
          errors={errors}
          register={register}
        />
        <p className="text-xs text-red-500 -bottom-4 pl-1">
          {errors.address && "Address is required"}
        </p>
      </div>
      <div className="mb-3">
        <InputRow
          label="Admin Email"
          id="email"
          errors={errors}
          register={register}
        />
        <p className="text-xs text-red-500 -bottom-4 pl-1">
          {errors.email && "Email is required"}
        </p>
      </div>
      <div>
        <InputRow
          label="Admin Password"
          id="password"
          errors={errors}
          register={register}
        />
        <p className="text-xs text-red-500 -bottom-4 pl-1">
          {errors.password && "Password is required"}
        </p>
      </div>
    </div>
  );

  return (
    <div>
      <Button label="New Client" onClick={() => dispatch(toggleModal())} />
      {openModal && (
        <Modal
          onSubmit={handleSubmit(submit)}
          title="New Client"
          formBody={formBody}
          submitLabel="Add Client"
          handleClose={() => dispatch(toggleModal())}
          disabled={isLoading}
        />
      )}
    </div>
  );
};
export default NewClient;
