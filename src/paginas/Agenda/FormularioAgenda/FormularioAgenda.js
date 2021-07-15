import classes from "./FormularioAgenda.module.css";
import React, { useRef, useReducer } from "react";
import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";
import InputFile from "../../../components/UI/InputFile/InputFile";
import TextArea from "../../../components/UI/TextArea/TextArea";
import Calendario from "../../../components/Calendario/Calendario";
import doggo from "../../../recursos/DogoDeFondo.png";
import one from "../../../recursos/1.png";
import two from "../../../recursos/2.png";
import three from "../../../recursos/3.png";
import CheckBoxAgenda from "./CheckBoxAgenda";
import {
  inputReducer,
  initialState,
  checkReducer,
  initialStateCheck,
} from "./ReduerFormularioAgenda";
import ComboBox from "../../../components/ComboBox/ComboBox";

const DUMMY_HORARIOS_EMPLEADOS = [
  {
    id: 1,
    title: "Perrujo trujo",
    foto: doggo,
    fechas: [
      {
        dia: 22,
        mes: 7,
        horarios: [
          { i: "10:00", f: "12:00" }, //Una hora libre
          { i: "13:00", f: "15:00" },
          { i: "15:00", f: "16:30" }, //Dos horas
          { i: "18:30", f: "19:00" }, //Una hora
          { i: "20:00", f: "22:00" },
        ],
      },
      {
        dia: 23,
        mes: 7,
        horarios: [
          { i: "15:00", f: "16:30" }, //Dos horas
          { i: "18:30", f: "19:00" }, //Una hora
          { i: "20:00", f: "22:00" },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "One",
    foto: one,
    fechas: [
      {
        dia: 22,
        mes: 7,
        horarios: [
          { i: "10:00", f: "12:00" }, //Una hora libre
          { i: "13:00", f: "15:00" },
          { i: "15:00", f: "16:30" }, //Dos horas
          { i: "18:30", f: "19:00" }, //Una hora
          { i: "20:00", f: "22:00" },
        ],
      },
      {
        dia: 23,
        mes: 7,
        horarios: [
          { i: "15:00", f: "16:30" }, //Dos horas
          { i: "18:30", f: "19:00" }, //Una hora
          { i: "20:00", f: "22:00" },
        ],
      },
    ],
  },
  { id: 3, title: "Two", foto: two, fechas: [] },
  { id: 4, title: "Three", foto: three, fechas: [] },
];

function FormularioAgenda(props) {
  const [inputState, dispatchInput] = useReducer(inputReducer, initialState);
  const [inputCheckState, dispatchCheck] = useReducer(
    checkReducer,
    initialStateCheck
  );
  const nombreRef = useRef();
  const telefonoRef = useRef();
  const descripcionRef = useRef();
  const nombreChangeHandler = (event) => {
    dispatchInput({ type: "USER_INPUT_NAME", value: event.target.value });
  };
  const nombreOnFocus = () => {
    dispatchInput({ type: "FOCUS_INPUT_NAME" });
  };
  const nombreOnBlur = () => {
    dispatchInput({ type: "RESET_NAME_IS_VALID" });
  };
  const telefonoChangeHandler = (event) => {
    dispatchInput({ type: "USER_INPUT_PHONE", value: event.target.value });
  };
  const telefonoOnFocus = () => {
    dispatchInput({ type: "FOCUS_INPUT_PHONE" });
  };
  const telefonoOnBlur = () => {
    dispatchInput({ type: "RESET_PHONE_IS_VALID" });
  };
  const descripcionChangeHandler = (event) => {
    dispatchInput({ type: "USER_INPUT_DESC", value: event.target.value });
  };
  const descripcionOnFocus = () => {
    dispatchInput({ type: "FOCUS_INPUT_DESC" });
  };
  const descripcionOnBlur = () => {
    dispatchInput({ type: "RESET_DESC_IS_VALID" });
  };
  const corteChangeHandler = (event) => {
    dispatchInput({ type: "USER_INPUT_CORTE", value: event.target.value });
  };
  const peloChangeHandler = (event) => {
    dispatchInput({ type: "USER_INPUT_PELO", value: event.target.value });
  };

  const calendarioHandler = (horarios) => {
    let misHorarios = [];
    let i = 1;
    if (horarios.length > 0) {
      horarios.forEach((myH) => {
        misHorarios.push({
          id: i,
          title: `${myH.h}:${myH.m < 10 ? "0" + myH.m : myH.m}`,
        });
        i++;
      });
    } else {
      let H = 8;
      let M = 0;
      while (H < 23) {
        misHorarios.push({
          id: i,
          title: `${H}:${M < 10 ? "0" + M : M}`,
        });
        M += 15;
        if (M === 60) {
          M = 0;
          H++;
        }
        i++;
      }
    }
    dispatchInput({ type: "CALENDARIO", value: misHorarios });
  };

  const horariosHandler = (id) => {
    dispatchInput({ type: "HORARIOS_SELECT", value: id });
  };

  const clickHorariosHandler = () => {
    dispatchInput({ type: "HORARIOS_CLICK" });
  };

  function submitHandler(event) {
    event.preventDefault();
    let count = 0;
    Object.values(inputCheckState).forEach((serv) => {
      if (serv) {count++;}
    });
    if (count === 0) {
      const combo = document.getElementById("timeLeft");
      combo.className = `${combo.className} ${classes.invalidCombo}`;
      combo.focus();
    }else if (!inputState.Nombre.isValid) {
      nombreRef.current.focus();
    } else if (!inputState.Telefono.isValid) {
      telefonoRef.current.focus();
    } else if (inputState.Calendario.value === null) {
      const cal = document.getElementById("Calendario");
      cal.className = `${cal.className} ${classes.invalidCal}`;
      cal.focus();
    }
    const datosAgenda = {
      nombre: inputState.Nombre.value,
      telefono: inputState.Telefono.value,
      descripcion: inputState.Descripcion.value,
      corteARealizar: inputState.Corte.value,
      referenciaActual: inputState.Pelo.value,
    };
    props.onSaveDatosAgenda(datosAgenda);
  }
  console.log(inputState);
  console.log(inputCheckState);
  const combo = (
    <div className={classes.ComboBox}>
      <ComboBox
        height={4.8}
        current={inputState.ComboBox.value}
        onChange={horariosHandler}
        opciones={inputState.Calendario.value}
        onClick={clickHorariosHandler}
        active={inputState.ComboBox.active}
      />
    </div>
  );
  const calendarioContent = (
    <Calendario
      getHorarios={calendarioHandler}
      empleados={DUMMY_HORARIOS_EMPLEADOS}
      time={calcularTiempo(inputState.Employee.value, inputCheckState)}
      currentEmployee={inputState.Employee.value}
      changeEmployee={(id) => {
        dispatchInput({ type: "CHANGE_EMPLOYEE", value: id });
      }}
    />
  );
  return (
    <form onSubmit={submitHandler}>
      <div className={classes.nuevaAgenda}>
        <div className={classes.Inputs}>
          <CheckBoxAgenda
            state={inputCheckState}
            time={calcularTiempo(inputState.Employee.value, inputCheckState)}
            myAction={(action) => {
              console.log(document.getElementById('timeLeft').className);
              document.getElementById('timeLeft').classList.remove("FormularioAgenda_invalidCombo__1XMtB");
              dispatchCheck(action);
            }}
          />

          {document.getElementById("root").clientWidth < 980 && (
            <div className={classes.Cal}>
              {calendarioContent}
              {inputState.Calendario.value !== null && combo}
            </div>
          )}
          <table className={classes.inputsTasble}>
            <tbody>
              <tr>
                <td className={classes.label}>
                  <label htmlFor="1">Nombre:</label>
                </td>
                <td>
                  <Input
                    ref={nombreRef}
                    isValid={inputState.Nombre.isValid}
                    input={{
                      id: 1,
                      type: "text",
                      value: inputState.Nombre.value,
                      placeholder: "Ingrese su nombre",
                      onChange: nombreChangeHandler,
                      onBlur: nombreOnFocus,
                      onFocus: nombreOnBlur,
                    }}
                  />
                </td>
              </tr>

              <tr>
                <td className={classes.label}>
                  <label htmlFor="2">Teléfono:</label>
                </td>
                <td>
                  <Input
                    ref={telefonoRef}
                    isValid={inputState.Telefono.isValid}
                    input={{
                      id: 2,
                      type: "number",
                      min: "2000000",
                      max: "99999999",
                      value: inputState.Telefono.value,
                      placeholder: "Ingrese su telefono",
                      onChange: telefonoChangeHandler,
                      onBlur: telefonoOnFocus,
                      onFocus: telefonoOnBlur,
                    }}
                  />
                </td>
              </tr>

              <tr>
                <td className={classes.label}>
                  <label htmlFor="3">Descripción:</label>
                </td>
                <td>
                  <TextArea
                    ref={descripcionRef}
                    isValid={inputState.Descripcion.isValid}
                    input={{
                      id: 3,
                      rows: 4,
                      value: inputState.Descripcion.value,
                      placeholder:
                        "Ingrese una descripción de lo que quiere hacerse",
                      onChange: descripcionChangeHandler,
                      onBlur: descripcionOnFocus,
                      onFocus: descripcionOnBlur,
                    }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <InputFile
            input={{ id: 4, onChange: corteChangeHandler }}
            label="Seleccione una foto de referencia"
          />
          <InputFile
            input={{ id: 5, onChange: peloChangeHandler }}
            label="Suba una foto de como se ve su pelo"
          />
        </div>
        {document.getElementById("root").clientWidth > 979 && (
          <div className={classes.Cal}>
            {calendarioContent}
            {inputState.Calendario.value !== null && combo}
          </div>
        )}
      </div>
      <Button type="submit">Agregar Reserva</Button>
    </form>
  );
}
export default FormularioAgenda;

const calcularTiempo = (empleado, serv) => {
  let total = 0;
  switch (empleado) {
    case 0:
      if (serv.corte) total += 30;
      if (serv.maquina) total += 20;
      if (serv.barba) total += 15;
      if (serv.laciado) total += 30;
      if (serv.decoloracion) total += 15;
      if (serv.tinta) total += 15;
      break;
    default:
      if (serv.corte) total += 60;
      if (serv.maquina) total += 24;
      if (serv.barba) total += 30;
      if (serv.laciado) total += 60;
      if (serv.decoloracion) total += 30;
      if (serv.tinta) total += 30;
  }
  return total;
};
