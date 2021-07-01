import Dias from "../Dias/Dias";
import { DaysGenerator } from "../Dias/GeneradorDias";
import { getMonthChart, getDayIndex } from "../Dias/FunctionsDias";
import classes from './ContenidoCalendario.module.css';
export const days = () => {
  let cantidadMeses;
  let diasMostrar;
    const oldDate = new Date();
    const Day = new Date(
      oldDate.getFullYear(),
      oldDate.getMonth() /* -5 para 31 enero*/,
      oldDate.getDate() /* +5 */
    );
    const diaActual = Day.getDate();
    const month = Day.getMonth() + 1;
    const year = Day.getFullYear();
    let yearChart = 6;
    const dayIndex = getDayIndex(
      1,
      getMonthChart(month),
      yearChart,
      parseInt(year.toString().substr(-2), 10)
    );
    diasMostrar = DaysGenerator(
      diaActual,
      month,
      Day.getFullYear(),
      dayIndex
    );
    cantidadMeses=diasMostrar.length;
    let content = diasMostrar.map((meses) => {
      return (
        <ol className={classes.diasCalendario}>
          <Dias
          diasMostrar={meses.dias}
          month={month+meses.id}
          year={year}
          yearChart={yearChart}
        />
        </ol>
      );
    });
    return { cantidadMeses:cantidadMeses, content:content };
  };