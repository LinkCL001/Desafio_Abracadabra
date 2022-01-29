const express = require('express');
const app = express();

app.listen(3000, () => {// 1. Crear un servidor con Express en el puerto 3000.
    console.log(`Server On Puerto 3000`);
})

const usuarios = ['Juan','Jocelyn','Astrid','Maria','Ignacia','Javier','Brian'] 
app.use(express.static('assets'))// 2. Definir la carpeta “assets” como carpeta pública delservidor.

app.get('/abracadabra/usuarios', (req, res) => {// 3. Crear en el servidor un arreglo denombresydevolverloenformatoJSONatravésde la ruta/abracadabra/usuarios.
    res.send({usuarios})
})

app.use('/abracadabra/juego/:usuario', (req, res, next) => { // 4. Crear un middleware con la ruta /abracadabra/juego/:usuario para validar que elusuariorecibidocomoparámetro“usuario”existeenelarreglodenombrescreadoenel servidor.
    const nombreUsuario = req.params.usuario
    usuarios.find(e => e === nombreUsuario) ? next() : res.redirect('/who.jpeg')// En caso deserexitoso,permitirelpasoalarutaGET correspondiente,delocontrariodevolver la imagen “who.jpeg”.
})

app.get('/abracadabra/juego/:usuario', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.get('/abracadabra/conejo/:n', (req, res) => {// 5. Crear una ruta /abracadabra/conejo/:n que valide si el parámetro “n” coincideconelnúmero generado de forma aleatoria.
    const random = Math.floor(Math.random() * (5 - 1)) + 1
    console.log('El número es:' + `${random}`)
    const numero = parseInt(req.params.n)
    const imgName = random == numero ? "conejito.jpg" : "voldemort.jpg" // En caso de ser exitoso, devolver la imagen del conejo, de lo contrario devolver laimagen de Voldemort.
    res.sendFile(__dirname + "/assets/" + imgName)
})

app.get('*', (_, res) => {
    res.send('<center><h1>Sorry, Esta página no existe... </h1></center>') // 6. Crear una ruta genérica que devuelva un mensaje diciendo “Esta página noexiste...”// al consultar una ruta que no esté definida en el servidor.
})










