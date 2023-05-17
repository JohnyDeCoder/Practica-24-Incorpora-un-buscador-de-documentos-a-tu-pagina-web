const mongoose = require('mongoose'); // inyectamos mongoose

const personSchema = new mongoose.Schema({ // creamos un esquema de mongoose para definir el modelo de datos de las personas (esto es como una tabla en SQL)
    nombre: { // definimos el nombre del campo
        type: String, // definimos el tipo de dato
        required: true // definimos que es un campo requerido
    },
    edad: { // definimos el nombre del campo
        type: Number, // definimos el tipo de dato
        required: true // definimos que es un campo requerido
    },
    tipoSangre: { // definimos el nombre del campo
        type: String, // definimos el tipo de dato
        required: true // definimos que es un campo requerido
    },
    nss: { // definimos el nombre del campo
        type: String, // definimos el tipo de dato
        required: true // definimos que es un campo requerido
    }
});

module.exports = mongoose.model('Persons', personSchema); // exportamos el modelo de datos de personas para poder usarlo en otros archivos