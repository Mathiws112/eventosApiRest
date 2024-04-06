const {response} = require('express'); // Importa la función `response` desde el módulo express
const bcrypt = require('bcryptjs'); // Importa la librería bcryptjs para el cifrado de contraseñas

// Importar modelos
const Evento = require('../modules/evento'); // Importa el modelo de Evento desde el módulo '../modules/evento'

// Controlador para la solicitud GET a la ruta de eventos
const eventosGet = async (req, res = response) => {
    const body = req.query; // Extrae los parámetros de la consulta
    
    const {q, nombre, page= 1, limit} = req.query; // Extrae los parámetros de la consulta
    
    const eventos = await Evento.find(); // Consulta todos los documentos de la colección Evento
    
    res.json({
        eventos // Devuelve un objeto JSON con los eventos obtenidos de la base de datos
    });
}

// Controlador para la solicitud GET de promedio de eventos
const PromGet = async (req, res = response) => {
    const body = req.query; // Extrae los parámetros de la consulta
    
    const {q, nombre, page= 1, limit} = req.query; // Extrae los parámetros de la consulta
    
    const eventos = await Evento.find(); // Consulta todos los documentos de la colección Evento
    
    eventos.forEach(numero => console.log(numero)); // Muestra cada documento de evento por consola
    
    res.json({
        msg: 'Prom API controlador', // Devuelve un mensaje indicando que es el controlador del promedio
        q,
        nombre,
        page,
        limit,
        eventos // Devuelve los eventos obtenidos de la base de datos
    });
}
// Controlador para la solicitud POST a la ruta de eventos
const eventosPost = async(req, res = response) => {
    const body = req.body; // Extrae el cuerpo de la solicitud
    let msg = ''; // Inicializa una variable para el mensaje de respuesta

    const evento = new Evento(body); // Crea un nuevo objeto Evento con los datos del cuerpo de la solicitud

    const {nombre, descripcion, lugar, fecha, hora} = req.body; // Extrae los datos del cuerpo de la solicitud

    try {
        // Encripta la contraseña antes de guardarla en la base de datos
        const salt = bcrypt.genSaltSync(10); // Genera una sal para el cifrado
        evento.lugar = bcrypt.hashSync(lugar, salt); // Cifra la contraseña con la sal generada
        await evento.save(); // Guarda el evento en la base de datos
        msg = 'Evento Registrado'; // Asigna un mensaje de éxito
    } catch (error) {
        console.log(error); // Muestra el error por consola
        if (error) {
            if (error.name === 'ValidationError') {
                console.error(Object.values(error.errors).map(val => val.message)); // Muestra los mensajes de error de validación
                msg = Object.values(error.errors).map(val => val.message); // Asigna los mensajes de error al mensaje de respuesta
            }
        }
    }

    console.log(msg); // Muestra el mensaje de respuesta por consola
    
    res.json({
        msg: msg // Devuelve el mensaje de respuesta como un objeto JSON
    });
}

// Controlador para la solicitud PUT a la ruta de eventos
const eventosPut = async(req, res = response) => {
    const body = req.query; // Extrae los parámetros de la consulta
    console.log(body); // Muestra los parámetros de la consulta por consola

    const {nombre, descripcion, lugar, fecha, hora} = req.body; // Extrae los datos del cuerpo de la solicitud

    // Busca y actualiza un evento en la base de datos
    const evento = await Evento.findOneAndUpdate({descripcion: descripcion}, {nombre: nombre, fecha: fecha});

    res.json({
        msg: 'Evento Modificado', // Devuelve un mensaje indicando que se modificó el evento
        evento // Devuelve el evento modificado
    });
}

// Controlador para la solicitud DELETE a la ruta de eventos
const eventosDelete = async(req, res = response) => {
    const body = req.query; // Extrae los parámetros de la consulta

    console.log(body); // Muestra los parámetros de la consulta por consola

    const {nombre, descripcion, lugar, fecha, hora} = req.query; // Extrae los datos del cuerpo de la solicitud

    // Busca y elimina un evento en la base de datos
    const evento = await Evento.findOneAndDelete({descripcion: descripcion});

    res.json({
        msg: 'Evento Eliminado', // Devuelve un mensaje indicando que se eliminó el evento
        evento // Devuelve el evento eliminado
    });
}

// Exporta los controladores de las rutas de eventos para que estén disponibles para otros módulos
module.exports ={
    eventosGet,
    eventosPost,
    eventosPut,
    eventosDelete,
    PromGet
}