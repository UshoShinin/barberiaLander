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
  console.log(props.isValid);
  return (
    <div className={classes.div}>
      <label>Soy un texto</label>
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
