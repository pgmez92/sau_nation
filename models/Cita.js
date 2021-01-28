module.exports = class Cita {

    //constructor
    constructor(cita) {
        this.nombre = cita.nombre;
        this.telefono = cita.telefono;
        this.email = cita.email;
        this.fecha = cita.fecha;
        this.id = this.generarID();
    }

    //getter y setter
    getNombre() {
        return this.nombre;
    }
    setNombre(nombre) {
        this.nombre = nombre;
    }

    getTelefono() {
        return this.telefono;
    }
    setTelefono(telefono) {
        this.telefono = telefono;
    }

    getEmail() {
        return this.email;
    }
    setEmail(email) {
        this.email = email;
    }

    getFecha() {
        return this.fecha;
    }
    setFecha(fecha) {
        this.fecha = fecha;
    }

    //métodos privados
    generarID() {
        var caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ0123456789";
        var password = "";
        for (let i = 0; i < 4; i++) password += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        return password;
    }

    validar(){
        let error={};

        if (this.nombre === "" || this.nombre.match(/[0-9]/) != null) {
            error.nombre = "El nombre introducido no es válido, no puede contener números."
        }   
        if (this.telefono === "" || this.telefono.length < 9) {
            error.telefono = "El número introducido no es válido, debe contener 9 o más dígitos."
        }
        if (this.email === "" || this.email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/) == null) {
            error.email = "El email introducido no es válido, asegúrate que tenga el punto del dominio."
        }
        if (this.fecha == "") {
            error.fecha = "Elige una fecha."
        }
        return error;
    }
}