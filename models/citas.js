const conex = require("./conexion.js");

module.exports = {
    //Para ver la cita selecionada 
    get_cita: function (callback) {
        const query = `
            SELECT citas.id, citas.Dia, citas.Estado, cliente.nombre, cliente.telefono
            FROM citas
            INNER JOIN cliente ON citas.Id_cliente = cliente.id
        `;
    
        conex.query(query, function (error, res) {
            if (error) {
                console.log(" Error en la consulta:", error);
                return callback(error, null);
            }
            console.log(" Citas encontradas:", res); 
            callback(null, res);
        });
    },
    
    get_cita_by_id: function (id, callback) {
        const query = `
            SELECT citas.id, citas.Dia, citas.Estado, cliente.nombre, cliente.telefono
            FROM citas
            INNER JOIN cliente ON citas.Id_cliente = cliente.id
            WHERE citas.id = ?
        `;
    
        conex.query(query, [id], function (error, res) {
            if (error) {
                console.log(" Error en la consulta:", error);
                return callback(error, null);
            }
            if (res.length === 0) {
                return callback(null, null); // No se encontró la cita
            }
            console.log(" Cita encontrada:", res[0]);
            callback(null, res[0]);
        });
    }
    ,
        
    //Para que puedas publicar la cita.
    post_cita: function (citaData, callback) {
        const { Id_cliente, Dia, Estado } = citaData;
        const query = "INSERT INTO citas (Id_cliente, Dia, Estado) VALUES (?, ?, ?)";

        conex.query(query, [Id_cliente, Dia, Estado], function (error, result) {
            if (error) {
                console.log("Error al agregar la cita:", error);
                return callback(error, null);
            }
            console.log("Cita agregada correctamente:", result);
            callback(null, { id: result.insertId, ...citaData });
        });
    },
    //Para poder eliminar la cita 

    delete_cita: function (id, callback) {
        const query = "DELETE FROM citas WHERE id = ?";
        conex.query(query, [id], function (error, result) {
            if (error) {
                console.log("Error al eliminar la cita:", error);
                return callback(error, null);
            }
            if (result.affectedRows === 0) {
                return callback(null, { message: "No se encontró la cita para eliminar." });
            }
            console.log("Cita eliminada correctamente:", id);
            callback(null, { message: "Cita eliminada correctamente.", id });
        });
    },
    //Agrege el campo de put por si se necesita en algun momento, por si acaso en un momento se necesita 

    put_cita: function (id, citaData, callback) {
        const { Id_cliente, Dia, Estado } = citaData;
        const query = "UPDATE citas SET Id_cliente = ?, Dia = ?, Estado = ? WHERE id = ?";

        conex.query(query, [Id_cliente, Dia, Estado, id], function (error, result) {
            if (error) {
                console.log("Error al actualizar la cita:", error);
                return callback(error, null);
            }
            if (result.affectedRows === 0) {
                return callback(null, { message: "No se encontró la cita con ese ID" });
            }
            console.log("Cita actualizada correctamente");
            callback(null, { message: "Cita actualizada correctamente" });
        });
    }
};








//Traime las fechas con este año y con esté mes. 

//POST,DELETE,SELECT;

