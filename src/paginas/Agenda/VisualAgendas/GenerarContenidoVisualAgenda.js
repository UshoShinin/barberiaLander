import {
  transformStringNumber,
  horarioEnMinutos,
  cargarHorarios,
} from "../../../components/Calendario/FuncionesAuxiliares";
import classes from "./GenerarContenidoVisualAgenda.module.css";
import { Link } from "react-scroll";
export const generarHoras = (i, f) => {
  return cargarHorarios(i * 60, f * 60).map((h) => {
    let hora = `${h.h}:${h.m < 10 ? "0" + h.m : h.m}`;
    return <p id={h.m===0?h.h:''} key={hora}>{hora}</p>;
  });
};

const diferencia = (i, f) => {
  const ini = horarioEnMinutos(transformStringNumber(i));
  const fin = horarioEnMinutos(transformStringNumber(f));
  const dif = (fin - ini) / 15;
  return dif;
};

export const generarCupos = (empleados, colorFilaI) => {
  let horariosHTML;
  let auxiliarDiv = [];
  for (let i = 0; i < empleados.length; i++) {
    let horarios = [];
    let cuantos = [];
    let hora = empleados[i].agendas[0];
    let initialMargin;
    let cantidad = 20;
    let separacion = 8;
    let colorI = colorFilaI === 2 ? 1 : 2;
    let calDiff = diferencia(hora.i, hora.f);
    if (hora.i !== "08:00") {
      initialMargin = diferencia("08:00", hora.i);
    }
    for (let k = 0; k < calDiff; k++) {
      cuantos.push(
        <div className={`${classes.cuanto} ${colorFilaI===1?classes.color1:classes.color2}`}></div>
      );
    }
    let cuantosHTML = cuantos.map((c) => {
      return c;
    });
    horarios.push(
      <div
        className={classes.horario}
        style={{
          marginTop: `${
            (cantidad + separacion) * initialMargin + separacion
          }px`,
        }}
      >
        {cuantosHTML}
      </div>
    );

    for (let j = 1; j < empleados[i].agendas.length; j++) {
      cuantos = [];
      const ini = empleados[i].agendas[j].i;
      const fin = empleados[i].agendas[j].f;
      calDiff = diferencia(ini, fin);
      for (let k = 0; k < calDiff; k++) {
        cuantos.push(
          <div className={`${classes.cuanto} ${colorI===1?classes.color1:classes.color2}`}></div>
        );
      }
      let cuantosHTML = cuantos.map((c) => {
        return c;
      });
      horarios.push(
        <div
          className={classes.horario}
          style={{
            marginTop: `${
              diferencia(empleados[i].agendas[j - 1].f, ini) *
                (cantidad + separacion) +
              separacion
            }px`,
          }}
        >
          {cuantosHTML}
        </div>
      );
      if (colorI === 1) {
        colorI = 2;
      } else {
        colorI = 1;
      }
    }
    horariosHTML = horarios.map((h) => {
      return h;
    });
    auxiliarDiv.push(
      <>
        <h1 className={classes.title}>{empleados[i].nombreEmpleado}</h1>
        {horariosHTML}
      </>
    );
    if (colorFilaI === 1) {
      colorFilaI = 2;
    } else {
      colorFilaI = 1;
    }
  }
  return auxiliarDiv;
};

export const generarNavegacion = (ini, fin) => {
  let list = [];
  for (let i = ini; i <= fin; i++) {
    list.push(i);
  }
  return (
    <ul className={classes.Nav}>
      {list.map((h) => (
        <Link
        className={classes.Link}
          activeClass="active"
          to={h}
          spy={true}
          smooth={true}
          offset={-10}
          duration={500}
        >
          {h}
        </Link>
      ))}
    </ul>
  );
};
