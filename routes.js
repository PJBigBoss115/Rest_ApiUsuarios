module.exports = function(app, databaseService, db_ventasService) {

    app.get('/', (request, response) => {
        response.json({
            "mensaje": "Salio bien :D"
        });
    });

    //Rutas de usuarios ----------------------------------------->
    //Ver usuarios
    app.get('/usuarios', (request, response) => {
        databaseService.verUsuarios()
        .then((result) => {
            response.json(result);
        }).catch((err) => {
            response.status(500).json(err);
        });
    });

    //Agregar usuarios
    app.post('/usuarios', (request, response) => {
        const nuevoUsuario = request.body;

        databaseService.crearUsuario(nuevoUsuario)
            .then((result) => {
                response.json({
                    "mensaje": "Usuario creado"
                });
            }).catch((err) => {
                response.status(500).json(err);
            });
    });

    //Modificar usuarios
    app.put('/usuarios/:nombre', (request, response) => {
        const nombreUsuario = request.params.nombre;
        const nuevosDatos = request.body;
    
        databaseService.modificarUsuario(nombreUsuario, nuevosDatos)
            .then(() => {
                response.json({
                    "mensaje": `Usuario ${nombreUsuario} modificado`
                });
            })
            .catch((err) => {
                response.status(500).json(err);
            });
    });

    //Eliminar usuarios
    app.delete('/usuarios/:nombre', (request, response) => {
        const nombreUsuario = request.params.nombre;
    
        databaseService.eliminarUsuario(nombreUsuario)
            .then(() => {
                response.json({
                    "mensaje": `Usuario ${nombreUsuario} eliminado`
                });
            })
            .catch((err) => {
                response.status(500).json(err);
            });
    });

    //Rutas de base de datos principal ------------------------------->
    // Ruta para ver registros de una tabla
    app.get('/verRegistros/:tabla', (request, response) => {
        const { tabla } = request.params;
        db_ventasService.verRegistros(tabla)
            .then((result) => {
                response.json(result);
            })
            .catch((err) => {
                response.status(500).json(err);
            });
    });

    // Ruta para crear un nuevo registro en una tabla
    app.post('/crearRegistro/:tabla', (request, response) => {
        const { tabla } = request.params;
        const nuevoRegistro = request.body;
        db_ventasService.crearRegistro(tabla, nuevoRegistro)
            .then((result) => {
                response.json({
                    "mensaje": "Registro creado"
                });
            })
            .catch((err) => {
                response.status(500).json(err);
            });
    });

    // Ruta para modificar un registro en una tabla
    app.put('/modificarRegistro/:tabla/:id', (request, response) => {
        const { tabla, id } = request.params;
        const nuevosDatos = request.body;
        db_ventasService.modificarRegistro(tabla, id, nuevosDatos)
            .then((result) => {
                response.json({
                    "mensaje": `Registro en la tabla ${tabla} con ID ${id} modificado`
                });
            })
            .catch((err) => {
                response.status(500).json(err);
            });
    });

    // Ruta para eliminar un registro en una tabla
    app.delete('/eliminarRegistro/:tabla/:nombre', (request, response) => {
        const { tabla, nombre } = request.params;
        db_ventasService.eliminarRegistro(tabla, nombre)
            .then((result) => {
                response.json({
                    "mensaje": `Registro en la tabla ${tabla} con nombre ${nombre} eliminado`
                });
            })
            .catch((err) => {
                response.status(500).json(err);
            });
    });

    //Algunos reportes ------------------------->
    app.get('/generarInformeProveedores', (request, response) => {
        db_ventasService.generarInformeProveedores()
        .then((informe) => {
            // Respondemos con los datos del informe
            response.json(informe);
        })
        .catch((error) => {
            response.status(500).json(error);
        });
    });

};