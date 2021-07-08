export const extraerFotos = (empleados) => {
  let resultado = [];
  empleados.forEach((empleado) => {
    resultado.push({
      id: empleado.id,
      title: empleado.title,
      foto: empleado.foto,
    });
  });
  return resultado;
};

export const obtenerHorariosDeDia = (dia, myMonth, fechas) => {
    if(fechas){
        for (let i = 0; i < fechas.length; i++) {
            if (fechas[i].dia == dia && fechas[i].mes == myMonth) {
              return fechas[i].horarios;
            }
          }
    }
  return null;
};

export const horariosDisponibilidad = (diaSemana, diasTotales, dia,fechas,mes) => {
  const horarios = obtenerHorariosDeDia(dia,mes, fechas);
  if (diasTotales > 0 && diaSemana !== 7 && horarios === null)
    return { valido: true, horariosDisponibles: [] };
  else {
    return { valido: true, horariosDisponibles: [] };
  }
  return { valido: false, horariosDisponibles: [] };
};

export const transformStringNumber = (horario) =>{
    const hor = parseInt(horario.slice(0,2),10);
    const min = parseInt(horario.slice(3,5),10);
    return {H:hor,M:min}

}
