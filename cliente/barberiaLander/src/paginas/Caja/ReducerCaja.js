import { getElementById } from "../../components/Calendario/FuncionesAuxiliares";
const today = new Date();
export const initialState = {
  idCaja: new Date(),
  desc: "AbrirCaja",
  montoInicial: { value: "", isValid: null },
  jornal: { value: "", show: false },
  comboAgenda: { value: 1, active: false },
  sinAgendar: { value: false },
  soloHoy: { value: false },
  montoAgenda: { value: "", isValid: null },
  propinaAgenda: { value: "", isValid: null },
  montoProductos: { value: "", isValid: null },
  montoTotalProd: { value: "", isValid: null },
  productos: [
    { id: 1, nombre: "Pan", price: 160 },
    { id: 2, nombre: "Pan bimbo", price: 130 },
    { id: 3, nombre: "Jamon bimbo", price: 120 },
    { id: 4, nombre: "Banana", price: 150 },
    { id: 5, nombre: "Uva", price: 110 },
    { id: 6, nombre: "Naranjita", price: 100 },
    { id: 7, nombre: "Shampoo", price: 190 },
    { id: 8, nombre: "Lentejas", price: 170 },
    { id: 9, nombre: "Lechuga", price: 180 },
    { id: 10, nombre: "Tomate", price: 210 },
    { id: 11, nombre: "", price: 120 },
    { id: 12, nombre: "Banana", price: 140 },
    { id: 13, nombre: "Uva", price: 105 },
    { id: 14, nombre: "Naranjita", price: 120 },
    { id: 15, nombre: "Shampoo", price: 140 },
    { id: 16, nombre: "Lentejas", price: 100 },
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
  efectivo: { value: false}, 
  debito: { value: false}, 
  cuponera: { value: false}, 
  montoEfectivo:{}, 
  montoDebito:{}, 
  montoCuponera:{}, 
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
  return value !== "" ? value.trim().length > 0 : null;
};

const miFiltro = (lista, objetivo) => {
  let nuevaLista = [];
  let encontrado = null;
  lista.forEach((element) => {
    if (element.id !== objetivo.id) nuevaLista.push({ ...element });
    else encontrado = element.count;
  });
  console.log(nuevaLista);
  if (encontrado !== null) return { lista: [...nuevaLista], count: encontrado }; //Es nueva lista
  return null; //No hay cambios
};

export const cajaReducer = (state, action) => {
  let valido;
  let destino;
  let total = 0;
  switch (action.type) {
    case "USER_INPUT_MONOTO_I":
      return {
        ...state,
        montoInicial: {
          value: action.value,
          isValid: state.montoInicial.isValid,
        },
      };
    case "FOCUS_INPUT_MONOTO_I":
      return {
        ...state,
        montoInicial: {
          value: state.montoInicial.value,
          isValid: null,
        },
      };
    case "BLUR_INPUT_MONOTO_I":
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
      return {
        ...state,
        sinAgendar: { value: !state.sinAgendar.value },
        soloHoy: { value: false },
        propinaAgenda: { value: "", isValid: null },
      };
    case "CLICK_S_H":
      const nuevoEstado = !state.soloHoy.value;
      let listaBase;
      let posicion = state.comboAgenda.value;
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
    case "USER_INPUT_MONOTO_A":
      return {
        ...state,
        montoAgenda: {
          value: action.value,
          isValid: state.montoAgenda.isValid,
        },
      };
    case "FOCUS_INPUT_MONOTO_A":
      return {
        ...state,
        montoAgenda: {
          value: state.montoAgenda.value,
          isValid: null,
        },
      };
    case "BLUR_INPUT_MONOTO_A":
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
        console.log(p);
        total += p.price * p.count;
      });
      console.log(total);
      return {
        ...state,
        productosAgregados: [...destino],
        montoProductos: { value: "", isValid: null },
        productosSAg: [],
        montoTotalProd: { value: total, isValid: true },
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
      return {
        ...state,
        efectivo: { value: !state.efectivo.value },
      };
    case "CLICK_DEBITO":
      return {
        ...state,
        debito: { value: !state.debito.value },
      };
    case "CLICK_CUPONERA":
      return {
        ...state,
        cuponera: { value: !state.cuponera.value },
      };
  }
};
