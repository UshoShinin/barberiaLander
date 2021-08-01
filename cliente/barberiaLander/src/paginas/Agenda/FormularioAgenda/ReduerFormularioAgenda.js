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
export const initialState = {
  Nombre: { value: "", isValid: null },
  Horarios: null,
  HorariosFiltrados: null,
  Telefono: { value: "", isValid: null },
  Descripcion: { value: "", isValid: null },
  Checkboxes: { value: null },
  Referencia: { value: "" },
  Calendario: { value: null, dia: null },
  ComboBox: { value: null, active: false },
  Employee: { value: null },
  corte: { active: false, id: 1 },
  barba: { active: false, id: 4 },
  maquina: { active: false, id: 5 },
  claritos: { active: false, id: 6 },
  decoloracion: { active: false, id: 7 },
  brushing: { active: false, id: 8 },
};

export const inputReducer = (state, action) => {
  let myState = null; //Esta variable se usa para los servicios
  switch (action.type) {
    case "HORARIOS_CARGADOS":
      return {
        ...state,
        Horarios: action.value,
        HorariosFiltrados: action.value,
        Employee: { value: action.value[0].id },
      };
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
    case "FOCUS_INPUT_DESC":
      return {
        ...state,
        Descripcion: {
          value: state.Descripcion.value,
          isValid: state.Descripcion.value.trim().length > 5,
        },
      };
    case "RESET_DESC_IS_VALID":
      return {
        ...state,
        Descripcion: {
          value: state.Descripcion.value,
          isValid: null,
        },
      };
    case "CHECKBOXES":
      return {
        ...state,
        Checkboxes: {
          value: { ...action.value },
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
        },
        Calendario: {
          value: action.value,
          dia: action.dia,
        },
      };
    case "HORARIOS_CLICK":
      return {
        ...state,
        ComboBox: {
          value: state.ComboBox.value,
          active: !state.ComboBox.active,
        },
      };

    case "HORARIOS_SELECT":
      return {
        ...state,
        ComboBox: {
          value: action.value,
          active: false,
        },
      };
    case "CHANGE_EMPLOYEE":
      return {
        ...state,
        Employee: { value: action.value },
        Calendario: { value: null },
        ComboBox: { value: null, active: false },
      };
    case "CHANGE_TIME":
      return { ...state, Time: { value: action.time } };
    case "CORTE":
      myState = {
        ...state,
        corte: { active: !state.corte.active, id: state.corte.id },
      };
      break;
    case "MAQUINA":
      myState = {
        ...state,
        HorariosFiltrados: filtrarHorarios(
          state.Horarios,
          noManeja,
          state.maquina.id
        ),
        maquina: { active: !state.maquina.active, id: state.maquina.id },
      };
      break;
    case "BARBA":
      myState = {
        ...state,
        HorariosFiltrados: filtrarHorarios(
          state.Horarios,
          noManeja,
          state.barba.id
        ),
        barba: { active: !state.barba.active, id: state.barba.id },
      };
      break;
    case "BRUSHING":
      myState = {
        ...state,
        HorariosFiltrados: filtrarHorarios(
          state.Horarios,
          noManeja,
          state.brushing.id
        ),
        brushing: { active: !state.brushing.active, id: state.brushing.id },
      };
      break;
    case "DECOLORACION":
      myState = {
        ...state,
        HorariosFiltrados: filtrarHorarios(
          state.Horarios,
          noManeja,
          state.decoloracion.id
        ),
        decoloracion: {
          active: !state.decoloracion.active,
          id: state.decoloracion.id,
        },
      };
      break;
    case "CLARITOS":
      myState = {
        ...state,
        HorariosFiltrados: filtrarHorarios(
          state.Horarios,
          noManeja,
          state.claritos.id
        ),
        claritos: { active: !state.claritos.active, id: state.claritos.id },
      };
      break;
  }
  if (myState !== null) {
    const servicios = Object.values({
      corte: myState.corte,
      maquina: myState.maquina,
      barba: myState.barba,
      brushing: myState.brushing,
      decoloracion: myState.decoloracion,
      claritos: myState.claritos,
    });
    console.log(servicios);
    let horariosAuxiliares = [...myState.Horarios];
    servicios.forEach(s => {
      if(s.active){
        const miniServicio = buscar(s.id,noManeja);
        if(miniServicio!==null){
          horariosAuxiliares = filtrarHorarios(horariosAuxiliares,
            noManeja,miniServicio.id)
        }
      }
    });
    myState = {
      ...myState,
      HorariosFiltrados: filtrarHorarios(
        state.Horarios,
        noManeja,
        state.corte.id
      ),
      Employee: { value: myState.HorariosFiltrados[0].id },
    };
  }
  console.log(myState);
  return myState;
};
