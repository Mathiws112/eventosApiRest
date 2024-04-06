const {Schema, model} = require('mongoose'); // Importa las funciones Schema y model de mongoose para definir esquemas y modelos de datos

// Define el esquema del modelo Evento
const eventoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'] // Define que el campo nombre es obligatorio
    },
    descripcion: {
        type: String,
        required: [true, 'El descripcion es obligatorio'] // Define que el campo descripcion es obligatorio
    },

    lugar: {
        type: String,
        required: [true, 'El lugar es obligatorio'], // Define que el campo lugar es obligatorio
        minlength: 3, // Define la longitud mínima del campo lugar
        maxlength: [60, 'El lugar debe ser de máximo 7 y se obtuvo: {VALUE}'], // Define la longitud máxima del campo lugar
    },

    fecha: {
        type: String,
        required: true, // Define que el campo fecha es obligatorio
        enum: ['Admin', 'Evento'] // Define que el campo fecha solo puede tener los valores 'Admin' o 'Evento'
    },

    hora: {
        type: Boolean,
        default: true, // Define el valor por defecto del campo hora como true
        required: [true, 'El hora es obligatorio'] // Define que el campo hora es obligatorio
    },
})

// Crea y exporta el modelo Evento a partir del esquema eventoSchema
module.exports = model('Evento', eventoSchema);