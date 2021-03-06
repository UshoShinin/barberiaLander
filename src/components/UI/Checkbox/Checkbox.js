import classes from "./Checkbox.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck,faTimes } from "@fortawesome/free-solid-svg-icons";
const Checkbox = (props) => {
  //Es realmente un div con un propiedad onClick para que el usuario peuda interactuar
  //Verifica si ya estaba activado o no. como Tick uso FontAwesoma
  return (
    <div onClick={props.onChange} className={`${classes.checkbox} ${props.checked?classes.active:''}`}>
      <FontAwesomeIcon icon={faCheck} className={classes.icon}/>
    </div>
  );
};
export default Checkbox;
