export default function InputText(props) {
    return (
        <>
          <label htmlFor={props.id} className="form-label">
            {props.label}
          </label>
          <input type="text" className="form-control" id={props.id} required value={props.value} placeholder={props.placeholder} onChange={(event) => {
            props.onChange(event);
          }}/>
          {props.validationError && <div className="text-danger">
            Please have a {props.label.toLowerCase()} without special characters or numbers.
          </div>}
        </>
    );
}