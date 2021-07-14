import classes from "./FormularioAgenda.module.css";
import React, { useRef, useReducer } from "react";
import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";
import InputFile from "../../../components/UI/InputFile/InputFile";
import TextArea from '../../../components/UI/TextArea/TextArea';
import Calendario from "../../../components/Calendario/Calendario";
import doggo from "../../../recursos/DogoDeFondo.png";
import one from "../../../recursos/1.png";
import two from "../../../recursos/2.png";
import three from "../../../recursos/3.png";
import CheckBoxAgenda from "./CheckBoxAgenda";
import { inputReducer, initialState } from "./ReduerFormularioAgenda";

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

  function submitHandler(event) {
    event.preventDefault();
    const datosAgenda = {
      nombre: inputState.Nombre.value,
      telefono: inputState.Telefono.value,
      descripcion: inputState.Descripcion.value,
      corteARealizar: inputState.Corte.value,
      referenciaActual: inputState.Pelo.value,
    };
    props.onSaveDatosAgenda(datosAgenda);
  }
  const checkBoxHandler = (datos) => {
    console.log(datos);
  };
  console.log(inputState);
  return (
    <form onSubmit={submitHandler}>
      <div className={classes.nuevaAgenda}>
        <div className={classes.Inputs}>
          <CheckBoxAgenda onSaveDatosCheckBox={checkBoxHandler} />
          
          {document.getElementById("root").clientWidth < 980 && (
          <div className={classes.Cal}>
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
          </div>
        )}
          <table className={classes.inputsTasble}>
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
                    rows:4,
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
          </div>
        )}
      </div>
      <Button type="submit">Agregar Reserva</Button>
    </form>
  );
}

export default FormularioAgenda;
