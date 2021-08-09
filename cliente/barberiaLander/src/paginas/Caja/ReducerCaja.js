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
};

const validarMonto = (value) => {
  return value !== "" ? value.trim().length > 0 : null;
};

export const cajaReducer = (state, action) => {
  let valido;
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
        propinaAgenda: { value: "",isValid:null },
      };
    case "CLICK_S_H":
      return {
        ...state,
        soloHoy: { value: !state.soloHoy.value },
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
      return {
        ...state,
        comboAgenda: { value: action.value, active: false },
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
  }
};
