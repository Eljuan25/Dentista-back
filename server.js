

//Es un ejemplo sera cambiado sólo es para crear el servidor
{/* 
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Endpoints
// Endpoint para obtener citas (GET)
app.get("/api/appointments", (req, res) => {
    res.json([
        { id: 1, patient: "Juan Pérez", date: "2025-01-30", time: "10:00 AM" },
        { id: 2, patient: "Ana Gómez", date: "2025-01-30", time: "11:00 AM" }
    ]);
});


app.post("/api/appointments", (req, res) => {
    const newAppointment = req.body;
    console.log("Nueva cita:", newAppointment);
    res.status(201).json({ message: "Cita creada exitosamente", data: newAppointment });
});

// Levantar el servidor
app.listen(PORT, () => {
    console.log(`Servidor API corriendo en http://localhost:${PORT}`);
});


*/}

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

// Para guardar los días seleccionados.
let diasSeleccionados = {};

// Obtener un día seleccionado en un mes y año específico.
app.get('/dias', (req, res) => {
    const { year, month } = req.query;

    // Validar que los parámetros sean números
    if (!year || !month || isNaN(year) || isNaN(month)) {
        return res.status(400).json({ message: 'Se requiere year y month en formato numérico' });
    }

    const clave = `${year}-${month}`;
    res.json({ dias: diasSeleccionados[clave] || [] });
});

// Agregar un día seleccionado.
app.post('/dias', (req, res) => {
    const { year, month, day } = req.body;

    // Validar que todos los valores estén presentes y sean números
    if (!year || !month || !day || isNaN(year) || isNaN(month) || isNaN(day)) {
        return res.status(400).json({ message: 'Se requieren year, month y day en formato numérico' });
    }

    const clave = `${year}-${month}`;

    // Si no existe, lo inicializamos
    if (!diasSeleccionados[clave]) {
        diasSeleccionados[clave] = [];
    }

    // Agregar solo si no está repetido
    if (!diasSeleccionados[clave].includes(day)) {
        diasSeleccionados[clave].push(day);
    }

    res.json({ message: 'Día agregado', dias: diasSeleccionados[clave] });
});

// Eliminar un día seleccionado.
app.delete('/dias', (req, res) => {
    const { year, month, day } = req.body;

    // Validar que todos los valores estén presentes y sean números
    if (!year || !month || !day || isNaN(year) || isNaN(month) || isNaN(day)) {
        return res.status(400).json({ message: 'Se requieren year, month y day en formato numérico' });
    }

    const clave = `${year}-${month}`;

    if (diasSeleccionados[clave]) {
        diasSeleccionados[clave] = diasSeleccionados[clave].filter(d => d !== day);

        // Si después de eliminar el día, no quedan más en ese mes, eliminar la clave
        if (diasSeleccionados[clave].length === 0) {
            delete diasSeleccionados[clave];
        }
    }

    res.json({ message: 'Día eliminado', dias: diasSeleccionados[clave] || [] });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
