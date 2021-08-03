import Card from "../../../components/UI/Card/Card";
import classes from "./PreAgendas.module.css";
import Lista from "./Lista/Lista";
import useHttp from "../../../hooks/useHttp";
import { useEffect, useState } from "react";
import LoaddingSpinner from "../../../components/LoaddingSpinner/LoaddingSpinner";
import Switch from "../../../components/UI/Switch/Switch";
import Visualizador from "./Visualizador/Visualizador";
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

const PreAgendas = () => {
  const [agendasState, setAgendasState] = useState(null);
  const [idAgenda, setIdAgenda] = useState(null);
  const obtenerAgendas = (agendas) => {
    let misAgendas = [];
    agendas.mensaje.preAgendas.forEach((agenda) => {
      misAgendas.push({ ...agenda, fecha: agenda.fecha.slice(0, 10) });
    });
    setAgendasState(misAgendas);
  };
  const { isLoading, error, sendRequest: fetchAgendas } = useHttp();

  useEffect(() => {
    fetchAgendas({ url: "/listadoPreAgendas" }, obtenerAgendas);
  }, []);
  return (
    <Card>
      {isLoading && <LoaddingSpinner />}
      {!isLoading && (
        <div className={classes.container}>
          <div className={classes.listado}>
            {agendasState !== null && (
              <Lista items={agendasState} select={setIdAgenda} />
            )}
            <div className={classes.opciones}>
              <div className={classes.label}>
                <h2>Aceptar todo</h2>
              </div>
              <div className={classes.actions}>
                <Switch active={true} />
              </div>
              <div className={classes.label}>
                <h2>Rechazar todo</h2>
              </div>
              <div className={classes.actions}>
                <Switch active={true} />
              </div>
            </div>
          </div>
          <div className={classes.editor}>
            <Visualizador id={idAgenda} />
          </div>
        </div>
      )}
    </Card>
  );
};

export default PreAgendas;
