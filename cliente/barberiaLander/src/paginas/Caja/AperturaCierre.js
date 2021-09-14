import React, { useEffect, useReducer, useRef, useContext } from "react";
import SimpleButton from "../../components/UI/SimpleButton/SimpleButton";
import Switch from "../../components/UI/Switch/Switch";
import Input from "../../components/UI/Input/Input";
import ComboBox from "../../components/ComboBox/ComboBox";
import Border from "../../components/UI/Border/Border";
import classesBorder from "../../components/UI/Border/Border.module.css";
import SimpleNote from "../../components/UI/Note/SimpleNote";
import TextArea from "../../components/UI/TextArea/TextArea";
import Modal from "../../components/UI/Modal/Modal";
import classes from "./AperturaCierre.module.css";
import Checkbox from "../../components/UI/Checkbox/Checkbox";
import ListadoProductos from "./ListadoProductos/ListadoProductos";
import { resetAgendaProductos } from "./AuxiliaresCaja/reseteos";
import { initialState, cajaReducer } from "./ReducerCaja";
import useHttp from "../../hooks/useHttp";
import inputs from "./AuxiliaresCaja/inputs";
import { getElementById } from "../../FuncionesAuxiliares/FuncionesAuxiliares";
import AuthContext from "../../store/AuthContext";
import { useHistory } from "react-router-dom";

