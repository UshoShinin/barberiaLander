import classes from "./Slider.module.css";
import classesAnim from "./Animations.module.css";
import one from "../../../recursos/ImagenesPrueba/1.png";
import two from "../../../recursos/ImagenesPrueba/2.png";
import three from "../../../recursos/ImagenesPrueba/3.png";
import four from "../../../recursos/ImagenesPrueba/4.png";
import five from "../../../recursos/ImagenesPrueba/5.png";
import six from "../../../recursos/ImagenesPrueba/6.png";
import mantel from "../../../recursos/ImagenesPrueba/mantel.png";
import pelu from "../../../recursos/ImagenesPrueba/PeluqueriaDeEjemplo.jpg";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useReducer } from "react";
const Slider = (props) => {
  const imagenes = [pelu,one,two,three,four,five,six,mantel];
  let posiciones = [];
  for(let i = 0;i<imagenes.length;i++){
    posiciones.push(i);
  }
  const initialState = {
    posiciones:[...posiciones],
    imagenes:[...imagenes],
    movimiento: 0,
    A: { value: 0, active: true },
    B: { value: 0, active: false },
    
  };
  const reducer = (state, action) => {
    let newB;
    switch (action.type) {
      case "RIGHT": {
        newB = state.A.value+1;
        newB = newB===state.imagenes.length?0:newB;
        return {...state, movimiento:1,A:{...state.A,active:false}, B: {value:newB, active: true } };
      }
      case "LEFT": {
        newB = state.A.value-1;
        newB = newB<0?state.imagenes.length-1:newB;
        return {...state, movimiento:-1,A:{...state.A,active:false}, B: {value:newB, active: true } };
      }
      case 'ACTUALIZAR':{
        return {...state,movimiento:0,A:{value:state.B.value,active:true},B:{...state.B,active:false}};
      }
      case 'JUMP':{
        if(state.A.value===action.value) return{...state};
        const movimiento = state.A.value<action.value?1:-1;
        newB=action.value;
        return {...state, movimiento:movimiento,A:{...state.A,active:false}, B: {value:newB, active: true } };
      }
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state.posiciones);
  return (
    <div className={classes.Slider}>
      <button onClick={state.movimiento===0?() => {dispatch({ type: "LEFT" });}:null}
              className={classes.Left}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <button
        onClick={state.movimiento===0?() => {dispatch({ type: "RIGHT" });}:null}
        className={classes.Right}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
      <div className={classes.Content}>
        <CSSTransition
          in={state.A.active}
          timeout={2000}
          classNames={{
            enter: "",
            enterActive: "",
            exit: "",
            exitActive: `${state.movimiento>0?classesAnim.rightEnter:classesAnim.leftEnterA}`,
          }}
          onExited={() => {
            dispatch({ type: "ACTUALIZAR" });
          }}
        >
          <img src={state.imagenes[state.A.value]} />
        </CSSTransition>
        <CSSTransition
          in={state.B.active}
          timeout={2000}
          classNames={{
            enter:'',
            enterActive: `${state.movimiento>0?classesAnim.rightEnter:classesAnim.leftEnterB}`,
            exit: "",
            exitActive: "",
          }}
        >
          <img src={state.imagenes[state.B.value]} />
        </CSSTransition>
      </div>
      <div className={classes.miniNav}>
          {state.posiciones.map((p)=><div onClick={state.movimiento===0?() => {dispatch({ type: "JUMP",value:p });}:null} key={p} className={`${p===state.B.value?classes.active:classes.point}`}></div>
          )}
        </div>
    </div>
  );
};

export default Slider;
