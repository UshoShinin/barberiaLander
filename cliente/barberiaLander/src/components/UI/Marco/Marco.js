import classes from "./Marco.module.css";
const Marco = (props) => {
  return (
    <div className={`${props.className!==undefined?props.className:''} ${classes.ajuste}`}>
      {props.children}
    </div>
  );
};
export default Marco;
