import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { MdAddCircle } from "react-icons/md";
import { toast } from "react-toastify";
import { useAllServiceQuery } from "../../redux/adminSlice";
import { useAddLocationMutation } from "../../redux/locationSlice";
import { types } from "../../utils/constData";
import Button from "../Button";
import InputRow from "../InputRow";
import InputSelect from "../InputSelect";
import FormModal from "./FormModal";

const Location = ({ clientId }) => {
  const [open, setOpen] = useState(false);
  const [allServices, setServices] = useState([]);
  const [allProducts, setProducts] = useState([]);

  const [add, { isLoading: addLoading }] = useAddLocationMutation();
  const { data, isLoading, isFetching, error } = useAllServiceQuery();

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

  useEffect(() => {
    if (data) {
      setServices(data.service);
      setProducts(data.product);
    }
  }, [data]);

  const submit = async (data) => {
    data.clientId = clientId;
    try {
      const res = await add(data).unwrap();
      toast.success(res.msg);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.msg || error.error);
    }
  };

  const formBody = (
    <div className="grid grid-cols-2 gap-x-4 mb-4">
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
      <div className="col-span-2">
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
          rules={{ required: "Select service" }}
          render={({ field: { onChange, value, ref } }) => (
            <InputSelect
              options={allServices}
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
          rules={{ required: "Select product" }}
          render={({ field: { onChange, value, ref } }) => (
            <InputSelect
              options={allProducts}
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
          //   disabled={isLoading}
          //   isLoading={isLoading}
          open={open}
        />
      </div>
    </div>
  );
};
export default Location;
