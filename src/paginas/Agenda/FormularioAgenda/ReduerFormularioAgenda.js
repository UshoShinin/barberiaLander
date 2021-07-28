export const initialStateCheck = {
  corte: false,
  maquina: false,
  barba: false,
  laciado: false,
  decoloracion: false,
  tinta: false,
};

export const checkReducer = (state, action) => {
  switch (action.type) {
    case "CORTE":
      return { ...state, corte: !state.corte };
    case "MAQUINA":
      return { ...state, maquina: !state.maquina };
    case "BARBA":
      return { ...state, barba: !state.barba };
    case "LACIADO":
      return { ...state, laciado: !state.laciado };
    case "DECOLORACION":
      return { ...state, decoloracion: !state.decoloracion };
    case "TINTA":
      return { ...state, tinta: !state.tinta };
  }
};

export const initialState = {
  Nombre: { value: "", isValid: null },
  Telefono: { value: "", isValid: null },
  Descripcion: { value: "", isValid: null },
  Checkboxes: { value: null },
  Corte: { value: "" },
  Pelo: { value: "" },
  Calendario: { value: null,dia:null},
  ComboBox: { value: null, active: false },
  Employee: { value: null },
  Time: { value: 0 },
};

export const inputReducer = (state, action) => {
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
    case "USER_INPUT_CORTE":
      return {
        ...state,
        Corte: {
          value: action.value,
        },
      };
    case "USER_INPUT_PELO":
      return {
        ...state,
        Pelo: {
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
          dia:action.dia,
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
  }
};
