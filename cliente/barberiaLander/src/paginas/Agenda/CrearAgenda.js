import FormularioAgenda from "./FormularioAgenda/FormularioAgenda";
import Card from "../../components/UI/Card/Card";
import useHttp from "../../hooks/useHttp";
const CrearAgenda = (props) => {
  const guardarDatosAgendaHandler = (enteredDatosAgenda) => {
    console.log(enteredDatosAgenda);
    useHttp('/crearAgenda',{method:'POST',headers:{'Content-Type':'application/json'},body:{enteredDatosAgenda}})
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
