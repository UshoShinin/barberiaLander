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
      "select A.IdAgenda, H.Cedula, H.HoraInicio, H.HoraFin from Agenda A, Horario H where A.IdHorario = H.IdHorario order by H.Cedula, H.HoraInicio"
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
    const listadoServicios = await pool
      .request()
      .query("select * from Servicio");
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
        nombre: listadoServicios.recordset[u].Nombre,
      };
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
        duracionServicio: [],
      };
      //Recorro las duraciones de servicios para ir agregandolo aca
      for (let p = 0; p < duracionServiciosEmpleado.recordset.length; p++) {
        if (
          duracionServiciosEmpleado.recordset[p].Cedula ===
          empleados.recordset[i].Cedula
        ) {
          //Creo un objeto auxiliar para agregar al empleadoAux
          let duracionAux = {
            idServicio: duracionServiciosEmpleado.recordset[p].IdServicio,
            duracion: duracionServiciosEmpleado.recordset[p].Duracion,
          };
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

//Conseguir datos de todas las pre agendas
const getPreAgendas = async () => {
  //Variable donde esta la conexion con la bd
  const pool = await sql.connect(conexion);
  //Aca guardo el resultado de la consulta a la bd
  const consultaPreAgendas = await pool
    .request()
    .query(
      "select A.IdAgenda, H.Fecha, A.NombreCliente, H.HoraInicio, H.HoraFin, A.Descripcion, H.Cedula from Agenda A, Horario H where A.IdHorario = H.IdHorario and A.Aceptada = 0"
    );
  //Separo las preagendas de los resultados de la consulta
  const preAgendas = consultaPreAgendas.recordset;
  //Creo objeto de retorno
  let ret = {
    preAgendas: [],
  };
  //Recorro las preagendas y las agrego al array de retorno
  for (let i = 0; i < preAgendas.length; i++) {
    //Creo la preagenda que agrego al array de retorno
    let preAgendaAux = {
      idAgenda: preAgendas[i].IdAgenda,
      ciEmpleado: preAgendas[i].Cedula,
      fecha: preAgendas[i].Fecha,
      nombreCliente: preAgendas[i].NombreCliente,
      horaInicio: preAgendas[i].HoraInicio,
      horaFin: preAgendas[i].HoraFin,
      descripcion: preAgendas[i].Descripcion,
    };
    //Empujo la preagenda al array de retorno
    ret.preAgendas.push(preAgendaAux);
  }
  return ret;
};

//Conseguir los datos de una agenda por su id
const getAgendaPorId = async (idAgenda) => {
  try {
    //Variable donde esta la conexion con la bd
    const pool = await sql.connect(conexion);
    //Armo la query
    let query =
      "select A.IdAgenda, A.NombreCliente, A.Descripcion, A.Img, A.Tel, H.Cedula, H.HoraInicio, H.HoraFin, H.Fecha, H.IdHorario from Agenda A, Horario H where A.IdHorario = H.IdHorario and A.IdAgenda = " +
      idAgenda;
    //Aca guardo el resultado de la consulta a la bd
    const consultaAgendaPorId = await pool.request().query(query);
    //Verifico que haya una agenda
    if (consultaAgendaPorId.rowsAffected[0] === 1) {
      //Separo el resultado
      let agenda = consultaAgendaPorId.recordset;
      //Armo el objeto de retorno para poder agregarle todos los servicios de la agenda
      let ret = {
        idagenda: agenda[0].IdAgenda,
        nombreCliente: agenda[0].NombreCliente,
        descripcion: agenda[0].Descripcion,
        img: agenda[0].Img,
        tel: agenda[0].Tel,
        ciPeluquero: agenda[0].Cedula,
        horario:{i: agenda[0].HoraInicio, f: agenda[0].HoraFin},
        fecha: agenda[0].Fecha,
        servicios: [],
        idHorario: agenda[0].IdHorario
      };
      //Armo la query para buscar todos los servicios de la agenda
      let queryServicios = "select IdServicio from Agenda_Servicio where IdAgenda = " + idAgenda;
      //Hago la consulta a la bd
      const consultaServiciosAgenda = await pool.request().query(queryServicios);
      //Separo el resultado
      const serviciosAgenda = consultaServiciosAgenda.recordset;
      //Por cada horario que haya en serviciosAgenda lo agrego al array de retorno
      serviciosAgenda.forEach(servicio => {
        ret.servicios.push(servicio.IdServicio);
      });
      console.log(agenda);
      return ret;
    } else {
      return "No existe una agenda con ese id";
    }
  } catch (error) {
    console.log(error);
    return "Error al buscar agenda";
  }
};

//Modificar una agenda
//Modificar una agenda deberia ser. Modifico todos los datos del Horario, despues modifico todo de la Agenda y despues Modifico todo de los servicios
const modificarAgenda = async (nuevaAgenda) => {
  try {
    /*
    ACA TIENE QUE IR EL CODIGO DE LA VERIFICACION DE SI EL HORARIO SIGUE ESTANDO DISPONIBLE
    SE TIENE QUE REVISAR DE SI PARA EL PELUQUERO QUE MANDAN EL HORARIO DE ESA FECHA ESTA DISPONIBLE
    EN CASO DE QUE NO ESTE DISPONIBLE  HAY QUE HACER EL RETURN ACA MISMO Y DECIS QUE EL HORARIO NO ESTA DISPONIBLE
   */
    //Variable donde esta la conexion con la bd
    const pool = await sql.connect(conexion);
    //Armo el update para el Horario
    let queryUpdateHorario =
      "update Horario set Cedula = " +
      nuevaAgenda.ciPeluquero +
      ", HoraInicio = " +
      nuevaAgenda.horario.i +
      ", HoraFin = " +
      nuevaAgenda.horario.f +
      ", Fecha = " +
      nuevaAgenda.fecha +
      " where IdHorario = " +
      nuevaAgenda.idHorario;
    //Armo el update para Agenda
    let queryUpdateAgenda =
      "update Agenda set NombreCliente = " +
      nuevaAgenda.nombreCliente +
      ", Descripcion = " +
      nuevaAgenda.descripcion +
      ", Img = " +
      nuevaAgenda.imagenEjemplo +
      ", Tel = " +
      nuevaAgenda.telefono +
      " where IdAgenda = " + 
      nuevaAgenda.idAgenda;
    /**
     ACA VA A IR LO DEL SERVICIO, EL TEMA DE ESTO COMO PUEDE CAMBIAR TODOS LOS SERVICIOS QUE SE VA A HACER
     LO MEJOR VA A SER BORRAR TODOS LOS QUE YA HAY Y HACER UN INSERT NUEVO CON TODOS LOS NUEVOS
     */
  } catch (error) {
    return error;
  }
};

//Metodo para agregar la agenda a la base, voy a recibir los datos todos dentro del objeto agenda
const crearSolicitudAgenda = async (agenda) => {
  try {
    //Variable donde esta la conexion con la bd
    const pool = await sql.connect(conexion);
    //Armo la query de Horario
    let queryHorario =
      "Insert into Horario (" +
      agenda.ciPeluquero +
      ", " +
      agenda.horario.i +
      ", " +
      agenda.horario.f +
      ", " +
      agenda.fecha +
      ")";
    //Inserto en la tabla Horario los datos de de la agenda
    const insertHorario = await pool.request().query(queryHorario);
    //Verifico que haya insertado algo
    if (insertHorario.rowsAffected[0] === 1) {
      //Armo la query para el select de abajo
      let queryConsultaHorario =
        "select IdHorario from Horario where Cedula = " +
        agenda.cedulaPeluquero +
        " and HoraInicio = " +
        agenda.horario.i +
        " and HoraFin = " +
        agenda.horario.f;
      //Hago un select para poder saber cual es el id del horario que acabo de insertar
      const consultaHorarioAux = await pool
        .request()
        .query(queryConsultaHorario);
      //Separo el id del resultado de la query
      const idHorario = consultaHorarioAux.recordset.IdHorario;
      //Ahora que tengo el id del horario armo la query para agregar la agenda
      let queryAgenda =
        "Insert into Agenda (" +
        agenda.nombreCliente +
        ", " +
        agenda.descripcion +
        ", " +
        agenda.imagenEjemplo +
        ", " +
        agenda.telefono +
        ", 0, " +
        idHorario +
        ")";
      //Hago el select para poder saber cual es el id de la agenda
      const insertAgenda = await pool.request().query(queryAgenda);
      if (insertAgenda.recordset.rowsAffected === 1) {
        //Armo la query para saber cual es el id de agenda
        let queryConsultaAgenda =
          "select IdAgenda from Agenda where IdHorario = " + idHorario;
        //Hago el select para saber el id de la agenda
        const consultaAgendaAux = await pool
          .request()
          .query(queryConsultaAgenda);
        //Separo el valor del id de la agenda
        const idAgenda = consultaAgendaAux.recordset.IdAgenda;
        let queryServicioAgenda = "Insert into Agenda_Servicio values ";
        //Recorro todos los servicios que van para la agenda y armo la query
        for (let i = 0; i < agenda.servicios.length; i++) {
          //Verifico si en el servicio que estoy parado es el ultimo de la lista. Esto lo hago para armar la query con o si coma al final
          if (i + 1 === agenda.servicios.length) {
            let queryAux =
              "(" +
              idAgenda +
              ", " +
              idHorario +
              ", " +
              agenda.servicios[i] +
              ")";
          } else {
            let queryAux =
              "(" +
              idAgenda +
              ", " +
              idHorario +
              ", " +
              agenda.servicios[i] +
              "), ";
          }
          queryServicioAgenda += queryAux;
        }
        const insertServicioAgenda = await pool
          .request()
          .query(queryServicioAgenda);
        if (insertServicioAgenda.recordset.rowsAffected > 0) {
          return "La agenda fue agregada correctamente";
        } else {
          throw ex;
        }
      } else {
        throw ex;
      }
    } else {
      throw ex;
    }
  } catch (error) {
    //En caso de que por alguna razon explote esto devuelve el error al metodo que lo llamo y ese lo devuelve por json
    return error;
  }
};

//Creo un objeto que voy a exportar para usarlo desde el index.js
//Adentro voy a tener todos los metodos de llamar a la base
const interfaz = {
  getDatosFormulario,
  aceptarAgenda,
  getDatosListadoAgendas,
  getPreAgendas,
  getAgendaPorId,
  crearSolicitudAgenda,
};

//Exporto el objeto interfaz para que el index lo pueda usar
module.exports = interfaz;
