import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";

const Multiselect = ({ option, handleChange }) => {
  return (
    <MultiSelect
      onChange={handleChange}
      options={option}
      className="multiselect"
      required
    />
  );
};
export default Multiselect;
