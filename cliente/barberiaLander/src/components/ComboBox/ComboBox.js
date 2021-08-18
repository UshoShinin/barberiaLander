import classes from "./ComboBox.module.css";
import Opciones from "./Opciones";
import Transition from "react-transition-group/Transition";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
const getObjectById = (list, id) => {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === id) return list[i];
  }
};
const ComboBox = (props) => {
  const currentData = getObjectById(props.opciones, props.current);
  return (
    <div className={classes.ComboBox}>
      <div
        onClick={props.onClick}
        className={`${classes.select} ${props.active ? classes.active : ""}`}
      >
        <div className="contenido-select">
          <h1 className={`${classes.title} ${props.active ? classes.titleActive:""}`}>{currentData.title}</h1>
        </div>
        <FontAwesomeIcon
          className={`${classes.button} ${props.active ? classes.active : ""}`}
          icon={faAngleRight}
        />
      </div>
      <Transition mountOnEnter unmountOnExit in={props.active} timeout={300}>
        {(state) => (
          <Opciones
            height={props.height}
            mostrar={props.onChange}
            show={state}
            opciones={props.opciones}
          />
        )}
      </Transition>
    </div>
  );
};

export default ComboBox;
