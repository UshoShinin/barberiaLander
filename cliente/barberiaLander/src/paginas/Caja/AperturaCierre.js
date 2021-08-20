import React, { useEffect, useReducer, useRef } from "react";
import SimpleButton from "../../components/UI/SimpleButton/SimpleButton";
import Switch from "../../components/UI/Switch/Switch";
import Input from "../../components/UI/Input/Input";
import ComboBox from "../../components/ComboBox/ComboBox";
import Border from "../../components/UI/Border/Border";
import Card from "../../components/UI/Card/Card";
import Note from "../../components/UI/Note/Note";
import TextArea from "../../components/UI/TextArea/TextArea";
import Modal from "../../components/UI/Modal/Modal";
import classes from "./AperturaCierre.module.css";
import Checkbox from "../../components/UI/Checkbox/Checkbox";
import ListadoProductos from "./ListadoProductos/ListadoProductos";
import { initialState, cajaReducer } from "./ReducerCaja";
import useHttp from "../../hooks/useHttp";

const AperturaCierre = () => {
  const [cajaState, dispatchCaja] = useReducer(cajaReducer, initialState);
  const montoIniRef = useRef();
  const montoAgendaRef = useRef();
  const propinaAgendaRef = useRef();
  const montoProductoRef = useRef();
  const montoTotalProdRef = useRef();
  const montoEfectivo = useRef();
  const montoDebito = useRef();
  const montoCuponera = useRef();
  const montoTotal = useRef();
  const montoSalida = useRef();

  const INPUTS = [
    {
      id: 1,
      type: "number",
      value: cajaState.montoInicial.value,
      placeholder: "0",
      disabled: !cajaState.cajaAbierta,
      onChange: (event) => {
        dispatchCaja({
          type: "USER_INPUT_MONTO_I",
          value: event.target.value,
        });
      },
      onBlur: () => {
        dispatchCaja({ type: "BLUR_INPUT_MONTO_I" });
      },
      onFocus: () => {
        dispatchCaja({ type: "FOCUS_INPUT_MONTO_I" });
      },
    },
    {
      id: 2,
      type: "number",
      value: cajaState.montoAgenda.value,
      placeholder: "0",
      disabled: !cajaState.cajaAbierta,
      onChange: (event) => {
        dispatchCaja({
          type: "USER_INPUT_MONTO_A",
          value: event.target.value,
        });
      },
      onBlur: () => {
        dispatchCaja({ type: "BLUR_INPUT_MONTO_A" });
      },
      onFocus: () => {
        dispatchCaja({ type: "FOCUS_INPUT_MONTO_A" });
      },
    },
    {
      id: 3,
      type: "number",
      value: cajaState.propinaAgenda.value,
      placeholder: "0",
      disabled: !cajaState.cajaAbierta,
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
    },
    {
      id: 4,
      type: "number",
      value: cajaState.montoProductos.value,
      placeholder: "1",
      disabled: !cajaState.cajaAbierta,
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
    },
    {
      id: 5,
      type: "number",
      value: cajaState.montoTotalProd.value,
      placeholder: "0",
      disabled: !cajaState.cajaAbierta,
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
    },
    {
      id: 6,
      type: "number",
      value: cajaState.montoEfectivo.value,
      placeholder: "0",
      disabled: !cajaState.cajaAbierta||!cajaState.efectivo.value,
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
    },
    {
      id: 7,
      type: "number",
      value: cajaState.montoDebito.value,
      placeholder: "0",
      disabled: !cajaState.cajaAbierta||!cajaState.debito.value,
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
    },
    {
      id: 8,
      type: "number",
      value: cajaState.montoCuponera.value,
      placeholder: "0",
      disabled: !cajaState.cajaAbierta||!cajaState.cuponera.value,
      onChange: (event) => {
        dispatchCaja({
          type: "USER_INPUT_CUPONERA",
          value: event.target.value,
        });
      },
      onBlur: () => {
        dispatchCaja({ type: "BLUR_INPUT_CUPONERA" });
      },
      onFocus: () => {
        dispatchCaja({ type: "FOCUS_INPUT_CUPONERA" });
      },
    },
    {
      id: 9,
      type: "number",
      value: cajaState.montoTotal.value,
      placeholder: "0",
      disabled: !cajaState.cajaAbierta,
      onChange: (event) => {
        dispatchCaja({
          type: "USER_INPUT_TOTAL",
          value: event.target.value,
        });
      },
      onBlur: () => {
        dispatchCaja({ type: "BLUR_INPUT_TOTAL" });
      },
      onFocus: () => {
        dispatchCaja({ type: "FOCUS_INPUT_TOTAL" });
      },
    },
    {
      id: 10,
      type: "number",
      value: cajaState.montoSalida.value,
      placeholder: "0",
      disabled: !cajaState.cajaAbierta,
      onChange: (event) => {
        dispatchCaja({
          type: "USER_INPUT_MONTO_S",
          value: event.target.value,
        });
      },
      onBlur: () => {
        dispatchCaja({ type: "BLUR_INPUT_MONTO_S" });
      },
      onFocus: () => {
        dispatchCaja({ type: "FOCUS_INPUT_MONTO_S" });
      },
    },
    {
      id: 11,
      rows: 4,
      value: cajaState.descripcionSalida.value,
      placeholder: "Escribe la razón de esta salida de dinero",
      disabled: !cajaState.cajaAbierta,
      onChange: (event) => {
        dispatchCaja({
          type: "USER_DESCRIPCION_SALIDA",
          value: event.target.value,
        });
      },
      onBlur: () => {
        dispatchCaja({ type: "BLUR_DESCRIPCION_SALIDA" });
      },
      onFocus: () => {
        dispatchCaja({ type: "FOCUS_DESCRIPCION_SALIDA" });
      },
    },
    {
      id: 12,
      type: "number",
      value: cajaState.codCuponera.value,
      placeholder: "Codigo cuponera",
      disabled: !cajaState.cajaAbierta,
      onChange: (event) => {
        dispatchCaja({
          type: "USER_COD_CUPONERA",
          value: event.target.value,
        });
      },
      onBlur: () => {
        dispatchCaja({ type: "BLUR_COD_CUPONERA" });
      },
      onFocus: () => {
        dispatchCaja({ type: "FOCUS_COD_CUPONERA" });
      },
    },
    {
      id: 13,
      type: "number",
      value: cajaState.ticketDebito.value,
      placeholder: "Ticket débito",
      disabled: !cajaState.cajaAbierta,
      onChange: (event) => {
        dispatchCaja({
          type: "USER_TICK_DEBITO",
          value: event.target.value,
        });
      },
      onBlur: () => {
        dispatchCaja({ type: "BLUR_TICK_DEBITO" });
      },
      onFocus: () => {
        dispatchCaja({ type: "FOCUS_TICK_DEBITO" });
      },
    },
  ];

  const salidaSubmitHandler = (e) => {
    e.preventDefault();
    const data = {
      monto: cajaState.montoSalida.value,
      descripcion: cajaState.descripcionSalida.value,
      empleados: cajaState.comboSalida,
    };
    console.log(data);
  };
  const obtenerAgendas = (mensaje) => {
    dispatchCaja({ type: "CARGA_DE_DATOS", payload: mensaje.mensaje });
  };

  const {
    isLoadingAgendas,
    errorAgendas,
    sendRequest: fetchAgendas,
  } = useHttp();

  useEffect(() => {
    fetchAgendas({ url: "/datosFormularioCaja" }, obtenerAgendas);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  console.log(cajaState);
  return (
    <>
      <Modal
        closed={() => {
          dispatchCaja({ type: "HIDE_SALIDA" });
        }}
        show={cajaState.showSalida.value}
      >
        <form className={classes.salidaDinero} onSubmit={salidaSubmitHandler}>
          <h1>Salida de dinero</h1>
          <div className={classes.montoSalida}>
            <label>Monto Salida</label>
            <Input
              ref={montoSalida}
              isValid={cajaState.montoSalida.isValid}
              input={INPUTS[9]}
            />
          </div>
          <div style={{ height: "40px" }}>
            <ComboBox
              opciones={cajaState.Empleados}
              current={cajaState.comboSalida.value}
              active={cajaState.comboSalida.active}
              onClick={() => {
                dispatchCaja({ type: "CLICK_COMBO_SALIDA" });
              }}
              onChange={(id) => {
                dispatchCaja({ type: "CHANGE_COMBO_SALIDA", value: id });
              }}
            />
          </div>
          <div>
            <TextArea ref={null} isValid={null} input={INPUTS[10]} />
          </div>
          <div>
            <SimpleButton type="submit">Cargar gasto</SimpleButton>
          </div>
        </form>
      </Modal>
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
          <Border
            disabled={!cajaState.cajaAbierta}
            className={`${classes.cajaContainer} ${classes.abrirCerrar}`}
          >
            <label
              className={`${
                cajaState.cajaAbierta ? classes.text : classes.textDisabled
              }`}
            >
              Monto Inicial
            </label>
            <Input
              ref={montoIniRef}
              isValid={cajaState.montoInicial.isValid}
              input={INPUTS[0]}
            />
            <SimpleButton
              disabled={cajaState.cajaAbierta}
              className={classes.Abrir}
              action={() => {
                dispatchCaja({ type: "ABRIR_CAJA" });
              }}
            >
              Abrir Caja
            </SimpleButton>
            <SimpleButton
              disabled={!cajaState.cajaAbierta}
              color="red"
              className={classes.Salida}
              action={() => {
                dispatchCaja({ type: "SHOW_SALIDA" });
              }}
            >
              Salida de dinero
            </SimpleButton>
            <SimpleButton
              disabled={!cajaState.cajaAbierta}
              action={() => {
                dispatchCaja({ type: "CERRAR_CAJA" });
              }}
              className={classes.Cerrar}
            >
              Cerrar Caja
            </SimpleButton>
          </Border>
          <div className={classes.agendaProductos}>
            <Border
              disabled={!cajaState.cajaAbierta}
              className={classes.cajaContainer}
            >
              <div className={classes.agenda}>
                <div className={classes.dobleFild}>
                  <div>
                    <label
                      className={`${
                        cajaState.cajaAbierta
                          ? classes.text
                          : classes.textDisabled
                      }`}
                    >
                      Sin agendar
                    </label>
                    <Switch
                      active={cajaState.sinAgendar.value}
                      onCheck={() => {
                        dispatchCaja({ type: "CLICK_S_A" });
                      }}
                      disabled={!cajaState.cajaAbierta}
                    />
                  </div>
                  <div>
                    {!cajaState.sinAgendar.value && (
                      <>
                        <label
                          className={`${
                            cajaState.cajaAbierta
                              ? classes.text
                              : classes.textDisabled
                          }`}
                        >
                          Solo hoy
                        </label>
                        <Switch
                          active={cajaState.soloHoy.value}
                          onCheck={() => {
                            dispatchCaja({ type: "CLICK_S_H" });
                          }}
                          disabled={!cajaState.cajaAbierta}
                        />
                      </>
                    )}
                  </div>
                </div>
                <div className={classes.comboAgenda}>
                  <label
                    className={`${
                      cajaState.cajaAbierta
                        ? classes.text
                        : classes.textDisabled
                    }`}
                  >{`${
                    cajaState.sinAgendar.value ? "Empleado" : "Agenda"
                  }`}</label>
                  <ComboBox
                    disabled={!cajaState.cajaAbierta}
                    opciones={
                      cajaState.sinAgendar.value ? cajaState.Empleados:
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
                <h1
                  className={`${
                    cajaState.cajaAbierta ? classes.text : classes.textDisabled
                  }`}
                >
                  Servicios
                </h1>
                <div className={classes.servicios}>
                  <div>
                    <h2 onClick={()=>{dispatchCaja({type:'CLICK_CORTE'})}}
                      className={`${!cajaState.cajaAbierta?classes.textDisabled:
                        cajaState.servicios.corte ? classes.active : ""
                      }`}
                    >
                      Corte
                    </h2>
                    <h2 onClick={()=>{dispatchCaja({type:'CLICK_BARBA'})}}
                      className={`${!cajaState.cajaAbierta?classes.textDisabled:
                        cajaState.servicios.barba ? classes.active : ""
                      }`}
                    >
                      Barba
                    </h2>
                    <h2 onClick={()=>{dispatchCaja({type:'CLICK_MAQUINA'})}}
                      className={`${!cajaState.cajaAbierta?classes.textDisabled:
                        cajaState.servicios.maquina ? classes.active : ""
                      }`}
                    >
                      Maquina
                    </h2>
                  </div>
                  <div>
                    <h2 onClick={()=>{dispatchCaja({type:'CLICK_BRUSHING'})}}
                      className={`${!cajaState.cajaAbierta?classes.textDisabled:
                        cajaState.servicios.brushing ? classes.active : ""
                      }`}
                    >
                      Brushing
                    </h2>
                    <h2 onClick={()=>{dispatchCaja({type:'CLICK_DECOLORACION'})}}
                      className={`${!cajaState.cajaAbierta?classes.textDisabled:
                        cajaState.servicios.decoloracion ? classes.active : ""
                      }`}
                    >
                      Decoloración
                    </h2>
                    <h2 onClick={()=>{dispatchCaja({type:'CLICK_CLARITOS'})}}
                      className={`${!cajaState.cajaAbierta?classes.textDisabled:
                        cajaState.servicios.claritos ? classes.active : ""
                      }`}
                    >
                      Claritos
                    </h2>
                  </div>
                </div>
                <div className={classes.dobleFild}>
                  <div>
                    <label
                      className={`${
                        cajaState.cajaAbierta
                          ? classes.text
                          : classes.textDisabled
                      }`}
                    >
                      Monto
                    </label>
                    <Input
                      ref={montoAgendaRef}
                      isValid={cajaState.montoAgenda.isValid}
                      input={INPUTS[1]}
                    />
                  </div>
                  <div>
                    <label
                      className={`${
                        cajaState.cajaAbierta
                          ? classes.text
                          : classes.textDisabled
                      }`}
                    >
                      Propina
                    </label>
                    <Input
                      ref={propinaAgendaRef}
                      isValid={cajaState.propinaAgenda.isValid}
                      input={INPUTS[2]}
                    />
                  </div>
                </div>
              </div>
            </Border>
            <Border
              disabled={!cajaState.cajaAbierta}
              className={`${classes.cajaContainer} ${classes.productos}`}
            >
              <h2
                className={`${
                  cajaState.cajaAbierta ? classes.text : classes.textDisabled
                }`}
              >
                Productos
              </h2>
              <div className={classes.alinearCampos}>
                <div className={classes.label}>
                  <label
                    className={`${
                      cajaState.cajaAbierta
                        ? classes.text
                        : classes.textDisabled
                    }`}
                  >
                    Cantidad productos
                  </label>
                </div>
                <div>
                  <Input
                    ref={montoProductoRef}
                    isValid={cajaState.montoProductos.isValid}
                    input={INPUTS[3]}
                  />
                </div>
              </div>
              <div>
                <div style={{ position: "relative" }}>
                  <ListadoProductos
                    disabled={!cajaState.cajaAbierta}
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
                      disabled={!cajaState.cajaAbierta}
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
                      disabled={!cajaState.cajaAbierta}
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
                    disabled={!cajaState.cajaAbierta}
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
                  <label
                    className={`${
                      cajaState.cajaAbierta
                        ? classes.text
                        : classes.textDisabled
                    }`}
                  >
                    Monto Total
                  </label>
                </div>
                <div>
                  <Input
                    ref={montoTotalProdRef}
                    isValid={cajaState.montoTotalProd.isValid}
                    input={INPUTS[4]}
                  />
                </div>
              </div>
            </Border>
          </div>
          <div>
            <div className={classes.total}>
              <div>
                <div>
                  <label
                    className={`${
                      cajaState.cajaAbierta
                        ? classes.text
                        : classes.textDisabled
                    }`}
                  >
                    Efectivo
                  </label>
                  {cajaState.cantidadMedios.value > 1 && (
                    <Input
                      ref={montoEfectivo}
                      isValid={cajaState.montoEfectivo.isValid}
                      input={INPUTS[5]}
                    />
                  )}
                </div>
                <div>
                  <Checkbox
                    disabled={!cajaState.cajaAbierta}
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
                  <label
                    className={`${
                      cajaState.cajaAbierta
                        ? classes.text
                        : classes.textDisabled
                    }`}
                  >
                    Debito
                  </label>
                  {cajaState.cantidadMedios.value > 1 && (
                    <Input
                      ref={montoDebito}
                      isValid={cajaState.montoDebito.isValid}
                      input={INPUTS[6]}
                    />
                  )}
                </div>

                <div>
                  <Checkbox
                    disabled={!cajaState.cajaAbierta}
                    id={12}
                    checked={cajaState.debito.value}
                    onChange={() => {
                      dispatchCaja({ type: "CLICK_DEBITO" });
                    }}
                  />
                </div>
                {cajaState.debito.value && (
                  <div>
                    <label>Ticket</label>
                    <Input
                      ref={montoCuponera}
                      isValid={cajaState.ticketDebito.isValid}
                      input={INPUTS[12]}
                    />
                  </div>
                )}
              </div>
              <div>
                <div>
                  <label
                    className={`${
                      cajaState.cajaAbierta
                        ? classes.text
                        : classes.textDisabled
                    }`}
                  >
                    Cuponera
                  </label>
                  {cajaState.cantidadMedios.value > 1 && (
                    <Input
                      ref={montoCuponera}
                      isValid={cajaState.montoCuponera.isValid}
                      input={INPUTS[7]}
                    />
                  )}
                </div>
                <div>
                  <Checkbox
                    disabled={!cajaState.cajaAbierta}
                    id={13}
                    checked={cajaState.cuponera.value}
                    onChange={() => {
                      dispatchCaja({ type: "CLICK_CUPONERA" });
                    }}
                  />
                </div>
                {cajaState.cuponera.value && (
                  <div>
                    <label>Codigo cuponera</label>
                    <Input
                      ref={montoCuponera}
                      isValid={cajaState.montoCuponera.isValid}
                      input={INPUTS[11]}
                    />
                  </div>
                )}
              </div>
              <div className={classes.MontoTotal}>
                <h2
                  className={`${
                    cajaState.cajaAbierta ? classes.text : classes.textDisabled
                  }`}
                >
                  Total
                </h2>
                <Input
                  ref={montoTotal}
                  isValid={cajaState.montoTotal.isValid}
                  input={INPUTS[8]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AperturaCierre;
