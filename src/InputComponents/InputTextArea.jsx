export default function InputTextArea(props) {
  return (
    <>
      <label htmlFor={props.id} className="form-label">
        {props.label}
      </label>

      <textarea
        data-testid={props.label}
        className="form-control"
        id={props.id}
        required
        rows="3"
        value={props.value}
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
