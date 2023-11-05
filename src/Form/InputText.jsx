export default function InputText(props) {
    return (
        <>
          <label htmlFor={props.id} className="form-label">
            {props.label}
          </label>
          <input type="text" className="form-control" id={props.id} required value={props.value} placeholder={props.placeholder} onChange={(event) => {
            props.onChange(event);
          }}/>
          <div className="invalid-feedback">
            Please choose a {props.label}.
          </div>
        </>
    );
}