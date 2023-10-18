module.exports = function(app, databaseService, db_ventasService) {
    app.get('/', (request, response) => {
        response.json({
            "mensaje": "Salio bien :D"
        });
    });

    app.get('/articulos', (request, response) => {
        db_ventasService.verArticulos()
        .then((result) => {
            response.json(result);
        }).catch((err) => {
            response.status(500).json(err);
        });
    });

    // Ruta para modificar un artículo
    app.put('/articulos/:id', (request, response) => {
        const id = request.params.id; // Obtén el ID del artículo de los parámetros de la URL
        const nuevosDatos = request.body; // Obtén los nuevos datos del cuerpo de la solicitud

        db_ventasService.modificarArticulo(id, nuevosDatos)
        .then(() => {
            response.json({ mensaje: 'Artículo modificado con éxito' });
        }).catch((err) => {
            response.status(500).json(err);
        });
    });

    // Ruta para eliminar un artículo
    app.delete('/articulos/:nombre', (request, response) => {
        const nombre = request.params.nombre; // Obtén el nombre del artículo de los parámetros de la URL

        db_ventasService.eliminarArticulo(nombre)
        .then(() => {
            response.json({ mensaje: 'Artículo eliminado con éxito' });
        }).catch((err) => {
            response.status(500).json(err);
        });
    });

    app.get('/usuarios', (request, response) => {
        databaseService.verUsuarios()
        .then((result) => {
            response.json(result);
        }).catch((err) => {
            response.status(500).json(err);
        });
    });

    app.post('/usuarios', (request, response) => {
        const nuevoUsuario = request.body;

        console.log(nuevoUsuario);

        databaseService.crearUsuario(nuevoUsuario)
            .then((result) => {
                response.json({
                    "mensaje": "Usuario creado"
                });
            }).catch((err) => {
                response.status(500).json(err);
            });
    });
};