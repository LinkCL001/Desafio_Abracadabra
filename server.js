const express = require('express');
const app = express();

app.listen(3000, () => {
    console.log(`Server On Puerto 3000`);
})

const usuarios = ['Juan','Jocelyn','Astrid','Maria','Ignacia','Javier','Brian']
app.use(express.static('assets'))

app.get('/abracadabra/usuarios', (req, res) => {
    res.send({usuarios})
})

app.use('/abracadabra/juego/:usuario', (req, res, next) => {
    const nombreUsuario = req.params.usuario
    usuarios.find(e => e === nombreUsuario) ? next() : res.redirect('/who.jpeg')
})

app.get('/abracadabra/juego/:usuario', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.get('/abracadabra/conejo/:n', (req, res) => {
    const random = Math.floor(Math.random() * (5 - 1)) + 1
    console.log('El número es:' + `${random}`)
    const numero = parseInt(req.params.n)
    const imgName = random == numero ? "conejito.jpg" : "voldemort.jpg"
    res.sendFile(__dirname + "/assets/" + imgName)
})

app.get('*', (_, res) => {
    res.send('<center><h1>Sorry, no hay nada :/ </h1></center>')
})