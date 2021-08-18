import classes from './Border.module.css';
const Border = (props) => {
  return <div className={`${!props.disabled?classes.border:classes.borderDisabled} ${props.className}`}>{props.children}</div>;
};

export default Border