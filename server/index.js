const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

//Importo la interfaz. Esto va a tener los metodos para llamar a la base
const interfaz = require("./interfaz");

//ESTO ES PARA PROBAR LA FUNCIONALIDAD ACTUAL HAY QUE BORRARLO A LA MIERDA DESPUES
app.use('/prueba', (req, res) => {
  let ret = interfaz.getDatosFormulario();
  ret.then((resultado) => {
    res.json({
      mensaje: resultado
    });
  });  
});




//No escribir nada por debajo de esto
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});