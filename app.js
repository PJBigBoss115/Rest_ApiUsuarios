require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const {databaseService} = require('./services/databaseService');
const {db_ventasService} = require('./services/db_ventasService');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());

// Configurar CORS para permitir solicitudes desde http://localhost:4200
app.use(cors({
    origin: 'http://localhost:4200', // Reemplaza esto con el dominio de tu aplicación cliente
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

require('./routes')(app, databaseService(), db_ventasService());

app.listen(3000, function() {
    console.log('Servidor en ejecución en el puerto 3000');
});