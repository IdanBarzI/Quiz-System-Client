import "./ToolTip.css";

const ToolTip = (props) => {
  return (
    <div class="tooltip">
      {props.children}
      <span class="tooltiptext">{props.text}</span>
    </div>
  );
};

export default ToolTip;
