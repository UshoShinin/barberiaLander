import classes from "./Fotos.module.css";
import ComboBox from "../ComboBox/ComboBox";
import { useReducer, useState } from "react";
import { CSSTransition } from "react-transition-group";

const Fotos = (props) => {
  let initialState = [];
  props.fotos.forEach((mFoto) => {
    initialState.push({
      id: mFoto.id,
      mostrar: false,
    });
  });
  const [index, setIndex] = useState(1);

  initialState[index - 1].mostrar = true;

  const reducer = (state, action) => {
    switch (action.type) {
      case "change":
        return state.map((foto) => {
          if (foto.id === action.payload.id) {
            foto.mostrar = !foto.mostrar;
          }
          return foto;
        });
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const imagenes = props.fotos.map((mFoto) => (
    <CSSTransition
    key={mFoto.id}
      in={state[mFoto.id - 1].mostrar}
      mountOnEnter
      unmountOnExit
      timeout={220}
      onExited={() => {
        dispatch({ type: "change", payload: { id: index } });
      }}
      classNames={{
        enter: "",
        enterActive: `${classes.Open}`,
        exit: "",
        exitActive: `${classes.Close}`,
      }}
    >
      <img className={`${classes.foto}`} src={mFoto.foto} />
    </CSSTransition>
  ));

  const comboChangeHandler = (id) => {
    dispatch({ type: "change", payload: { id: index } });
    setIndex(id);
    props.changeEmployee(id-1);
  };
  return (
    <>
      <div className={classes.container}>
        <div className={classes.marco}>
          <div className={classes.marcoIntermedio}>{imagenes}</div>
        </div>
        <div style={{ width: "60%", margin: "0 auto" }}>
          <ComboBox onChange={comboChangeHandler} opciones={props.fotos} />
        </div>
      </div>
    </>
  );
};
export default Fotos;