const AperturaCierre = () => {
  const authCtx = useContext(AuthContext);
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
  const codCuponera = useRef();
  const ticket = useRef();
  const history = useHistory();

  const INPUTS = inputs(cajaState, dispatchCaja);

  //Llamadas al backend
  const modificarCuponera = useHttp();
  const cobrarCaja = useHttp();
  const abrirCaja = useHttp();
  const fetchAgendas = useHttp();
  const salidaDinero = useHttp();
  const validarDatos = useHttp();
  const getRespuestaSalida = (res) => {
    console.log(res);
  };
  const salidaSubmitHandler = (e) => {
    e.preventDefault();
    if (!cajaState.montoSalida.isValid) {
      montoSalida.current.focus();
    } else if (cajaState.comboSalida.value === null) {
      const comboSalida = document.getElementById("comboSalida");
      comboSalida.className = `${comboSalida.className} ${classes.invalid}`;
    } else {
      const data = {
        monto: cajaState.montoSalida.value,
        descripcion: cajaState.descripcionSalida.value,
        cedula: cajaState.comboSalida.value,
        idCaja: cajaState.idCaja,
        fecha: new Date(),
      };
      salidaDinero(
        {
          url: "/salidaCaja",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: data,
        },
        getRespuestaSalida
      );
    }
  };
  const obtenerAgendas = (mensaje) => {
    dispatchCaja({ type: "CARGA_DE_DATOS", payload: mensaje.mensaje });
  };

  const resultadoCaja = (res) => {
    dispatchCaja({ type: "ABRIR_CAJA", id: res.mensaje.idCaja });
  };

  const getRespuesta = (res) => {
    console.log(res);
  };
  const EntradaDeDinero = () => {
    let montoE = 0;
    let montoD = 0;
    let montoC = 0;
    let propina = 0;
    if (cajaState.cantidadMedios.value === 1) {
      if (cajaState.efectivo.value)
        montoE = parseInt(cajaState.montoTotal.value, 10);
      else if (cajaState.debito.value)
        montoD = parseInt(cajaState.montoTotal.value, 10);
      else if (cajaState.cuponera.value)
        montoC = parseInt(cajaState.montoTotal.value, 10);
    } else {
      montoE =
        cajaState.montoEfectivo.value.length > 0
          ? cajaState.montoEfectivo.value
          : 0;
      montoD =
        cajaState.montoDebito.value.length > 0
          ? cajaState.montoDebito.value
          : 0;
      montoC =
        cajaState.montoCuponera.value.length > 0
          ? cajaState.montoCuponera.value
          : 0;
      propina =
        cajaState.propinaAgenda.value.length > 0
          ? cajaState.propinaAgenda.value
          : 0;
    }
    let productosVendidos = cajaState.productosAgregados.map((p) => {
      return { idProducto: p.id, cantidad: p.stock };
    });
    let servicios = Object.values(cajaState.servicios).filter((s) => s.active);
    servicios = servicios.length > 0 ? servicios : null;
    productosVendidos = productosVendidos.length > 0 ? productosVendidos : null;
    const agenda = getElementById(
      cajaState.agendas,
      cajaState.comboAgenda.value
    );
    const datosEnviar = {
      idCaja: cajaState.idCaja,
      fecha: cajaState.fecha,
      ciEmpleado: agenda!==null?cajaState.sinAgendar.value
        ? cajaState.comboAgenda.value
        : agenda.empleado:-1,
      montoTotal: cajaState.montoTotal.value,
      pago: {
        numeroTicket: cajaState.ticketDebito.value,
        Efectivo: parseInt(montoE, 10),
        Debito: parseInt(montoD, 10),
        Cuponera: parseInt(montoC, 10),
        propina:parseInt(propina, 10),
      },
      productosVendidos,
      servicios,
      descripcion: null,
      idAgenda:agenda!==null?agenda.id:-1,
      idHorario:agenda!==null?agenda.idHorario:-1
    };
    return datosEnviar;
  };
  const getRespuestaModificar = (res) => {
    if (res.mensaje.codigo !== 400) {
      cobrarCaja(
        {
          url: "/entradaCaja",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: EntradaDeDinero(),
        },
        getRespuesta
      );
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let agenda;
    let productos;
    if (cajaState.comboAgenda.value === null) {
      agenda = document.getElementById("Agenda");
      agenda.className = `${agenda.className} ${classesBorder.invalid}`;
    } else if (
      !cajaState.montoAgenda.isValid &&
      cajaState.montoAgenda.isValid !== null
    )
      montoAgendaRef.current.focus();
    else if (
      !cajaState.propinaAgenda.isValid &&
      cajaState.propinaAgenda.isValid !== null
    )
      propinaAgendaRef.current.focus();
    else if (
      !cajaState.montoProductos.isValid &&
      cajaState.montoProductos.isValid !== null
    )
      montoProductoRef.current.focus();
    else if (
      !cajaState.montoTotalProd.isValid &&
      cajaState.montoTotalProd.isValid !== null
    )
      montoTotalProdRef.current.focus();
    else if (
      (cajaState.montoAgenda.value === "" ||
        cajaState.montoAgenda.value === "0") &&
      (cajaState.montoTotalProd.value === "" ||
        cajaState.montoTotalProd.value === "0")
    ) {
      agenda = document.getElementById("Agenda");
      agenda.className = `${agenda.className} ${classesBorder.invalid2}`;
      productos = document.getElementById("Productos");
      productos.className = `${productos.className} ${classesBorder.invalid2}`;
    } else if (cajaState.cantidadMedios.value === 0) {
      const efectivo = document.getElementById("Efectivo");
      efectivo.className = `${efectivo.className} ${classes.invalid}`;

      const debito = document.getElementById("Debito");
      debito.className = `${debito.className} ${classes.invalid}`;

      const cuponera = document.getElementById("Cuponera");
      cuponera.className = `${cuponera.className} ${classes.invalid}`;
    } else if (cajaState.debito.value && !cajaState.ticketDebito.isValid) {
      ticket.current.focus();
    } else if (cajaState.cuponera.value && !cajaState.codCuponera.isValid) {
      codCuponera.current.focus();
    } else if (!cajaState.montoTotal.isValid) montoTotal.current.focus();
    else {
      dispatchCaja({ type: "SHOW_JORNAL" });
    }
  };
  const user = authCtx.user;
  useEffect(() => {
    if (
      user === null ||
      (user.rol !== "Administrador" && user.rol !== "Encargado")
    )
      history.replace("/");
    else fetchAgendas({ url: "/datosFormularioCaja" }, obtenerAgendas);
  }, [user, history, fetchAgendas]);

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
            <label className={classes.labelText}>Monto Salida</label>
            <Input
              ref={montoSalida}
              isValid={cajaState.montoSalida.isValid}
              input={INPUTS[9]}
            />
          </div>
          <label
            id="comboSalida"
            className={`${classes.text} ${classes.labelText}`}
          >
            Empleado
          </label>
          <div style={{ height: "40px" }}>
            <ComboBox
              opciones={cajaState.Empleados}
              current={cajaState.comboSalida.value}
              active={cajaState.comboSalida.active}
              onClick={() => {
                const comboSalida = document.getElementById("comboSalida");
                if (comboSalida.classList[1] !== undefined)
                  comboSalida.classList.remove(comboSalida.classList[1]);
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
        <SimpleNote
          show={cajaState.jornal.show}
          aceptar={() => {
            dispatchCaja({ type: "HIDE_JORNAL" });
            console.log(cajaState);
            const comboAgenda = cajaState.comboAgenda.value;
            const productos = cajaState.productosAgregados;
            const codcup = cajaState.codCuponera.value;
            let monto = cajaState.cantidadMedios>1?cajaState.montoCuponera.value:cajaState.montoTotal.value;
            monto = monto.length>0?parseInt(monto,10):0;
            const data = {
              idAgenda: comboAgenda!==null?comboAgenda:-1,
              listadoProductos:productos.length>0?productos:-1,
              ciCliente:codcup.length>0?codcup:-1,
              monto:monto
            }
            validarDatos(
              {
                url: "/verificarEntrada",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: data,
              },
              getRespuestaSalida
            );
            if (cajaState.cuponera.value) {
              const datosCuponera = {
                cedula: cajaState.codCuponera.value,
                monto: -parseInt(
                  cajaState.cantidadMedios.value > 1
                    ? cajaState.montoCuponera.value
                    : cajaState.montoTotal.value,
                  10
                ),
              };
              modificarCuponera(
                {
                  url: "/modificarSaldoCuponera",
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: datosCuponera,
                },
                getRespuestaModificar
              );
            } else {
              console.log(EntradaDeDinero());
              /* cobrarCaja(
                {
                  url: "/entradaCaja",
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: EntradaDeDinero(),
                },
                getRespuesta
              ); */
            }
          }}
          rechazar={() => {
            dispatchCaja({ type: "HIDE_JORNAL" });
            console.log("Rechazar");
          }}
        >
          ¿Está seguro?
        </SimpleNote>
        <form className={classes.caja} onSubmit={submitHandler}>
          <Border
            /* disabled={cajaState.cajaAbierta} */
            className={`${classes.cajaContainer} ${classes.abrirCerrar}`}
          >
            <label
              className={`${classes.labelText} ${
                !cajaState.cajaAbierta ? classes.text : classes.textDisabled
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
                const monto = parseInt(cajaState.montoInicial.value, 10);
                const datosEnviar = {
                  cedula: authCtx.user.ciUsuario,
                  montoTotal: monto,
                  pago: {
                    numeroTicket: "",
                    Efectivo: monto,
                    Debito: 0,
                    Cuponera: 0,
                  },
                  productosVendidos: null,
                  servicios: null,
                };
                abrirCaja(
                  {
                    url: "/abrirCaja",
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: datosEnviar,
                  },
                  resultadoCaja
                );
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
              id="Agenda"
            >
              <div className={classes.agenda}>
                <div className={classes.dobleFild}>
                  <div>
                    <label
                      className={`${classes.labelText} ${
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
                        const agenda = document.getElementById("Agenda");
                        if (agenda.classList[2] !== undefined)
                          agenda.classList.remove(agenda.classList[2]);
                        dispatchCaja({ type: "CLICK_S_A" });
                      }}
                      disabled={!cajaState.cajaAbierta}
                    />
                  </div>
                  <div>
                    {!cajaState.sinAgendar.value && (
                      <>
                        <label
                          className={`${classes.labelText} ${
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
                    className={`${classes.labelText} ${
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
                      cajaState.sinAgendar.value
                        ? cajaState.Empleados
                        : cajaState.soloHoy.value
                        ? cajaState.agendasHoy
                        : cajaState.agendas
                    }
                    current={cajaState.comboAgenda.value}
                    active={cajaState.comboAgenda.active}
                    onClick={() => {
                      const agenda = document.getElementById("Agenda");
                      if (agenda.classList[2] !== undefined)
                        agenda.classList.remove(agenda.classList[2]);
                      dispatchCaja({ type: "CLICK_COMBO_AGENDA" });
                    }}
                    onChange={(id) => {
                      dispatchCaja({ type: "CHANGE_COMBO_AGENDA", value: id });
                    }}
                  />
                </div>
                <h1
                  className={`${classes.title} ${
                    cajaState.cajaAbierta ? classes.text : classes.textDisabled
                  }`}
                >
                  Servicios
                </h1>
                <div className={classes.servicios}>
                  <div>
                    <h2
                      onClick={
                        !cajaState.cajaAbierta
                          ? null
                          : () => {
                              resetAgendaProductos();
                              dispatchCaja({ type: "CLICK_CORTE" });
                            }
                      }
                      className={`${classes.opcionesServicios} ${
                        !cajaState.cajaAbierta
                          ? classes.textDisabled
                          : cajaState.servicios.corte.active
                          ? classes.active
                          : ""
                      }`}
                    >
                      Corte
                    </h2>
                    <h2
                      onClick={
                        !cajaState.cajaAbierta
                          ? null
                          : () => {
                              resetAgendaProductos();
                              dispatchCaja({ type: "CLICK_BARBA" });
                            }
                      }
                      className={`${classes.opcionesServicios} ${
                        !cajaState.cajaAbierta
                          ? classes.textDisabled
                          : cajaState.servicios.barba.active
                          ? classes.active
                          : ""
                      }`}
                    >
                      Barba
                    </h2>
                    <h2
                      onClick={
                        !cajaState.cajaAbierta
                          ? null
                          : () => {
                              resetAgendaProductos();
                              dispatchCaja({ type: "CLICK_MAQUINA" });
                            }
                      }
                      className={`${classes.opcionesServicios} ${
                        !cajaState.cajaAbierta
                          ? classes.textDisabled
                          : cajaState.servicios.maquina.active
                          ? classes.active
                          : ""
                      }`}
                    >
                      Maquina
                    </h2>
                  </div>
                  <div>
                    <h2
                      onClick={
                        !cajaState.cajaAbierta
                          ? null
                          : () => {
                              resetAgendaProductos();
                              dispatchCaja({ type: "CLICK_BRUSHING" });
                            }
                      }
                      className={`${classes.opcionesServicios} ${
                        !cajaState.cajaAbierta
                          ? classes.textDisabled
                          : cajaState.servicios.brushing.active
                          ? classes.active
                          : ""
                      }`}
                    >
                      Brushing
                    </h2>
                    <h2
                      onClick={
                        !cajaState.cajaAbierta
                          ? null
                          : () => {
                              resetAgendaProductos();
                              dispatchCaja({ type: "CLICK_DECOLORACION" });
                            }
                      }
                      className={`${classes.opcionesServicios} ${
                        !cajaState.cajaAbierta
                          ? classes.textDisabled
                          : cajaState.servicios.decoloracion.active
                          ? classes.active
                          : ""
                      }`}
                    >
                      Decoloración
                    </h2>
                    <h2
                      onClick={
                        !cajaState.cajaAbierta
                          ? null
                          : () => {
                              resetAgendaProductos();
                              dispatchCaja({ type: "CLICK_CLARITOS" });
                            }
                      }
                      className={`${classes.opcionesServicios} ${
                        !cajaState.cajaAbierta
                          ? classes.textDisabled
                          : cajaState.servicios.claritos.active
                          ? classes.active
                          : ""
                      }`}
                    >
                      Claritos
                    </h2>
                  </div>
                </div>
                <div className={classes.dobleFild}>
                  <div>
                    <label
                      className={`${classes.labelText} ${
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
                      className={`${classes.labelText} ${
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
              id="Productos"
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
                    className={`${classes.labelText} ${
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
                    className={`${classes.labelText} ${
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
                    id="Efectivo"
                    className={`${classes.labelText} ${
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
                      resetChecks();
                      dispatchCaja({ type: "CLICK_EFECTIVO" });
                    }}
                  />
                </div>
              </div>
              <div>
                <div>
                  <label
                    id="Debito"
                    className={`${classes.labelText} ${
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
                      resetChecks();
                      dispatchCaja({ type: "CLICK_DEBITO" });
                    }}
                  />
                </div>
                {cajaState.debito.value && (
                  <div>
                    <label className={classes.labelText}>Ticket</label>
                    <Input
                      ref={ticket}
                      isValid={cajaState.ticketDebito.isValid}
                      input={INPUTS[12]}
                    />
                  </div>
                )}
              </div>
              <div>
                <div>
                  <label
                    id="Cuponera"
                    className={`${classes.labelText} ${
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
                      resetChecks();
                      dispatchCaja({ type: "CLICK_CUPONERA" });
                    }}
                  />
                </div>
                {cajaState.cuponera.value && (
                  <div>
                    <label className={classes.labelText}>Cédula Cliente</label>
                    <Input
                      ref={codCuponera}
                      isValid={cajaState.codCuponera.isValid}
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
              <SimpleButton disabled={!cajaState.cajaAbierta} type="submit">
                Cobrar
              </SimpleButton>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

const resetChecks = () => {
  const efectivo = document.getElementById("Efectivo");
  if (efectivo.classList[2] !== undefined)
    efectivo.classList.remove(efectivo.classList[2]);
  const debito = document.getElementById("Debito");
  if (debito.classList[2] !== undefined)
    debito.classList.remove(debito.classList[2]);
  const cuponera = document.getElementById("Cuponera");
  if (cuponera.classList[2] !== undefined)
    cuponera.classList.remove(cuponera.classList[2]);
};

export default AperturaCierre;
