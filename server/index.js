const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();









//No escribir nada por debajo de esto
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});