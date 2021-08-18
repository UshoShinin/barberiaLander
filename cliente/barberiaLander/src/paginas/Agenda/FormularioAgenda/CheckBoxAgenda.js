import React from "react";
import Checkbox from "../../../components/UI/Checkbox/Checkbox";
import classes from "../../../paginas/Agenda/FormularioAgenda/CheckBoxAgenda.module.css";
import { minutosAHorarios } from "../../../components/Calendario/FuncionesAuxiliares";
const CheckBoxAgenda = (props) => {
  return (
    <div className="nueva-agenda__control">
      <h1 className={classes.title}>¿En que podemos ayudarte?</h1>
      <p tabIndex={-1} id="timeLeft" className={classes.time}>
        {time(props.time)}
      </p>
      <div className={classes.opciones}>
        <div className={classes.label}>
          <label htmlFor={11}>Corte</label>
        </div>
        <Checkbox
          id={11}
          checked={props.state.corte.active}
          onChange={() => {
            props.myAction({ type: "CORTE" });
          }}
        />
        <div className={classes.label}>
          <label htmlFor={13}>Maquina</label>
        </div>
        <Checkbox
          id={13}
          checked={props.state.maquina.active}
          onChange={() => {
            props.myAction({ type: "MAQUINA" });
          }}
        />
        <div className={classes.label}>
          <label htmlFor={15}>Barba</label>
        </div>
        <Checkbox
          id={15}
          checked={props.state.barba.active}
          onChange={() => {
            props.myAction({ type: "BARBA" });
          }}
        />
        <div className={classes.label}>
          <label htmlFor={12}>Brushing</label>
        </div>
        <Checkbox
          id={12}
          checked={props.state.brushing.active}
          onChange={() => {
            props.myAction({ type: "BRUSHING" });
          }}
        />
        <div className={classes.label}>
          <label htmlFor={14}>Decoloracion</label>
        </div>
        <Checkbox
          id={14}
          checked={props.state.decoloracion.active}
          onChange={() => {
            props.myAction({ type: "DECOLORACION" });
          }}
        />
        <div className={classes.label}>
          <label htmlFor={16}>
            Claritos
          </label>
        </div>
          <Checkbox
            id={16}
            checked={props.state.claritos.active}
            onChange={() => {
              props.myAction({ type: "CLARITOS" });
            }}
          />
      </div>
    </div>
  );
};

export default CheckBoxAgenda;

const time = (nTime) => {
  let myTime;
  if (nTime > 0) {
    const { h, m } = minutosAHorarios(nTime);
    myTime = "Tiempo estimado: ";
    if (h > 1) {
      myTime += h + " horas";
    } else {
      if (h > 0) {
        myTime += " Una hora";
      }
    }
    if (h > 0 && m > 0) {
      myTime += " y ";
    }
    if (m > 0) {
      myTime += m + " minutos";
    }
  } else {
    myTime = "No hay servicios seleccionados";
  }
  return myTime;
};
