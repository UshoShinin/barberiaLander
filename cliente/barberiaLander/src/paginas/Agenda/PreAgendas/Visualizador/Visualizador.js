import { useEffect, useState } from "react";
import React from "react";
import LoaddingSpinner from "../../../../components/LoaddingSpinner/LoaddingSpinner";
import classes from "./Visualizador.module.css";
import useHttp from "../../../../hooks/useHttp";

const Visualizador = React.memo((props) => {
  const { isLoading, error, sendRequest: getAgenda } = useHttp();
  const [agenda, setAgenda] = useState({ IdAgenda: -1 });
  const obtenerAgenda = (respuesta) => {
    setAgenda(respuesta.mensaje[0]);
  };

  useEffect(() => {
    if (props.id !== null) {
      getAgenda({ url: "/agendaPorId?idAgenda=" + props.id }, obtenerAgenda);
    }
  }, [props.id]);
  console.log(agenda);
  return (
    <>
      {isLoading && <LoaddingSpinner />}
      {!isLoading && (
        <div className={classes.container}>
          <div>
            <h1>Servicios</h1>
            <h2>Corte</h2>
            <h2>Barba</h2>
            <h2>Maquina</h2>
            <h2>Brushing</h2>
            <h2>Decoloración</h2>
            <h2>Claritos</h2>
          </div>
          <div>
            <h1>Datos Agenda</h1>
            <div className={classes.datos}>
              <label>Nombre Cliente</label>
              <label></label>
            </div>
          </div>
        </div>
      )}
    </>
  );
});
export default Visualizador;
