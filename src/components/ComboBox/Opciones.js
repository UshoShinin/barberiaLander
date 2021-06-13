import classes from "./Opciones.module.css";
import Opcion from './Opcion';
const Opciones = (props) => {
  return <div className={`${classes.opciones} ${classes.active}`}>
      {props.opciones.map((opcion) => <Opcion data={opcion}/>)}
  </div>;
};
export default Opciones;
