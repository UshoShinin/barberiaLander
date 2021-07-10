import FormularioAgenda from "./FormularioAgenda";
import Card from "../../components/UI/Card/Card";
import "./CrearAgenda.css";

const CrearAgenda = (props) => {
  const guardarDatosAgendaHandler = (enteredDatosAgenda) => {
    const datosAgenda = {
      ...enteredDatosAgenda,
      id: Math.random().toString(),
    };
    //props.onAddAgenda(datosAgenda);
    console.log(datosAgenda);
  };

  return (
    <div className="nueva-agenda">
      <Card>
        <FormularioAgenda onSaveDatosAgenda={guardarDatosAgendaHandler} />
      </Card>
    </div>
  );
};

export default CrearAgenda;
