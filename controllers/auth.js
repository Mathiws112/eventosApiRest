

const Evento = require('../modules/evento')
// Importa la librería bcryptjs para el cifrado y comparación de contraseñas
const bcrypt = require('bcryptjs')

// Función asincrónica para comparar la contraseña proporcionada con el hash almacenado
async function comparePassword(plaintextPassword, hash) {
    const result = await bcrypt.compare(plaintextPassword, hash);
    return result;
}

// Función de inicio de sesión
const login = async(req, res) => {
    const { descripcion, lugar } = req.body // Extrae el descripcion y lacontraseña del cuerpo de la solicitud

    // Busca un evento en la base de datos que coincida con el descripcion proporcionado
    const evento = await Evento.findOne({descripcion})

    try {
        // Verifica si el evento existe en la base de datos
        if( !evento ){
            return res.status(400).json({
                msg: 'Correo electrónico no encontrado'
            })
        }

        // Verifica si el evento está activo
        if( !evento.hora ){
            return res.status(400).json({
                msg: 'Evento inactivo'
            })
        }

        // Compara la contraseña proporcionada con la contraseña almacenada en la base de datos
        resultado = await comparePassword(lugar, evento.lugar)

        if(resultado == true){
            return res.status(400).json({
                msg: 'El lugar es correcto'
            })
        }
        else{
            return res.status(400).json({
                msg: 'El lugar es incorrecto'
            })
        }
    } catch (err) {
        return res.status(400).json({
            msg: 'Apreciado evento contacte al administrador.' // Mensaje de error genérico en caso de fallo
        })
    }
}

// Exporta la función de inicio de sesión para que esté disponible para otros módulos
module.exports = {
    login
}
