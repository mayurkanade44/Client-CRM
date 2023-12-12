import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAllServiceQuery } from "../../redux/adminSlice";
import { Button, InputRow, InputSelect, Loading } from "..";
import { useDispatch, useSelector } from "react-redux";
import FormModal from "./FormModal";
import { toggleModal } from "../../redux/helperSlice";
import { useState } from "react";
import { useNewComplaintMutation } from "../../redux/serviceSlice";

const ComplaintModal = ({ complaintDetails, locationId }) => {
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();
  const { isModalOpen } = useSelector((store) => store.helper);

  const { data, isLoading, isFetching } = useAllServiceQuery();
  const [addComplaint, { isLoading: addLoading }] = useNewComplaintMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm({
    defaultValues: {
      service: "",
      comment: "",
    },
  });

  const submit = async (data) => {
    console.log(data);

    const myForm = new FormData();
    myForm.set("comment", "mayur");

    console.log(myForm);
   

    try {
      const res = await addComplaint({ id: locationId, form: myForm }).unwrap();
      toast.success(res.msg);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.msg || error.error);
    }
  };

  const formBody = (
    <div className="grid gap-y-3 mb-4">
      <Controller
        name="service"
        control={control}
        render={({ field: { onChange, value, ref } }) => (
          <InputSelect
            options={data?.services}
            onChange={onChange}
            value={value}
            label="Services"
            isMulti={true}
          />
        )}
      />
      <div className="">
        <label
          htmlFor="images"
          className="text-md font-medium leading-6 mr-2 text-gray-900"
        >
          Images*{" "}
          <span className="text-sm font-normal">(max 3 images allowed)</span>
        </label>
        <input
          type="file"
          onChange={(e) => setImages(Array.from(e.target.files))}
          multiple
          className="mt-0.5"
          accept="image/*"
        />
      </div>
      <div>
        <InputRow
          label="Additional Comment"
          id="comment"
          errors={errors}
          register={register}
          disabled={isLoading}
          required={false}
        />
      </div>
    </div>
  );

  return (
    <div>
      <FormModal
        onSubmit={handleSubmit(submit)}
        title={`${complaintDetails ? "Update" : "New"} Complaint`}
        formBody={formBody}
        submitLabel={`${complaintDetails ? "Update" : "Add"} Complaint`}
        handleClose={() =>
          dispatch(toggleModal({ name: "complaint", status: false }))
        }
        disabled={isLoading}
        isLoading={isLoading}
        open={isModalOpen.complaint}
      />
    </div>
  );
};
export default ComplaintModal;
