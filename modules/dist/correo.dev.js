"use strict";

var nodemailer = require("nodemailer");

var daoCitas = require("../dao/daoCitas");

var correo = {};

correo.enviar = function enviar(email, template, nombre, id, fecha) {
  var saludo,
      asunto = "";
  var contentHTML = "";
  var confirmaURL = "";

  if (template == "confirmacion") {
    saludo = "<h1 style=\"color:#ffc001\">Prep\xE1rate, ".concat(nombre, "! Aqu\xED tienes tu cita:</h1>");
    contentHTML = "<p>El d\xEDa <b>".concat(fecha, "</b> te esperamos en el Sau-Nation!</p><p> Si deseas modificar o cancelar tu cita, puedes hacerlo con el c\xF3digo <b>").concat(id, "</b> en nuestra secci\xF3n de Reservas.</p><hr>");
    confirmaURL = "<p>Si deseas confirmar tu cita <a href=\"http://localhost:5000/reservas/confirmar/".concat(id, "\">pulsa aqu\xED</a>");
    asunto = "PAMPA - Confirma tu cita";
  }

  if (template == "recuperar_reservas") {
    var citasRecuperadas = daoCitas.buscarEmail(email);
    citasRecuperadas.map(function (cita) {
      if (citasRecuperadas.length > 0) {
        saludo = "<h1 style=\"color:#ffc001\">Hola, ".concat(cita.nombre, "! Aqu\xED tienes todas tus citas:</h1>");

        if (daoCitas.fecha24(cita.id) == false) {
          contentHTML += "<span style=\"color:#D60000\">Cita Pasada<hr><p><b>D\xEDa reservado:</b> ".concat(cita.fecha, "</p><p><b>C\xF3digo de cita:</b> ").concat(cita.id, "</p><hr></span>");
        } else {
          contentHTML += "<hr><p><b>D\xEDa reservado:</b> ".concat(cita.fecha, "</p><p><b>C\xF3digo de cita:</b> ").concat(cita.id, "</p><hr>");
        }
      }
    });
    asunto = "PAMPA - Tus reservas";
  } // Definimos el transporter


  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'proyectoyana@gmail.com',
      pass: 'Fullstack#01'
    }
  }); // verify connection configuration

  transporter.verify(function (error) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  }); // Definimos el email

  var mailOptions = {
    from: 'proyectoyana@gmail.com',
    to: email,
    subject: asunto,
    html: saludo + contentHTML + confirmaURL + "<h4>Esperamos verte pronto</h4>"
  }; // Enviamos el email

  transporter.sendMail(mailOptions, function (error) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email mandao");
    }
  });
};

module.exports = correo;