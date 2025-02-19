const msql = require ('mysql');
const conex = msql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sistema_clinica"
});


//Agregue esto nada más para ver si la base de datos está conectada 


conex.connect(function(error) {
    if (error) {
        console.log("Error al conectar a la base de datos:", error);
    } else {
        console.log("Conexión exitosa con la base de datos.");
    }
});



module.exports = conex;


