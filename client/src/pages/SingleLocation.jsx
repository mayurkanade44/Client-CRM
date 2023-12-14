import { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  AlertMessage,
  Button,
  InputRow,
  InputSelect,
  Loading,
} from "../components";
import { ComplaintModal } from "../components/modals";
import { toggleModal } from "../redux/helperSlice";
import { useSingleLocationDetailsQuery } from "../redux/locationSlice";
import { dateFormat, progress } from "../utils/helperFunctions";
import { serviceActions } from "../utils/constData";
import { toast } from "react-toastify";
import { useRegularServiceMutation } from "../redux/serviceSlice";

const SingleLocation = () => {
  const { id } = useParams();
  const { user } = useSelector((store) => store.helper);
  const [regular, setRegular] = useState(false);
  const dispatch = useDispatch();

  const { data, isLoading, error } = useSingleLocationDetailsQuery(id);
  const [regularService] = useRegularServiceMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm({
    defaultValues: {
      service: [
        {
          action: "",
          image: "",
        },
      ],
    },
  });

  const { fields } = useFieldArray({
    name: "service",
    control,
  });

  const submit = async (value) => {
    if (value.service.filter((item) => item.action).length < 1) {
      return toast.error("One service action is required");
    }

    const form = new FormData();

    value.service.map((item, index) => {
      return (
        item.action &&
        (form.append("name", data.location?.service[index]?.label),
        form.append("action", item.action.label),
        form.append("upload", item.image ? true : false),
        form.append("images", item.image))
      );
    });

    try {
      const res = await regularService({ id, form }).unwrap();
      toast.success(res.msg);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.msg || error.error);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        error && <AlertMessage>{error?.data?.msg || error.error}</AlertMessage>
      )}
      {data && (
        <div>
          <h4>Floor - {data.location.floor}</h4>
          <h4>Location - {data.location.location}</h4>
          <h4 className="mb-2">Sub Location - {data.location.subLocation}</h4>
          {user.type === "ClientEmployee" && (
            <>
              <Button
                label="New Complaint"
                onClick={() =>
                  dispatch(toggleModal({ name: "complaint", status: true }))
                }
              />
              <ComplaintModal locationId={id} />
            </>
          )}
          {data.complaints?.length > 0 && (
            <div className="overflow-y-auto my-3">
              <table className="w-full border whitespace-nowrap border-neutral-500 bg-text">
                <thead>
                  <tr className="h-8 w-full leading-none">
                    <th className="font-bold text-center border-neutral-500 w-40 border-2 px-3">
                      Complaint Number
                    </th>
                    <th className="font-bold text-center border-neutral-500 border-2 px-3">
                      Date
                    </th>

                    <th className="font-bold text-center border-neutral-500 border-2 px-3">
                      Pest
                    </th>
                    <th className="font-bold text-center border-neutral-500 border-2 w-24 px-3">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.complaints?.map((complaint) => (
                    <tr
                      key={complaint._id}
                      className="h-8 text-[14px] border-b border-neutral-500 hover:bg-slate-200"
                    >
                      <td className="px-3 border-r text-center border-neutral-500">
                        <Link
                          to={`/complaint/${complaint._id}`}
                          className="hover:text-blue-700 hover:font-medium"
                        >
                          {complaint.complaintDetails.number}
                        </Link>
                      </td>
                      <td className="px-3 border-r text-center border-neutral-500">
                        {dateFormat(complaint.createdAt)}
                      </td>

                      <td className="px-3 border-r text-center border-neutral-500">
                        {complaint.complaintDetails.service?.join(", ")}
                      </td>
                      <td className="px-3 border-r text-center border-neutral-500">
                        <p
                          className={`inline-flex items-center rounded-md px-2 font-medium ring-1 ring-gray-300
                      ${progress(complaint.complaintDetails.status)} `}
                        >
                          {complaint.complaintDetails.status}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <hr className="h-px my-4 border-0 bg-gray-700" />
          {user.type === "PestEmployee" && (
            <div className="flex justify-center items-center">
              {!regular ? (
                <Button
                  label="Regular Service"
                  onClick={() => setRegular(true)}
                />
              ) : (
                <form
                  onSubmit={handleSubmit(submit)}
                  className="w-[70%] md:w-[40%]"
                >
                  {data.location?.service?.map((service, index) => (
                    <div key={index} className="mt-4">
                      <p className="text-center font-medium text-lg">
                        {service.label}
                      </p>
                      {fields.map((field) => {
                        return (
                          <div key={field.id}>
                            <Controller
                              name={`service[${index}].action`}
                              control={control}
                              render={({ field: { onChange, value, ref } }) => (
                                <InputSelect
                                  options={serviceActions}
                                  onChange={onChange}
                                  value={value}
                                  label="Services Action"
                                />
                              )}
                            />
                            <Controller
                              control={control}
                              name={`service[${index}].image`}
                              render={({
                                field: { value, onChange, ...field },
                              }) => {
                                return (
                                  <input
                                    {...field}
                                    onChange={(event) => {
                                      onChange(event.target.files[0]);
                                    }}
                                    type="file"
                                    id={`service[${index}].image`}
                                    className="mt-2"
                                  />
                                );
                              }}
                            />
                          </div>
                        );
                      })}
                      <hr className="h-px mt-5 mb-4 border-0 bg-gray-700" />
                    </div>
                  ))}
                  <Button
                    label="Submit"
                    type="submit"
                    width="w-full"
                    height="h-9"
                  />
                </form>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default SingleLocation;
