import FormularioAgenda from "./FormularioAgenda/FormularioAgenda";
import { useHistory } from "react-router-dom";
import NormalCard from "../../components/UI/Card/NormalCard";
import useHttp from "../../hooks/useHttp";
import classes from './CrearAgenda.module.css';
import { useEffect, useContext, useReducer } from "react";
import LoaddingSpinner from "../../components/LoaddingSpinner/LoaddingSpinner";
import AuthContext from "../../store/AuthContext";
import { getElementById } from "../../FuncionesAuxiliares/FuncionesAuxiliares";
import Modal from "../../components/UI/Modal/Modal";
import Marco from '../../components/UI/Marco/Marco';
import Note from "../../components/UI/Note/Note";
import {
  horariosAgendarDisponibles,
  obtenerHorariosDeDia,
  getIdByTitle,
  cargarHorariosEnMinutos,
  calcularTiempo,
  transformNumberString,
} from "../../components/Calendario/FuncionesAuxiliares";
import { inputReducer } from "./FormularioAgenda/ReduerFormularioAgenda";

const CrearAgenda = (props) => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  let initialState = {
    Mensaje: { show: false, text: "" },
    manejoAgenda: 0,
    Nombre: { value: "", isValid: null },
    Horarios: null,
    HorariosFiltrados: null,
    Telefono: { value: "", isValid: null },
    Descripcion: { value: "", isValid: null },
    Referencia: { value: null },
    Calendario: { value: null, dia: null },
    ComboBox: { value: null, active: false, title: "" },
    Employee: {
      value: props.agenda !== null ? props.agenda.ciPeluquero : null,
      active: false,
    },
    servicios: {
      corte: { active: false, id: 1 },
      barba: { active: false, id: 4 },
      maquina: { active: false, id: 5 },
      claritos: { active: false, id: 6 },
      decoloracion: { active: false, id: 7 },
      brushing: { active: false, id: 8 },
    },
    ciCliente: "-1",
    problema: -1,
    problemas: [
      { id: 1, pro: "" },
      { id: 2, pro: "" },
    ],
  };
  const [inputState, dispatchInput] = useReducer(inputReducer, initialState);
  const armadoDeDatos = (horarios, empleados, manejoAgenda) => {
    let miManejoAgenda =
      manejoAgenda !== undefined ? manejoAgenda.AceptarRechazar : 0;
    let nombre;
    let telefono;
    let ciCliente;
    let servicios = { ...misServicios };
    let Calendario = { value: null, dia: null };
    let descripcion = { value: "", isValid: null };
    let comboBox = { value: null, active: false, title: "" };
    let id = 1;
    if (agenda !== null) {
      let empleado = getElementById(
        horarios.mensaje.empleados,
        agenda.ciPeluquero
      );
      let tiempo;
      nombre = { value: agenda.nombreCliente, isValid: true };
      telefono = { value: agenda.tel, isValid: true };
      descripcion = { value: agenda.descripcion, isValid: null };
      servicios = {
        corte: { active: agenda.servicios.corte, id: 1 },
        barba: { active: agenda.servicios.barba, id: 4 },
        maquina: { active: agenda.servicios.maquina, id: 5 },
        claritos: { active: agenda.servicios.claritos, id: 6 },
        decoloracion: { active: agenda.servicios.decoloracion, id: 7 },
        brushing: { active: agenda.servicios.brushing, id: 8 },
      };
      horarios = obtenerHorariosDeDia(
        agenda.fecha.d,
        agenda.fecha.m,
        empleado.fechas
      );
      tiempo = calcularTiempo(empleado, servicios);
      const resultado =
        horarios !== null
          ? horariosAgendarDisponibles(
              horarios,
              tiempo,
              empleado.entrada,
              empleado.salida
            ).map((h) => {
              id++;
              return { id: id, title: transformNumberString(h) };
            })
          : cargarHorariosEnMinutos(8 * 60, 22 * 60);
      const position = getIdByTitle(resultado, agenda.horario.i);
      Calendario = {
        value: resultado,
        dia: { ...agenda.fecha },
      };
      comboBox = { value: position, active: false, title: agenda.horario.i };
    } else {
      nombre = { value: "", isValid: null };
      telefono = { value: "", isValid: null };
      if (authCtx.isLoggedIn && authCtx.user.rol === "Cliente") {
        nombre = { value: authCtx.user.nombre, isValid: true };
        telefono = { value: authCtx.user.telefono, isValid: true };
        ciCliente = authCtx.user.ciUsuario;
      }
    }
    console.log(initialState);
    console.log(horarios);
    const empoooo = {
      value:
        initialState.Employee.value === null
          ? empleados[0].id
          : initialState.Employee.value,
    }
    
    const datitos = {
      manejoAgenda: miManejoAgenda,
      Nombre: { ...nombre },
      Telefono: { ...telefono },
      Descripcion: { ...descripcion },
      Horarios: [...empleados],
      HorariosFiltrados: [...empleados],
      Employee:{...empoooo},
      servicios: { ...servicios },
      Calendario: { ...Calendario },
      ComboBox: { ...comboBox },
      ciCliente: ciCliente,
    };
    console.log(datitos);
    return datitos;
  };

  const getRespuesta = (res) => {
    console.log(res);
    const datos = res.mensaje.datos;
    const empleados = datos!==null?datos.empleados:null;
    let misDatos={};
    if(datos!==null){
      if (res.mensaje.codigo === 400) {
        misDatos = {
          Horarios: [...empleados],
          HorariosFiltrados: [...empleados],
        };
      } else {
        misDatos = { ...armadoDeDatos(datos, empleados)};
      }
    }
    dispatchInput({
      type: "RESET",
      payload:misDatos,
      value: res.mensaje.mensaje,
    });
  };

  const mandarAgenda = useHttp();
  const mandarAgendaModificar = useHttp();

  const guardarDatosAgendaHandler = (enteredDatosAgenda) => {
    mandarAgenda(
      {
        url: "/crearAgenda",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: enteredDatosAgenda,
      },
      getRespuesta
    );
  };
  const modificarDatosAgendaHandler = (enteredDatosAgenda) => {
    mandarAgendaModificar(
      {
        url: "/modificarAgenda",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: enteredDatosAgenda,
      },
      getRespuesta
    );
  };

  /* Carga inicial de datos */
  const misServicios = initialState.servicios;
  const agenda = props.agenda;
  const obtenerHorarios = (horarios) => {
    let manejoAgenda = horarios.mensaje.manejoAgenda;
    if (
      agenda === null &&
      manejoAgenda !== undefined &&
      manejoAgenda.AceptarRechazar === -1
    ) {
      dispatchInput({ type: "MANEJO_AGENDAS", value: -1 });
    } else {
      dispatchInput({
        type: "CARGAR_DATOS",
        payload: armadoDeDatos(horarios, horarios.mensaje.empleados,manejoAgenda),
      });
    }
  };
  const fetchHorarios = useHttp();

  /* Se ejecuta al inicio para que se cargen los datos */
  useEffect(() => {
    if (agenda !== null) {
      fetchHorarios(
        {
          url: "/getDatosFormularioModificarAgenda?idAgenda=" + agenda.idagenda,
        },
        obtenerHorarios
      );
    } else {
      fetchHorarios({ url: "/datosFormularioAgenda" }, obtenerHorarios);
    }
  }, []);
  return (
    <Marco className={classes.nuevaAgenda}>
      <Note
        show={inputState.Mensaje.show}
        onClose={() => {
          dispatchInput({ type: "HIDE_MENSAJE" });
        }}
      >
        {inputState.Mensaje.text}
      </Note>
      <Modal
        closed={() => {
          history.replace("/");
        }}
        show={inputState.manejoAgenda === -1}
      >
        <h1 className={classes.mensajeTitulo}>No se aceptan reservas por el momento</h1>
      </Modal>
      {inputState.manejoAgenda !== -1 && (
        <NormalCard>
          {inputState.Horarios === null && <LoaddingSpinner />}
          {inputState.Horarios !== null && (
            <FormularioAgenda
              onSaveDatosAgenda={guardarDatosAgendaHandler}
              onUpdateDatosAgenda={modificarDatosAgendaHandler}
              agenda={
                props.agenda !== null
                  ? {
                      idagenda: props.agenda.idagenda,
                      idHorario: props.agenda.idHorario,
                    }
                  : null
              }
              inputState={inputState}
              dispatchInput={dispatchInput}
            />
          )}
        </NormalCard>
      )}
    </Marco>
  );
};

export default CrearAgenda;
