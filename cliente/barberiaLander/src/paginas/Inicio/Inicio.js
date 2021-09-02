import LoaddingSpinner from "../../components/LoaddingSpinner/LoaddingSpinner";
import classes from "./Inicio.module.css";
import Slider from "./Slider/Slider";
import Footer from "../../components/Footer/Footer";
import peluqueros from "../../recursos/ImagenesPrueba/peluqueros.jpg";
import Button from "../../components/UI/Button/Button";
const Inicio = () => {
  return (
    <div className={classes.container}>
      <Slider />
      <div className={classes.Contactanos}>
        <figure>
          <img src={peluqueros} />
        </figure>
        <div>
          <h1>Reserva online ahora con nosotros</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Donec quam felis.
          </p>
          <Button action={()=>{console.log('Te mando a reservar')}}>Reservar</Button>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Inicio;
