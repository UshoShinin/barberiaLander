import React, { useReducer } from "react";
import Checkbox from "../../../components/UI/Checkbox/Checkbox";
import classes from "../../../paginas/Agenda/FormularioAgenda/CheckBoxAgenda.module.css";

const initialState = {
  corte: false,
  maquina: false,
  barba: false,
  laciado: false,
  decoloracion: false,
  tinta: false,
};

const CheckBoxAgenda = (props) => {
  const checkReducer = (state, action) => {
    let myState;
    switch (action.type) {
      case "CORTE":
        myState = { ...state, corte: !state.corte };
        break;
      case "MAQUINA":
        myState = { ...state, maquina: !state.maquina };
        break;
      case "BARBA":
        myState = { ...state, barba: !state.barba };
        break;
      case "LACIADO":
        myState = { ...state, laciado: !state.laciado };
        break;
      case "DECOLORACION":
        myState = { ...state, decoloracion: !state.decoloracion };
        break;
      case "TINTA":
        myState = { ...state, tinta: !state.tinta };
        break;
    }
    props.onSaveDatosCheckBox(myState);
    return myState;
  };
  const [checkboxState, dispatchChecks] = useReducer(
    checkReducer,
    initialState
  );
  return (
    <div className="nueva-agenda__control">
      <h1 className={classes.title}>¿En que podemos ayudarte?</h1>
      <div className={classes.opciones}>
        <div>
          <table>
            <tr>
              <td className={classes.labelPlace}>
                <label className={classes.label} htmlFor={11}>
                  Corte
                </label>
              </td>
              <td>
                <Checkbox
                  id={11}
                  checked={checkboxState.corte}
                  onChange={() => {
                    dispatchChecks({ type: "CORTE" });
                  }}
                />
              </td>
            </tr>
            <tr>
              <td className={classes.labelPlace}>
                <label className={classes.label} htmlFor={13}>
                  Maquina
                </label>
              </td>
              <td>
                <Checkbox
                  id={13}
                  checked={checkboxState.maquina}
                  onChange={() => {
                    dispatchChecks({ type: "MAQUINA" });
                  }}
                />
              </td>
            </tr>
            <tr>
              <td className={classes.labelPlace}>
                <label className={classes.label} htmlFor={15}>
                  Barba
                </label>
              </td>
              <td>
                <Checkbox
                  id={15}
                  checked={checkboxState.barba}
                  onChange={() => {
                    dispatchChecks({ type: "BARBA" });
                  }}
                />
              </td>
            </tr>
          </table>
        </div>
        <div>
          <table>
            <tr>
              <td className={classes.labelPlace}>
                <label className={classes.label} htmlFor={12}>
                  Laciado
                </label>
              </td>
              <td>
                <Checkbox
                  id={12}
                  checked={checkboxState.laciado}
                  onChange={() => {
                    dispatchChecks({ type: "LACIADO" });
                  }}
                />
              </td>
            </tr>
            <tr>
              <td className={classes.labelPlace}>
                <label className={classes.label} htmlFor={14}>
                  Decoloracion
                </label>
              </td>
              <td>
                <Checkbox
                  id={14}
                  checked={checkboxState.decoloracion}
                  onChange={() => {
                    dispatchChecks({ type: "DECOLORACION" });
                  }}
                />
              </td>
            </tr>
            <tr>
              <td className={classes.labelPlace}>
                <label className={classes.label} htmlFor={16}>
                  Tinta
                </label>
              </td>
              <td>
                <Checkbox
                  id={16}
                  checked={checkboxState.tinta}
                  onChange={() => {
                    dispatchChecks({ type: "TINTA" });
                  }}
                />
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CheckBoxAgenda;
