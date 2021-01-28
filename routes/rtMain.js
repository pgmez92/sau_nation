const express = require('express');
const rtMain = express.Router();
const fs = require('fs');
const Cita = require("../models/Cita")

//rtMain
rtMain.get('/', function (req, res) {
    res.render('inicio');
});


//UNDER COHTRUCION
rtMain.get('/instalaciones', (req,res)=>{
    res.render('instalaciones');
})

rtMain.get('/blog', (req,res)=>{
    res.render('blog');
})

rtMain.get('/contacto', (req,res)=>{
    res.render('contacto');
})

module.exports = rtMain;