// Requires  importacion de librerias de terceros
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//Inicializar variables
var app = express();

//Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Importar rutas

var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');

//Rutas
app.use('/',appRoutes);
app.use('/usuario',usuarioRoutes);
app.use('/login',loginRoutes);


var config = require('./config/config');

//Conexion a la base de datos
mongoose.connection.openUri(config.db, (err, res) => {
    if (err) throw err;

    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');
});



//Escuchar peticiones
app.listen(config.port, () => {
    console.log('Express server puerto ${config.port} : \x1b[32m%s\x1b[0m', 'online');
});