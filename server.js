const express = require('express');
const { get_cita,post_cita,  delete_cita, get_cita_by_id, put_cita } = require('./models/citas.js');
const app = express();
const cors = require('cors');
const PORT = 5000;

app.use(express.json());
app.use(cors());


//Para checar los días 


app.get('/dias/:year/:month', (req, res) => {
    const { year, month } = req.params;

    if (!year || !month || isNaN(year) || isNaN(month)) {
        return res.status(400).json({ message: 'Se requiere year y month en formato numérico' });
    }

    get_cita((error, citas) => {
        if (error) {
            return res.status(500).json({ message: 'Error al obtener las citas' });
        }

        const citasFiltradas = citas.filter(cita => {
            const citaDate = new Date(cita.Dia);
            return citaDate.getFullYear() === parseInt(year) && citaDate.getMonth() + 1 === parseInt(month);
        });

        // Enviar solo una respuesta con las citas filtradas
        res.json({ dias: citasFiltradas });
    });
});


app.post('/cita', (req, res) => {
    // Verifica si los datos llegan correctamente
    console.log('Datos recibidos:', req.body);  

    const { Id_cliente, Dia, Estado } = req.body;

    if (!Id_cliente || !Dia || Estado === undefined) {
        return res.status(400).json({ message: 'Id_cliente, Dia y Estado son obligatorios' });
    }

    post_cita({ Id_cliente, Dia, Estado }, (error, cita) => {
        if (error) {
            return res.status(500).json({ message: 'Error al agregar la cita' });
        }
        res.json({ message: 'Cita agregada correctamente', cita });
    });
});

//Elimina una cita selecionada.

app.delete('/cita/:id', (req, res) => {
    const { id } = req.params;
    delete_cita(id, (error, result) => {
        if (error) return res.status(500).json({ message: "Error al eliminar la cita" });
        res.json(result);
    });
});

//Ve la cita si está selecionada.

app.get('/cita/:id', (req, res) => {
    const { id } = req.params;
    get_cita_by_id(id, (error, cita) => {
        if (error) return res.status(500).json({ message: "Error al obtener la cita" });
        if (!cita) return res.status(404).json({ message: "Cita no encontrada" });
        res.json(cita);
    });
});

//Actualiza por si el bato no puede ese día...

app.put('/citas/:id', (req, res) => {
    const { id } = req.params;
    const citaData = req.body;

    if (!citaData.Id_cliente || !citaData.Dia || citaData.Estado === undefined) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    put_cita(id, citaData, (error, result) => {
        if (error) {
            return res.status(500).json({ message: "Error al actualizar la cita" });
        }
        if (result.message === "No se encontró la cita con ese ID") {
            return res.status(404).json(result);
        }
        res.json(result);
    });
});


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});
