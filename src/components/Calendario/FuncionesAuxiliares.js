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

export const horariosDisponibilidad = (diaSemana, diasTotales, dia,mes,fechas,servicios) => {
  const horarios = obtenerHorariosDeDia(dia,mes, fechas);
  if (diasTotales === 0 || diaSemana === 7) return { valido: false, horariosDisponibles: [] };
  if(horarios === null) return { valido: true, horariosDisponibles: [] };
  else return { valido: true, horariosDisponibles: horariosAgendarDisponibles(horarios,servicios) };
};

export const transformStringNumber = (horario) =>{
    const hor = parseInt(horario.slice(0,2),10);
    const min = parseInt(horario.slice(3,5),10);
    return {H:hor,M:min}
}

const horariosAgendarDisponibles = (horarios,timeNeed) =>{
  console.log(horarios);
  console.log(timeNeed);
  let hora = 8;
  let minutos = 0;
  let horariosDisponibles = [];
  while(hora<=22){
    if(minutos === 60){
      hora++;
      minutos = 0;
    }
    horariosDisponibles.push({h:hora,m:minutos});
    minutos+=15;
  }
  console.log(horariosDisponibles)
  return [];
}
