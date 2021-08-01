const express = require("express");
const router = express.Router();
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads


//Importo la interfaz. Esto va a tener los metodos para llamar a la base
const interfaz = require("./interfaz");

//ESTO ES PARA PROBAR LA FUNCIONALIDAD ACTUAL HAY QUE BORRARLO A LA MIERDA DESPUES
app.use("/datosFormularioAgenda", (req, res) => {
  let ret = interfaz.getDatosFormulario();
  ret.then((resultado) => {
    res.json({
      mensaje: resultado,
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
  let id = req.query.idAgenda;
  let ret = interfaz.getAgendaPorId(id);
  ret.then((resultado) => {
    res.json({
      mensaje: resultado,
    });
  });
});


//TENGO QUE VER EL TEMA DEL BODY PPARSER PARA EXPRESS PARA PODER TOMAR LOS DATOS QUE ME MANDAN EN EL REQUEST
app.post("/crearAgenda", (req, res) => {
  console.log(req.body);
  const ret = interfaz.crearSolicitudAgenda(req.body);
  ret.then((resultado) => {
    console.log(resultado);
  });
  res.json({
    mensaje: req.body,
  });
});

//No escribir nada por debajo de esto
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
