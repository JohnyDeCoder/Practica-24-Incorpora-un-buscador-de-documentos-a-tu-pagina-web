const express = require('express'); // inyectamos express
const mongoose = require('mongoose'); // inyectamos mongoose
const personsRoutes = require('./src/routes/persons'); // inyectamos las rutas de personas
require('dotenv').config(); // inyectamos dotenv para utilizar variables de entorno como MONGODB_URI

mongoose.Promise = global.Promise; // le decimos a mongoose que use las promesas de node, estas son nativas de node y nos sirven para hacer async/await en lugar de usar callbacks
const app = express(); // creamos una instancia de express
const port = process.env.PORT || 3000; // definimos el puerto

app.use(express.urlencoded({ extended: false })); // le decimos a express que use el body parser
app.set('view engine', 'ejs'); // le decimos a express que use ejs como motor de plantillas
app.use('/assets', express.static(__dirname + '/public')); // le decimos a express que use la carpeta public para los archivos estáticos

app.use(personsRoutes); // le decimos a express que use las rutas de personas

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // conectamos a la base de datos
    .then(() => console.log(`Connected to Persons`)) // si la conexión es exitosa, mostramos un mensaje
    .catch(err => console.log(err)); // si la conexión falla, mostramos el error

app.listen(port, () => console.log(`Server running on port ${port}`)); // iniciamos el servidor en el puerto definido anteriormente y mostramos un mensaje en consola