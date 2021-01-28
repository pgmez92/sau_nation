const express = require('express');
const app= express();
const hbs  = require('express-handlebars');
const rtMain = require('./routes/rtMain.js');
const rtCitas = require('./routes/rtCitas.js');
const port = 5000;
const fs= require('fs');

//configuración del motor de plantillas handlebars
app.engine('.hbs', hbs({
    extname: '.hbs'
}))
app.set('view engine', '.hbs');

//middlewares
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//rutas
app.use('/', rtMain);
app.use('/reservas', rtCitas);

//run server
app.listen(port, (err)=>{
    console.log(`Server run on port ${port}`);
})