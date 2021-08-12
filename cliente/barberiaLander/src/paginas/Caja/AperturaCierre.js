import React, { useReducer, useRef } from "react";
import SimpleButton from "../../components/UI/SimpleButton/SimpleButton";
import Switch from "../../components/UI/Switch/Switch";
import Input from "../../components/UI/Input/Input";
import ComboBox from "../../components/ComboBox/ComboBox";
import Card from "../../components/UI/Card/Card";
import Note from "../../components/UI/Note/Note";
import classes from "./AperturaCierre.module.css";
import Checkbox from "../../components/UI/Checkbox/Checkbox";
import ListadoProductos from "./ListadoProductos/ListadoProductos";
import { initialState, cajaReducer } from "./ReducerCaja";

const AperturaCierre = () => {
  const [cajaState, dispatchCaja] = useReducer(cajaReducer, initialState);
  const montoIniRef = useRef();
  const montoAgendaRef = useRef();
  const propinaAgendaRef = useRef();
  const montoProductoRef = useRef();
  const montoTotalProdRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  console.log(cajaState.montoTotalProd);
  return (
    <div className={classes.container}>
      {/*<Note show={cajaState.jornal.show}>{cajaState.jornal.value}</Note>
       <div className={`${classes.cajaContainer} ${classes.actions}`}>
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
      </div> */}
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
                dispatchCaja({
                  type: "USER_INPUT_MONOTO_I",
                  value: event.target.value,
                });
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
        <div className={classes.agendaProductos}>
          <div className={classes.cajaContainer}>
            <div className={classes.agenda}>
              <div className={classes.dobleFild}>
                <div>
                  <label>Sin agendar</label>
                  <Switch
                    active={cajaState.sinAgendar.value}
                    onCheck={() => {
                      dispatchCaja({ type: "CLICK_S_A" });
                    }}
                  />
                </div>
                <div>
                  {!cajaState.sinAgendar.value && (
                    <>
                      <label>Solo hoy</label>
                      <Switch
                        active={cajaState.soloHoy.value}
                        onCheck={() => {
                          dispatchCaja({ type: "CLICK_S_H" });
                        }}
                      />
                    </>
                  )}
                </div>
              </div>
              <div className={classes.comboAgenda}>
                <label>{`${
                  cajaState.sinAgendar.value ? "Empleado" : "Agenda"
                }`}</label>
                <ComboBox
                  opciones={
                    cajaState.soloHoy.value
                      ? cajaState.agendasHoy
                      : cajaState.agendas
                  }
                  current={cajaState.comboAgenda.value}
                  active={cajaState.comboAgenda.active}
                  onClick={() => {
                    dispatchCaja({ type: "CLICK_COMBO_AGENDA" });
                  }}
                  onChange={(id) => {
                    dispatchCaja({ type: "CHANGE_COMBO_AGENDA", value: id });
                  }}
                />
              </div>
              <h1>Servicios</h1>
              <div className={classes.servicios}>
                <div>
                  <h2
                    className={`${
                      cajaState.servicios.corte ? classes.active : ""
                    }`}
                  >
                    Corte
                  </h2>
                  <h2
                    className={`${
                      cajaState.servicios.barba ? classes.active : ""
                    }`}
                  >
                    Barba
                  </h2>
                  <h2
                    className={`${
                      cajaState.servicios.maquina ? classes.active : ""
                    }`}
                  >
                    Maquina
                  </h2>
                </div>
                <div>
                  <h2
                    className={`${
                      cajaState.servicios.brushing ? classes.active : ""
                    }`}
                  >
                    Brushing
                  </h2>
                  <h2
                    className={`${
                      cajaState.servicios.decoloracion ? classes.active : ""
                    }`}
                  >
                    Decoloración
                  </h2>
                  <h2
                    className={`${
                      cajaState.servicios.claritos ? classes.active : ""
                    }`}
                  >
                    Claritos
                  </h2>
                </div>
              </div>
              <div className={classes.dobleFild}>
                <div>
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
                        dispatchCaja({
                          type: "USER_INPUT_MONOTO_A",
                          value: event.target.value,
                        });
                      },
                      onBlur: () => {
                        dispatchCaja({ type: "BLUR_INPUT_MONOTO_A" });
                      },
                      onFocus: () => {
                        dispatchCaja({ type: "FOCUS_INPUT_MONOTO_A" });
                      },
                    }}
                  />
                </div>
                <div>
                  <label>Propina</label>
                  <Input
                    ref={propinaAgendaRef}
                    isValid={cajaState.propinaAgenda.isValid}
                    input={{
                      id: 3,
                      type: "number",
                      value: cajaState.propinaAgenda.value,
                      placeholder: "0",
                      onChange: (event) => {
                        dispatchCaja({
                          type: "USER_INPUT_PROPINA_A",
                          value: event.target.value,
                        });
                      },
                      onBlur: () => {
                        dispatchCaja({ type: "BLUR_INPUT_PROPINA_A" });
                      },
                      onFocus: () => {
                        dispatchCaja({ type: "FOCUS_INPUT_PROPINA_A" });
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={`${classes.cajaContainer} ${classes.productos}`}>
            <h2>Productos</h2>
            <div className={classes.alinearCampos}>
              <div className={classes.label}>
                <label>Cantidad productos</label>
              </div>
              <div>
                <Input
                  ref={montoProductoRef}
                  isValid={cajaState.montoProductos.isValid}
                  input={{
                    id: 4,
                    type: "number",
                    value: cajaState.montoProductos.value,
                    placeholder: "1",
                    onChange: (event) => {
                      dispatchCaja({
                        type: "USER_INPUT_MONTO_PRODUCTO",
                        value: event.target.value,
                      });
                    },
                    onBlur: () => {
                      dispatchCaja({ type: "BLUR_INPUT_MONTO_PRODUCTO" });
                    },
                    onFocus: () => {
                      dispatchCaja({ type: "FOCUS_INPUT_MONTO_PRODUCTO" });
                    },
                  }}
                />
              </div>
            </div>
            <div>
              <div style={{ position: "relative" }}>
                <ListadoProductos
                  onClick={(myValue) => {
                    dispatchCaja({ type: "CLICK_LISTA_P", value: myValue });
                  }}
                  productos={cajaState.productos}
                  seleccionados={cajaState.productosSAg}
                />
              </div>
              <div>
                <div className={classes.productosActions}>
                  <SimpleButton
                    action={() => {
                      dispatchCaja({
                        type: "AGREGAR",
                        value:
                          cajaState.montoProductos.value !== ""
                            ? cajaState.montoProductos.value
                            : 1,
                      });
                    }}
                  >
                    +
                  </SimpleButton>
                </div>
                <div className={classes.productosActions}>
                  <SimpleButton
                    color="red"
                    action={() => {
                      dispatchCaja({
                        type: "QUITAR",
                        value:
                          cajaState.montoProductos.value !== ""
                            ? cajaState.montoProductos.value
                            : 1,
                      });
                    }}
                  >
                    -
                  </SimpleButton>
                </div>
              </div>
              <div style={{ position: "relative" }}>
                <ListadoProductos
                  onClick={(myValue) => {
                    dispatchCaja({ type: "CLICK_LISTA_A", value: myValue });
                  }}
                  productos={cajaState.productosAgregados}
                  seleccionados={cajaState.productosSEl}
                />
              </div>
            </div>
            <div className={classes.alinearCampos}>
              <div className={classes.label}>
                <label>Monto Total</label>
              </div>
              <div>
                <Input
                  ref={montoTotalProdRef}
                  isValid={cajaState.montoTotalProd.isValid}
                  input={{
                    id: 5,
                    type: "number",
                    value: cajaState.montoTotalProd.value,
                    placeholder: "0",
                    onChange: (event) => {
                      dispatchCaja({
                        type: "USER_INPUT_MONTO_TOTAL_PRODUCTO",
                        value: event.target.value,
                      });
                    },
                    onBlur: () => {
                      dispatchCaja({ type: "BLUR_INPUT_MONTO_TOTAL_PRODUCTO" });
                    },
                    onFocus: () => {
                      dispatchCaja({
                        type: "FOCUS_INPUT_MONTO_TOTAL_PRODUCTO",
                      });
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className={classes.total}>
            <div>
              <div>
                <label>Efectivo</label>
                <Input
                  ref={montoIniRef}
                  isValid={cajaState.montoInicial.isValid}
                  input={{
                    id: 6,
                    type: "number",
                    value: cajaState.montoInicial.value,
                    placeholder: "0",
                    onChange: (event) => {
                      dispatchCaja({
                        type: "USER_INPUT_EFECTIVO",
                        value: event.target.value,
                      });
                    },
                    onBlur: () => {
                      dispatchCaja({ type: "BLUR_INPUT_EFECTIVO" });
                    },
                    onFocus: () => {
                      dispatchCaja({ type: "FOCUS_INPUT_EFECTIVO" });
                    },
                  }}
                />
              </div>
              <div>
                <Checkbox
                  id={11}
                  checked={cajaState.efectivo.value}
                  onChange={() => {
                    dispatchCaja({ type: "CLICK_EFECTIVO" });
                  }}
                />
              </div>
            </div>
            <div>
              <div>
                <label>Debito</label>
                <Input
                  ref={montoIniRef}
                  isValid={cajaState.montoInicial.isValid}
                  input={{
                    id: 7,
                    type: "number",
                    value: cajaState.montoInicial.value,
                    placeholder: "0",
                    onChange: (event) => {
                      dispatchCaja({
                        type: "USER_INPUT_DEBITO",
                        value: event.target.value,
                      });
                    },
                    onBlur: () => {
                      dispatchCaja({ type: "BLUR_INPUT_DEBITO" });
                    },
                    onFocus: () => {
                      dispatchCaja({ type: "FOCUS_INPUT_DEBITO" });
                    },
                  }}
                />
              </div>
              <div>
                <Checkbox
                  id={12}
                  checked={cajaState.debito.value}
                  onChange={() => {
                    dispatchCaja({ type: "CLICK_DEBITO" });
                  }}
                />
              </div>
            </div>
            <div>
              <div>
                <label>Cuponera</label>
                <Input
                  ref={montoIniRef}
                  isValid={cajaState.montoInicial.isValid}
                  input={{
                    id: 6,
                    type: "number",
                    value: cajaState.montoInicial.value,
                    placeholder: "0",
                    onChange: (event) => {
                      dispatchCaja({
                        type: "USER_INPUT_EFECTIVO",
                        value: event.target.value,
                      });
                    },
                    onBlur: () => {
                      dispatchCaja({ type: "BLUR_INPUT_EFECTIVO" });
                    },
                    onFocus: () => {
                      dispatchCaja({ type: "FOCUS_INPUT_EFECTIVO" });
                    },
                  }}
                />
              </div>
              <div>
                <Checkbox
                  id={13}
                  checked={cajaState.cuponera.value}
                  onChange={() => {
                    dispatchCaja({ type: "CLICK_CUPONERA" });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AperturaCierre;
