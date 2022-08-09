const InputRow = ({
  label,
  type,
  value,
  name,
  handleChange,
  placeholder,
  required,
}) => {
  return (
    <div className="row g-3 align-items-center">
      <div className="col-auto ">
        <label className="col-form-label">
          <h4>{label}</h4>
        </label>
      </div>
      <div className="col">
        <input
          className="form-control"
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={handleChange}
          required={required}
        />
      </div>
    </div>
  );
};
export default InputRow;
