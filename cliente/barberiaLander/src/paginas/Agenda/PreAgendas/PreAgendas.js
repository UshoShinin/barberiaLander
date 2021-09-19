import NormalCard from "../../../components/UI/Card/NormalCard";
import classes from "./PreAgendas.module.css";
import Lista from "./Lista/Lista";
import useHttp from "../../../hooks/useHttp";
import { useEffect, useReducer, useState, useContext } from "react";
import LoaddingSpinner from "../../../components/LoaddingSpinner/LoaddingSpinner";
import Switch from "../../../components/UI/Switch/Switch";
import Visualizador from "./Visualizador/Visualizador";
import CrearAgenda from "../CrearAgenda";
import AuthContext from "../../../store/AuthContext";
import { useHistory } from "react-router-dom";
import SimpleNote from "../../../components/UI/Note/SimpleNote";
import { initialState, reducer } from "./FAReducer";

const PreAgendas = () => {
  const history = useHistory();
  const [agendasState, dispatch] = useReducer(reducer, initialState);
  const authCtx = useContext(AuthContext);
  const obtenerAgendas = (agendas) => {
    dispatch({
      type: "CARGA",
      payload: agendas.mensaje.preAgendas,
      manejo: agendas.mensaje.manejoAgenda.AceptarRechazar,
    });    
  };

  const getRespuesta = (res) => {
    const Data = {};
    if (res.mensaje.codigo === 400) {
    }
  };
  const getRespuestaEliminar = (res) => {
    console.log(res);
  };
  const fetchAgendas = useHttp();

  const aceptar = useHttp();
  const rechazar = useHttp();
  const user = authCtx.user;
  useEffect(() => {
    if (
      user === null ||user.rol === "Empleado"
    )
      history.replace("/");
    else fetchAgendas({ url: "/listadoPreAgendas" }, obtenerAgendas);
  }, [user, history, fetchAgendas]);
  const esCliente = user.rol==='Cliente';
  const showAgenda = (agendita) => {
    dispatch({type:'GET_AGENDA',agenda:agendita});
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
      {agendasState.agendaAModificar !== null && (
        <CrearAgenda
          exitModificar={() => {
            dispatch({type:'GET_AGENDA',agenda:null});
          }}
          agenda={agendasState.agendaAModificar}
        />
      )}
      {agendasState.agendaAModificar === null && (
        <NormalCard className={classes.ajuste}>
          {agendasState.agendas === null && <LoaddingSpinner />}
          {agendasState.agendas !== null && (
            <div className={classes.container}>
              <div className={classes.listado}>
                {agendasState.agendas !== null && (
                  <Lista
                    cliente = {esCliente}
                    items={agendasState.agendas}
                    select={(id)=>{dispatch({type:'SELECT_AGENDA',value:id})}}
                    aceptar={aceptarAgenda}
                    rechazar={rechazarAgenda}
                  />
                )}
                <div className={classes.opciones}>
                  <div className={classes.label}>
                    <h2>Aceptar todo</h2>
                  </div>
                  <div className={classes.actions}>
                    <Switch
                      onCheck={() => {
                        dispatch({ type: "ACEPTAR" });
                      }}
                      active={agendasState.aceptar}
                    />
                  </div>
                  <div className={classes.label}>
                    <h2>Rechazar todo</h2>
                  </div>
                  <div className={classes.actions}>
                    <Switch
                      onCheck={() => {
                        dispatch({ type: "RECHAZAR" });
                      }}
                      active={agendasState.rechazar}
                    />
                  </div>
                </div>
              </div>
              <div className={classes.editor}>
                <Visualizador id={agendasState.agendaId} mostrarAgenda={showAgenda} />
              </div>
            </div>
          )}
        </NormalCard>
      )}
    </>
  );
};

export default PreAgendas;
