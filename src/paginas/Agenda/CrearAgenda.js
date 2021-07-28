import FormularioAgenda from "./FormularioAgenda/FormularioAgenda";
import Card from "../../components/UI/Card/Card";

const CrearAgenda = (props) => {
  const guardarDatosAgendaHandler = (enteredDatosAgenda) => {

    console.log(enteredDatosAgenda);
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
