import { getMonthValue,getDayIndex,getMonthChart  } from "./FunctionsDias";
import { horariosDisponibilidad } from './../FuncionesAuxiliares';
export const getYearChart = () => {
  return 6;
}
/* Esto genera los días del calendario cada uno con los horarios disponibles que tiene para los servicios seleccionados */
export let DaysGenerator = (diaActual, month, year,fechas,timeNeed) => {
  const dayIndex = getDayIndex(
    1,
    getMonthChart(month),
    getYearChart(),
    parseInt(year.toString().substr(-2), 10)
  );
  let diasTotales = 30;
  let diasMostrar = [];
  let diasAuxiliares = [];
  let diaAuxiliar;
  let diaSemana;
  let monthCounter = 1;
  let idMonth = 0;
  let myMonth = month;
  let myYear = year;
  //Generar los días para el calendario
  //Carga los días desde el 1 hasta al actual de este mes, todos son invalidos
  for (let i = 1; i < diaActual; i++) {
    diasAuxiliares.push({
      num: i,
      mes:null,
      disponibilidad:{valido:false,horarios:[]},
      activo:null
    });
  }

  //Carga los días desde el actual 30 en adelante
  diaAuxiliar = diaActual;
  diaSemana = (dayIndex + diaActual - 1) % 7;
  diaSemana = (diaSemana === 0)?7:diaSemana;
  let maxDays = getMonthValue(myMonth,myYear);
  for (let i = diaActual; i <= maxDays; i++) {
    diaSemana = diaSemana > 7 ? 1 : diaSemana;
    diasAuxiliares.push({
      num: diaAuxiliar,
      mes:month,
      disponibilidad: horariosDisponibilidad(diaSemana, diasTotales,i, myMonth+idMonth,fechas,timeNeed),
      activo:diaSemana ===0 ? null:false,
    });
    diaAuxiliar++;
    diaSemana++;
    diasTotales--;
  }
  diasMostrar.push({id:idMonth,dias:[...diasAuxiliares]});
  while (diasTotales > 0) {
    idMonth++;
    diasAuxiliares = [];
    if((myMonth+monthCounter)>12){
        myMonth = 1;
        monthCounter=0;
        myYear++;
    }
    let maxDays = getMonthValue(myMonth+monthCounter,myYear);
    for (let i = 1; i <= maxDays; i++) {
      diaSemana = diaSemana > 7 ? 1 : diaSemana;
      diasAuxiliares.push({
        num: i,
        mes:myMonth+idMonth,
        disponibilidad: horariosDisponibilidad(diaSemana, diasTotales,i, myMonth+idMonth,fechas,timeNeed),
        activo:diaSemana ===0 ? null:false,
      });
      diaSemana++;
      diasTotales--;
    }
    monthCounter++;
    diasMostrar.push({id:idMonth,dias:[...diasAuxiliares]});
  }
  return diasMostrar;
};
