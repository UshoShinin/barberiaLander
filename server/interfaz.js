//Importo la conexion
const conexion = require("./conexion");
//Importo el paquete que vamos a usar
const sql = require("mssql");

//Aceptar una agenda
const aceptarAgenda = async (id, aceptada) => {
  try {
    //Creo la conexion
    let pool = await sql.connect(conexion);
    //Hago la query para conseguir la agenda
    let queryAgenda = "Select Aceptada from Agenda where IdAgenda = " + id;
    //Voy a buscar si esta aceptada la agenda
    let agenda = await pool.request().query(queryAgenda);
    //Si la agenda esta aceptada devuelvo eso
    console.log(agenda);
    if (agenda.recordset[0].Aceptada) {
      let ret = {
        codigo: 400,
        mensaje: "La agenda ya fue aceptada previamente",
      };
      return ret;
    } else {
      //Hago la query del update
      let queryUpdate = "update Agenda set Aceptada = 1 where IdAgenda = " + id;
      //Hago update de la agenda
      let empleados = await pool.request().query(queryUpdate);
      //Si salio todo bien y no fue al catch se confirma de que fue aceptada
      let ret = {
        codigo: 200,
        mensaje: "La agenda fue aceptada",
      };
      return ret;
    }
  } catch (error) {
    //Mensaje de error en caso de que haya pasado algo
    let ret = {
      codigo: 400,
      mensaje: "Error al aceptarla",
    };
    console.log(error);
    return ret;
  }
};
//Conseguir datos para el listado de agendas
const getDatosListadoAgendas = async () => {
  //variable que tiene la conexion
  let pool = await sql.connect(conexion);
  //Voy a buscar los nombres de los empleados
  let consultaNombreEmpleados = await pool
    .request()
    .query("select Cedula, Nombre from Empleado");
  //Voy a buscar los datos que me interesan de las agendas
  let consultaAgendas = await pool
    .request()
    .query(
      "select A.IdAgenda, A.Descripcion, H.Cedula, H.HoraInicio, H.HoraFin from Agenda A, Horario H where A.IdHorario = H.IdHorario order by H.Cedula, H.HoraInicio"
    );
  //Dejo armado un array con los datos de las agendas
  let agendas = consultaAgendas.recordset;
  //Dejo armado un array con los empleados
  let nombreEmpleados = consultaNombreEmpleados.recordset;

  //Armo el objeto que voy a devolver
  let ret = {
    agendas: [],
  };

  //Recorro los empleados para armar los objetos que necesito pushear al array que devuelvo
  for (let i = 0; i < nombreEmpleados.length; i++) {
    //Armo el objeto con los datos del empleado
    let empleadoAux = {
      nombreEmpleado: nombreEmpleados[i].Nombre,
      agendas: [],
    };
    //Recorro las agendas para agregarle los datos de ellas al objeto empleadoAux
    for (let j = 0; j < agendas.length; j++) {
      //Verifico de si la agenda corresponde al empleado en el cual estoy parado
      if (agendas[j].Cedula == nombreEmpleados[i].Cedula) {
        //Creo un objeto agenda para pushear al listado de agendas del empleado
        let agendaAux = {
          idAgenda: agendas[j].IdAgenda,
          i: agendas[j].HoraInicio,
          f: agendas[j].HoraFin,
          descripcion: agendas[j].Descripcion
        };
        //Agrego la agenda al array de agendas del empleado seleccionado
        empleadoAux.agendas.push(agendaAux);
      }
    }
    //Agrego el empleado al array que se va a devolver
    ret.agendas.push(empleadoAux);
  }
  //Devuelvo el objeto ret
  return ret;
};
//Conseguir datos para formularios
const getDatosFormulario = async () => {
  try {
    //variable que tiene la conexion
    const pool = await sql.connect(conexion);
    //Consigo los servicios para devolverlos tambien
    const listadoServicios = await pool.request().query("select * from Servicio");
    //Consigo cuanto demora cada empleado por servicio
    const duracionServiciosEmpleado = await pool
      .request()
      .query(
        "select E.Cedula, SE.IdServicio, SE.Duracion from Empleado E, Servicio_Empleado SE where E.Cedula = SE.Cedula order by E.Cedula"
      );
    //Consigo los datos de los empleados
    const empleados = await pool
      .request()
      .query("select Cedula, Nombre, Img from Empleado");
    //Consigo los datos de los horarios
    const horarios = await pool
      .request()
      .query("select * from Horario order by Cedula, HoraInicio");
    //Consigo los datos de las agendas
    const agendas = await pool
      .request()
      .query(
        "select E.Cedula, A.IdAgenda, H.Fecha, H.IdHorario from Empleado E, Agenda A, Horario H where E.Cedula = H.Cedula and A.IdHorario = H.IdHorario and A.Aceptada = 1"
      );
    //Creo el objeto que voy a devolver
    let ret = {
      //Servicios con su id y nombre
      servicios: [],
      //Empleados con sus datos necesarios
      empleados: [],
    };
    //Agrego los servicios al array de retorno
    for (let u = 0; u < listadoServicios.recordset.length; u++) {
      let servicioAux = {
        idServicio: listadoServicios.recordset[u].IdServicio,
        nombre: listadoServicios.recordset[u].Nombre
      }
      ret.servicios.push(servicioAux);
    }
    //Agrego los empleados al array de retorno
    for (let i = 0; i < empleados.recordset.length; i++) {
      //Creo un empleado auxiliar para agregar al array de retorno
      let empleadoAux = {
        id: empleados.recordset[i].Cedula,
        title: empleados.recordset[i].Nombre,
        foto: empleados.recordset[i].Img,
        fechas: [],
        duracionServicio: []
      };
      //Recorro las duraciones de servicios para ir agregandolo aca
      for (let p = 0; p < duracionServiciosEmpleado.recordset.length; p++) {
        if(duracionServiciosEmpleado.recordset[p].Cedula === empleados.recordset[i].Cedula){
          //Creo un objeto auxiliar para agregar al empleadoAux
          let duracionAux = {
            idServicio: duracionServiciosEmpleado.recordset[p].IdServicio,
            duracion: duracionServiciosEmpleado.recordset[p].Duracion
          }
          empleadoAux.duracionServicio.push(duracionAux);
        }
      }
      //Recorro las agendas para agregar las fechas
      for (let j = 0; j < agendas.recordset.length; j++) {
        //Si para la cedula del empleado en el que estoy hay una agenda, se agregan el dia y mes de cada agenda que tiene
        if (
          empleados.recordset[i].Cedula === agendas.recordset[j].Cedula &&
          agendas.recordset[j].Fecha !== null
        ) {
          let fechaAux = {
            dia: agendas.recordset[j].Fecha.getDate(),
            mes: agendas.recordset[j].Fecha.getMonth() + 1,
            horarios: [],
          };
          //Recorro los horarios para agregarlos a las fechas correspondientes
          for (let k = 0; k < horarios.recordset.length; k++) {
            //Cuando para la agenda en la que estoy encuentro un horario, agrego ese horario
            if (
              horarios.recordset[k].IdHorario === agendas.recordset[j].IdHorario
            ) {
              let horarioAux = {
                i: horarios.recordset[k].HoraInicio,
                f: horarios.recordset[k].HoraFin,
              };
              //Agrego el horario al array de horarios que tiene la fecha
              fechaAux.horarios.push(horarioAux);
            }
          }
          //Agrego las fechas al array que tiene las fechas
          empleadoAux.fechas.push(fechaAux);
        }
      }
      //Agrego al empleado con todos su datos
      ret.empleados.push(empleadoAux);
    }
    return ret;
  } catch (error) {
    console.log(error);
  }
};

