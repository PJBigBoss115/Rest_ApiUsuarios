require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const {databaseService} = require('./services/databaseService');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());

// Configurar CORS para permitir solicitudes desde http://localhost:4200
app.use(cors({
    origin: 'http://localhost:4200', // Reemplaza esto con el dominio de tu aplicación cliente
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

require('./routes')(app, databaseService());

app.listen(3000, function() {
    console.log('Servidor en ejecución en el puerto 3000');
});