import "./FormularioAgenda.css";
import React, { useState, useRef, useReducer } from "react";
import Switch from "../../components/Switch/Switch";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Calendario from "../../components/Calendario/Calendario";
import doggo from "../../recursos/DogoDeFondo.png";
import one from "../../recursos/1.png";
import two from "../../recursos/2.png";
import three from "../../recursos/3.png";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "USER_INPUT_NAME":
      return {
        ...state,
        Nombre: { value: action.value, isValid: state.Nombre.isValid },
      };
    case "FOCUS_INPUT_NAME":
      return {
        ...state,
        Nombre: {
          value: state.Nombre.value,
          isValid: state.Nombre.value.trim().length > 5,
        },
      };
    case "RESET_NAME_IS_VALID":
      return {
        ...state,
        Nombre: {
          value: state.Nombre.value,
          isValid: null
        },
      };
  }
};
const initialState = { Nombre: { value: "", isValid: null } };

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
  { id: 2, title: "One", foto: one },
  { id: 3, title: "Two", foto: two },
  { id: 4, title: "Three", foto: three },
];

function FormularioAgenda(props) {
  const [inputState, dispatchInput] = useReducer(inputReducer, initialState);

  const [enteredTelefono, setEnteredTelefono] = useState("");
  const [enteredDescripcion, setEnteredDescripcion] = useState("");
  const [enteredCorteARealizar, setEnteredCorteARealizar] = useState("");
  const [enteredReferenciaActual, setEnteredReferenciaActual] = useState("");
  const nombreRef = useRef();
  const nombreChangeHandler = (event) => {
    dispatchInput({ type: "USER_INPUT_NAME", value: event.target.value });
  };
  const nombreOnFocus = () => {
    dispatchInput({ type: "FOCUS_INPUT_NAME" });
  };
  const nombreOnBlur = () => {
    dispatchInput({ type: "RESET_NAME_IS_VALID" });
  };
  function telefonoChangeHandler(event) {
    setEnteredTelefono(event.target.value);
  }
  function descripcionChangeHandler(event) {
    setEnteredDescripcion(event.target.value);
  }
  function corteARealizarhangeHandler(event) {
    setEnteredCorteARealizar(event.target.value);
  }
  function referenciaActualChangeHandler(event) {
    setEnteredReferenciaActual(event.target.value);
  }

  function submitHandler(event) {
    event.preventDefault();
    const datosAgenda = {
      nombre: inputState.Nombre.value,
      telefono: enteredTelefono,
      descripcion: enteredDescripcion,
      corteARealizar: enteredCorteARealizar,
      referenciaActual: enteredReferenciaActual,
    };
    props.onSaveDatosAgenda(datosAgenda);
    /* setEnteredNombre(""); */
    setEnteredTelefono("");
    setEnteredDescripcion("");
    setEnteredCorteARealizar("");
    setEnteredReferenciaActual("");
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="nueva-agenda__controls">
        <div className="nueva-agenda__control">
          <label>Nombre</label>

          <Input
            ref={nombreRef}
            isValid={true}
            input={{
              id: 1,
              type: "text",
              value: inputState.Nombre.value,
              placeholder: "Ingrese su nombre",
              onChange:nombreChangeHandler,
              onBlur: nombreOnBlur,
              onFocus: nombreOnFocus,
            }}
          />
        </div>
        <div className="nueva-agenda__control">
          <label>Teléfono</label>
          <input
            type="number"
            min="2000000"
            max="99999999"
            value={enteredTelefono}
            onChange={telefonoChangeHandler}
          />
        </div>
        <Calendario
          empleados={DUMMY_HORARIOS_EMPLEADOS}
          servicios={{
            corte: true,
            maquina: false,
            barba: false,
            laciado: true,
            decoloracion: false,
            tinta: true,
          }}
        />
        <div className="nueva-agenda__control">
          <label>Descripcion</label>
          <textarea
            type="text"
            value={enteredDescripcion}
            onChange={descripcionChangeHandler}
          />
        </div>
        <div className="nueva-agenda__control">
          <label>Subir Corte a realizar</label>
          <input
            type="file"
            value={enteredDescripcion}
            onChange={corteARealizarhangeHandler}
          />
        </div>
        <div className="nueva-agenda__control">
          <label>Enviar una referencia actual</label>
          <input
            type="file"
            value={enteredDescripcion}
            onChange={referenciaActualChangeHandler}
          />
        </div>
        <div className="nueva-agenda__actions">
          <Button type="submit">Agregar Reserva</Button>
        </div>
      </div>
    </form>
  );
}

export default FormularioAgenda;
