import SimpleButton from "../../../components/UI/SimpleButton/SimpleButton";
import classes from "./ContenidoCerrarCaja.module.css";
const ContenidoCerrarCaja = (props) => {
  let efectivos = props.Cierre.efectivo;
  let debitos = props.Cierre.debito;
  let cuponeras = props.Cierre.cuponera;
  const efectivo = efectivos.pop();
  const debito = debitos.pop();
  const cuponera = cuponeras.pop();
  return (
    <div className={classes.container}>
      <h1>Cierre caja</h1>
      <h2>Efectivo</h2>
      <div>
        {efectivos.map((e) => {
          return (
            <>
              <div className={classes.text}>{`${e.mensaje}: `}</div>
              <div className={classes.num}>{`$${e.total}`}</div>
            </>
          );
        })}
      </div>
      <h2>Debito</h2>
      <div>
        {debitos.map((e) => {
          return (
            <>
              <div className={classes.text}>{`${e.mensaje}: `}</div>
              <div className={classes.num}>{`$${e.total}`}</div>
            </>
          );
        })}
      </div>
      <h2>Cuponera</h2>
      <div>
        {cuponeras.map((e) => {
          return (
            <>
              <div className={classes.text}>{`${e.mensaje}: `}</div>
              <div className={classes.num}>{`$${e.total}`}</div>
            </>
          );
        })}
      </div>
      <h2>{`Total Efectivo: ${efectivo.total}`}</h2>
      <h2>{`Total Débito: ${debito.total}`}</h2>
      <h2>{`Total Cuponera: ${cuponera.total}`}</h2>
      <div className={classes.buttons}>
          <SimpleButton color={"red"}>Limpiar Base</SimpleButton>
          <SimpleButton>Salir</SimpleButton>
      </div>
    </div>
  );
};
export default ContenidoCerrarCaja;
