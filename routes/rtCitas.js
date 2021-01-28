const express = require("express");
const rtCitas = express.Router();
const daoCitas = require("../dao/daoCitas")
const Cita = require("../models/Cita")
const correo = require("../modules/correo")

rtCitas.get("/", (req, res) => {
    res.render("reservas")
})

//crear nueva
rtCitas.get("/nueva", (req, res) => {
    res.render("nueva");
})

//busca por ID y renderiza modificar con la cita encontrada
rtCitas.post("/modificar/:id", (req, res) => {
    let id = req.params.id
    let citaBuscada = daoCitas.buscarID(id)
    if (citaBuscada == undefined) {
        res.render("reservas", { error: "No hay ninguna cita asociada a ese ID" })
    } else {
        let fecha24 = daoCitas.fecha24(id)
        if (fecha24 == false) {
            res.render("reservas", { error: "No puedes modificar tu cita con menos de 24. Sorry ;_;" })
        } else {
            res.render("modificar", { id, cita: citaBuscada })
        }
    }
})

//buscar por Email y mandar las citas encontradas
rtCitas.post("/recuperar", (req, res) => {
    let emailBusqueda = req.body.email;
    let citasRecuperadas = daoCitas.buscarEmail(emailBusqueda)
    if (citasRecuperadas == "") {
        res.render("reservas", { email: emailBusqueda, errorMail: "No hay citas asociadas a ese email" })
    } else {
        correo.enviar(emailBusqueda, "recuperar_reservas")
        res.render("reservas", { email: emailBusqueda, exito: "Te hemos enviado un correo con las reservas. Comprueba tu bandeja de entrada" })
    }
})

//modifica la cita
rtCitas.post("/cambiar", (req, res) => {
    let id = req.body.codigo;
    let fecha = req.body.fecha;
    let error = {
        fechaIgual: daoCitas.comprobarFecha(fecha)
    }
    if (error.fechaIgual == false) {
        daoCitas.modificar(id, fecha);
        res.render("inicio", { exito: "Su cita ha sido modificada con éxito" });
    } else {
        if (fecha == "") {
            error.fechaIgual = "";
            error.fecha = "Introduce una fecha";
            res.render("modificar", { error, fecha })
        } else {
            error.fechaIgual = "Esta fecha ya está cogida.";
            res.render("modificar", { error, fecha });
        }
    }
})

//eliminar la cita
rtCitas.post("/borrar", (req, res) => {
    let id = req.body.codigo;
    daoCitas.borrar(id)
    res.render("inicio", { exito: "Su cita ha sido borrada con éxito" })
})

//guardar la cita
rtCitas.post("/guardar", (req, res) => {
    let nuevaCita = new Cita(req.body);
    let error = nuevaCita.validar()
    error.fechaIgual = daoCitas.comprobarFecha(nuevaCita.fecha)
    if (Object.keys(error).length == 1 && error.fechaIgual == false) {
        daoCitas.guardar(nuevaCita)
            .then((cita) => {
                res.render("inicio", { exito: "Comprueba tu correo!" })
            })
            correo.enviar(nuevaCita.email, "confirmacion", nuevaCita.nombre, nuevaCita.id, nuevaCita.fecha)
    } else {
        error.fechaIgual = "Esta fecha ya está cogida."
        res.render("nueva", { error: error, cita: nuevaCita })
    }
})

//confirmacion
rtCitas.get("/confirmar/:id", (req, res) => {
    let id = req.params.id;
    let citaConfirmada = daoCitas.buscarID(id);
    /* daoCitas.guardar(citaConfirmada) */
    res.render("respuesta", { cita: citaConfirmada })
})

module.exports = rtCitas
