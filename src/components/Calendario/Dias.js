import classes from "./Dias.module.css";
const Dias = (props) => {
  const bic = props.day.getFullYear() % 4 === 0;
  const month = props.day.getMonth() + 1;
  const diaActual = props.day.getDate();
  let yearChart = 6;
  let shortYear = parseInt(props.day.getFullYear().toString().substr(-2), 10);
  let monthChart;
  let classFirstDay;
  let dayIndex = diaActual;
  let maxDays;
  let maxDaysN;
  let maxDaysB;
  let diasAnteriores = [];
  let diasMostrar = [];
  let diasPosteriores = [];
  let contenidoAntes;
  let contenido;
  let contenidoDespues;
  let diaAuxiliar;
  let diaSemana;
  //En base el mes, carga el número correspondiente para el calculo del día de la semana,
  //asigna el máximo de días del mes actual, anterio y siguiente.
  switch (month) {
    case 1:
      monthChart = 0;
      maxDaysB = 31;
      maxDays = 31;
      maxDaysN = bic ? 29 : 28;
      break;
    case 2:
      monthChart = 3;
      maxDaysB = 31;
      maxDays = bic ? 29 : 28;
      maxDaysN = 31;
      break;
    case 3:
      monthChart = 3;
      maxDaysB = bic ? 29 : 28;
      maxDays = 31;
      maxDaysN = 30;
      break;
    case 4:
      monthChart = 6;
      maxDaysB = 31;
      maxDays = 30;
      maxDaysN = 31;
      break;
    case 5:
      monthChart = 1;
      maxDaysB = 30;
      maxDays = 31;
      maxDaysN = 30;
      break;
    case 6:
      monthChart = 4;
      maxDaysB = 31;
      maxDays = 30;
      maxDaysN = 31;
      break;
    case 7:
      monthChart = 6;
      maxDaysB = 30;
      maxDays = 31;
      maxDaysN = 31;
      break;
    case 8:
      monthChart = 2;
      maxDaysB = 31;
      maxDays = 31;
      maxDaysN = 30;
      break;
    case 9:
      monthChart = 5;
      maxDaysB = 31;
      maxDays = 30;
      maxDaysN = 31;
      break;
    case 10:
      monthChart = 0;
      maxDaysB = 30;
      maxDays = 31;
      maxDaysN = 30;
      break;
    case 11:
      monthChart = 3;
      maxDaysB = 31;
      maxDays = 30;
      maxDaysN = 31;
      break;
    case 12:
      monthChart = 5;
      maxDaysB = 30;
      maxDays = 31;
      maxDaysN = 31;
      break;
  }
  dayIndex =
    dayIndex + monthChart + yearChart + shortYear + Math.trunc(shortYear / 4);
  dayIndex = dayIndex % 7;
  dayIndex = dayIndex === 0 ? 7 : dayIndex;
  //Asigna una clase para marcar que el día de inicio empieze en su lugar correspondiente del calendario
  switch (dayIndex) {
    case 1:
      classFirstDay = classes.Lun;
      break;
    case 2:
      classFirstDay = classes.Mar;
      break;
    case 3:
      classFirstDay = classes.Mie;
      break;
    case 4:
      classFirstDay = classes.Jue;
      break;
    case 5:
      classFirstDay = classes.Vie;
      break;
    case 6:
      classFirstDay = classes.Sab;
      break;
    case 7:
      classFirstDay = classes.Dom;
      break;
  }
  //Carga lo días antes ,hasta el lunes,del día actual para rellenar
  diaAuxiliar = diaActual - 1;
  diaSemana = dayIndex - 1;
  for (let i = diaSemana; i > 0; i--) {
    diaAuxiliar = diaAuxiliar < 1 ? maxDaysB : diaAuxiliar;
    diasAnteriores.unshift({
      num: diaAuxiliar,
    });
    diaAuxiliar--;
  }
  //Carga los días desde el actual 30 en adelante
  diaAuxiliar = diaActual + 1;
  diaSemana = dayIndex + 1;
  for (let i = 0 + 1; i < 30; i++) {
    diaSemana = diaSemana > 7 ? 1 : diaSemana;
    if (diaAuxiliar > maxDays) {
      diaAuxiliar = 1;
      maxDays = maxDaysN;
    }
    diasMostrar.push({
      valido: diaSemana === 7 ? false : true,
      num: diaAuxiliar,
    });
    diaAuxiliar++;
    diaSemana++;
  }
  //Carga los días después del final para rellenar
  diaAuxiliar = diasMostrar[diasMostrar.length - 1].num + 1;
  diaSemana = (dayIndex + 30) % 7;
  console.log("Día: " + diaAuxiliar);
  console.log("Dia de la semana: " + diaSemana);
  if (diaSemana !== 0) {
      if(diaSemana!==1){
        for (let i = diaSemana; i < 8; i++) {
            diaAuxiliar = diaAuxiliar < 1 ? maxDaysB : diaAuxiliar;
            diasPosteriores.push({
              num: diaAuxiliar,
            });
            diaAuxiliar--;
          }
      }
  }else{
    diasPosteriores.push({
        num: diaAuxiliar,
      });}
  contenidoAntes = diasAnteriores.map((dia) => {
    return <li className={classes.invalid}>{dia.num}</li>;
  });
  contenido = diasMostrar.map((dia) => {
    const classLi = !dia.valido ? classes.invalid : "";
    return <li className={classLi}>{dia.num}</li>;
  });
  contenidoDespues = diasPosteriores.map((dia) => {
    return <li className={classes.invalid}>{dia.num}</li>;
  });

  return (
    <>
      {contenidoAntes}
      <li className={classFirstDay}>{diaActual}</li>
      {contenido}
      {contenidoDespues}
    </>
  );
};
export default Dias;
