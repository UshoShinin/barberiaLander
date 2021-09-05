import FormularioAgenda from "./FormularioAgenda/FormularioAgenda";
import NormalCard from "../../components/UI/Card/NormalCard";
import useHttp from "../../hooks/useHttp";
import { useState, useEffect, useContext } from "react";
import LoaddingSpinner from "../../components/LoaddingSpinner/LoaddingSpinner";
import AuthContext from "../../store/AuthContext";
import { getElementById } from "../../FuncionesAuxiliares/FuncionesAuxiliares";
import {
  horariosAgendarDisponibles,
  obtenerHorariosDeDia,
  getIdByTitle,
  cargarHorariosEnMinutos,
  calcularTiempo,
  transformNumberString
} from "../../components/Calendario/FuncionesAuxiliares";
const getRespuesta = (res) => {
  console.log(res);
};
const CrearAgenda = (props) => { 
  const authCtx = useContext(AuthContext);

  let initialState = {
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
    ciCliente : '-1',
  };
  const [stateAgenda, setStateAgenda] = useState(initialState);
  const {
    isLoadingModificar,
    errorModificar,
    sendRequest: mandarAgenda,
  } = useHttp();

  const guardarDatosAgendaHandler = (enteredDatosAgenda) => {
    console.log(enteredDatosAgenda);
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

  /* Carga inicial de datos */
  const obtenerHorarios = (horarios) => {
    const agenda = props.agenda;
    let nombre;
    let telefono;
    let ciCliente;
    let servicios = { ...initialState.servicios };
    let Calendario = { value: null, dia: null };
    let descripcion = { value: "", isValid: null };
    let empleados = horarios.mensaje.empleados;
    let comboBox = { value: null, active: false, title: "" };
    let id=1;
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
      horarios = obtenerHorariosDeDia(agenda.fecha.d,agenda.fecha.m,empleado.fechas);
      tiempo = calcularTiempo(empleado, servicios);
      const resultado = horarios!==null?horariosAgendarDisponibles(horarios, tiempo).map((h)=>{id++;return {id:id,title:transformNumberString(h)}}):cargarHorariosEnMinutos(8*60,22*60);
      const position = getIdByTitle(resultado,agenda.horario.i);
      Calendario = {
        value: resultado,
        dia: { ...agenda.fecha },
      };
      comboBox =  { value: position, active: false, title: agenda.horario.i };
    } else {
      nombre = { value: "", isValid: null };
      telefono = { value: "", isValid: null };
      if (authCtx.isLoggedIn && authCtx.user.rol === "Cliente") {
        nombre = { value: authCtx.user.nombre, isValid: true };
        telefono = { value: authCtx.user.telefono, isValid: true };
        ciCliente = authCtx.user.ciUsuario;
      }
    }

    setStateAgenda((prev) => {
      return {
        ...prev,
        Nombre: { ...nombre },
        Telefono: { ...telefono },
        Descripcion: { ...descripcion },
        Horarios: [...empleados],
        HorariosFiltrados: [...empleados],
        Employee: {
          value:
            prev.Employee.value === null
              ? horarios.mensaje.empleados[0].id
              : prev.Employee.value,
        },
        servicios: { ...servicios },
        Calendario: { ...Calendario },
        ComboBox:{...comboBox},
        ciCliente:ciCliente
      };
    });
  };
  const {
    isLoadingGet,
    errorGet,
    sendRequest: fetchHorarios /* Alias */,
  } = useHttp();

  /* Se ejecuta al inicio para que se cargen los datos */
  useEffect(() => {
    if(props.agenda!==null){
      console.log('Tengo datos');
    }else{console.log('No tengo datos');}
    fetchHorarios({ url: "/datosFormularioAgenda" }, obtenerHorarios);

  }, []);
  return (
    <div className="nuevaAgenda">
      <NormalCard>
        {stateAgenda.Horarios === null && <LoaddingSpinner />}
        {stateAgenda.Horarios !== null && (
          <FormularioAgenda
            onSaveDatosAgenda={guardarDatosAgendaHandler}
            agenda={
              props.agenda !== null
                ? {
                    idagenda: props.agenda.idagenda,
                    idHorario: props.agenda.idHorario,
                  }
                : null
            }
            initialState={stateAgenda}
          />
        )}
      </NormalCard>
    </div>
  );
};

export default CrearAgenda;
