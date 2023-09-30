module.exports = function(app, databaseService){
    app.get('/', (request, response) => {
        response.json({
            "mensaje": "Salio bien :D"
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