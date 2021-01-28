const nodemailer = require("nodemailer");
const daoCitas = require("../dao/daoCitas")

const correo = {}

correo.enviar = function enviar(email, template, nombre,  id, fecha) {

    let saludo, asunto = "";
    let contentHTML="";
    let confirmaURL="";

    if (template == "confirmacion") {
        saludo = `<h1 style="color:#ffc001">Prepárate, ${nombre}! Aquí tienes tu cita:</h1>`;
        contentHTML = `<p>El día <b>${fecha}</b> te esperamos en el Sau-Nation!</p><p> Si deseas modificar o cancelar tu cita, puedes hacerlo con el código <b>${id}</b> en nuestra sección de Reservas.</p><hr>`;
        confirmaURL = `<p>Si deseas confirmar tu cita <a href="http://localhost:5000/reservas/confirmar/${id}">pulsa aquí</a>`
        asunto="PAMPA - Confirma tu cita"
    }

    if (template == "recuperar_reservas") {
        let citasRecuperadas = daoCitas.buscarEmail(email);
        citasRecuperadas.map((cita) => {
            if (citasRecuperadas.length > 0) {
                saludo = `<h1 style="color:#ffc001">Hola, ${cita.nombre}! Aquí tienes todas tus citas:</h1>`;
                if(daoCitas.fecha24(cita.id)==false){
                    contentHTML +=
                    `<span style="color:#D60000">Cita Pasada<hr><p><b>Día reservado:</b> ${cita.fecha}</p><p><b>Código de cita:</b> ${cita.id}</p><hr></span>`
                }else{
                    contentHTML +=
                    `<hr><p><b>Día reservado:</b> ${cita.fecha}</p><p><b>Código de cita:</b> ${cita.id}</p><hr>`
                }         
            }
        })
        asunto="PAMPA - Tus reservas"
    }
    // Definimos el transporter
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'proyectoyana@gmail.com',
            pass: 'Fullstack#01',
        }
    });

    // verify connection configuration
    transporter.verify(function (error) {
        if (error) {
            console.log(error);
        } else {
            console.log("Server is ready to take our messages");
        }
    });

    // Definimos el email
    var mailOptions = {
        from: 'proyectoyana@gmail.com',
        to: email,
        subject: asunto,
        html: saludo + contentHTML + confirmaURL+ `<h4>Esperamos verte pronto</h4>`
    };

    // Enviamos el email
    transporter.sendMail(mailOptions, function (error) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email mandao");
        }
    });
}

module.exports = correo
