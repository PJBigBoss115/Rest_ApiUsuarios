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

    const modificarUsuario = (id, nuevosDatos) => {
        return knex(myUser)
        .where('id', id) // Especifica el ID del artículo que deseas modificar
        .update(nuevosDatos) // Define los nuevos datos a actualizar
        .then((filasModificadas) => {
            console.log(`Se actualizaron ${filasModificadas} registros`);
        })
        .catch((error) => {
            console.error('Error al modificar el registro:', error);
        });
    };

    const eliminarUsuario = (nombre) => {
        return knex(myUser)
            .where('nombre', nombre)
            .del()
            .then((filasEliminadas) => {
                console.log(`Se eliminaron ${filasEliminadas} registros de la tabla de usuarios`);
            })
            .catch((error) => {
                console.error('Error al eliminar el registro de la tabla de usuarios:', error);
            });
    };

    return{
        crearUsuario,
        verUsuarios,
        modificarUsuario,
        eliminarUsuario
    };
};

module.exports = {
    databaseService
};