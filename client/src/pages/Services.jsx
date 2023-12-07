import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { Button, InputRow, InputSelect } from "../components";
import { types } from "../utils/constData";
import { useAddServiceMutation } from "../redux/adminSlice";

const Services = () => {
  const [addService, { isLoading }] = useAddServiceMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
    watch,
  } = useForm({
    defaultValues: {
      serviceType: { label: "Service", value: "Service" },
      serviceName: "",
    },
  });

  const watchType = watch("serviceType");

  const submit = async (data) => {
    try {
      const res = await addService(data).unwrap();
      toast.success(res.msg);
      reset();
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.msg || error.error);
    }
  };

  return (
    <section>
      <form
        className="md:flex md:space-x-5 justify-center items-center"
        onSubmit={handleSubmit(submit)}
      >
        <div className="md:w-56">
          <Controller
            name="serviceType"
            control={control}
            rules={{ required: "Select type" }}
            render={({ field: { onChange, value, ref } }) => (
              <InputSelect
                options={types}
                onChange={onChange}
                value={value}
                label="Type"
              />
            )}
          />
          <p className="text-xs text-red-500 -bottom-4 pl-1">
            {errors.type?.message}
          </p>
        </div>
        <div className="pb-4 md:pb-0">
          <InputRow
            label="Name"
            id="serviceName"
            errors={errors}
            register={register}
          />
          <p className="text-xs text-red-500 -bottom-4 pl-1">
            {errors.name && "Name is required"}
          </p>
        </div>
        <div className="text-center">
          <Button
            type="submit"
            color="bg-green-500"
            label={`Add ${watchType.label}`}
            disabled={isLoading}
            height="h-10"
          />
        </div>
      </form>
      <hr className="h-px mt-4 mb-2 border-0 bg-gray-700" />
    </section>
  );
};
export default Services;
