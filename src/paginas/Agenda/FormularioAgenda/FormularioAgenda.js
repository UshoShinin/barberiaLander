import classes from "./FormularioAgenda.module.css";
import React, { useState, useRef, useReducer, useEffect } from "react";
import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";
import InputFile from "../../../components/UI/InputFile/InputFile";
import TextArea from "../../../components/UI/TextArea/TextArea";
import Calendario from "../../../components/Calendario/Calendario";

import CheckBoxAgenda from "./CheckBoxAgenda";
import useHttp from "./../../../hooks/useHttp";
import { DaysGenerator } from "../../../components/Calendario/Dias/GeneradorDias";
import LoaddingSpinner from "../../../components/LoaddingSpinner/LoaddingSpinner";
import { getEmpleadoById } from "../../../components/Calendario/FuncionesAuxiliares";

import {
  inputReducer,
  initialState,
  checkReducer,
  initialStateCheck,
} from "./ReduerFormularioAgenda";
import ComboBox from "../../../components/ComboBox/ComboBox";

/* const DUMMY_HORARIOS_EMPLEADOS = [
  {
    id: 1,
    title: "Perrujo trujo",
    foto: doggo,
    fechas: [
      {
        dia: 26,
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
        dia: 27,
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
        dia: 26,
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
        dia: 27,
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
]; */
const FormularioAgenda = (props) => {
  const [horariosState, setHorariosState] = useState(null);
  /* Carga inicial de datos */
  const obtenerHorarios = (horarios) => {
    /* console.log(horarios.mensaje.empleados); */
    setHorariosState(horarios.mensaje.empleados);
    dispatchInput({
      type: "CHANGE_EMPLOYEE",
      value: horarios.mensaje.empleados[0].id,
    });
  };
  const {
    isLoading,
    error,
    sendRequest: fetchHorarios /* Alias */,
  } = useHttp({ url: "/datosFormularioAgenda" }, obtenerHorarios);

  /* Se ejecuta al inicio para que se cargen los datos */
  useEffect(() => {
    fetchHorarios();
  }, []);

  const [inputState, dispatchInput] = useReducer(inputReducer, initialState);
  const [inputCheckState, dispatchCheck] = useReducer(
    checkReducer,
    initialStateCheck
  );
  const nombreRef = useRef();
  const telefonoRef = useRef();
  const descripcionRef = useRef();

  /* Eventos reducer */
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
    console.log(horarios);
    let misHorarios = [];
    let i = 1;
    if (horarios.value.length > 0) {
      horarios.value.forEach((myH) => {
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
    dispatchInput({
      type: "CALENDARIO",
      value: misHorarios,
      dia: horarios.dia,
    });
  };

  const horariosHandler = (id) => {
    dispatchInput({ type: "HORARIOS_SELECT", value: id });
  };

  const clickHorariosHandler = () => {
    dispatchInput({ type: "HORARIOS_CLICK" });
  };

  /* Aqui se procesa y se manda la info en caso de esta correcta */

  const submitHandler = (event) => {
    event.preventDefault();
    let count = 0;
    Object.values(inputCheckState).forEach((serv) => {
      if (serv) {
        count++;
      }
    });
    if (count === 0) {
      const combo = document.getElementById("timeLeft");
      combo.className = `${combo.className} ${classes.invalidCombo}`;
      combo.focus();
    } else if (!inputState.Nombre.isValid) {
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
  };
  let diasMostrar;
  let diasSeleccionables = [];
  if (horariosState !== null && inputState.Employee.value !== null) {
    const date = new Date();
    diasMostrar = DaysGenerator(
      date.getDate(),
      date.getMonth() + 1,
      date.getFullYear(),
      getEmpleadoById(horariosState, inputState.Employee.value).fechas,
      calcularTiempo(inputState.Employee.value, inputCheckState, horariosState)
    );
    /* console.log(diasMostrar); */

    if (inputState.Calendario.value !== null) {
      const diaSelect = inputState.Calendario.dia.d;
      const mesSelect = inputState.Calendario.dia.m;
      console.log(diaSelect);
      console.log(mesSelect);
      for (let i = 0; i < diasMostrar.length; i++) {
        for (let j = 0; j < diasMostrar[i].dias.length; j++) {
          const myDia = diasMostrar[i].dias[j];
          if (myDia.activo !== null) {
            console.log(myDia);
            if (myDia.num === diaSelect && myDia.mes === mesSelect) {
              diasMostrar[i].dias[j].activo = true;
            }
          }

        }
      }
    } else {
      for (let i = 0; i < diasMostrar.length; i++) {
        for (let j = 0; j < diasMostrar[i].dias.length; j++) {
          diasMostrar[i].dias[j].activo = false;
        }
      }
    }

    /* diasMostrar[0].dias[26].activo = true;
    diasMostrar[0].dias[27].activo = true;
    diasMostrar[0].dias[28].activo = true;
    diasMostrar[0].dias[29].activo = true; */
  }

  /* Este es el combo que aparece cuando se selecciona un día del calendario */
  /* En caso que no se haya hecho la precara de datos el combo es null */
  const combo =
    horariosState === null ? null : (
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
  /* Calendario con todas sus empleados y horarios */
  /* Si no se hizo la precarga de datos se carga null */
  const calendarioContent =
    horariosState === null ? null : (
      <Calendario
        actividad={diasSeleccionables}
        getHorarios={calendarioHandler}
        empleados={horariosState}
        diasAMostrar={diasMostrar}
        currentEmployee={inputState.Employee.value}
        changeEmployee={(id) => {
          dispatchInput({ type: "CHANGE_EMPLOYEE", value: id });
        }}
      />
    );

  console.log(inputState);
  return (
    <>
      {isLoading && <LoaddingSpinner />}
      {!isLoading && (
        <form onSubmit={submitHandler}>
          <div className={classes.nuevaAgenda}>
            <div className={classes.Inputs}>
              <CheckBoxAgenda
                state={inputCheckState}
                time={calcularTiempo(
                  inputState.Employee.value,
                  inputCheckState,
                  horariosState
                )}
                myAction={(action) => {
                  console.log(document.getElementById("timeLeft").className);
                  document
                    .getElementById("timeLeft")
                    .classList.remove("FormularioAgenda_invalidCombo__1XMtB");
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
      )}
    </>
  );
};
export default FormularioAgenda;

//Esto hay que borrarlo cuando tengamos en el backend esta info
const calcularTiempo = (id, serv, horariosState) => {
  let total = 0;
  if (horariosState !== null) {
    if (id === horariosState[0].id) {
      if (serv.corte) total += 30;
      if (serv.maquina) total += 20;
      if (serv.barba) total += 15;
      if (serv.laciado) total += 30;
      if (serv.decoloracion) total += 15;
      if (serv.tinta) total += 15;
    } else {
      if (serv.corte) total += 60;
      if (serv.maquina) total += 40;
      if (serv.barba) total += 30;
      if (serv.laciado) total += 60;
      if (serv.decoloracion) total += 30;
      if (serv.tinta) total += 30;
    }
  }

  return total;
};
