const express = require("express");
const router = express.Router();
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads

//Importo la interfaz. Esto va a tener los metodos para llamar a la base
const interfaz = require("./interfaz");

app.use("/datosFormularioAgenda", (req, res) => {
  let ret = interfaz.getDatosFormulario();
  ret.then((empleados) => {
    res.json({
      mensaje: empleados,
    });
  });
});

app.use("/aceptarAgenda", (req, res) => {
  let id = req.query.id;
  let aceptada = req.query.aceptada;
  let ret = interfaz.aceptarAgenda(id, aceptada);
  ret.then((resultado) => {
    res.json({
      mensaje: resultado,
    });
  });
});

app.use("/listadoAgendas", (req, res) => {
  let ret = interfaz.getDatosListadoAgendas();
  ret.then((resultado) => {
    res.json({
      mensaje: resultado,
    });
  });
});

app.use("/listadoPreAgendas", (req, res) => {
  let ret = interfaz.getPreAgendas();
  ret.then((resultado) => {
    res.json({
      mensaje: resultado,
    });
  });
});

app.use("/agendaPorId", (req, res) => {
  //Traer también el nombre del empleado
  let id = req.query.idAgenda;
  let ret = interfaz.getAgendaPorId(id);
  ret.then((resultado) => {
    res.json({
      mensaje: resultado,
    });
  });
});

app.post("/crearAgenda", (req, res) => {
  const ret = interfaz.crearSolicitudAgenda(req.body);
  ret.then((resultado) => {
    res.json({
      mensaje: resultado,
    });
  });
});

app.use("/datosFormularioCaja", (req, res) => {
  const ret = interfaz.datosFormularioCaja();
  ret.then((resultado) => {
    res.json({
      mensaje: resultado,
    });
  });
});

//No escribir nada por debajo de esto
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
