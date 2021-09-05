import { getElementById } from "../../../FuncionesAuxiliares/FuncionesAuxiliares";

const noManeja = [
  { id: 6, idEmpleados: [{ id: "50098037" }, { id: "48279578" }] },
  { id: 7, idEmpleados: [{ id: "50098037" }, { id: "48279578" }] },
  { id: 8, idEmpleados: [{ id: "50098037" }] },
]; //Este los servicios que hacen que empleados salgan de la lista.

const buscar = (id, lista) => {
  for (let i = 0; i < lista.length; i++) {
    if (lista[i].id === id) return lista[i];
  }
  return null;
};

const filtrarHorarios = (empleados, noManeja, id) => {
  const servicio = buscar(id, noManeja);
  if (servicio !== null)
    return empleados.filter(
      (em) => buscar(em.id, servicio.idEmpleados) === null
    );
  return empleados;
};

export const inputReducer = (state, action) => {
  let myState = null; //Esta variable se usa para los servicios
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
          isValid: null,
        },
      };
    case "USER_INPUT_PHONE":
      return {
        ...state,
        Telefono: { value: action.value, isValid: state.Telefono.isValid },
      };
    case "FOCUS_INPUT_PHONE":
      return {
        ...state,
        Telefono: {
          value: state.Telefono.value,
          isValid: state.Telefono.value.trim().length > 5,
        },
      };
    case "RESET_PHONE_IS_VALID":
      return {
        ...state,
        Telefono: {
          value: state.Telefono.value,
          isValid: null,
        },
      };
    case "USER_INPUT_DESC":
      return {
        ...state,
        Descripcion: {
          value: action.value,
          isValid: state.Descripcion.isValid,
        },
      };
    case "USER_INPUT_REFERENCIA":
      return {
        ...state,
        Referencia: {
          value: action.value,
        },
      };
    case "CALENDARIO":
      return {
        ...state,
        ComboBox: {
          value: 1,
          active: false,
          title: getElementById(action.value, 1).title,
        },
        Calendario: {
          value: action.value,
          dia: action.dia,
        },
        Employee: { value: state.Employee.value, active: false },
      };
    case "HORARIOS_CLICK":
      return {
        ...state,
        ComboBox: {
          value: state.ComboBox.value,
          active: !state.ComboBox.active,
          title:state.ComboBox.title
        },
      };
    case "HORARIOS_SELECT":
      return {
        ...state,
        ComboBox: {
          value: action.value,
          active: false,
          title: getElementById(state.Calendario.value, action.value).title,
        },
      };
    case "CHANGE_EMPLOYEE":
      return {
        ...state,
        Employee: { value: action.value, active: false },
        Calendario: { value: null, dia: null },
        ComboBox: { value: null, active: false },
      };
    case "CLICK_EMPLOYEE":
      return {
        ...state,
        Employee: {
          value: state.Employee.value,
          active: !state.Employee.active,
        },
      };
    case "CHANGE_TIME":
      return { ...state, Time: { value: action.time } };
    case "CORTE":
      myState = {
        ...state,
        servicios: {
          ...state.servicios,
          corte: { active: !state.servicios.corte.active, id: state.servicios.corte.id },
          maquina: { active: false, id: state.servicios.maquina.id },
        },
      };
      break;
    case "MAQUINA":
      myState = {
        ...state,
        servicios: {
          ...state.servicios,
          corte: { active: false, id: state.servicios.corte.id },
          maquina: { active: !state.servicios.maquina.active, id: state.servicios.maquina.id },
        },
      };
      break;
    case "BARBA":
      myState = {
        ...state,
        servicios: {
          ...state.servicios,
          barba: { active: !state.servicios.barba.active, id: state.servicios.barba.id },
        },
      };
      break;
    case "BRUSHING":
      myState = {
        ...state,
        servicios: {
          ...state.servicios,
          brushing: { active: !state.servicios.brushing.active, id: state.servicios.brushing.id },
        },
      };
      break;
    case "DECOLORACION":
      myState = {
        ...state,
        servicios: {
          ...state.servicios,
          decoloracion: {
            active: !state.servicios.decoloracion.active,
            id: state.servicios.decoloracion.id,
          },
        },
      };
      break;
    case "CLARITOS":
      myState = {
        ...state,
        servicios: {
          ...state.servicios,
          claritos: { active: !state.servicios.claritos.active, id: state.servicios.claritos.id },
        },
      };
      break;
  }
  if (myState !== null) {
    const servicios = Object.values(myState.servicios);
    let horariosAuxiliares = [...myState.Horarios];
    servicios.forEach((s) => {
      if (s.active) {
        const miniServicio = buscar(s.id, noManeja);
        if (miniServicio !== null) {
          horariosAuxiliares = filtrarHorarios(
            horariosAuxiliares,
            noManeja,
            miniServicio.id
          );
        }
      }
    });
    myState = {
      ...myState,
      Calendario: { value: null, dia: null },
      ComboBox: {
        value: 1,
        active: false,
        title: " ",
      },
      HorariosFiltrados: [...horariosAuxiliares],
      Employee: { value: horariosAuxiliares[0].id, active: false },
    };
  }
  return myState;
};
