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
      data.service.map((service) => form.append("service", service));
      images.map((image) => form.append("images", image));

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
          <ComplaintModal locationId={id} />
        </div>
      )}
    </div>
  );
};
export default SingleLocation;
