import { useState, useReducer, useRef, useEffect } from "react";
import "./App.css";
import Button from "./components/Button";
import Input from "./components/Input";
import ComboBox from './components/ComboBox/ComboBox';
import Switch from './components/Switch/Switch';
import LoaddingSpinner from "./components/LoaddingSpinner/LoaddingSpinner";
import Footer from './components/Footer/Footer';
import Expenses from "./components/Lista/Expenses";
import Modal from './components/UI/Modal/Modal';
import Backdrop from './components/UI/Backdrop/Backdrop'

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
  const [mySwitch,setMySwitch] = useState(false);
  const [showModal,setShowModal] = useState(false);
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

  const switchHandler = () =>{
    setMySwitch(prevState=>{
      console.log(!prevState);
      return!prevState}
      );
    
  }
  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      console.log("Soy Válido :D");
    } else {
      if(!showModal){
        inputRef.current.focus();
      }
    }
  };
  const alertaloca = () => {
    console.log("Alerta loca");
  };

  const openModal = () => {
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
  }

  const DUMMY_COMBOBOX = [
    {id:1, title: "Soy la opcion 1" },
    {id:2, title: "Soy la opcion 2" },
    {id:3, title: "Soy la opcion 3" },
    {id:4, title: "Soy la opcion 4" },
    {id:5, title: "Soy la opcion 5" },
    {id:6, title: "Soy la opcion 6" },
    {id:7, title: "Soy la opcion 7" },
    {id:8, title: "Soy la opcion 8" },
    {id:9, title: "Soy la opcion 9" },
    {id:10, title: "Soy la opcion 10" },
    {id:11, title: "Soy la opcion 11" },
  ]
  return (
    <div className="App">
      <form onSubmit={submitHandler} className='fill-window'>
        <div style={{display:'flex',placeItems:'center',alignItems:'center',justifyContent: 'center',height:'100%'}}>
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
         */}
        
        <Button type="submit" action={openModal} color={""}>
          Aceptar
        </Button> 
        {/* <ComboBox opciones={DUMMY_COMBOBOX}/>
        <Switch active={mySwitch}onCheck={switchHandler}/>
        <LoaddingSpinner/> */}
        </div>
      </form>
      <Modal show={showModal} closed={closeModal}/>
      {showModal&& <Backdrop show={showModal}/>}
      <Footer/>
    </div>
  );
}

//<Expenses items={expenses} />
//const initialExpenses = [
//  { id: "e1", title: "Producto1", amount: 200},
//  { id: "e2", title: "Producto2", amount: 300},
//  { id: "e3", title: "Producto3", amount: 20},
//  { id: "e4", title: "Producto4", amount: 500},
//];


export default App;
