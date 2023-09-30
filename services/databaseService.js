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

    const table_01 = 'usuarios'; 

    const crearUsuario = ({nombre, apellido, correo, clave, tipo_Usuario}) => {
        return knex(table_01).insert({
            nombre: nombre,
            apellido: apellido,
            correo: correo,
            clave: clave,
            tipo_Usuario: tipo_Usuario
        });
    };

    return{
        crearUsuario
    };
};

module.exports = {
    databaseService
};