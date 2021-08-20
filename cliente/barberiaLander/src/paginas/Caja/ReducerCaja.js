import { getElementById } from "../../components/Calendario/FuncionesAuxiliares";
import { formatDate } from "../../FuncionesAuxiliares/FuncionesAuxiliares";
const today = new Date();
export const initialState = {
  idCaja: new Date(),
  cajaAbierta: false,
  desc: "AbrirCaja",
  montoInicial: { value: "", isValid: null },
  jornal: { value: "", show: false },
  comboAgenda: { value: null, active: false },
  sinAgendar: { value: false },
  soloHoy: { value: false },
  montoAgenda: { value: "", isValid: null },
  propinaAgenda: { value: "", isValid: null },
  montoProductos: { value: "", isValid: null },
  montoTotalProd: { value: "", isValid: null },
  productos: [
    { id: 1, nombre: "Pan", price: 160, stock: 10 },
    { id: 2, nombre: "Pan bimbo", price: 130, stock: 10 },
    { id: 3, nombre: "Jamon bimbo", price: 120, stock: 10 },
    { id: 4, nombre: "Banana", price: 150, stock: 10 },
    { id: 5, nombre: "Uva", price: 110, stock: 10 },
    { id: 6, nombre: "Naranjita", price: 100, stock: 10 },
    { id: 7, nombre: "Shampoo", price: 190, stock: 10 },
    { id: 8, nombre: "Lentejas", price: 170, stock: 10 },
    { id: 9, nombre: "Lechuga", price: 180, stock: 10 },
    { id: 10, nombre: "Tomate", price: 210, stock: 10 },
    { id: 11, nombre: "", price: 120, stock: 10 },
    { id: 12, nombre: "Banana", price: 140, stock: 10 },
    { id: 13, nombre: "Uva", price: 105, stock: 10 },
    { id: 14, nombre: "Naranjita", price: 120, stock: 10 },
    { id: 15, nombre: "Shampoo", price: 140, stock: 10 },
    { id: 16, nombre: "Lentejas", price: 100, stock: 10 },
  ],
  servicios: {
    corte: false,
    barba: false,
    maquina: false,
    claritos: false,
    decoloracion: false,
    brushing: false,
  },
  productosSAg: [],
  productosAgregados: [],
  productosSEl: [],
  agendas: [
    {
      id: 1,
      title: "Manueh Torres 13/08/2021",
      fecha: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 2
      ),
      empleado: "6536251235",
      servicios: [8, 1, 5],
    },
    {
      id: 2,
      title: "Pablo Martinez 11/08/2021",
      fecha: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
      empleado: "653623547",
      servicios: [7, 1, 4],
    },
  ],
  agendasHoy: [
    {
      id: 2,
      title: "Pablo Martinez 11/08/2021",
      fecha: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
      empleado: "653623547",
      servicios: [7, 1, 4],
    },
  ],
  efectivo: { value: false },
  debito: { value: false },
  cuponera: { value: false },
  montoEfectivo: { value: "", isValid: null },
  montoDebito: { value: "", isValid: null },
  ticketDebito: { value: "", isValid: null },
  montoCuponera: { value: "", isValid: null },
  codCuponera: { value: "", isValid: null },
  cantidadMedios: { value: 0 },
  montoTotal: { value: "", isValid: null },
  showSalida: { value: false },
  montoSalida: { value: "", isValid: null },
  descripcionSalida: { value: "", isValid: null },
  comboSalida: { value: 1, active: false },
  Empleados: [
    { id: 1, title: "Antonio" },
    { id: 2, title: "Pablito" },
    { id: 3, title: "Juan carlos" },
  ],
};

const orden = (a, b) => {
  if (a.id > b.id) {
    return 1;
  } else if (a.id < b.id) {
    return -1;
  }
  return 0;
};

const validarMonto = (value) => {
  return (value !== "" ? value.trim().length > 0 : null) && parseInt(value) > 0;
};

const miFiltro = (lista, objetivo) => {
  let nuevaLista = [];
  let encontrado = null;
  lista.forEach((element) => {
    if (element.id !== objetivo.id) nuevaLista.push({ ...element });
    else encontrado = element.count;
  });
  if (encontrado !== null) return { lista: [...nuevaLista], count: encontrado }; //Es nueva lista
  return null; //No hay cambios
};

