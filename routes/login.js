var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');



var app = express();

var Usuario = require('../models/usuario');

var mdAutenticacion = require('../middlewares/autenticacion');

// ==============================
// Renovacion de TOKEN
// ==============================
app.get('/renuevatoken', mdAutenticacion.verificaToken, ( req, res )=>{
    var token = jwt.sign({usuario:req.usuario}, config.SEED,{ expiresIn: 14400 }); //4horas
    res.status(200).json({    
        ok: true,    
        token: token    
    });   
});

// ==============================
// Login de usuario
// ==============================
app.post('/', (req, res)=>{
    var body = req.body;

    Usuario.findOne({ usuario: body.usuario}, (err,usuarioDB)=> {
        if (err) {
            return res.status(500).json({    
                ok: false,    
                mensaje: 'Error al buscar usuarios',    
                errors: err    
            });    
            
        }   
        if (!usuarioDB){
            return res.status(400).json({    
                ok: false,    
                mensaje: 'Credenciales incorrectas - usuario ' ,  
                errors: err    
            });  
        }

        if( !bcrypt.compareSync( body.password, usuarioDB.password )){
            return res.status(400).json({    
                ok: false,    
                mensaje: 'Credenciales incorrectas - password ' ,  
                errors: err    
            });  

        }

        //Crear un token
        var config = require('../config/config');
        var token = jwt.sign({usuario:usuarioDB}, config.SEED,{ expiresIn: 14400 }); //4horas
        usuarioDB.password = ':)';
        res.status(200).json({
            ok: true,
            usuario: usuarioDB,
            token: token,
            id: usuarioDB._id
        });

    });
 

});
// ==============================
// Login de usuario  --anterior con email
// ==============================
/*app.post('/', (req, res)=>{
    var body = req.body;

    Usuario.findOne({ email: body.email}, (err,usuarioDB)=> {
        if (err) {
            return res.status(500).json({    
                ok: false,    
                mensaje: 'Error al buscar usuarios',    
                errors: err    
            });    
            
        }   
        if (!usuarioDB){
            return res.status(400).json({    
                ok: false,    
                mensaje: 'Credenciales incorrectas - mail ' ,  
                errors: err    
            });  
        }

        if( !bcrypt.compareSync( body.password, usuarioDB.password )){
            return res.status(400).json({    
                ok: false,    
                mensaje: 'Credenciales incorrectas - password ' ,  
                errors: err    
            });  

        }

        //Crear un token
        var config = require('../config/config');
        var token = jwt.sign({usuario:usuarioDB}, config.SEED,{ expiresIn: 14400 }); //4horas
        usuarioDB.password = ':)';
        res.status(200).json({
            ok: true,
            usuario: usuarioDB,
            token: token,
            id: usuarioDB._id
        });

    });
 

});
*/

module.exports = app;