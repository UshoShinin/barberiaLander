import classes from "./Fotos.module.css";
import ComboBox from "./../../components/ComboBox/ComboBox";
import { useReducer } from "react"; 
import { CSSTransition } from "react-transition-group";
import { getElementById } from "./FuncionesAuxiliares";
const Fotos = (props) => {
  const initialState = {
    Actual: { value: props.fotos[0].foto, mostrar: true },
    Siguiente: { value: null, mostrar: false },
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_I":
        if (state.Actual.value === null) {
          return {
            Actual: { value: action.value, mostrar: false },
            Siguiente: { value: state.Siguiente.value, mostrar: false },
          };
        }
        return {
          Siguiente: { value: action.value, mostrar: false },
          Actual: { value: state.Actual.value, mostrar: false },
        };
      case "MOSTRAR_ACTUAL":
        return {
          Siguiente: { value: null, mostrar: false },
          Actual: { value: state.Actual.value, mostrar: true },
        };
      case "MOSTRAR_SIGUIENTE":
        return {
          Actual: { value: null, mostrar: false },
          Siguiente: { value: state.Siguiente.value, mostrar: true },
        };
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  if (
    (state.Actual.mostrar &&
      state.Actual.value !==
        getElementById(props.fotos, props.currentEmployee).foto) ||
    (state.Siguiente.mostrar &&
      state.Siguiente.value !==
        getElementById(props.fotos, props.currentEmployee).foto)
  ) {
    dispatch({
      type: "CHANGE_I",
      value: getElementById(props.fotos, props.currentEmployee).foto,
    });
  }

  const imagenes = (
    <>
      <CSSTransition
        key={1}
        in={state.Actual.mostrar}
        mountOnEnter
        unmountOnExit
        timeout={220}
        onExited={() => {
          dispatch({ type: "MOSTRAR_SIGUIENTE" });
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
          dispatch({ type: "MOSTRAR_ACTUAL" });
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
    dispatch({
      type: "CHANGE_I",
      value: getElementById(props.fotos, id).foto,
    });
    props.changeEmployee(id);
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.marco}>
          <div className={classes.marcoIntermedio}>{imagenes}</div>
        </div>

        <div style={{ width: "60%", margin: "0 auto" }}>
          <ComboBox
            height={5.75}
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
