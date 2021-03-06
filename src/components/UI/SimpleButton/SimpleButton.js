import classes from "./SimpleButton.module.css";
const SimpleButton = (props) => {
  //Junta las classes de botón con una posible clase extra con el fin de cambiar el color del boton a rojo de ser necesario
  let classesButton;
  switch (props.color) {
    case "red":
      classesButton = `${classes.button} ${classes.red}`;
      break;
    case "white":
      classesButton = `${classes.button} ${classes.white}`;
      break;
    default:
      classesButton = `${classes.button}`;
      break;
  }
  return (
    <button
      type={props.type || "button"} //Si el tipo no es especificado será automaticamente button
      onClick={props.action} // Se le pasa al acción asosciada del onClick a este botón
      className={classesButton}
    >
      {
        props.children /* Lo que sea que esté dentro del del etiqueta Button entrará dentro del botón  */
      }
    </button>
  );
};
export default SimpleButton;
