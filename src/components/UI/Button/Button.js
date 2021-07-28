import classes from "./Button.module.css";
const Button = (props) => {
  //Junta las classes de botón con una posible clase extra con el fin de cambiar el color del boton a rojo de ser necesario
    const classesButton = `${classes.button} ${props.color==='red'?classes.red:''}`;
  return (
    <button
      type={props.type || "button"} //Si el tipo no es especificado será automaticamente button
      onClick={props.action} // Se le pasa al acción asosciada del onClick a este botón
      className={classesButton}
    >
      {props.children/* Lo que sea que esté dentro del del etiqueta Button entrará dentro del botón  */} 
    </button>
  );
};
export default Button;
