const express = require('express');
const bodyParser = require('body-parser');
const request = require("request-promise");
const domino = express();

domino.use(bodyParser.urlencoded({ extended: false }));
domino.use(bodyParser.json());

//Arreglo de las ip y puertos de las otras maquinas del proyecto
var remotos = ["localhost:3003"] //"algo:3002"] "192.168.43.217:3001","192.168.43.9:3002",
var nombreUsuario = ' '
var juego= [] //Variable que contiene el arreglo de json de las partidas

// {
//   jugadores: [],
//   jugadas:[], 
//   nombrePartida: ,
//   fichaJ1: [],
//   fichaJ2:[],     
//}

//Si viene un solo dato es req.body, si viene mas de uno lo llamo por como la mande (es decir si viene un json) let partida = req.body.nombrePartida

domino.listen(3003, () => {
     console.log('Im on the port 3003, baby')
})

domino.post('/registroUsuario',(req,res)=>{
     nombreUsuario = req.body
     var message = {
          message: "Usuario registrado con exitoso"
     }
     res.send(message)
})

domino.get('/obtenerUsuario', (req,res) =>{
     res.send(nombreUsuario)
})

domino.post('/nuevoJuego', (req,res)=>{
     juego.push(req.body)
     res.send(juego)
})

domino.get('/juego', (req,res) =>{
     res.send(juego)
})

domino.post('/crearPartida', async (req,res)=>{
     let nuevaPartida = req.body;

     for (var i =0; i <= juego.length; i++ ){
          console.log(remotos[i])
          let peticion = {
               method: "POST",
               uri: "http://" + remotos[i]+ "/nuevoJuego",
               resolveWithFullResponse: true,
               json: true,
               body: nuevaPartida
          }

          await request(peticion).then(() => {
               console.log('Juego actualizado')

          }).catch((err)=> {
               console.log('error::: ' + err)
          })
     }
     res.send(juego)
})