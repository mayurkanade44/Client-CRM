const InputRow = ({
  label,
  type,
  value,
  name,
  handleChange,
  placeholder,
  required,
  labelW,
}) => {
  return (
    <div className="row align-items-center">
      <div className={`col-${labelW}`}>
        <label className="col-form-label mobile-sr">
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
