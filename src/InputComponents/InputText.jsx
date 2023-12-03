export default function InputText(props) {
  return (
    <>
      <label htmlFor={props.id} className="form-label">
        {props.label}
      </label>
      <input
        data-testid="input-text"
        type="text"
        className="form-control"
        id={props.id}
        value={props.value}
        placeholder={props.placeholder}
        onChange={(event) => {
          props.onChange(event);
        }}
      />
      <div>
        {props.validationError && (
          <div className="text-danger">{props.validationError()}</div>
        )}
      </div>
    </>
  );
}
