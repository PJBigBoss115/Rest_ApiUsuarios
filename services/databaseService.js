const databaseService = () => {
    const knex = require('knex') ({
        client: 'mysql2',
        connection: {
            host : process.env.DB_Host,
            port : 3306,
            user : process.env.DB_User,
            password : process.env.DB_Pass,
            database : process.env.DB,
        }
    });

    const myUser = 'usuarios'; 

    const verUsuarios = () => {
        return knex(myUser).select();
    };

    const crearUsuario = ({nombre, apellido, correo, clave, tipo_Usuario}) => {
        return knex(myUser).insert({
            nombre: nombre,
            apellido: apellido,
            correo: correo,
            clave: clave,
            tipo_Usuario: tipo_Usuario
        });
    };

    return{
        crearUsuario,
        verUsuarios
    };
};

module.exports = {
    databaseService
};