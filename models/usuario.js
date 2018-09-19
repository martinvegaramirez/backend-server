var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var rolesValidos = {
    values: ['ADMIN_ROLE','USER_ROLE','SPONSOR_ROLE'],
    message: '{VALUE} no es un rol permitido'

};

var usuarioSchema = new Schema ({

    nombre: { type: String, required: [true, 'El nombre es necesario']},
    email:  { type: String, unique: true, required: [true,'El correo es necesario']},
    password: { type: String, required: false},
    img: { type: String, required: false },
    role: { type: String, required: true, default: 'USER_ROLE', enum: rolesValidos },
    usuario:  { type: String,required: [true,'Usuario es requerido']},
    sponsor:  { type: String, required: [true,'El patrocinador es necesario']}
});

usuarioSchema.plugin(uniqueValidator, { message: ' {PATH} debe ser unico'});

module.exports = mongoose.model('Usuario',usuarioSchema);