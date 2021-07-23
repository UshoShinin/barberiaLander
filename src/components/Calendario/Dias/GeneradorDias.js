import { counter } from "@fortawesome/fontawesome-svg-core";
import { getMonthValue } from "./FunctionsDias";
import { horariosDisponibilidad } from './../FuncionesAuxiliares';
export let DaysGenerator = (diaActual, month, year, dayIndex,fechas,timeNeed) => {
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
      });
      diaSemana++;
      diasTotales--;
    }
    monthCounter++;
    diasMostrar.push({id:idMonth,dias:[...diasAuxiliares]});
  }
  return diasMostrar;
};
