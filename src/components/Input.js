import React, { useRef, useImperativeHandle } from "react";
import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  const isNumber = false; //Por ahora no vamos a manejar el agragar los botones por errores que causa.
  /* const inputRef = useRef();
  const [number,setNumber] = useState(0); */
  /* const numberUp = () =>{
    setNumber(prevState =>(prevState+1));
  } */
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
      {isNumber && (
        <div
          /* onClick={numberUp} */ className={`${classes.button}  ${classes.up}`}
        ></div>
      )}
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
      {isNumber && <div className={`${classes.button}  ${classes.down}`}></div>}
    </div>
  );
});
export default Input;
