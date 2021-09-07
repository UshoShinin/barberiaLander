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
import { useState, useEffect, useContext } from "react";
import LoaddingSpinner from "../../../components/LoaddingSpinner/LoaddingSpinner";
import useHttp from "../../../hooks/useHttp";
import CrearAgenda from "../CrearAgenda";
import AuthContext from "../../../store/AuthContext";
import { useHistory } from "react-router-dom";

const VisualAgendas = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const [inicio, setInicio] = useState(0);
  const [agendas, setAgendas] = useState(null);
  const [agenda, setAgenda] = useState(null);
  const {
    isLoadingAgendas,
    errorAgendas,
    sendRequest: fetchAgendas,
  } = useHttp();

  const {
    isLoadingModificar,
    errorModificar,
    sendRequest: getAgenda,
  } = useHttp();

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

  const obtenerAgenda = (res) => {
    const agenda = res.mensaje;
    let misServicios = {
      barba: false,
      brushing: false,
      corte: false,
      claritos: false,
      decoloracion: false,
      maquina: false,
    };
    agenda.servicios.forEach((s) => {
      switch (s) {
        case 1:
          misServicios.corte = true;
        case 4:
          misServicios.barba = true;
        case 5:
          misServicios.maquina = true;
        case 6:
          misServicios.claritos = true;
        case 7:
          misServicios.decoloracion = true;
        case 8:
          misServicios.brushing = true;
      }
    });
    setAgenda({
      ...agenda,
      servicios: { ...misServicios },
      fecha: {
        d: parseInt(agenda.fecha.slice(8, 10), 10),
        m: parseInt(agenda.fecha.slice(5, 7), 10),
      },
    });
  };

  const obtenerAgendas = (res) => {
    setAgendas(res.mensaje.agendas);
  };

  useEffect(() => {
    if(authCtx.user===null||authCtx.user.rol==='Cliente')history.replace('/');
    else fetchAgendas({ url: "/listadoAgendas" }, obtenerAgendas);
  }, []);

  let Mostrar = [];
  let tope = null;
  let empleados;
  let colorFilaI = 1;
  let i = 0;
  let ocupar;
  let cantidadMostrar;
  const tamaño = document.getElementById("root").clientWidth;
  if (tamaño < 581) {
    cantidadMostrar = 1;
  } else if (tamaño < 801) {
    cantidadMostrar = 2;
  } else {
    cantidadMostrar = 4;
  }
  if (agendas !== null) {
    const final =
      agendas.length > (inicio + 1) * cantidadMostrar
        ? (inicio + 1) * cantidadMostrar
        : agendas.length;
    for (let i = inicio * cantidadMostrar; i < final; i++) {
      Mostrar.push(agendas[i]);
    }
    ocupar = 100 / Mostrar.length;
    empleados = generarCupos(Mostrar, colorFilaI, (id) => {
      getAgenda({ url: "/agendaPorId?idAgenda=" + id }, obtenerAgenda);
    }).map((divA) => {
      i++;
      return (
        <div
          key={i}
          className={classes.bordeIntento}
          style={{ width: `${ocupar}%` }}
        >
          {divA}
        </div>
      );
    });
    const mod = agendas.length % cantidadMostrar;
    tope =
      (agendas.length - mod + (mod > 0 ? cantidadMostrar : 0)) /
      cantidadMostrar;
  }

  return (
    <>
      {agenda !== null && <CrearAgenda agenda={agenda} />}
      {agenda === null && (
        <>
          {agendas === null && <LoaddingSpinner />}
          {agendas !== null && (
            <div className={classes.myContainer}>
              <div className={classes.navigation}>
                <div>
                  <div className={classes.arrow}>
                    {inicio > 0 && (
                      <FontAwesomeIcon
                        icon={faChevronLeft}
                        onClick={moveBHandler}
                      />
                    )}
                  </div>
                  <p>
                    {inicio + 1} de {tope}
                  </p>
                  <div className={classes.arrow}>
                    {inicio < tope - 1 && (
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        onClick={moveFHandler}
                      />
                    )}
                  </div>
                </div>
              </div>
              {generarNavegacion(8, 22)}
              <div className={classes.container}>
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
          )}
        </>
      )}
    </>
  );
};
export default VisualAgendas;
