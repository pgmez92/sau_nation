const Cita = require("../models/Cita");
const fs = require("fs")

const daoCitas = {};

let listadoCitas = JSON.parse(fs.readFileSync("./dao/citas.json"));

//guardar
daoCitas.guardar = function guardar(cita) {
    return new Promise((resolved, reject) => {
        listadoCitas.push(cita)
        fs.writeFile("./dao/citas.json", JSON.stringify(listadoCitas), (err) => {
            if (err) reject(err)
        })
        resolved(cita)
    })
};

//fecha24
daoCitas.fecha24 = function fecha24(id) {
    let hoy = new Date()
    const diaMs = 86400000;

    let diaReservado = daoCitas.buscarID(id).fecha
    diaReservado = new Date(diaReservado)

    let tiempoRestante = diaReservado - hoy

    if (tiempoRestante < diaMs) {
        return false
    } else {
        return true
    }
}

//comprobarFecha
daoCitas.comprobarFecha = function comprobarFecha(fecha) {
    if(fecha==""){
        return true;
    }
    if (!listadoCitas.find(reserva => reserva.fecha == fecha)) {
        return false;
    } else {
        return true;
    }
}

//buscar por ID
daoCitas.buscarID = function buscarID(id) {
    let citaBuscada = listadoCitas.find(cita => cita.id == id);
    return citaBuscada;
}

//modificar
daoCitas.modificar = function modificar(id, fechaNueva) {
    let citaModificada = daoCitas.buscarID(id);
    citaModificada.fecha = fechaNueva;
    listadoCitas.splice(listadoCitas.indexOf(citaModificada), 1, citaModificada)
    fs.writeFile("./dao/citas.json", JSON.stringify(listadoCitas), (err) => {
        if (err) reject(err)
    })
}

//borrar
daoCitas.borrar = function borrar(id) {
    listadoCitas.splice(listadoCitas.indexOf(listadoCitas.find(cita => cita.id == id)), 1)
    fs.writeFile("./dao/citas.json", JSON.stringify(listadoCitas), (err) => {
        if (err) reject(err)
    })
}

//buscar por Email
daoCitas.buscarEmail= function buscarEmail(email){
    let citasRecuperadas=listadoCitas.filter(cita=>cita.email==email);
    return citasRecuperadas
}
module.exports = daoCitas;