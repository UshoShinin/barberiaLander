import Item from "./Item";
import classes from "./Lista.module.css";
const Lista = (props) => {
  const content = props.items.map((item) => {
      return (
        <Item
          key={item.id}
          item={item}
          select={props.select}
        />
      );
  });
  return <ul className={`${classes.lista} ${props.className!==undefined?props.className:''}`}>{content}</ul>;
};
export default Lista;
