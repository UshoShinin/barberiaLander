import FormularioAgenda from "./FormularioAgenda/FormularioAgenda";
import Card from "../../components/UI/Card/Card";
import useHttp from "../../hooks/useHttp";

const getRespuesta = (res) => {
  console.log(res);
};
const CrearAgenda = (props) => {
  const { isLoading, error, sendRequest: mandarAgenda } = useHttp(getRespuesta);
  const guardarDatosAgendaHandler = (enteredDatosAgenda) => {
    mandarAgenda({ url: "/crearAgenda",method:'POST',headers:{'Content-Type':'application/json'},body:enteredDatosAgenda},getRespuesta);
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
