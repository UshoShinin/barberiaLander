import FormularioAgenda from "./FormularioAgenda/FormularioAgenda";
import Card from "../../components/UI/Card/Card";

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
    <div className="nuevaAgenda">
      <Card>
        <FormularioAgenda onSaveDatosAgenda={guardarDatosAgendaHandler} />
      </Card>
    </div>
  );
};

export default CrearAgenda;
