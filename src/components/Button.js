import classes from "./Button.module.css";
const Button = (props) => {
    const classesButton = `${classes.button} ${props.color==='red'?classes.red:''}`;
  return (
    <button
      type={props.type || "button"}
      onClick={props.action}
      className={classesButton}
    >
      {props.children}
    </button>
  );
};
export default Button;
