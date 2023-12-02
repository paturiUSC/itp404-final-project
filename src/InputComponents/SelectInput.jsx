export default function SelectInput(props) {
  return (
    <>
      <label
        htmlFor={`${props.label.toLowerCase()}-selection`}
        className="form-label"
      >
        {props.label}
      </label>
      <select
        className="form-select form-select-md mb-3"
        id={`${props.label.toLowerCase()}-selection`}
        required
        aria-label=".form-select-lg example"
        value={props.value}
        onChange={(event) => {
          props.onChange(event);
        }}
      >
        {props.options.map((option) => {
          const optionValue = option[0];
          const optionDropdownValue = option[1];
          return (
            <option key={optionValue} value={optionValue}>
              {optionDropdownValue}
            </option>
          );
        })}
      </select>
    </>
  );
}
