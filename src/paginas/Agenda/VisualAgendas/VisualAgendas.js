import classes from "./VisualAgendas.module.css";
import {generarHoras,generarCupos,generarNavegacion} from './GenerarContenidoVisualAgenda';

const DUMMY_AGENDAS = [
  {
    nombreEmpleado: "Paco",
    agendas: [
      { idAgenda: 1, i: "8:00", f: "10:00" },
      { idAgenda: 2, i: "11:00", f: "14:00" },
      { idAgenda: 3, i: "14:00", f: "15:00" },
      { idAgenda: 4, i: "15:30", f: "16:00" },
      { idAgenda: 5, i: "17:00", f: "19:00" },
      { idAgenda: 6, i: "20:00", f: "22:00" },
    ],
  },
  {
    nombreEmpleado: "Manolo",
    agendas: [
      { idAgenda: 7, i: "9:00", f: "10:00" },
      { idAgenda: 8, i: "11:00", f: "12:00" },
      { idAgenda: 8, i: "13:00", f: "13:15" },
      { idAgenda: 9, i: "19:00", f: "22:00" },
    ],
  },
  {
    nombreEmpleado: "ANTONIO",
    agendas: [
      { idAgenda: 10, i: "15:00", f: "17:00" },
      { idAgenda: 11, i: "19:00", f: "20:00" },
      { idAgenda: 12, i: "20:00", f: "22:00" },
    ],
  },
  {
    nombreEmpleado: "Manueh",
    agendas: [
      { idAgenda: 13, i: "12:00", f: "14:00" },
      { idAgenda: 14, i: "15:00", f: "17:00" },
      { idAgenda: 15, i: "18:00", f: "20:00" },
    ],
  },
];

let empleados;
let colorFilaI = 1;
let i = 0;
let ocupar = 100/DUMMY_AGENDAS.length;
empleados = generarCupos(DUMMY_AGENDAS,colorFilaI).map((divA) => {
  i++;
  return (
    <div key={i} style={{ width: `${ocupar}%` }}>
      {divA}
    </div>
  );
});
const VisualAgendas = () => {
  return (
    <>
     {generarNavegacion(8,22)}
      <div
        className={classes.container}
        style={{ color: "white", display: "flex" }}
      > 
        <div className={classes.marcas}>{generarHoras(8,22)}</div>
        <div className={classes.empleados}>{empleados}</div>
      </div>
    </>
  );
};
export default VisualAgendas;
