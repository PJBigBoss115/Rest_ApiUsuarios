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

    const verRegistros = (tabla) => {
        return knex(tabla).select()
        .then((result) => {
            return result; // Devuelve los registros de la tabla
        })
        .catch((error) => {
            throw error; // Lanza el error en caso de fallo
        });
    };

    const crearRegistro = (tabla, nuevosDatos) => {
        return knex(tabla)
            .insert(nuevosDatos)
            .then((ids) => {
                console.log(`Se creó el registro en la tabla ${tabla} con ID: ${ids[0]}`);
            })
            .catch((error) => {
                console.error(`Error al crear el registro en la tabla ${tabla}:`, error);
            });
    };
    
    const modificarRegistro = (tabla, id, nuevosDatos) => {
        return knex(tabla)
            .where('Id_'+tabla, id)
            .update(nuevosDatos)
            .then((filasModificadas) => {
                console.log(`Se actualizaron ${filasModificadas} registros en la tabla ${tabla}`);
            })
            .catch((error) => {
                console.error(`Error al modificar el registro en la tabla ${tabla}:`, error);
            });
    };
    
    const eliminarRegistro = (tabla, id) => {
        return knex(tabla)
            .where('id', id)
            .del()
            .then((filasEliminadas) => {
                console.log(`Se eliminaron ${filasEliminadas} registros de la tabla ${tabla}`);
            })
            .catch((error) => {
                console.error(`Error al eliminar el registro de la tabla ${tabla}:`, error);
            });
    };

    return{
        verRegistros,
        crearRegistro,
        modificarRegistro,
        eliminarRegistro
    };
};

module.exports = {
    db_ventasService
};