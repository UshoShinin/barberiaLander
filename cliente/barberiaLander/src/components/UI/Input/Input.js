import React, { useRef, useImperativeHandle } from "react";
import classes from "./Input.module.css";


const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef();
  const activate = () => {
    inputRef.current.focus();
  };
  useImperativeHandle(ref, () => {
    return { focus: activate };
  });
  return (
    <div className={classes.div}>
      {/* <label className={classes.label} htmlFor={props.input.id}>{props.label}</label> */}
      <input
        ref={inputRef}
        {...props.input}
        className={`${classes.input} ${
          props.isValid === false
            ? classes.invalid
            :(props.isValid === true)
            ? classes.valid
            : ""
        }`}
      />
    </div>
  );
});
export default Input;
