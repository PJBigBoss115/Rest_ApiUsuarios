const db_ventasService = () => {
    const knex = require('knex') ({
        client: 'mssql',
        connection: {
            server : process.env.BD_Server,
            user : process.env.BD_User,
            password : process.env.BD_Pass,
            database : process.env.BD,
        }
    });

    const articulos = 'dbo.Articulo';

    const verArticulos = () => {
        return knex(articulos).select();
    };

    const modificarArticulo = (id, nuevosDatos) => {
        return knex(articulos)
        .where('id', id) // Especifica el ID del artículo que deseas modificar
        .update(nuevosDatos) // Define los nuevos datos a actualizar
        .then((filasModificadas) => {
            console.log(`Se actualizaron ${filasModificadas} registros`);
        })
        .catch((error) => {
            console.error('Error al modificar el registro:', error);
        });
    };

    const eliminarArticulo = (nombre) => {
        return knex(articulos)
        .where('nombre', nombre) // Especifica el nombre del artículo que deseas eliminar
        .del()
        .then((filasEliminadas) => {
            console.log(`Se eliminaron ${filasEliminadas} registros`);
        })
        .catch((error) => {
            console.error('Error al eliminar el registro:', error);
        });
    };

    return{
        verArticulos,
        modificarArticulo,
        eliminarArticulo
    };
};

module.exports = {
    db_ventasService
};