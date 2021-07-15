import classes from "./Dias.module.css";
import { getMonthChart, getDayIndex } from "./FunctionsDias";

const Dias = (props) => {
  let classFirstDay;
  let primerDia;
  let diasAuxiliares = [];
  const dayIndex = getDayIndex(
    1,
    getMonthChart(props.month),
    props.yearChart,
    parseInt(props.year.toString().substr(-2), 10)
  );
  let contenido;
  //Asigna una clase para marcar que el día de inicio empieze en su lugar correspondiente del calendario
  switch (dayIndex) {
    case 1:
      classFirstDay = classes.Lun;
      break;
    case 2:
      classFirstDay = classes.Mar;
      break;
    case 3:
      classFirstDay = classes.Mie;
      break;
    case 4:
      classFirstDay = classes.Jue;
      break;
    case 5:
      classFirstDay = classes.Vie;
      break;
    case 6:
      classFirstDay = classes.Sab;
      break;
    case 7:
      classFirstDay = classes.Dom;
      break;
  }
  primerDia = props.diasMostrar[0];
  diasAuxiliares = props.diasMostrar.filter((dia)=>(dia.num!==1));
  contenido = diasAuxiliares.map((dia) => {
    let par;
    if(dia.disponibilidad.valido){
      par= <p onClick={()=>{
        props.obtenerHorarios(dia.disponibilidad.horariosDisponibles);
        /* console.log(dia.disponibilidad.horariosDisponibles); */
      }} className={classes.dia}>{dia.num}</p>;
    }else{
      par= <p className={classes.invalid}>{dia.num}</p>;
    }
    return (
      <li key={dia.num} onClick={props.lostFocus}>
        {par}
      </li>
    );
  });
  return (
    <>
      <li className={classFirstDay}><p className={primerDia.disponibilidad.valido?classes.dia:classes.invalid}>{primerDia.num}</p></li>
      {contenido}
    </>
  );
};
export default Dias;