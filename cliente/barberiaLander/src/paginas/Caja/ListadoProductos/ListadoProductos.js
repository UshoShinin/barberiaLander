import classes from "./ListadoProductos.module.css";
import { getElementById } from "../../../components/Calendario/FuncionesAuxiliares";
const ListadoProductos = (props) => {
  let lista = [...props.seleccionados];
  const content = props.productos.map((p) => {
    let pertenece = false;
    if (getElementById(lista, p.id) !== null) {
      pertenece = true;
      lista.shift();
    }
    return (
      <li
        key={p.id}
        className={`${pertenece ? classes.active : ""}`}
        onClick={() => {
          props.onClick(p);
        }}
      >
        {p.nombre} {`${p.count!==undefined&&p.count>1?'X'+p.count:''}`}
      </li>
    );
  });
  return <ul className={classes.productos}>{content}</ul>;
};
export default ListadoProductos;
