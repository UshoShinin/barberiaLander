import React, { useReducer, useRef } from "react";
import SimpleButton from "../../components/UI/SimpleButton/SimpleButton";
import Switch from "../../components/UI/Switch/Switch";
import Input from "../../components/UI/Input/Input";
import ComboBox from "../../components/ComboBox/ComboBox";
import Card from "../../components/UI/Card/Card";
import Note from "../../components/UI/Note/Note";
import classes from "./AperturaCierre.module.css";
import { initialState, cajaReducer } from "./ReducerCaja";

const DUMMY_OPTIONS=[{id:1,title:'Hola'},{id:2,title:'Chao'}];

const AperturaCierre = () => {
  const [cajaState, dispatchCaja] = useReducer(cajaReducer, initialState);
  const montoIniRef = useRef();
  const montoAgendaRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className={classes.container}>
      <Note show={cajaState.jornal.show}>{cajaState.jornal.value}</Note>
      <div className={`${classes.cajaContainer} ${classes.actions}`}>
        {/* <ComboBox/> */}
        <SimpleButton
          action={() => {
            dispatchCaja({ type: "SHOW_JORNAL", value: "Soy el jornal papu" });
            setTimeout(() => {
              dispatchCaja({ type: "HIDE_JORNAL" });
            }, 3000);
          }}
        >
          Calcular Jornal
        </SimpleButton>
        <SimpleButton>Calcular Comisiones</SimpleButton>
        <SimpleButton>Calcular Propinas</SimpleButton>
      </div>
      <div className={classes.caja}>
        <div className={`${classes.cajaContainer} ${classes.abrirCerrar}`}>
          <label>Monto Inicial</label>
          <Input
            ref={montoIniRef}
            isValid={cajaState.montoInicial.isValid}
            input={{
              id: 1,
              type: "number",
              value: cajaState.montoInicial.value,
              placeholder: "0",
              onChange: (event) => {
                dispatchCaja({ type: "USER_INPUT_MONOTO_I", value: event.target.value });
              },
              onBlur: () => {
                dispatchCaja({ type: "BLUR_INPUT_MONOTO_I" });
              },
              onFocus: () => {
                dispatchCaja({ type: "FOCUS_INPUT_MONOTO_I" });
              },
            }}
          />
          <SimpleButton className={classes.Abrir}>Abrir Caja</SimpleButton>
          <SimpleButton className={classes.Cerrar}>Cerrar Caja</SimpleButton>
        </div>
        <div className={`${classes.cajaContainer} ${classes.entrada}`}>
          <div className={classes.agendaProductos}>
            <div className={classes.cajaContainer}>
              <div>
                <div className={classes.switchs}>
                  <label>Sin agendar</label><Switch active={cajaState.sinAgendar.value} onCheck={()=>{dispatchCaja({type:'CLICK_S_A'})}}/>
                  <label>Solo hoy</label><Switch active={cajaState.soloHoy.value} onCheck={()=>{dispatchCaja({type:'CLICK_S_H'})}}/>
                </div>
                <div>
                  <label>Agenda</label><ComboBox opciones={DUMMY_OPTIONS} current={cajaState.comboAgenda.value} active={cajaState.comboAgenda.active} onClick={()=>{dispatchCaja({type:'CLICK_COMBO_AGENDA'})}} onChange={(id)=>{dispatchCaja({type:'CHANGE_COMBO_AGENDA',value:id})}}/>
                </div>
                <div style={{display:'flex'}}>
                  <label>Monto</label>
                  <Input
                  ref={montoAgendaRef}
                  isValid={cajaState.montoAgenda.isValid}
                  input={{
                    id: 2,
                    type: "number",
                    value: cajaState.montoAgenda.value,
                    placeholder: "0",
                    onChange: (event) => {
                      dispatchCaja({ type: "USER_INPUT_MONOTO_A", value: event.target.value });
                    },
                    onBlur: () => {
                      dispatchCaja({ type: "BLUR_INPUT_MONOTO_A" });
                    },
                    onFocus: () => {
                      dispatchCaja({ type: "FOCUS_INPUT_MONOTO_A" });
                    },
                  }}/>
                </div>
                <SimpleButton>Cobrar</SimpleButton>
              </div>
              <div>

              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AperturaCierre;
