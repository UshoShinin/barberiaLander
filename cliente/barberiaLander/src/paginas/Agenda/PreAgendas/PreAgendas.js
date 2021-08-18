import NormalCard from "../../../components/UI/Card/NormalCard";
import Card from "../../../components/UI/Card/Card";
import classes from "./PreAgendas.module.css";
import Lista from "./Lista/Lista";
import useHttp from "../../../hooks/useHttp";
import { useEffect, useReducer, useState } from "react";
import LoaddingSpinner from "../../../components/LoaddingSpinner/LoaddingSpinner";
import Switch from "../../../components/UI/Switch/Switch";
import Visualizador from "./Visualizador/Visualizador";
import FormularioAgenda from "../FormularioAgenda/FormularioAgenda";
import {
  getElementById,
  obtenerHorariosDeDia,
} from "../../../components/Calendario/FuncionesAuxiliares";
/* const DUMMY_AGENDAS = [
  {
    idAgenda: 1,
    fecha: "28-07-2021",
    nombreCliente: "Migel", //nombreCliente
    horaInicio: "08:00",
    horaFin: "10:30",
    descripcion: "",
  },
  {
    idAgenda: 2,
    fecha: "29-07-2021",
    nombreCliente: "Mangel",
    horaInicio: "09:00",
    horaFin: "10:30",
    descripcion: "Un corte super cool",
  },
  {
    idAgenda: 3,
    fecha: "29-07-2021",
    nombreCliente: "Carlos",
    horaInicio: "11:00",
    horaFin: "11:30",
    descripcion: "Quiero que me hagan el pelo de Goku :D",
  },
  {
    idAgenda: 4,
    fecha: "30-07-2021",
    nombreCliente: "Pablito",
    horaInicio: "20:00",
    horaFin: "21:30",
    descripcion: "No se :c",
  },
  {
    idAgenda: 5,
    fecha: "28-07-2021",
    nombreCliente: "Migel", //nombreCliente
    horaInicio: "08:00",
    horaFin: "10:30",
    descripcion: "",
  },
  {
    idAgenda: 6,
    fecha: "29-07-2021",
    nombreCliente: "Mangel",
    horaInicio: "09:00",
    horaFin: "10:30",
    descripcion: "Un corte super cool",
  },
  {
    idAgenda: 7,
    fecha: "29-07-2021",
    nombreCliente: "Carlos",
    horaInicio: "11:00",
    horaFin: "11:30",
    descripcion: "Quiero que me hagan el pelo de Goku :D",
  },
  {
    idAgenda: 8,
    fecha: "30-07-2021",
    nombreCliente: "Pablito",
    horaInicio: "20:00",
    horaFin: "21:30",
    descripcion: "No se :c",
  },
]; */

const initialState = { aceptar: false, rechazar: false };

const reducerChecks = (state, action) => {
  console.log(action.type)
  switch (action.type) {
    case "ACEPTAR":
      return {aceptar:!state.aceptar,rechazar:false}
    case "RECHAZAR":
      return {aceptar:false,rechazar:!state.rechazar}
  }
};

const PreAgendas = () => {
  const [agendasState, setAgendasState] = useState(null);
  const [idAgenda, setIdAgenda] = useState(null);
  const [agendaAModificar, setAgendaAModificar] = useState(null);
  const [horarioAgenda, setHorarioAgenda] = useState(null);
  const [checks, dispatchChecks] = useReducer(reducerChecks,initialState);
  const obtenerAgendas = (agendas) => {
    let misAgendas = [];
    agendas.mensaje.preAgendas.forEach((agenda) => {
      misAgendas.push({ ...agenda, fecha: agenda.fecha.slice(0, 10) });
    });
    setAgendasState(misAgendas);
  };

  const getRespuesta = (res) => {
    console.log(res);
  };

  const {
    isLoadingPreAgendas,
    errorPreAgendas,
    sendRequest: fetchAgendas,
  } = useHttp();
  const {
    isLoadingHorarios,
    errorHorarios,
    sendRequest: fetchHorarios,
  } = useHttp();
  const { isLoadingAceptar, errorAceptar, sendRequest: aceptar } = useHttp();
  useEffect(() => {
    fetchAgendas({ url: "/listadoPreAgendas" }, obtenerAgendas);
  }, []);

  const obtenerHorarios = (horarios) => {
    setHorarioAgenda(
      obtenerHorariosDeDia(
        agendaAModificar.fecha.d,
        agendaAModificar.fecha.m,
        getElementById(horarios, agendaAModificar.ciPeluquero).fechas
      )
    );
  };

  const showAgenda = (agendita) => {
    setAgendaAModificar({...agendita,fecha:{d:parseInt(agendita.fecha.slice(8,10),10),m:parseInt(agendita.fecha.slice(5,7),10)}})
    fetchHorarios({ url: "/datosFormularioAgenda"},obtenerHorarios);
  };

  const aceptarAgenda = (agenda) => {
    console.log(agenda);
    aceptar(
      {
        url: "/aceptarAgenda",
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: agenda,
      },
      getRespuesta
    );
  };

  return (
    <>
      {" "}
      {agendaAModificar !== null && (
        <NormalCard>
          <FormularioAgenda agenda={agendaAModificar} horario={horarioAgenda} />
        </NormalCard>
      )}
      {agendaAModificar === null && (
        <NormalCard className={classes.ajuste}>
          {isLoadingPreAgendas && <LoaddingSpinner />}
          {!isLoadingPreAgendas && (
            <div className={classes.container}>
              <div className={classes.listado}>
                {agendasState !== null && (
                  <Lista
                    items={agendasState}
                    select={setIdAgenda}
                    aceptar={aceptarAgenda}
                  />
                )}
                <div className={classes.opciones}>
                  <div className={classes.label}>
                    <h2>Aceptar todo</h2>
                  </div>
                  <div className={classes.actions}>
                    <Switch onCheck={()=>{dispatchChecks({type:'ACEPTAR'})}} active={checks.aceptar} />
                  </div>
                  <div className={classes.label}>
                    <h2>Rechazar todo</h2>
                  </div>
                  <div className={classes.actions}>
                    <Switch onCheck={()=>{dispatchChecks({type:'RECHAZAR'})}} active={checks.rechazar} />
                  </div>
                </div>
              </div>
              <div className={classes.editor}>
                <Visualizador id={idAgenda} mostrarAgenda={showAgenda} />
              </div>
            </div>
          )}
        </NormalCard>
      )}{" "}
    </>
  );
};

export default PreAgendas;
