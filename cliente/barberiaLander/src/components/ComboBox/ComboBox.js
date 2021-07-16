import classes from "./ComboBox.module.css";
import Opciones from "./Opciones";
import Transition from "react-transition-group/Transition";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
const ComboBox = (props) => {
  /* const [datosMostrados,setDatosMostrados] = useState(props.opciones[0]); */
  const currentData = props.opciones[props.current-1];
  const clickHandler = () => {
    props.onClick();
  };
  const selectedOptionHandler = (id) =>{
    props.onChange(id);
  }
  return (
    <div className={classes.ComboBox}>
      <div
        onClick={clickHandler}
        className={`${classes.select} ${props.active ? classes.active : ""}`}
      >
        <div className="contenido-select">
          <h1 className={`${classes.title} ${props.active ? classes.titleActive:""}`}>{currentData.title}</h1>
        </div>
        <FontAwesomeIcon className={`${classes.button } ${props.active ? classes.active : ""}`} icon={faAngleRight}/>
      </div>
      <Transition mountOnEnter unmountOnExit in={props.active} timeout={300}>
        {(state) => (
          <Opciones
            height={props.height}
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
