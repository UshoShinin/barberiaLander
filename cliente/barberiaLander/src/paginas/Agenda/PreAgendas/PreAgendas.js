import NormalCard from "../../../components/UI/Card/NormalCard";
import Card from "../../../components/UI/Card/Card";
import classes from "./PreAgendas.module.css";
import Marco from "../../../components/UI/Marco/Marco";
import Lista from "./Lista/Lista";
import useHttp from "../../../hooks/useHttp";
import { useEffect, useReducer, useState,useContext } from "react";
import LoaddingSpinner from "../../../components/LoaddingSpinner/LoaddingSpinner";
import Switch from "../../../components/UI/Switch/Switch";
import Visualizador from "./Visualizador/Visualizador";
import {obtenerHorariosDeDia} from "../../../components/Calendario/FuncionesAuxiliares";
import { getElementById } from "../../../FuncionesAuxiliares/FuncionesAuxiliares";
import CrearAgenda from "../CrearAgenda";
import AuthContext from "../../../store/AuthContext";
import { useHistory } from "react-router-dom";
const initialState = { aceptar: false, rechazar: false };

const reducerChecks = (state, action) => {
  switch (action.type) {
    case "ACEPTAR":
      return {aceptar:!state.aceptar,rechazar:false}
    case "RECHAZAR":
      return {aceptar:false,rechazar:!state.rechazar}
  }
};

const PreAgendas = () => {
  const history = useHistory();
  const [agendasState, setAgendasState] = useState(null);
  const [idAgenda, setIdAgenda] = useState(null);
  const [agendaAModificar, setAgendaAModificar] = useState(null);
  const [horarioAgenda, setHorarioAgenda] = useState(null);
  const [checks, dispatchChecks] = useReducer(reducerChecks,initialState);
  const authCtx = useContext(AuthContext);
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
  const getRespuestaEliminar = (res) =>{
    console.log(res);
  }
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
  const { isLoadingRechazar, errorRechazar, sendRequest: rechazar } = useHttp();
  useEffect(() => {
    if(authCtx.user===null||authCtx.user.rol!=='Administrador'&&authCtx.user.rol!=='Encargado')history.replace('/');
    else fetchAgendas({ url: "/listadoPreAgendas" }, obtenerAgendas);
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
    //Creo que todo lo de los horarios no es necesario y se puede eliminar
    setAgendaAModificar({...agendita,fecha:{d:parseInt(agendita.fecha.slice(8,10),10),m:parseInt(agendita.fecha.slice(5,7),10)}})
    fetchHorarios({ url: "/datosFormularioAgenda"},obtenerHorarios);
  };

  const aceptarAgenda = (agenda) => {
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

  const rechazarAgenda = (agenda) => {
    /* console.log(agenda); */
    rechazar(
      {
        url: "/eliminarAgenda",
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: agenda,
      },
      getRespuestaEliminar
    );
  };

  return (
    <>
      {agendaAModificar !== null && (
        <NormalCard>
          <CrearAgenda agenda={agendaAModificar} horario={horarioAgenda} />
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
                    rechazar={rechazarAgenda}
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
