import "./Opciones.css";
import Opcion from "./Opcion";
const Opciones = (props) => {
  const classes = [
    "opciones",
    props.show === "entering"
      ? "abrirOpciones"
      : props.show === "exiting"
      ? "cerrarOpciones"
      : null,
  ];
  return (
    <div className={classes.join(" ")}>
      {props.opciones.map((opcion) => (
        <Opcion onClick={props.mostrar} key={opcion.id} data={opcion} />
      ))}
    </div>
  );
};
export default Opciones;
