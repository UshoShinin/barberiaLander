import classes from "./Item.module.css";
const Item = (props) => {
  const item = props.item;
  return (
    <li className={classes.item} onClick={()=>{props.select(item)}}>
      <div className={classes.content}>
        <h3>{item.nombre}</h3>
        <h4>{`Stock: ${item.stock} `} {`Precio: $${item.price}`}</h4>
        <h4>{item.nombreEmpleado}</h4>
      </div>
    </li>
  );
};
export default Item;
