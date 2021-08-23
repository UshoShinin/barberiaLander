import FormularioAgenda from "./FormularioAgenda/FormularioAgenda";
import NormalCard from "../../components/UI/Card/NormalCard";
import useHttp from "../../hooks/useHttp";
import { useState, useEffect } from "react";
import LoaddingSpinner from "../../components/LoaddingSpinner/LoaddingSpinner";

const getRespuesta = (res) => {
  console.log(res);
};
const CrearAgenda = (props) => {
  const [initialState, setInitialState] = useState({
    Nombre: { value: "", isValid: null },
    Horarios: null,
    HorariosFiltrados: null,
    Telefono: { value: "", isValid: null },
    Descripcion: { value: "", isValid: null },
    Referencia: { value: "" },
    Calendario: { value: null, dia: null },
    ComboBox: { value: null, active: false, title: "" },
    Employee: { value: null, active: false },
    servicios: {
      corte: { active: false, id: 1 },
      barba: { active: false, id: 4 },
      maquina: { active: false, id: 5 },
      claritos: { active: false, id: 6 },
      decoloracion: { active: false, id: 7 },
      brushing: { active: false, id: 8 }
    },
  });
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
    setInitialState((prev) => {
      return {
        ...prev,
        Horarios: [...horarios.mensaje.empleados],
        HorariosFiltrados: [...horarios.mensaje.empleados],
        Employee: {
          value:
            prev.Employee.value === null
              ? horarios.mensaje.empleados[0].id
              : prev.Employee.value,
        },
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
    fetchHorarios({ url: "/datosFormularioAgenda" }, obtenerHorarios);
  }, []);

  return (
    <div className="nuevaAgenda">
      <NormalCard>
        {initialState.Horarios === null && <LoaddingSpinner />}
        {initialState.Horarios !== null && (
          <FormularioAgenda
            onSaveDatosAgenda={guardarDatosAgendaHandler}
            agenda={null}
            initialState={initialState}
          />
        )}
      </NormalCard>
    </div>
  );
};

export default CrearAgenda;
