import classes from "./Item.module.css";
import SimpleButton from "../../../../components/UI/SimpleButton/SimpleButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
const Item = (props) => {
  const item = props.item;
  return (
    <li className={classes.item}>
      <div className={classes.content}>
        <h3>{`${item.nombreCliente} ${item.fecha}`}</h3>
        <h4>
          Inicio:{item.horaInicio} Fin:{item.horaFin}
        </h4>
        <h4>{item.nombreEmpleado}</h4>
        {item.descripcion.length > 0 && (
          <p>
            <span>Descripción:</span> {item.descripcion}
          </p>
        )}
      </div>
    </li>
  );
};
export default Item;
