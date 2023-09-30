module.exports = function(app, databaseService){
    app.get('/', (request, response) => {
        response.json({
            "mensaje": "Todo bien"
        });
    });

    app.get('/usuarios', (request, response) => {
        response.json({
            "mensaje": "Mis usuarios"
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