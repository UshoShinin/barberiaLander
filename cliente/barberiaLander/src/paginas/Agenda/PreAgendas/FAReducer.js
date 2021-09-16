export const initialState = {
  aceptar: false,
  rechazar: false,
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
    case "SELECT_AGENDA":
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
    case "ACEPTAR":
      return { aceptar: !state.aceptar, rechazar: false };
    case "RECHAZAR":
      return { aceptar: false, rechazar: !state.rechazar };
    default:
      return { ...state };
  }
};
