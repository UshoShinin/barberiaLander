import SimpleButton from "../../../components/UI/SimpleButton/SimpleButton";
import classes from "./ContenidoCerrarCaja.module.css";
const ContenidoCerrarCaja = (props) => {
  let efectivos = [];
  for(let i = 0; i<props.Cierre.efectivo.length-1;i++){
    efectivos.push(props.Cierre.efectivo[i]);
  }
  const efectivo = props.Cierre.efectivo[props.Cierre.efectivo.length-1];
  let debitos = [];
  for(let i = 0; i<props.Cierre.debito.length-1;i++){
    debitos.push(props.Cierre.debito[i]);
  }
  const debito = props.Cierre.debito[props.Cierre.debito.length-1];
  let cuponeras = [];
  for(let i = 0; i<props.Cierre.cuponera.length-1;i++){
    cuponeras.push(props.Cierre.cuponera[i]);
  }
  const cuponera = props.Cierre.cuponera[props.Cierre.cuponera.length-1];
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
          <SimpleButton color={"red"}>Cierre parcial</SimpleButton>
          <SimpleButton color={"red"}>Cierre total</SimpleButton>
      </div>
    </div>
  );
};
export default ContenidoCerrarCaja;
