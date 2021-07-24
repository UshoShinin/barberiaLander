import classes from "./Calendario.module.css";
import classesDia from "./Dias/Dias.module.css";
import Mes from "./Mes";
import Fotos from "./Fotos";
import React from 'react';
import { useState } from "react";
import { days } from "./ContenidoCalendario/ContenidoCalendario";
import {extraerFotos,getEmpleadoById} from './FuncionesAuxiliares';
const Calendario = (props) => {
  console.log("ReCarge");
  const [currentCalendar, setCurrentCalendar] = useState(0);
  const empleadosFotos = extraerFotos(props.empleados);
  // Como no tenemos todo pronto en la base de datos voya tener que armar unos tiempos y servicios y tiempos provicionales
  const timeNeed = props.time;
  const obtenerHorarios = (horarios) =>{
    props.getHorarios(horarios);
  }
  const lostFocus =()=>{
    document.getElementById('Calendario').classList.remove('FormularioAgenda_invalidCal__1yd0j');
  }
  console.log(props.currentEmployee);
  console.log(props.empleados);
  console.log(getEmpleadoById(props.empleados,props.currentEmployee));
  const { cantidadMeses, content } = days(getEmpleadoById(props.empleados,props.currentEmployee).fechas,timeNeed,obtenerHorarios,lostFocus);
  const prevCalendar = () => {
    if (currentCalendar > 0) {
      setCurrentCalendar((state) => state - 1);
    }
  };
  const nextCalendar = () => {
    if (currentCalendar < cantidadMeses-1) {
      setCurrentCalendar((state) => state + 1);
    }
  };
  return (
    <div className={classes.container} tabIndex={-1} id="Calendario">
      <Fotos fotos={empleadosFotos} changeEmployee = {props.changeEmployee}/>
      <Mes
        month={new Date().getMonth()}
        prev={prevCalendar}
        next={nextCalendar}
        max={cantidadMeses}
      />
      <ol className={classes.calendario}>
        <li className={classes.day}>Lun</li>
        <li className={classes.day}>Mar</li>
        <li className={classes.day}>Mié</li>
        <li className={classes.day}>Jue</li>
        <li className={classes.day}>Vie</li>
        <li className={classes.day}>Sáb</li>
        <li className={`${classes.day} ${classesDia.invalid}`}>Dom</li>
      </ol>
      <div
        className={classes.contenidoCalendario}
        style={{
          marginLeft:
            currentCalendar >= 0 ? `-${currentCalendar * 19}em` : undefined,
        }}
      >
        {content}
      </div>
    </div>
  );
};
export default React.memo(Calendario);

