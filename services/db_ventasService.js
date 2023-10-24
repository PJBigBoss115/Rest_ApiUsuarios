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
            .where('Id_'+tabla, id)
            .del()
            .then((filasEliminadas) => {
                console.log(`Se eliminaron ${filasEliminadas} registros de la tabla ${tabla}`);
            })
            .catch((error) => {
                console.error(`Error al eliminar el registro de la tabla ${tabla}:`, error);
            });
    };

    const buscarRegistro = (tabla, condicion) => {
        return knex(tabla)
            .where(condicion)
            .select()
            .then((resultados) => {
                console.log(`Se encontraron ${resultados.length} registros en la tabla ${tabla}`);
                return resultados.length > 0; // Devolver true si se encontraron resultados, false si no
            })
            .catch((error) => {
                console.error(`Error al buscar registros en la tabla ${tabla}:`, error);
                throw error;
            });
    };      

    const modificarProveedor = (tabla, id, nuevosDatos) => {
        return knex(tabla)
            .where('Id_Proveedor', id)
            .update(nuevosDatos)
            .then((filasModificadas) => {
                console.log(`Se actualizaron ${filasModificadas} registros en la tabla ${tabla}`);
            })
            .catch((error) => {
                console.error(`Error al modificar el registro en la tabla ${tabla}:`, error);
            });
    };
    
    const eliminarProveedor = (tabla, id) => {
        return knex(tabla)
            .where('Id_Proveedor', id)
            .del()
            .then((filasEliminadas) => {
                console.log(`Se eliminaron ${filasEliminadas} registros de la tabla ${tabla}`);
            })
            .catch((error) => {
                console.error(`Error al eliminar el registro de la tabla ${tabla}:`, error);
            });
    };


    const generarInformeProveedores = () => {
        return knex('Prov_Art')
        .select('Articulo.Nombre as NombreArticulo', 'Articulo.Descripcion', 'Proveedores.Nombre as NombreProveedor', 'Proveedores.Telefono', 'Prov_Art.Precio')
        .innerJoin('Articulo', 'Prov_Art.Id_Art', 'Articulo.Id_Articulo')
        .innerJoin('Proveedores', 'Prov_Art.Id_Prov', 'Proveedores.Id_Proveedor')
        .then((result) => {
            // Genera el informe con los datos obtenidos (result) según tus necesidades
            // Puedes utilizar bibliotecas de generación de informes o simplemente devolver los datos como JSON
            return result; // Devolvemos los datos
        })
        .catch((error) => {
            throw error;
        });
    };

    return{
        verRegistros,
        crearRegistro,
        modificarRegistro,
        eliminarRegistro,
        generarInformeProveedores
    };
};

module.exports = {
    db_ventasService
};