import "./Input.css";
import Icon from "./Icon";

const Input = (props) => {
  return (
    <div
      className="form-input"
      data-theme={`${props.enteredvalueIsValid ? "no-error" : "error"}`}
    >
      <div className="field">
        <Icon i={props.i} />
        <div className="form">
          <input
            required
            value={props.value}
            name={props.name}
            onChange={props.onChange}
            type={props.type || "text"}
          />
          <label for={props.name} className="label-name">
            <span className="content-name">{props.name}</span>
          </label>
        </div>
      </div>
      {!props.enteredvalueIsValid && (
        <p className="error-msg">{props.errorMsg}</p>
      )}
    </div>
  );
};

export default Input;