const calcularAgenda = (servicios) =>{
  let total;
  Object.values(servicios).forEach((serv)=>{
    if(serv){
      total+=40;
    }
  });
  return total;
}

export const cajaReducer = (state, action) => {
  let valido = null;
  let destino;
  let total = 0;
  let anterior;
  let siguiente = null;
  let cantidad;
  let myState;
  let nuevoEstado;
  let listaBase;
  let posicion;
  switch (action.type) {
    case "ABRIR_CAJA":
      return { ...state, cajaAbierta: true };
    case "CERRAR_CAJA":
      return {
        ...initialState,
      };
    case "CARGA_DE_DATOS":
      console.log(action.payload);
      const date = new Date("07-24-2021");
      formatDate(action.payload.agendas[0].fecha);
      let newList = action.payload.agendas.filter(
        (agenda) =>
          formatDate(agenda.fecha).getDate() === date.getDate() &&
          formatDate(agenda.fecha).getMonth() === date.getMonth()
      );
      myState = {
        ...state,
        agendas: [...action.payload.agendas],
        agendasHoy: [...newList],
        Empleados:[...action.payload.empleados],
        productos:[...action.payload.productos]
      };
      return { ...myState };
    case "CLICK_CORTE":
      return{...state,servicios:{...state.servicios,corte:!state.servicios.corte}}
    case "CLICK_BARBA":
      return{...state,servicios:{...state.servicios,barba:!state.servicios.barba}}
    case "CLICK_MAQUINA":
      return{...state,servicios:{...state.servicios,maquina:!state.servicios.maquina}}
    case "CLICK_BRUSHING":
      return{...state,servicios:{...state.servicios,brushing:!state.servicios.brushing}}
    case "CLICK_DECOLORACION":
      return{...state,servicios:{...state.servicios,decoloracion:!state.servicios.decoloracion}}
    case "CLICK_CLARITOS":
      return{...state,servicios:{...state.servicios,claritos:!state.servicios.claritos}}

    case "USER_INPUT_MONTO_I":
      return {
        ...state,
        montoInicial: {
          value: action.value,
          isValid: state.montoInicial.isValid,
        },
      };
    case "FOCUS_INPUT_MONTO_I":
      return {
        ...state,
        montoInicial: {
          value: state.montoInicial.value,
          isValid: null,
        },
      };
    case "BLUR_INPUT_MONTO_I":
      valido = validarMonto(state.montoInicial.value);
      return {
        ...state,
        montoInicial: {
          value: state.montoInicial.value,
          isValid: valido,
        },
      };
    case "SHOW_JORNAL":
      return {
        ...state,
        jornal: { value: action.value, show: true },
      };
    case "HIDE_JORNAL":
      return {
        ...state,
        jornal: { value: state.jornal.value, show: false },
      };
    case "CLICK_S_A":
      nuevoEstado = !state.sinAgendar.value;
      if (nuevoEstado) {
        listaBase = [...state.Empleados];
      } else {
        listaBase = [...state.agendas];
      }
      posicion = listaBase[0].id;
      console.log(posicion);
      return {
        ...state,
        sinAgendar: { value: nuevoEstado },
        soloHoy: { value: false },
        comboAgenda: { value: posicion, active: false },
        propinaAgenda: { value: "", isValid: null },
      };
    case "CLICK_S_H":
      nuevoEstado = !state.soloHoy.value;
      posicion = state.comboAgenda.value;
      if (nuevoEstado) {
        listaBase = [...state.agendasHoy];
      } else {
        listaBase = [...state.agendas];
      }
      if (getElementById(listaBase, posicion) === null) {
        posicion = listaBase[0].id;
      }
      return {
        ...state,
        soloHoy: { value: nuevoEstado },
        comboAgenda: { value: posicion, active: false },
      };
    case "CLICK_COMBO_AGENDA":
      return {
        ...state,
        comboAgenda: {
          value: state.comboAgenda.value,
          active: !state.comboAgenda.active,
        },
      };
    case "CHANGE_COMBO_AGENDA":
      let baseServicios = {
        corte: false,
        barba: false,
        maquina: false,
        claritos: false,
        decoloracion: false,
        brushing: false,
      };
      getElementById(state.agendas, action.value).servicios.forEach((s) => {
        switch (s) {
          case 1:
            baseServicios.corte = true;
            break;
          case 4:
            baseServicios.barba = true;
            break;
          case 5:
            baseServicios.maquina = true;
            break;
          case 6:
            baseServicios.claritos = true;
            break;
          case 7:
            baseServicios.decoloracion = true;
            break;
          case 8:
            baseServicios.brushing = true;
            break;
        }
      });
      return {
        ...state,
        comboAgenda: { value: action.value, active: false },
        servicios: { ...baseServicios },
      };
    case "CLICK_COMBO_SALIDA":
      return {
        ...state,
        comboSalida: {
          value: state.comboSalida.value,
          active: !state.comboSalida.active,
        },
      };
    case "CHANGE_COMBO_SALIDA":
      return {
        ...state,
        comboSalida: { value: action.value, active: false },
      };
    case "USER_INPUT_MONTO_A":
      return {
        ...state,
        montoAgenda: {
          value: action.value,
          isValid: state.montoAgenda.isValid,
        },
      };
    case "FOCUS_INPUT_MONTO_A":
      return {
        ...state,
        montoAgenda: {
          value: state.montoAgenda.value,
          isValid: null,
        },
      };
    case "BLUR_INPUT_MONTO_A":
      valido = validarMonto(state.montoAgenda.value);
      return {
        ...state,
        montoAgenda: {
          value: state.montoAgenda.value,
          isValid: valido,
        },
      };
    case "USER_INPUT_PROPINA_A":
      return {
        ...state,
        propinaAgenda: {
          value: action.value,
          isValid: state.propinaAgenda.isValid,
        },
      };
    case "FOCUS_INPUT_PROPINA_A":
      return {
        ...state,
        propinaAgenda: {
          value: state.propinaAgenda.value,
          isValid: null,
        },
      };
    case "BLUR_INPUT_PROPINA_A":
      valido = validarMonto(state.propinaAgenda.value);
      return {
        ...state,
        propinaAgenda: {
          value: state.propinaAgenda.value,
          isValid: valido,
        },
      };
    case "USER_INPUT_MONTO_PRODUCTO":
      return {
        ...state,
        montoProductos: {
          value: action.value,
          isValid: state.montoProductos.isValid,
        },
      };
    case "FOCUS_INPUT_MONTO_PRODUCTO":
      return {
        ...state,
        montoProductos: {
          value: state.montoProductos.value,
          isValid: null,
        },
      };
    case "BLUR_INPUT_MONTO_PRODUCTO":
      valido = validarMonto(state.montoProductos.value);
      return {
        ...state,
        montoProductos: {
          value: state.montoProductos.value,
          isValid: valido,
        },
      };
    case "USER_INPUT_MONTO_TOTAL_PRODUCTO":
      return {
        ...state,
        montoTotalProd: {
          value: action.value,
          isValid: state.montoTotalProd.isValid,
        },
      };
    case "FOCUS_INPUT_MONTO_TOTAL_PRODUCTO":
      return {
        ...state,
        montoTotalProd: {
          value: state.montoTotalProd.value,
          isValid: null,
        },
      };
    case "BLUR_INPUT_MONTO_TOTAL_PRODUCTO":
      valido = validarMonto(state.montoTotalProd.value);
      return {
        ...state,
        montoTotalProd: {
          value: state.montoTotalProd.value,
          isValid: valido,
        },
      };
    case "CLICK_LISTA_P": //P = Productos
    case "CLICK_LISTA_A": //A = Agregados
      let auxList = [];
      let baseList;
      if (action.type === "CLICK_LISTA_P") {
        baseList = [...state.productosSAg];
      } else {
        baseList = [...state.productosSEl];
      }

      if (getElementById(baseList, action.value.id) === null) {
        auxList = [...baseList, action.value];
      } else {
        auxList = baseList.filter((prod) => prod.id !== action.value.id);
      }
      auxList.sort(orden);
      if (action.type === "CLICK_LISTA_P") {
        return {
          ...state,
          productosSAg: [...auxList],
        };
      } else {
        return {
          ...state,
          productosSEl: [...auxList],
        };
      }
    case "AGREGAR":
      destino = [...state.productosAgregados];
      state.productosSAg.forEach((p) => {
        let resultado = miFiltro(destino, p);
        if (resultado !== null) {
          destino = [
            ...resultado.lista,
            { ...p, count: resultado.count + parseInt(action.value, 10) },
          ];
        } else {
          destino.push({ ...p, count: parseInt(action.value, 10) });
        }
      });
      destino.sort(orden);
      destino.forEach((p) => {
        total += p.price * p.count;
      });
      return {
        ...state,
        productosAgregados: [...destino],
        montoProductos: { value: "", isValid: null },
        productosSAg: [],
        montoTotalProd: { value: String(total), isValid: true },
      };
    case "QUITAR":
      destino = [...state.productosAgregados];
      state.productosSEl.forEach((p) => {
        let resultado = miFiltro(destino, p);
        const amount = parseInt(action.value, 10);
        if (resultado.count > amount) {
          destino = [
            ...resultado.lista,
            { ...p, count: resultado.count - amount },
          ];
        } else {
          destino = [...resultado.lista];
        }
      });
      destino.sort(orden);
      destino.forEach((p) => {
        total += p.price * p.count;
      });
      return {
        ...state,
        productosAgregados: [...destino],
        montoProductos: { value: "", isValid: null },
        productosSEl: [],
        montoTotalProd: { value: total, isValid: true },
      };
    case "CLICK_EFECTIVO":
    case "CLICK_DEBITO":
    case "CLICK_CUPONERA":
      switch (action.type) {
        case "CLICK_EFECTIVO":
          siguiente = !state.efectivo.value;
          myState = { ...state, efectivo: { value: siguiente } };
          break;
        case "CLICK_DEBITO":
          siguiente = !state.debito.value;
          myState = { ...state, debito: { value: siguiente } };
          break;
        case "CLICK_CUPONERA":
          siguiente = !state.cuponera.value;
          myState = { ...state, cuponera: { value: siguiente } };
          break;
      }
      if (siguiente) cantidad = state.cantidadMedios.value + 1;
      else cantidad = state.cantidadMedios.value - 1;
      if (siguiente && state.cantidadMedios.value === 1) {
        total = state.montoTotal.value;
        valido = state.montoTotal.isValid;
        if (state.efectivo.value) anterior = "EFECTIVO";
        else if (state.debito.value) anterior = "DEBITO";
        else if (state.cuponera.value) anterior = "CUPONERA";
      } else if (cantidad === 1) {
        myState = {
          ...myState,
          montoEfectivo: { value: "", isValid: null },
          montoDebito: { value: "", isValid: null },
          montoCuponera: { value: "", isValid: null },
        };
      }
      myState = { ...myState, cantidadMedios: { value: cantidad } };
      switch (anterior) {
        case "EFECTIVO":
          myState = {
            ...myState,
            montoEfectivo: { value: total, isValid: valido },
          };
          break;
        case "DEBITO":
          myState = {
            ...myState,
            montoDebito: { value: total, isValid: valido },
          };
          break;
        case "CUPONERA":
          myState = {
            ...myState,
            montoCuponera: { value: total, isValid: valido },
          };
          break;
      }
      return { ...myState };
    case "USER_INPUT_EFECTIVO":
      return {
        ...state,
        montoEfectivo: {
          value: action.value,
          isValid: state.montoEfectivo.isValid,
        },
      };
    case "FOCUS_INPUT_EFECTIVO":
      return {
        ...state,
        montoEfectivo: {
          value: state.montoEfectivo.value,
          isValid: null,
        },
      };
    case "BLUR_INPUT_EFECTIVO":
      valido = validarMonto(state.montoEfectivo.value);
      return {
        ...state,
        montoEfectivo: {
          value: state.montoEfectivo.value,
          isValid: valido,
        },
      };
    case "USER_INPUT_DEBITO":
      return {
        ...state,
        montoDebito: {
          value: action.value,
          isValid: state.montoDebito.isValid,
        },
      };
    case "FOCUS_INPUT_DEBITO":
      return {
        ...state,
        montoDebito: {
          value: state.montoDebito.value,
          isValid: null,
        },
      };
    case "BLUR_INPUT_DEBITO":
      valido = validarMonto(state.montoDebito.value);
      return {
        ...state,
        montoDebito: {
          value: state.montoDebito.value,
          isValid: valido,
        },
      };
    case "USER_INPUT_CUPONERA":
      return {
        ...state,
        montoCuponera: {
          value: action.value,
          isValid: state.montoCuponera.isValid,
        },
      };
    case "FOCUS_INPUT_CUPONERA":
      return {
        ...state,
        montoCuponera: {
          value: state.montoCuponera.value,
          isValid: null,
        },
      };
    case "BLUR_INPUT_CUPONERA":
      valido = validarMonto(state.montoCuponera.value);
      return {
        ...state,
        montoCuponera: {
          value: state.montoCuponera.value,
          isValid: valido,
        },
      };
    case "USER_INPUT_TOTAL":
      return {
        ...state,
        montoTotal: {
          value: action.value,
          isValid: state.montoTotal.isValid,
        },
      };
    case "FOCUS_INPUT_TOTAL":
      return {
        ...state,
        montoTotal: {
          value: state.montoTotal.value,
          isValid: null,
        },
      };
    case "BLUR_INPUT_TOTAL":
      valido = validarMonto(state.montoTotal.value);
      return {
        ...state,
        montoTotal: {
          value: state.montoTotal.value,
          isValid: valido,
        },
      };
    case "SHOW_SALIDA":
      return { ...state, showSalida: { value: true } };
    case "HIDE_SALIDA":
      return { ...state, showSalida: { value: false } };
    case "USER_INPUT_MONTO_S":
      return {
        ...state,
        montoSalida: {
          value: action.value,
          isValid: state.montoSalida.isValid,
        },
      };
    case "FOCUS_INPUT_MONTO_S":
      return {
        ...state,
        montoSalida: {
          value: state.montoSalida.value,
          isValid: null,
        },
      };
    case "BLUR_INPUT_MONTO_S":
      valido = validarMonto(state.montoSalida.value);
      return {
        ...state,
        montoSalida: {
          value: state.montoSalida.value,
          isValid: valido,
        },
      };
    case "USER_DESCRIPCION_SALIDA":
      return {
        ...state,
        descripcionSalida: {
          value: action.value,
          isValid: state.descripcionSalida.isValid,
        },
      };
    //Posiblemente tenga que sacarlos
    case "FOCUS_DESCRIPCION_SALIDA":
      return {
        ...state,
        descripcionSalida: {
          value: state.descripcionSalida.value,
          isValid: null,
        },
      };
    case "BLUR_DESCRIPCION_SALIDA":
      valido = validarMonto(state.descripcionSalida.value);
      return {
        ...state,
        descripcionSalida: {
          value: state.descripcionSalida.value,
          isValid: valido,
        },
      };
    case "USER_COD_CUPONERA":
      return {
        ...state,
        codCuponera: {
          value: action.value,
          isValid: state.codCuponera.isValid,
        },
      };
    case "FOCUS_COD_CUPONERA":
      return {
        ...state,
        codCuponera: {
          value: state.codCuponera.value,
          isValid: null,
        },
      };
    case "BLUR_COD_CUPONERA":
      valido = validarMonto(state.codCuponera.value);
      return {
        ...state,
        codCuponera: {
          value: state.codCuponera.value,
          isValid: valido,
        },
      };
    case "USER_TICK_DEBITO":
      return {
        ...state,
        ticketDebito: {
          value: action.value,
          isValid: state.ticketDebito.isValid,
        },
      };
    case "FOCUS_TICK_DEBITO":
      return {
        ...state,
        ticketDebito: {
          value: state.ticketDebito.value,
          isValid: null,
        },
      };
    case "BLUR_TICK_DEBITO":
      valido = validarMonto(state.ticketDebito.value);
      return {
        ...state,
        ticketDebito: {
          value: state.ticketDebito.value,
          isValid: valido,
        },
      };
  }
};
