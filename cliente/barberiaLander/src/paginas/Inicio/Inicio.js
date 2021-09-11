import classes from "./Inicio.module.css";
import Slider from "./Slider/Slider";
import Footer from "../../components/Footer/Footer";
import peluqueros from "../../recursos/ImagenesPrueba/peluqueros.jpg";
import Button from "../../components/UI/Button/Button";
import { useHistory } from "react-router-dom";
const Inicio = () => {
  const history = useHistory();
  return (
    <div className={classes.container}>
      <Slider />
      <div className={classes.Contactanos}>
        <figure>
          <img alt='Empleados de la peluquería' src={peluqueros} />
        </figure>
        <div>
          <h1>Reserva online ahora con nosotros</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Donec quam felis.
          </p>
          <Button action={()=>{history.replace('/agenda/crearagenda');}}>Reservar</Button>
        </div>
      </div>
      <div className={classes.footerContainer}>
        <Footer/>
      </div>
    </div>
  );
};

export default Inicio;
