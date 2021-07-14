import React, { useRef, useImperativeHandle } from "react";
import classes from "./TextArea.module.css";


const TextArea = React.forwardRef((props, ref) => {
  const inputRef = useRef();
  const activate = () => {
    inputRef.current.focus();
  };
  useImperativeHandle(ref, () => {
    return { focus: activate };
  });
  return (
    <div className={classes.div}>
      <textarea
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
export default TextArea;
