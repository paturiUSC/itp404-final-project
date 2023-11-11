import { useRef, useEffect } from "react";

export default function Checkbox(props) {
  const { label, checked, isIndeterminate, onChange } = props;
  const checkboxRef = useRef();

  useEffect(() => {
    checkboxRef.current.indeterminate = isIndeterminate;
  }, [isIndeterminate]);

  return (
    <label>
      <input
        type="checkbox"
        ref={checkboxRef}
        checked={checked}
        onChange={(event) => {
          onChange(event.target.checked);
        }}
      />
      {label}
    </label>
  );
}
