import classes from './Opcion.module.css'
const Opcion = (props) => {
  const onClickHandler=()=>{
    props.onClick(props.data.id)
  }
  return (
    <div className={classes.opcion} onClick={onClickHandler}>
      <h1 className={classes.title}>{props.data.title}</h1>
    </div>
  );
};
export default Opcion;
