import mongoose from "mongoose";

const secret = "XHzxaGgsH9DmOh7N"; // Contraseña de la base de datos
const dbName = "ecommerce"; // Nombre de la base de datos

mongoose
    .connect(`mongodb+srv://Desafio:${secret}@desafio.tsokbhn.mongodb.net/${dbName}?retryWrites=true&w=majority`)
    .then(() => console.log("Conectado a la base de datos")).catch(e => console.log(e))

