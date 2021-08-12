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

//Metodo para conseguir todos los servicios con su nombre
//Esto devuelve una promesa con todos los servicios
const getServicios = async () => {
  try {
    //variable que tiene la conexion
    const pool = await sql.connect(conexion);
    //Consigo el listado de servicios
    const listadoServicios = await pool
      .request()
      .query("select * from Servicio");
    //Armo un array que es lo que voy a devolver
    let arrayRetorno = [];
    //Recorro el listado de servicios y agrego al array de retorno los servicios
    //Agrego los servicios al array de retorno
    for (let u = 0; u < listadoServicios.recordset.length; u++) {
      let servicioAux = {
        idServicio: listadoServicios.recordset[u].IdServicio,
        nombre: listadoServicios.recordset[u].Nombre,
      };
      arrayRetorno.push(servicioAux);
    }
    return arrayRetorno;
  } catch (error) {
    console.log(error);
  }
};
//Metodo para conseguir los empleados para el formulario
//Devuelve una promesa
const getEmpleadosFormulario = async () => {
  try {
    //variable que tiene la conexion
    const pool = await sql.connect(conexion);
    //Consigo los datos de los empleados
    const empleados = await pool
      .request()
      .query("select Cedula, Nombre, Img from Empleado");
    //Creo el array de retorno
    let arrayRetorno = [];
    //Recorro el listado de empleados para armar el objeto como necesito
    for (let i = 0; i < empleados.recordset.length; i++) {
      //Creo un empleado auxiliar para agregar al array de retorno
      let empleadoAux = {
        id: empleados.recordset[i].Cedula,
        title: empleados.recordset[i].Nombre,
        foto: empleados.recordset[i].Img,
        //fechas: [], Esto se le agrega en otro metodo
        //duracionServicio: [], Esto se le agrega en otro metodo
      };
      arrayRetorno.push(empleadoAux);
    }
    return arrayRetorno;
  } catch (error) {
    console.log(error);
  }
};
//Metodo para agregarle a los empleados del formulario lo que duran con cada servicio
//Nada mas espero que me llegue un array con objetos empleado
//Devuelve una promesa
const agregarDuracionEmpleados = async (listadoEmpleados) => {
  try {
    //variable que tiene la conexion
    const pool = await sql.connect(conexion);
    //Consigo cuanto demora cada empleado por servicio
    const duracionServiciosEmpleado = await pool
      .request()
      .query(
        "select E.Cedula, SE.IdServicio, SE.Duracion from Empleado E, Servicio_Empleado SE where E.Cedula = SE.Cedula order by E.Cedula"
      );
    let arrayRetorno = [];
    for (let i = 0; i < listadoEmpleados.length; i++) {
      //Creo empleado auxiliar para agregarle duracion
      let empleadoAux = {
        ...listadoEmpleados[i],
        duracion: [],
      };
      //Recorro las duraciones de servicios para ir agregandolo aca
      for (let p = 0; p < duracionServiciosEmpleado.recordset.length; p++) {
        if (duracionServiciosEmpleado.recordset[p].Cedula === empleadoAux.id) {
          //Creo un objeto auxiliar para agregar al empleadoAux
          let duracionAux = {
            idServicio: duracionServiciosEmpleado.recordset[p].IdServicio,
            duracion: duracionServiciosEmpleado.recordset[p].Duracion,
          };
          empleadoAux.duracion.push(duracionAux);
        }
      }
      arrayRetorno.push(empleadoAux);
    }
    return arrayRetorno;
  } catch (error) {
    console.log(error);
  }
};
//Metodo para agregarle las fechas agendadas a los
//Espero que me llegue un listado de empleados
//Devuelve una promesa
const agregarFechasEmpleados = async (listadoEmpleados) => {
  try {
    //variable que tiene la conexion
    const pool = await sql.connect(conexion);
    //Voy a buscar las fechas de todas las agendas aceptadas
    const fechasAgenda = await pool
      .request()
      .query(
        "select E.Cedula, H.Fecha from Empleado E, Agenda A, Horario H where E.Cedula = H.Cedula and A.IdHorario = H.IdHorario and A.Aceptada = 1 group by H.Fecha, E.Cedula"
      );
    //Armo el array de retorno
    let arrayRetorno = [];
    //Recorro todos los empleados y por cada uno le agrego las fechas de las agendas
    for (let i = 0; i < listadoEmpleados.length; i++) {
      //Armo un empleado aux que tiene un array de fechas
      let empleadoAux = {
        ...listadoEmpleados[i],
        fechas: [],
      };
      //Recorro las fechas de las agendas para agregarlas
      for (let j = 0; j < fechasAgenda.recordset.length; j++) {
        if (empleadoAux.id === fechasAgenda.recordset[j].Cedula) {
          //Creo el objeto fecha para agregar al empleado
          let fechaAux = {
            dia: fechasAgenda.recordset[j].Fecha.getUTCDate(),
            mes: fechasAgenda.recordset[j].Fecha.getMonth() + 1,
            horarios: [],
          };
          empleadoAux.fechas.push(fechaAux);
        }
      }
      arrayRetorno.push(empleadoAux);
    }
    return arrayRetorno;
  } catch (error) {
    console.log(error);
  }
};
//Metodo para agregar los horarios de las agendas al empleado
//Me llega un empleado y le tengo que agregar los horarios a ese empleado
//Devuelve una promesa
const agregarHorariosEmpleado = async (listadoEmpleados) => {
  try {
    //variable que tiene la conexion
    const pool = await sql.connect(conexion);
    //Consigo los datos de los horarios
    const horarios = await pool
      .request()
      .query("select * from Horario order by Cedula, HoraInicio");
    //Recorro todos los empleados para ir agregando uno por uno sus horarios
    for (let k = 0; k < listadoEmpleados.length; k++) {
      //Recorro las fechas del empleado en el cual estoy parado
      for (let j = 0; j < listadoEmpleados[k].fechas.length; j++) {
        //Recorro el array de horarios para ver cuales le tengo que asignar
        for (let i = 0; i < horarios.recordset.length; i++) {
          //Tengo que verificar de que la fecha del horario sea la fecha correspondiente
          if (
            listadoEmpleados[k].fechas[j].dia ===
              horarios.recordset[i].Fecha.getUTCDate() &&
            listadoEmpleados[k].fechas[j].mes ===
              horarios.recordset[i].Fecha.getMonth() + 1
          ) {
            //Creo objeto auxiliar horario para agregar
            let horarioAux = {
              i: horarios.recordset[i].HoraInicio,
              f: horarios.recordset[i].HoraFin,
            };
            listadoEmpleados[k].fechas[j].horarios.push(horarioAux);
          }
        }
      }
    }
    return listadoEmpleados;
  } catch (error) {
    console.log(error);
  }
};
//Metodo para agregar los servicios al array que devuelvo
//Devuelvo una promesa
const agregarServiciosRetorno = async (listado) => {
  let retorno = getServicios().then((resultado) => {
    //Armo el array entero con todo
    let objetoRetorno = {
      servicios: resultado,
      empleados: [...listado],
    };
    return objetoRetorno;
  });
  return retorno;
};
//Conseguir datos para formularios
const getDatosFormulario = async () => {
  let retorno = getEmpleadosFormulario()
    .then((listadoEmpleados) => {
      return agregarDuracionEmpleados(listadoEmpleados);
    })
    .then((listadoEmpleadosDuracion) => {
      return agregarFechasEmpleados(listadoEmpleadosDuracion);
    })
    .then((listadoEmpleadosConFecha) => {
      return agregarHorariosEmpleado(listadoEmpleadosConFecha);
    })
    .then((listadoCompleto) => {
      return agregarServiciosRetorno(listadoCompleto);
    })
    .then((listadoConServicios) => listadoConServicios);
  return retorno;
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
      "select A.IdAgenda, A.NombreCliente, A.Descripcion, A.Img, A.Tel, E.Nombre, H.Cedula, H.HoraInicio, H.HoraFin, H.Fecha, H.IdHorario from Agenda A, Horario H, Empleado E where A.IdHorario = H.IdHorario and E.Cedula = H.Cedula and A.IdAgenda = " +
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
        nombreEmpleado: agenda[0].Nombre,
        ciPeluquero: agenda[0].Cedula,
        horario: { i: agenda[0].HoraInicio, f: agenda[0].HoraFin },
        fecha: agenda[0].Fecha,
        servicios: [],
        idHorario: agenda[0].IdHorario,
      };
      //Armo la query para buscar todos los servicios de la agenda
      let queryServicios =
        "select IdServicio from Agenda_Servicio where IdAgenda = " + idAgenda;
      //Hago la consulta a la bd
      const consultaServiciosAgenda = await pool
        .request()
        .query(queryServicios);
      //Separo el resultado
      const serviciosAgenda = consultaServiciosAgenda.recordset;
      //Por cada horario que haya en serviciosAgenda lo agrego al array de retorno
      serviciosAgenda.forEach((servicio) => {
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

//Metodo auxiliar para verificar que un horario siga disponible
//Devuelve una promesa con true o false
const verificarHorario = async (horario) => {
  try {
    //variable que tiene la conexion
    const pool = await sql.connect(conexion);
    //Voy a buscar todos los horarios del empleado que me mandaron
    const horarios = await pool
      .request()
      .input("ci", sql.VarChar, horario.ciEmpleado)
      .input("fecha", sql.Date, horario.fecha)
      .query(
        "select HoraInicio, HoraFin from Horario where Cedula = @ci and Fecha = @fecha"
      );
    //Separo el listado
    const lista = horarios.recordset;
    //Paso a valores numericos los datos del horario que me pasan por parametro para poder trabajar mejor
    let horaInicio = parseInt(horario.i.replace(":", ""));
    let horaFin = parseInt(horario.f.replace(":", ""));
    //Esta variable es la que devuelvo al final, arranca en true y en el for se evalua para pasar a false
    let puedoInsertar = true;
    //Recorro los horarios del empleado
    for (let i = 0; i < lista.length; i++) {
      if (horaInicio <= parseInt(lista[i].HoraInicio.replace(":", ""))) {
        //si horaFin<= parseInt(lista[i].HoraInicio.replace(":", "")) puedo insertar, entonces el que tengo que preguntar es si horaFin > parseInt(lista[i].i.replace(":", ""))
        if (horaFin > parseInt(lista[i].HoraInicio.replace(":", ""))) {
          puedoInsertar = false;
        }
      } else {
        // caso del else: horaInicio > parseInt(lista[i].i.replace(":", ""))
        if (horaInicio < parseInt(lista[i].HoraFin.replace(":", ""))) {
          puedoInsertar = false;
        }
      }
    }
    return puedoInsertar;
  } catch (error) {
    console.log(error);
  }
};
//Este es un metodo que dado los datos de un horario lo inserta en la base de datos
//Es un metodo auxiliar que devuelve el id del horario en caso de que se inserte, si no devuelve -1
const insertarHorario = async (horario) => {
  const pool = await sql.connect(conexion);
  const resultado = verificarHorario(horario)
    .then((puedoInsertar) => {
      if (puedoInsertar) {
        const insertHorario = await pool
          .request()
          .input("Cedula", sql.VarChar, horario.ciEmpleado)
          .input("HoraInicio", sql.VarChar, horario.i)
          .input("HoraFin", sql.VarChar, horario.f)
          .input("Fecha", sql.Date, horario.fecha)
          .query(
            "insert into Horario (Cedula, HoraInicio, HoraFin, Fecha) OUTPUT inserted.IdHorario values (@Cedula, @HoraInicio, @HoraFin, @Fecha)"
          );
        return insertHorario;
      } else {
        return -1;
      }
    })
    .then((resultado) => {
      //Verifico si exploto o no
      if (resultado === -1) {
        return { idAgenda: -1 };
      }
      //El objeto que me devuele el insert tiene la cantidad de filas afectadas y el idHorario del horario que acabo de insertar
      //Devuelvo el idHorario
      return resultado.recordset[0].IdHorario;
    });
  //Cuando tengo el resultado ya en la variable devuelvo el id del horario que recien se inserto
  return resultado;
};
//Este es un metodo que dado los datos de una agenda lo inserta en la base de datos
//Es un metodo auxiliar que devuelve el idAgenda y idHorario si se inserta, si no devuelve en cada uno -1
const insertarAgenda = async (agenda) => {
  //Variable que tiene la conexion
  const pool = await sql.connect(conexion);
  //Armo el insert
  const insertAgenda = await pool
    .request()
    .input("NombreCliente", sql.VarChar, agenda.nombre)
    .input("Descripcion", sql.VarChar, agenda.descripcion)
    .input("Img", sql.VarChar, agenda.imagenEjemplo)
    .input("Tel", sql.VarChar, agenda.telefono)
    .input("Aceptada", sql.Bit, agenda.aceptada)
    .input("IdHorario", sql.Int, agenda.idHorario)
    .query(
      "insert into Agenda (NombreCliente, Descripcion, Img, Tel, Aceptada, IdHorario) OUTPUT inserted.IdHorario, inserted.IdAgenda values (@NombreCliente, @Descripcion, @Img, @Tel, @Aceptada, @IdHorario)"
    )
    .then((resultado) => {
      //El objeto resultado devuelve la cantidad de filas afectadas, el idAgenda y el idHorario
      let ret = {
        idHorario: resultado.recordset[0].IdHorario,
        idAgenda: resultado.recordset[0].IdAgenda,
      };
      return ret;
    })
    .catch((error) => {
      //Armo un objeto con el error y los valores en -1
      return {
        error: error,
        idHorario: -1,
        idAgenda: -1,
      };
    });
  //Cuando tengo el resultado del insert de la agenda, devuelvo el idAgenda y el idHorario
  return insertAgenda;
};
//Este es un metodo que dado los datos de una agenda y un servicio lo inserta en la base de datos
//Es un metodo auxiliar que devuelve
const insertarServicioAgenda = async (servicioAgenda) => {
  //Variable que tiene la conexion
  const pool = await sql.connect(conexion);
  //Creo la tabla que voy a insertar
  const tabla = new sql.Table("PeluqueriaLander.dbo.Agenda_Servicio");
  tabla.database = "PeluqueriaLander";
  //Tengo que decir si creo la tabla o no
  tabla.create = false;
  //Segun lo leido tengo que insertar a la variable 'tabla' las columnas que va a tener
  tabla.columns.add("IdAgenda", sql.Int, { nullable: false, primary: true });
  tabla.columns.add("IdHorario", sql.Int, { nullable: true });
  tabla.columns.add("IdServicio", sql.Int, { nullable: false, primary: true });
  //Por cada servicio que me llegue agrego una fila (row)
  servicioAgenda.servicios.forEach((servicio) => {
    tabla.rows.add(servicioAgenda.idAgenda, servicioAgenda.idHorario, servicio);
  });
  //Creo el request que voy a hacer
  const request = pool.request();
  //Le digo al request que haga el insert
  const resultado = await request.bulk(tabla);
  //Devuelvo el resultado que es la cantidad de filas afectadas
  return resultado.rowsAffected;
};

//Metodo para agregar la agenda a la base, voy a recibir los datos todos dentro del objeto agenda
const crearSolicitudAgenda = async (agenda) => {
  //Esto lo que hace es insertar primero el horario, despues la agenda y al final agenda servicio
  const insertarAgendaCompleto = insertarHorario({
    ciEmpleado: agenda.ciEmpleado,
    i: agenda.horario.i,
    f: agenda.horario.f,
    fecha: agenda.fecha,
  })
    .then((resHorario) => {
      //El resultado de la promesa de insertarHorario es el id del horario que se acaba de insertar
      //Controlo de que si el id es -1 es porque dio error
      if (resHorario.idAgenda < 0) {
        throw "Error al insertar agenda";
      }
      //Esto lo que hace es devolver la promesa que devuelve el insertar agenda
      //Esto le llega al then de arriba para que pueda hacerle .then abajo y seguir trabajando
      return insertarAgenda({
        nombre: agenda.nombreCliente,
        descripcion: agenda.descripcion,
        imagenEjemplo: agenda.imagenEjemplo,
        telefono: agenda.telefono,
        aceptada: 0, //Esto hay que ver porque capaz se puede modificar para que siempre me lo manden y no lo tenga que hardcodear
        idHorario: resHorario,
      });
    })
    .then((resAgenda) => {
      //El resultado de la promesa de insertarAgenda es un objeto con idHorario y idAgenda
      return insertarServicioAgenda({
        idAgenda: resAgenda.idAgenda,
        idHorario: resAgenda.idHorario,
        servicios: agenda.servicios,
      });
    })
    .then((resServicioAgenda) => {
      //El resultado de la promesa de insertarServicioAgenda es la cantidad de filas afectadas, es decir la cantidad de registros que se guardaron en la tabla
      if (resServicioAgenda === agenda.servicios.length) {
        return "Agenda insertada correctamente";
      } else {
        return "Error al insertar agenda";
      }
    });
  return insertarAgendaCompleto;
};

//Metodo auxiliar para conseguir todas las agendas aceptadas
//Devuelve una promesa
const getListadoAgendasAceptadas = async () => {
  try {
    //variable que tiene la conexion
    const pool = await sql.connect(conexion);
    //Voy a buscar todas las agendas
    const agendas = await pool
      .request()
      .query(
        "select A.IdAgenda as id, A.NombreCliente as title, H.Fecha as fecha, H.Cedula as empleado from Agenda A, Horario H where A.Aceptada = 1 and H.IdHorario = A.IdHorario"
      );
    //Separo los datos de la consulta
    const listadoAgendas = agendas.recordset;
    return listadoAgendas;
  } catch (error) {
    console.log(error);
  }
};

//Metodo auxiliar para agregar todos los servicios a las agendas aceptadas
//Devuelve una promesa
const agregarServiciosAgendasAceptadas = async (agendas) => {
  try {
    //variable que tiene la conexion
    const pool = await sql.connect(conexion);
    //Voy a buscar todos los servicios
    const servicios = await pool
      .request()
      .query(
        "select A.IdAgenda, S.IdServicio from Agenda A, Agenda_Servicio S where A.IdAgenda = S.IdAgenda and A.Aceptada = 1 order by IdAgenda"
      );
    //Separo los datos de la consulta
    const listadoServicios = servicios.recordset;
    //Armo el array de retorno
    let arrayRetorno = [];
    //Recorro el listado de agendas para irle agregando
    for (let i = 0; i < agendas.length; i++) {
      //Armo un objeto con los datos de la agenda y le agrego un array de servicios
      let agendaAux = {
        ...agendas[i],
        servicios: [],
      };
      //Recorro el listado de servicios para agregarlo a la agendaAux
      for (let j = 0; j < listadoServicios.length; j++) {
        if (agendaAux.id === listadoServicios[j].IdAgenda) {
          agendaAux.servicios.push(listadoServicios[j].IdServicio);
        }
      }
      arrayRetorno.push(agendaAux);
    }
    return arrayRetorno;
  } catch (error) {
    console.log(error);
  }
};

//Metodo para devolver todas las agendas aceptadas
const getAgendasAceptadas = async () => {
  try {
    //Llamo a los metodos auxiliares
    const retorno = getListadoAgendasAceptadas()
      .then((listado) => {
        return agregarServiciosAgendasAceptadas(listado);
      })
      .then((listadoCompleto) => {
        return listadoCompleto;
      });
    return retorno;
  } catch (error) {
    console.log(error);
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
  getAgendasAceptadas,
};

//Exporto el objeto interfaz para que el index lo pueda usar
module.exports = interfaz;
