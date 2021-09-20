export const initialState = {
  aceptar: false,
  rechazar: false,
  aceptarModal: false,
  rechazarModal: false,
  agendas: null,
  agendaId: null,
  agendaAModificar: null,
};
export const reducer = (state, action) => {
  switch (action.type) {
    case "CARGA":
      let manejo = action.manejo;
      let misAgendas = [];
      action.payload.forEach((agenda) => {
        misAgendas.push({ ...agenda, fecha: agenda.fecha.slice(0, 10) });
      });
      return {
        ...state,
        agendaId: null,
        agendaAModificar: null,
        aceptar: manejo === 1,
        rechazar: manejo === -1,
        agendas: [...misAgendas],
      };
    case "GET_AGENDA":
      console.log(action.agenda);
      const agendita =
        action.agenda != null
          ? {
              ...action.agenda,
              fecha: {
                d: parseInt(action.agenda.fecha.slice(8, 10), 10),
                m: parseInt(action.agenda.fecha.slice(5, 7), 10),
              },
            }
          : null;
      return { ...state, agendaAModificar: agendita };
    case "SELECT_AGENDA":
      return { ...state, agendaId: action.value };
    case 'SHOW_PREGUNTA':
      return {...state,pregunta:{show:true,value:action.value}}
    case 'HIDE_PREGUNTA':
      return {...state,pregunta:{show:false,value:state.pregunta.value}}
    case "ACEPTAR_MODAL":
      return { ...state, aceptarModal: !state.aceptarModal, rechazarModal: false,aceptar: !state.aceptar,rechazar: false };
    case "RECHAZAR_MODAL":
      return { ...state, aceptarModal: false, rechazarModal: !state.rechazarModal,aceptar: false,rechazar: !state.rechazar };
    case "ACEPTAR_SUCC":
      return { ...state, rechazar: false};
    case "ACEPTAR_FAIL":
      return { ...state, aceptar: false};
    case "RECHAZAR_SUCC":
      return { ...state, aceptar: false };
    case "RECHAZAR_FAIL":
      return { ...state, rechazar: false };
    default:
      return { ...state };
  }
};
