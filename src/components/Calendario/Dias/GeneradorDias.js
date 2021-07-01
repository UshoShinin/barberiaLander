import { counter } from "@fortawesome/fontawesome-svg-core";
import { getMonthValue } from "./FunctionsDias";
export let DaysGenerator = (diaActual, month, year, dayIndex) => {
  const diaValido = (diaSemana, diasTotales) => {
    if (diaSemana !== 7 && diasTotales > 0) return true;
    return false;
  };

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
      valido: false,
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
      valido: diaValido(diaSemana, diasTotales),
    });
    diaAuxiliar++;
    diaSemana++;
    diasTotales--;
  }
  diasMostrar.push({id:idMonth,dias:[...diasAuxiliares]});
  console.log(diasMostrar);
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
        valido: diaValido(diaSemana, diasTotales),
      });
      diaSemana++;
      diasTotales--;
    }
    monthCounter++;
    diasMostrar.push({id:idMonth,dias:[...diasAuxiliares]});
  }
  console.log(diasMostrar);
  return diasMostrar;
};
