//Importo la conexion
const conexion = require("./conexion");
//Importo el paquete que vamos a usar
const sql = require("mssql");

//Conseguir datos para formularios
const getDatosFormulario = async () => {
  try {
    //variable que tiene la conexion
    let pool = await sql.connect(conexion);
    //Consigo los datos de los empleados
    let empleados = await pool
      .request()
      .query("select Cedula, Nombre, Img from Empleado");
    //Consigo los datos de los horarios
    let horarios = await pool
      .request()
      .query("select * from Horario order by Cedula, HoraInicio");
    //Consigo los datos de las agendas
    let agendas = await pool
      .request()
      .query(
        "select E.Cedula, A.IdAgenda,  A.Fecha,  AH.IdHorario from Empleado E left join Agenda_Horario AH on E.Cedula = AH.Cedula left join Agenda A on A.IdAgenda = AH.IdAgenda"
      );
    //Creo el objeto que voy a devolver
    let ret = {
      //A este array es al cual se le van a ir agregando los datos formateados
      empleados: [],
    };
    //Agrego los empleados al array de retorno
    for (let i = 0; i < empleados.recordset.length; i++) {
      //Creo un empleado auxiliar para agregar al array de retorno
      let empleadoAux = {
        id: empleados.recordset[i].Cedula,
        title: empleados.recordset[i].Nombre,
        foto: empleados.recordset[i].Img,
        fechas: [],
      };
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
    agenda.ciPeluqueroRealizaServicio +
    ", " +
    agenda.horario.horaInicio +
    ", " +
    agenda.horario.horaFin
    ")";
  //ACA TENGO QUE VER COMO CARAJOS RELACIONAR LA AGENDA CON LOS SERVICIOS, SEGURAMENTE TENGA QUE INSERTAR LO ANTERIOR
  //Y DESPUES INSERTAR ESTO PERO ANTES HACIENDO UN SELECT PARA SABER CUAL ES EL ID DE AGENDA
};

//Creo un objeto que voy a exportar para usarlo desde el index.js
//Adentro voy a tener todos los metodos de llamar a la base
const interfaz = {
  getDatosFormulario,
  aceptarAgenda,
};

//Exporto el objeto interfaz para que el index lo pueda usar
module.exports = interfaz;
