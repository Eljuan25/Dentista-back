

//Es un ejemplo sera cambiado sólo es para crear el servidor

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Endpoints
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