//HAY QUE TERMINAR ESTO
//Metodo para agregar la agenda a la base, voy a recibir los datos todos dentro del objeto agenda
const crearSolicitudAgenda = async (agenda) => {
  //Separo los datos para poder agregarlos en las querys correspondientes
  let queryAgenda =
    "insert into Agenda value (" +
    agenda.nombreCliente +
    ", " +
    agenda.fecha +
    ", " +
    agenda.descripcion +
    ", " +
    agenda.imagenEjemplo +
    ", " +
    agenda.telefono +
    ", 0)"; //Esto ultimo es el campo Aceptado

  let queryHorario =
    "insert into Horario value (" +
    agenda.cedulaPeluquero +
    ", " +
    agenda.horario.horaInicio +
    ", " +
    agenda.horario.horaFin;
  (")");
  //ACA TENGO QUE VER COMO CARAJOS RELACIONAR LA AGENDA CON LOS SERVICIOS, SEGURAMENTE TENGA QUE INSERTAR LO ANTERIOR
  //Y DESPUES INSERTAR ESTO PERO ANTES HACIENDO UN SELECT PARA SABER CUAL ES EL ID DE AGENDA
};

//Creo un objeto que voy a exportar para usarlo desde el index.js
//Adentro voy a tener todos los metodos de llamar a la base
const interfaz = {
  getDatosFormulario,
  aceptarAgenda,
  getDatosListadoAgendas,
};

//Exporto el objeto interfaz para que el index lo pueda usar
module.exports = interfaz;
