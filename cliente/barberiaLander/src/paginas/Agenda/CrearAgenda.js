import FormularioAgenda from "./FormularioAgenda/FormularioAgenda";
import NormalCard from "../../components/UI/Card/NormalCard";
import useHttp from "../../hooks/useHttp";

const getRespuesta = (res) => {
  console.log(res);
};
const CrearAgenda = (props) => {
  const { isLoading, error, sendRequest: mandarAgenda } = useHttp();
  const guardarDatosAgendaHandler = (enteredDatosAgenda) => {
    console.log(enteredDatosAgenda);
    mandarAgenda({ url: "/crearAgenda",method:'POST',headers:{'Content-Type':'application/json'},body:enteredDatosAgenda},getRespuesta);
  };

  return (
    <div className="nuevaAgenda">
      <NormalCard>
        <FormularioAgenda onSaveDatosAgenda={guardarDatosAgendaHandler} agenda={null} />
      </NormalCard>
    </div>
  );
};

export default CrearAgenda;
