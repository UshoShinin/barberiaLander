
import "./FormularioAgenda.css";
import React, { useState } from "react";
import Switch from "../../components/Switch/Switch";
import Calendario from '../../components/Calendario/Calendario'

function FormularioAgenda(props) {
  const [enteredNombre, setEnteredNombre] = useState("");
  const [enteredTelefono, setEnteredTelefono] = useState("");
  const [enteredDescripcion, setEnteredDescripcion] = useState("");
  const [enteredCorteARealizar, setEnteredCorteARealizar] = useState("");
  const [enteredReferenciaActual, setEnteredReferenciaActual] = useState("");



  function nombreChangeHandler(event) {
    setEnteredNombre(event.target.value);
  }
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

  function submitHandler(event){
    event.preventDefault();
    const datosAgenda = {
      nombre: enteredNombre,
      telefono: enteredTelefono,
      descripcion: enteredDescripcion,
      corteARealizar: enteredCorteARealizar,
      referenciaActual: enteredReferenciaActual
    };
    props.onSaveDatosAgenda(datosAgenda);
    setEnteredNombre('');
    setEnteredTelefono('');
    setEnteredDescripcion('');
    setEnteredCorteARealizar('');
    setEnteredReferenciaActual('');
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="nueva-agenda__controls">
        <div className="nueva-agenda__control">
          <label>Nombre</label>
          <input type="text" 
          value={enteredNombre} 
          onChange={nombreChangeHandler} 
          />
        </div>
        <div className="nueva-agenda__control">
          <label>Teléfono</label>
          <input type="number" 
          min="2000000"
          max="99999999"
          value={enteredTelefono} 
          onChange={telefonoChangeHandler} 
          />
        </div>
        <Calendario />      
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
          <button type="submit">Agregar Reserva</button>
        </div>
      </div>
    </form>
  );
}

export default FormularioAgenda;
