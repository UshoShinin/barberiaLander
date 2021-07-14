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
      case "USER_INPUT_CORTE":
        console.log(action.value);
        return {
          ...state,
          Corte: {
            value: action.value,
          },
        };
      case "USER_INPUT_PELO":
        console.log(action.value);
        return {
          ...state,
          Pelo: {
            value: action.value,
          },
        };
    }
  };
export const initialState = {
    Nombre: { value: "", isValid: null },
    Telefono: { value: "", isValid: null },
    Descripcion: { value: "", isValid: null },
    Corte: { value: "" },
    Pelo: { value: "" },
  };