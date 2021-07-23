import classes from "./VisualAgendas.module.css";
import {
  generarHoras,
  generarCupos,
  generarNavegacion,
} from "./GenerarContenidoVisualAgenda";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { animateScroll as scroll } from "react-scroll";
import { useState } from "react";

const VisualAgendas = () => {
  const [inicio, setInicio] = useState(0);

  const moveFHandler = () => {
    setInicio((prev) => {
      return prev + 1;
    });
  };
  const moveBHandler = () => {
    setInicio((prev) => {
      return prev - 1;
    });
  };

  const DUMMY_AGENDAS = [
    {
      nombreEmpleado: "Paco",
      agendas: [
        { idAgenda: 1, i: "8:00", f: "10:00" },
        { idAgenda: 2, i: "11:00", f: "14:00" },
        { idAgenda: 3, i: "14:00", f: "15:00" },
        { idAgenda: 4, i: "15:30", f: "16:00" },
        { idAgenda: 5, i: "17:00", f: "19:00" },
        { idAgenda: 6, i: "20:00", f: "22:00" },
      ],
    },
    {
      nombreEmpleado: "Manolo",
      agendas: [
        { idAgenda: 7, i: "9:00", f: "10:00" },
        { idAgenda: 8, i: "11:00", f: "12:00" },
        { idAgenda: 8, i: "13:00", f: "13:15" },
        { idAgenda: 9, i: "19:00", f: "22:00" },
      ],
    },
    {
      nombreEmpleado: "ANTONIO",
      agendas: [
        { idAgenda: 10, i: "15:00", f: "17:00" },
        { idAgenda: 11, i: "19:00", f: "20:00" },
        { idAgenda: 12, i: "20:00", f: "22:00" },
      ],
    },
    {
      nombreEmpleado: "Manueh",
      agendas: [
        { idAgenda: 13, i: "12:00", f: "14:00" },
        { idAgenda: 14, i: "15:00", f: "17:00" },
        { idAgenda: 15, i: "18:00", f: "20:00" },
      ],
    },
    {
      nombreEmpleado: "Carlos",
      agendas: [
        { idAgenda: 16, i: "11:00", f: "12:00" },
        { idAgenda: 17, i: "19:00", f: "19:30" },
        { idAgenda: 18, i: "20:15", f: "20:45" },
      ],
    },
  ];
  let Mostrar = [];
  const final =
    DUMMY_AGENDAS.length > (inicio + 1) * 4
      ? (inicio + 1) * 4
      : DUMMY_AGENDAS.length;
  for (let i = inicio * 4; i < final; i++) {
    Mostrar.push(DUMMY_AGENDAS[i]);
  }
  let empleados;
  let colorFilaI = 1;
  let i = 0;
  let ocupar = 100 / Mostrar.length;
  empleados = generarCupos(Mostrar, colorFilaI).map((divA) => {
    i++;
    return (
      <div key={i} className = {classes.bordeIntento}style={{ width: `${ocupar}%` }}>
        {divA}
      </div>
    );
  });
  const tope = (DUMMY_AGENDAS.length + 4 - (DUMMY_AGENDAS.length % 4)) / 4;
  return (
    <div className={classes.myContainer}>
      <div className={classes.navigation}>
        <div>
          <div className={classes.arrow}>
            {inicio > 0 && (
              <FontAwesomeIcon icon={faChevronLeft} onClick={moveBHandler} />
            )}
          </div>
          <p>
            {inicio + 1} de {tope}
          </p>
          <div className={classes.arrow}>
            {inicio < tope - 1 && (
              <FontAwesomeIcon icon={faChevronRight} onClick={moveFHandler} />
            )}
          </div>
        </div>
      </div>
      {generarNavegacion(8, 22)}
      <div
        className={classes.container}
        style={{ color: "white", display: "flex" }}
      >
        <div className={classes.marcas}>{generarHoras(8, 22)}</div>
        <div className={classes.empleados}>{empleados}</div>
      </div>
      <button
        className={classes.toTheTop}
        onClick={() => {
          scroll.scrollToTop();
        }}
      >
        <FontAwesomeIcon icon={faChevronUp} />
      </button>
    </div>
  );
};
export default VisualAgendas;
