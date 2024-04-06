const { Router } = require('express'); // Importa la función Router de express para crear un router
const router = Router(); // Crea una instancia de Router

const { eventosGet, eventosPost, eventosPut, eventosDelete, PromGet } = require('../controllers/evento'); // Importa los controladores desde el archivo '../controllers/evento'

// Define rutas y asigna controladores a cada ruta

// Ruta para obtener todos los eventos (GET '/')
router.get('/', eventosGet);

// Ruta para obtener el promedio de eventos (GET '/promedio')
router.get('/promedio', PromGet);

// Ruta para crear un nuevo evento (POST '/')
router.post('/', eventosPost);

// Ruta para actualizar un evento existente (PUT '/')
router.put('/', eventosPut);

// Ruta para eliminar un evento existente (DELETE '/')
router.delete('/', eventosDelete);

// Exporta el router para que esté disponible para otros módulos
module.exports = router;