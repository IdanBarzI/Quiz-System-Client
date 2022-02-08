import "./Input.css";
import Icon from "./Icon";

const Input = (props) => {
  return (
    <div
      className="form-input"
      data-theme={`${props.touched && props.hasError ? "error" : "no-error"}`}
    >
      <div className="field">
        <Icon i={props.i} />
        <div className="form">
          <input
            required
            value={props.value}
            name={props.name}
            onChange={props.onChange}
            onBlur={props.onBlur}
            type={props.type || "text"}
          />
          <label htmlFor={props.name} className="label-name">
            <span className="content-name">{props.name}</span>
          </label>
        </div>
      </div>
      {props.touched && props.hasError && (
        <p className="error-msg">{props.errorMsg}</p>
      )}
    </div>
  );
};

export default Input;
