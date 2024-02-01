//aca armo la coneccion con la base de datoss... con mongo atlas

const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb://localhost:27017/turismo"
  )
  .then(() => console.log("Conectado a MongoDB"))
  .catch((error) => console.log(error));
//mongodb+srv://evelinrocio2816:Airbag2816@cluster0.sasvmwp.mongodb.net/turismo?retryWrites=true&w=majority