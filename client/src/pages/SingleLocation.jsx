import { useSelector, useDispatch } from "react-redux";
import { useClientEmployeeSingleLocationQuery } from "../redux/locationSlice";
import { useParams } from "react-router-dom";
import {
  AlertMessage,
  Button,
  InputRow,
  InputSelect,
  Loading,
} from "../components";
import { MdAddCircle } from "react-icons/md";
import { toggleModal } from "../redux/helperSlice";
import { ComplaintModal } from "../components/modals";
import { useAllServiceQuery } from "../redux/adminSlice";
import { useNewComplaintMutation } from "../redux/serviceSlice";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState } from "react";

const SingleLocation = () => {
  const { id } = useParams();
  const { user } = useSelector((store) => store.helper);
  const { data, isLoading, error } = useClientEmployeeSingleLocationQuery(id);
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();
  const { isModalOpen } = useSelector((store) => store.helper);

  const { data: service, isFetching } = useAllServiceQuery();
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
    try {
      const form = new FormData();

      form.set("comment", data.comment);
      data.service.map(service => form.append("service", service))
      images.map(image => form.append("images", image))

      const res = await addComplaint(form).unwrap();
      toast.success(res.msg);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 pt-20 lg:ml-60 h-auto">
      {isLoading ? (
        <Loading />
      ) : (
        error && <AlertMessage>{error?.data?.msg || error.error}</AlertMessage>
      )}
      {data && (
        <div>
          <h4>Floor - {data.floor}</h4>
          <h4>Sub Location - {data.subLocation}</h4>
          <h4 className="mb-4">Location - {data.location}</h4>
          <Button
            label="New Complaint"
            small
            onClick={() =>
              dispatch(toggleModal({ name: "complaint", status: true }))
            }
          />
          <form onSubmit={handleSubmit(submit)} className="grid gap-y-3 mb-4">
            <Controller
              name="service"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <InputSelect
                  options={service?.services}
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
                <span className="text-sm font-normal">
                  (max 3 images allowed)
                </span>
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
            <Button label="Submit" type="submit" />
          </form>
        </div>
      )}
    </div>
  );
};
export default SingleLocation;
