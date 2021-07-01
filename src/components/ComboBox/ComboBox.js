import { useState } from "react";
import classes from "./ComboBox.module.css";
import Opciones from "./Opciones";
import Transition from "react-transition-group/Transition";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
const ComboBox = (props) => {
  const [active, setActive] = useState(false);
  //const [isSelected, setIsSelected] = useState(false);
  const [datosMostrados,setDatosMostrados] = useState(props.opciones[0]);
  const clickHandler = () => {
    setActive((prevState) => !prevState);
  };
  const selectedOptionHandler = (id) =>{
    setDatosMostrados(props.opciones[id-1])
    clickHandler();
    props.onChange(id);
  }
  return (
    <div className={classes.ComboBox}>
      <div
        onClick={clickHandler}
        className={`${classes.select} ${active ? classes.active : ""}`}
      >
        <div className="contenido-select">
          <h1 className={`${classes.title} ${active ? classes.titleActive:""}`}>{datosMostrados.title}</h1>
          {/* <p className={classes.description}>{props.description}</p> */}
        </div>
        {/* <div className={}></div> */}
        <FontAwesomeIcon className={`${classes.button } ${active ? classes.active : ""}`} icon={faAngleRight}/>
      </div>
      <Transition mountOnEnter unmountOnExit in={active} timeout={300}>
        {(state) => (
          <Opciones
            mostrar={selectedOptionHandler}
            show={state}
            opciones={props.opciones}
          />
        )}
      </Transition>
    </div>
  );
};
export default ComboBox;
