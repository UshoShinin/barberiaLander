import { useState, useReducer, useRef, useEffect } from "react";
import "./App.css";
import Button from "./components/Button";
import Input from "./components/Input";
import ComboBox from './components/ComboBox/ComboBox';
const inputReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.value, isValid: state.isValid };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 5 };
  }
  if (action.type === "RESET_IS_VALID") {
    return { value: state.value, isValid: null };
  }
  return { value: "", isValid: false };
};

function App() {
  const [formIsValid, setFormIsValid] = useState(false);

  const [inputState, dispatchInput] = useReducer(inputReducer, {
    value: "",
    isValid: null,
  });
  const inputRef = useRef();

  const { isValid: inputIsValid } = inputState; //Le asigno un alias a la variable de isValid del State del input.

  useEffect(() => {
    setFormIsValid(inputIsValid);
  }, [inputIsValid]);

  const inputChangeHandler = (event) => {
    dispatchInput({ type: "USER_INPUT", value: event.target.value });
  };

  const validateInputHandler = () => {
    dispatchInput({ type: "INPUT_BLUR" });
  };

  const resetIsValid = () =>{
    dispatchInput({type:'RESET_IS_VALID'});
  }

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      console.log("Soy Válido :D");
    } else {
      inputRef.current.focus();
    }
  };
  const alertaloca = () => {
    console.log("Alerta loca");
  };
  return (
    <div className="App">
      <form onSubmit={submitHandler}>
        {/* <Input
          ref={inputRef}
          isValid={inputIsValid}
          input={{
            id: 1,
            type: "text",
            value: inputState.value,
            placeholder: "Ingrese un texto",
            onChange: inputChangeHandler,
            onBlur: validateInputHandler,
            onFocus:resetIsValid,
          }}
        />
        <Button type="submit" action={alertaloca} color={""}>
          Aceptar
        </Button> */}
        <ComboBox title='Soy el título' description='Soy la descripción'/>
      </form>
    </div>
  );
}

export default App;
