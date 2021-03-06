import Item from './Item';
import classes from './Lista.module.css';
const Lista = (props) => {
    const content = props.items.map((item)=>{
        return(
            <Item key={item.nombreCliente} item={item}>
                {/* {item.nombreCliente} */}
            </Item>
        )
    })
  return(<ul className={classes.lista}>{content}</ul>)
}
export default Lista;