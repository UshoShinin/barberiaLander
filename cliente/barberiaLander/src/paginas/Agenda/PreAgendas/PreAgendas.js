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
import SimpleNote from '../../../components/UI/Note/SimpleNote';
const initialState = { aceptar: false, rechazar: false };

const reducerChecks = (state, action) => {
  switch (action.type) {
    case "ACEPTAR":
      return { aceptar: !state.aceptar, rechazar: false };
    case "RECHAZAR":
      return { aceptar: false, rechazar: !state.rechazar };
    default:
      return { ...state };
  }
};

const PreAgendas = () => {
  const history = useHistory();
  const [agendasState, setAgendasState] = useState(null);
  const [idAgenda, setIdAgenda] = useState(null);
  const [agendaAModificar, setAgendaAModificar] = useState(null);
  const [checks, dispatchChecks] = useReducer(reducerChecks, initialState);
  const authCtx = useContext(AuthContext);
  const obtenerAgendas = (agendas) => {
    let manejo = agendas.mensaje.manejoAgenda.AceptarRechazar;
    let misAgendas = [];
    agendas.mensaje.preAgendas.forEach((agenda) => {
      misAgendas.push({ ...agenda, fecha: agenda.fecha.slice(0, 10) });
    });
    setAgendasState(misAgendas);
    if(manejo===1){
      dispatchChecks({type:'ACEPTAR'});
    }else if(manejo===-1){
      dispatchChecks({type:'RECHAZAR'});
    }
  };

  const getRespuesta = (res) => {
    console.log(res);
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
      user === null ||
      (user.rol !== "Administrador" && user.rol !== "Encargado")
    )
      history.replace("/");
    else fetchAgendas({ url: "/listadoPreAgendas" }, obtenerAgendas);
  }, [user, history, fetchAgendas]);
  const showAgenda = (agendita) => {
    setAgendaAModificar({
      ...agendita,
      fecha: {
        d: parseInt(agendita.fecha.slice(8, 10), 10),
        m: parseInt(agendita.fecha.slice(5, 7), 10),
      },
    });
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
      {agendaAModificar !== null && <CrearAgenda exitModificar={()=>{setAgendaAModificar(null)}} agenda={agendaAModificar} />}
      {agendaAModificar === null && (
        <NormalCard className={classes.ajuste}>
          {agendasState === null && <LoaddingSpinner />}
          {agendasState !== null && (
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
                    <Switch
                      onCheck={() => {
                        dispatchChecks({ type: "ACEPTAR" });
                      }}
                      active={checks.aceptar}
                    />
                  </div>
                  <div className={classes.label}>
                    <h2>Rechazar todo</h2>
                  </div>
                  <div className={classes.actions}>
                    <Switch
                      onCheck={() => {
                        dispatchChecks({ type: "RECHAZAR" });
                      }}
                      active={checks.rechazar}
                    />
                  </div>
                </div>
              </div>
              <div className={classes.editor}>
                <Visualizador id={idAgenda} mostrarAgenda={showAgenda} />
              </div>
            </div>
          )}
        </NormalCard>
      )}
    </>
  );
};

export default PreAgendas;
