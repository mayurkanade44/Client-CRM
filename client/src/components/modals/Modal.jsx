import Button from "../Button";


const Modal = ({ title, formBody, submitLabel, onSubmit, handleClose, disabled }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center visible bg-black/20">
      <div className="bg-white rounded-xl shadow p-5">
        <h2 className="text-2xl font-medium text-center text-green-500 mb-3">
          {title}
        </h2>
        <form onSubmit={onSubmit}>
          <div>{formBody}</div>
          <div className="grid grid-cols-2">
            <Button type="submit" label={submitLabel} disabled={disabled} color="bg-green-500" />
            <Button label="Cancel" disabled={disabled} color="bg-red-500" onClick={handleClose} />
          </div>
        </form>
      </div>
    </div>
  );
};
export default Modal;
