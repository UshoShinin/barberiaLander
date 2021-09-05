import classes from "./Fotos.module.css";
import ComboBox from "./../../components/ComboBox/ComboBox";
import { useReducer } from "react";
import { CSSTransition } from "react-transition-group";
import { getElementById } from "../../FuncionesAuxiliares/FuncionesAuxiliares";
const Fotos = (props) => {
  const initialState = {
    Actual: { value: props.fotos[0].foto, mostrar: true },
    Siguiente: { value: null, mostrar: false },
    canChange: true,
  };
  const heightCombo = document.getElementById("root").clientWidth >1400?8:4.8;
  const reducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_I":
        if (state.Actual.value === null) {
          return {
            canChange: false,
            Actual: { value: action.value, mostrar: false },
            Siguiente: { value: state.Siguiente.value, mostrar: false },
          };
        }
        return {
          Actual: { value: state.Actual.value, mostrar: false },
          Siguiente: { value: action.value, mostrar: false },
        };

      case "MOSTRAR_ACTUAL":
        return {
          Actual: { value: state.Actual.value, mostrar: true },
          Siguiente: { value: null, mostrar: false },
        };
      case "MOSTRAR_SIGUIENTE":
        return {
          Actual: { value: null, mostrar: false },
          Siguiente: { value: state.Siguiente.value, mostrar: true },
        };
      case "PERMITIR": {
        console.log("Podes tocar");
        return { ...state, canChange: true };
      }
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const Actualizar = () => {
    const imagenActual = getElementById(
      props.fotos,
      props.currentEmployee
    ).foto;
    if (
      state.canChange &&
      ((state.Actual.mostrar && state.Actual.value !== imagenActual) ||
        (state.Siguiente.mostrar && state.Siguiente.value !== imagenActual))
    ) {
      dispatch({
        type: "CHANGE_I",
        value: imagenActual,
      });
    }
  };
  Actualizar();

  const imagenes = (
    <>
      <CSSTransition
        key={1}
        in={state.Actual.mostrar}
        mountOnEnter
        unmountOnExit
        timeout={220}
        onExited={() => {
          console.log("MOSTRAR_SIGUIENTE");
          dispatch({ type: "MOSTRAR_SIGUIENTE" });
          setTimeout(() => {
            dispatch({ type: "PERMITIR" });
            Actualizar();
          }, 220);
        }}
        classNames={{
          enter: "",
          enterActive: `${classes.Open}`,
          exit: "",
          exitActive: `${classes.Close}`,
        }}
      >
        <img className={`${classes.foto}`} src={state.Actual.value} />
      </CSSTransition>
      <CSSTransition
        key={2}
        in={state.Siguiente.mostrar}
        mountOnEnter
        unmountOnExit
        timeout={220}
        onExited={() => {
          console.log("MOSTRAR_ACTUAL");
          dispatch({ type: "MOSTRAR_ACTUAL" });
          setTimeout(() => {
            dispatch({ type: "PERMITIR" });
            Actualizar();
          }, 220);
        }}
        classNames={{
          enter: "",
          enterActive: `${classes.Open}`,
          exit: "",
          exitActive: `${classes.Close}`,
        }}
      >
        <img className={`${classes.foto}`} src={state.Siguiente.value} />
      </CSSTransition>
    </>
  );
  const comboChangeHandler = (id) => {
    if (state.canChange) {
      dispatch({
        type: "CHANGE_I",
        value: getElementById(props.fotos, id).foto,
      });
      props.changeEmployee(id);
    }
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.marco}>
          <div className={classes.marcoIntermedio}>{imagenes}</div>
        </div>

        <div style={{ width: "60%", margin: "0 auto" }}>
          <ComboBox
            height={heightCombo}
            active={props.active}
            onClick={props.onClick}
            current={props.currentEmployee}
            onChange={comboChangeHandler}
            opciones={props.fotos}
          />
        </div>
      </div>
    </>
  );
};
export default Fotos;
