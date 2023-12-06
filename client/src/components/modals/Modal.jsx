import Button from "../Button";

const Modal = ({
  title,
  formBody,
  submitLabel,
  onSubmit,
  handleClose,
  disabled,
  isLoading,
}) => {
  return (
    <div className="fixed px-3 md:px-0 inset-0 w-full flex justify-center items-center visible bg-black/40">
      <div className="bg-white rounded-xl shadow min-h-[200px] max-h-[400px] overflow-y-auto p-5 border-gray-500 border-2">
        <h2 className="text-2xl font-medium text-center text-green-500 mb-3">
          {title}
        </h2>
        <form onSubmit={onSubmit}>
          <div>{formBody}</div>
          <div className="grid grid-cols-2">
            <Button
              type="submit"
              label={submitLabel}
              disabled={disabled}
              color="bg-green-500"
              isLoading={isLoading}
            />
            <Button
              label="Cancel"
              disabled={disabled}
              color="bg-red-500"
              onClick={handleClose}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export default Modal;
