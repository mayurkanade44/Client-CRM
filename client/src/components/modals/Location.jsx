import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { MdAddCircle } from "react-icons/md";
import { toast } from "react-toastify";
import { useAllServiceQuery } from "../../redux/adminSlice";
import { useAddLocationMutation } from "../../redux/locationSlice";
import { Button, InputRow, InputSelect } from "..";
import FormModal from "./FormModal";

const Location = ({ clientId }) => {
  const [open, setOpen] = useState(false);

  const [add, { isLoading: addLoading }] = useAddLocationMutation();
  const { data, isLoading, isFetching, error } = useAllServiceQuery(
    {},
    { skip: !open }
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
    setValue,
  } = useForm({
    defaultValues: {
      floor: "",
      subLocation: "",
      location: "",
      service: "",
      product: "",
    },
  });

  const submit = async (data) => {
    if (data.service.length < 1 && data.product.length < 1) {
      toast.error("Please choose Service/Product");
      return;
    }

    data.clientId = clientId;
    try {
      const res = await add(data).unwrap();
      toast.success(res.msg);
      reset();
      setOpen(false);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.msg || error.error);
    }
  };

  const formBody = (
    <div className="grid md:grid-cols-2 gap-x-4 mb-4">
      <div>
        <InputRow
          label="Floor"
          id="floor"
          errors={errors}
          register={register}
        />
        <p className="text-xs text-red-500 -bottom-4 pl-1">
          {errors.floor && "Floor is required"}
        </p>
      </div>
      <div>
        <InputRow
          label="Sub Location"
          id="subLocation"
          errors={errors}
          register={register}
        />
        <p className="text-xs text-red-500 -bottom-4 pl-1">
          {errors.subLocation && "Sub location is required"}
        </p>
      </div>
      <div className="md:col-span-2">
        <InputRow
          label="Location"
          id="location"
          errors={errors}
          register={register}
        />
        <p className="text-xs text-red-500 -bottom-4 pl-1">
          {errors.location && "Location is required"}
        </p>
      </div>
      <div>
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
        <p className="text-xs text-red-500 -bottom-4 pl-1">
          {errors.serviceType?.message}
        </p>
      </div>
      <div>
        <Controller
          name="product"
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <InputSelect
              options={data?.products}
              onChange={onChange}
              value={value}
              label="Products"
              isMulti={true}
            />
          )}
        />
        <p className="text-xs text-red-500 -bottom-4 pl-1">
          {errors.serviceType?.message}
        </p>
      </div>
    </div>
  );

  return (
    <div>
      <div>
        <Button
          height="h-10"
          color="bg-green-600"
          label={
            <div className="flex items-center">
              <MdAddCircle className="w-6 h-6 pr-1" /> New Location
            </div>
          }
          onClick={() => setOpen(true)}
        />
        <FormModal
          onSubmit={handleSubmit(submit)}
          title="New Location"
          formBody={formBody}
          submitLabel="Add Location"
          handleClose={() => setOpen(false)}
          disabled={addLoading}
          isLoading={addLoading}
          open={open}
        />
      </div>
    </div>
  );
};
export default Location;
