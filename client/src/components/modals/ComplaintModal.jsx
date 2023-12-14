import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { InputRow, InputSelect } from "..";
import { useAllServiceQuery } from "../../redux/adminSlice";
import { toggleModal } from "../../redux/helperSlice";
import {
  useNewComplaintMutation,
  useUpdateComplaintMutation,
} from "../../redux/serviceSlice";
import { jobStatus, operatorComment } from "../../utils/constData";
import FormModal from "./FormModal";

const ComplaintModal = ({ locationId }) => {
  const [images, setImages] = useState([]);

  const dispatch = useDispatch();
  const { isModalOpen, user } = useSelector((store) => store.helper);

  const { data, isLoading } = useAllServiceQuery();
  const [addComplaint, { isLoading: addLoading }] = useNewComplaintMutation();
  const [updateComplaint, { isLoading: updateLoading }] =
    useUpdateComplaintMutation();

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
      status: "",
    },
  });

  const submit = async (data) => {
    if (images.length < 1) return toast.error("Atleast one image is required");
    if (images.length > 2) return toast.error("Maximum 2 images are required");

    const form = new FormData();
    images.map((image) => form.append("images", image));
    if (user.type === "ClientEmployee") {
      form.set("comment", data.comment);
      data.service.map((service) => form.append("service", service.label));
    } else {
      form.set("status", data.status.label);
      form.set("comment", data.comment.label);
    }

    try {
      let res;
      if (user.type === "ClientEmployee") {
        res = await addComplaint({ id: locationId, form }).unwrap();
      } else if (user.type === "PestEmployee") {
        res = await updateComplaint({ id: locationId, form }).unwrap();
      }
      toast.success(res.msg);
      dispatch(toggleModal({ name: "complaint", status: false }));
      reset();
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.msg || error.error);
    }
  };

  const clientFormBody = (
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
      <div>
        <label
          htmlFor="images"
          className="text-md font-medium leading-6 mr-2 text-gray-900"
        >
          Images*{" "}
          <span className="text-sm font-normal">(max 2 images allowed)</span>
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
          placeholder="Exact location of pest found"
        />
        <p className="text-xs text-red-500 -bottom-4 pl-1">
          {errors.comment && "Comment is required"}
        </p>
      </div>
    </div>
  );

  const operatorFormBody = (
    <div className="grid gap-y-3 mb-4">
      <Controller
        name="comment"
        control={control}
        render={({ field: { onChange, value, ref } }) => (
          <InputSelect
            options={operatorComment}
            onChange={onChange}
            value={value}
            label="Job Comment"
          />
        )}
      />
      <Controller
        name="status"
        control={control}
        render={({ field: { onChange, value, ref } }) => (
          <InputSelect
            options={jobStatus}
            onChange={onChange}
            value={value}
            label="Complaint Status"
          />
        )}
      />
      <div>
        <label
          htmlFor="images"
          className="text-md font-medium leading-6 mr-2 text-gray-900"
        >
          Images*{" "}
          <span className="text-sm font-normal">(max 2 images allowed)</span>
        </label>
        <input
          type="file"
          onChange={(e) => setImages(Array.from(e.target.files))}
          multiple
          className="mt-0.5"
          accept="image/*"
        />
      </div>
    </div>
  );

  return (
    <div>
      <FormModal
        onSubmit={handleSubmit(submit)}
        title={`${user.type === "PestEmployee" ? "Update" : "New"} Complaint`}
        formBody={
          user.type === "ClientEmployee" ? clientFormBody : operatorFormBody
        }
        submitLabel={user.type === "PestEmployee" ? "Update" : "Add Complaint"}
        handleClose={() =>
          dispatch(toggleModal({ name: "complaint", status: false }))
        }
        disabled={addLoading || updateLoading}
        isLoading={addLoading || updateLoading}
        open={isModalOpen.complaint}
      />
    </div>
  );
};
export default ComplaintModal;
