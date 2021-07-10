import classes from "./Calendario.module.css";
import classesDia from "./Dias/Dias.module.css";
import Mes from "./Mes";
import Fotos from "./Fotos";
import React from 'react';
import { useState } from "react";
import { days } from "./ContenidoCalendario/ContenidoCalendario";
import {extraerFotos} from './FuncionesAuxiliares';
const Calendario = (props) => {
  console.log("ReCarge");
  const [currentEmployee, setCurrentEmployee] = useState(0);
  const [currentCalendar, setCurrentCalendar] = useState(0);
  const empleadosFotos = extraerFotos(props.empleados);
  // Como no tenemos todo pronto en la base de datos voya tener que armar unos tiempos y servicios y tiempos provicionales
  const timeNeed = calcularTiempo(currentEmployee,props.servicios);
  const obtenerHorarios = (horarios) =>{
    console.log(horarios);
  }
  const { cantidadMeses, content } = days(props.empleados[currentEmployee].fechas,timeNeed,obtenerHorarios);
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
    <div className={classes.container}>
      <Fotos fotos={empleadosFotos} changeEmployee = {setCurrentEmployee}/>
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


const calcularTiempo = (empleado,serv) => {
  let total = 0;
  switch (empleado) {
    case 0:
      if (serv.corte) total+=30;
      if( serv.maquina) total+=20;
      if(serv.barba)total+=15;
      if(serv.laciado)total+=30;
      if(serv.decoloracion)total+=15;
      if(serv.tinta)total+=15;
      break;  
    default:
      if (serv.corte) total+=60;
      if( serv.maquina) total+=24;
      if(serv.barba)total+=30;
      if(serv.laciado)total+=60;
      if(serv.decoloracion)total+=30;
      if(serv.tinta)total+=30;   
  }
  return total;
}