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
import {
  getElementById,
  transformStringNumber,
  horarioEnMinutos,
  minutosAHorarios,
  transformNumberString,
} from "../../../components/Calendario/FuncionesAuxiliares";

import {
  inputReducer,
  initialBaseState,
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
  /* console.log(props.agenda);
  console.log(props.horario); */
  /* let initialState;
  if(false){ props.agenda !==null&&props.horario!==null 
    
    initialState = {
      Nombre: { value: props.agenda.nombreCliente, isValid: true },
      Horarios: null,
      HorariosFiltrados: null,
      Telefono: { value: props.agenda.tel, isValid: true },
      Descripcion: { value: props.agenda.descripcion, isValid: props.agenda.descripcion.length!==0?true:null },
      Referencia: { value: props.agenda.img },
      Calendario: { value: null, dia: props.agenda.fecha },
      ComboBox: { value: null, active: false },
      Employee: { value: props.agenda.ciPeluquero },
      corte: { active: props.agenda.corte, id: 1 },
      barba: { active: props.agenda.barba, id: 4 },
      maquina: { active: props.agenda.maquina, id: 5 },
      claritos: { active: props.agenda.claritos, id: 6 },
      decoloracion: { active: props.agenda.decoloracion, id: 7 },
      brushing: { active: props.agenda.brushing, id: 8 },
    }
  }else{
    initialState = initialBaseState;
  } */
  /* Carga inicial de datos */
  const obtenerHorarios = (horarios) => {
    dispatchInput({
      type: "HORARIOS_CARGADOS",
      value: horarios.mensaje.empleados,
    });
  };
  const {
    isLoading,
    error,
    sendRequest: fetchHorarios /* Alias */,
  } = useHttp();

  /* Se ejecuta al inicio para que se cargen los datos */
  useEffect(() => {
    fetchHorarios({ url: "/datosFormularioAgenda" }, obtenerHorarios);
  }, []);

  const [inputState, dispatchInput] = useReducer(inputReducer, initialBaseState);
  const nombreRef = useRef();
  const telefonoRef = useRef();
  const descripcionRef = useRef();
  
  console.log(inputState);
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
    let services = [];
    Object.values(inputState).forEach((serv) => {
      if (serv.active) {
        services.push(serv.id);
      }
    });
    if (services.length === 0) {
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
    } else {
      console.log(inputState);
      const inicio =
        "0" + inputState.Calendario.value[inputState.ComboBox.value - 1].title;
      const fin = transformNumberString(
        minutosAHorarios(
          horarioEnMinutos(transformStringNumber(inicio)) + tiempoNecesario
        )
      );
      const year =
        inputState.Calendario.dia.m < date.getMonth() + 1
          ? new Date().getFullYear() + 1
          : new Date().getFullYear();
      const datosAgenda = {
        nombreCliente: inputState.Nombre.value,
        telefono: inputState.Telefono.value,
        descripcion: inputState.Descripcion.value,
        imagenEjemplo: inputState.Referencia.value,
        ciEmpleado:inputState.Employee.value,
        servicios: services,
        fecha: `${year}-${inputState.Calendario.dia.m}-${inputState.Calendario.dia.d}`,
        horario: { i: inicio, f: fin },
      };
      props.onSaveDatosAgenda(datosAgenda);
    }
  };
  let diasMostrar;
  let diasSeleccionables = [];
  let tiempoNecesario;
  const realDate = new Date();
  const date = new Date(
    realDate.getFullYear(),
    realDate.getMonth() - 1,
    realDate.getDate()
  );
  if (inputState.HorariosFiltrados !== null && inputState.Employee.value !== null) {
    tiempoNecesario = calcularTiempo(
      inputState.Employee.value,
      inputState,
      inputState.HorariosFiltrados
    );
    diasMostrar = DaysGenerator(
      date.getDate(),
      date.getMonth() + 1,
      date.getFullYear(),
      getElementById(inputState.HorariosFiltrados, inputState.Employee.value).fechas,
      tiempoNecesario
    );
    if (inputState.Calendario.value !== null) {
      const diaSelect = inputState.Calendario.dia.d;
      const mesSelect = inputState.Calendario.dia.m;
      for (let i = 0; i < diasMostrar.length; i++) {
        for (let j = 0; j < diasMostrar[i].dias.length; j++) {
          const myDia = diasMostrar[i].dias[j];
          if (myDia.activo !== null) {
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
  }

  /* Este es el combo que aparece cuando se selecciona un día del calendario */
  /* En caso que no se haya hecho la precara de datos el combo es null */
  const combo =
    inputState.HorariosFiltrados === null ? null : (
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
  let calendarioContent = null;
  if (inputState.HorariosFiltrados !== null) {
    calendarioContent = (
      <Calendario
        date={date}
        actividad={diasSeleccionables}
        getHorarios={calendarioHandler}
        empleados={inputState.HorariosFiltrados}
        diasAMostrar={diasMostrar}
        currentEmployee={inputState.Employee.value}
        changeEmployee={(id) => {
          dispatchInput({ type: "CHANGE_EMPLOYEE", value: id });
        }}
      />
    );
  }

  console.log(inputState.HorariosFiltrados);
  return (
    <>
      {isLoading && <LoaddingSpinner />}
      {!isLoading && (
        <form onSubmit={submitHandler}>
          <div className={classes.nuevaAgenda}>
            <div className={classes.Inputs}>
              <CheckBoxAgenda
                state={inputState}
                time={calcularTiempo(
                  inputState.Employee.value,
                  inputState,
                  inputState.HorariosFiltrados
                )}
                myAction={(action) => {
                  document
                    .getElementById("timeLeft")
                    .classList.remove("FormularioAgenda_invalidCombo__1XMtB");
                  dispatchInput(action);
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
      if (serv.corte.active) total += 30;
      if (serv.maquina.active) total += 20;
      if (serv.barba.active) total += 15;
      if (serv.brushing.active) total += 30;
      if (serv.decoloracion.active) total += 15;
      if (serv.claritos.active) total += 15;
    } else {
      if (serv.corte.active) total += 60;
      if (serv.maquina.active) total += 40;
      if (serv.barba.active) total += 30;
      if (serv.brushing.active) total += 60;
      if (serv.decoloracion.active) total += 30;
      if (serv.claritos.active) total += 30;
    }
  }

  return total;
};
