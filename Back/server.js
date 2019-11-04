const express = require('express');
const bodyParser = require('body-parser');
const request = require("request-promise");
const domino = express();

domino.use(bodyParser.urlencoded({ extended: false }));
domino.use(bodyParser.json());

//Arreglo de las ip y puertos de las otras maquinas del proyecto
var remotos = ["192.168.1.4:3001","192.168.1.8:3002","localhost:3003"] //"algo:3002"]

//Arreglo que de JSON que tendra todas las partidas con sus jugadores y jugadas
var juego = []

domino.get('/game', (req, res)=> {
     res.send(juego)
})

domino.post('/update', (req, res)=> {
     //Actualiza las partidas que ya han sido creadas
     juego = req.body
     res.send(juego)
})

domino.post('/updateGame', (req, res)=> {
     //Actualiza las partidas cuando se crea una nueva
     if(juego.length != 2){
          juego.push(req.body)
          res.send(juego)
     }
     else{
          var error = {
               'error': "No pueden haber mas de dos partidas creadas"
          }
          res.send(error)
     }
})

domino.post('/joinGame', async (req, res) => {

     let partida = req.body.nombrePartida
     let jugadorPartida = req.body.jugador

     for (let i = 0; i < 2; i++) {
          if (juego[i].nombrePartida == partida) {
               if(juego[i].jugadoresPartida.length == 1){
                    juego[i].jugadoresPartida.push(jugadorPartida)
                    juego[i].estatus = 'jugando'
                    juego[i].turno = jugadorPartida
                    i = 3
               }
               else{
                    var error = {
                         'error': "No pueden haber mas de dos jugadores por partida!!!"
                    }
                    res.send(error)
               }
          }
     }

     for (var i =0; i <= 2; i++ ){
          console.log(remotos[i])
          console.log(juego)
          let peticion = {
               method: "POST",
               uri: "http://" + remotos[i]+ "/update",
               resolveWithFullResponse: true,
               json: true,
               body: juego
          };

          await request(peticion).then(() => {

               console.log('Juego actualizado')

          }).catch((err)=> {

               console.log('error::: ' + err)
          })
     }
     res.send(juego)
})

domino.post('/gameInit', async (req, res) => {

     let nuevaPartida = req.body;

     //Validacion para saber la cantidad de partidas que hay, no pueden haber mas 2
     if(juego.length !=2){
          
          for (var i =0; i <= 2; i++ ){
               console.log(remotos[i])
               let peticion = {
                    method: "POST",
                    uri: "http://" + remotos[i]+ "/updateGame",
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
     }
     else{
          var error = {
               'error': "No pueden haber mas de dos partidas creadas"
          }
          res.send(error)
     }
})

domino.post('/itsMyTurn', async (req, res) => {
     var partidaNombre = req.body.nombrePartida
     var jugador = req.body.jugador
     var siguienteTurno = ''
     var ficha = req.body.ficha

     for (let i = 0; i < juego.length; i++) {
          if(juego[i].nombrePartida == partidaNombre){
               if(juego[i].turno == jugador){
                    for(let j=0; j< 2; j++){
                         if(juego[i].jugadoresPartida[j] == jugador){
                              if (j == 0){
                                   juego[i].turno = juego[i].jugadoresPartida[1]
                                   siguienteTurno = juego[i].jugadoresPartida[1]
                                   juego[i].ficha[0] = ficha
                              }
                              else{
                                   juego[i].turno = juego[i].jugadoresPartida[0]
                                   siguienteTurno = juego[i].jugadoresPartida[0]
                                   juego[i].ficha[1] = ficha
                              }
                         }
                    }
               }
          }
     }

     for (var i =0; i <= 2; i++ ){

          let peticion = {
               method: "POST",
               uri: "http://" + remotos[i]+ "/update",
               resolveWithFullResponse: true,
               json: true,
               body: juego
          }

          await request(peticion).then(() => {
               console.log('Juego actualizado')

          }).catch((err)=> {
               console.log('error::: ' + err)
          })
     }
     let siguiente ={
          "turno":siguienteTurno
     }
     res.send(siguiente)
})

domino.listen(3003, () => {
     console.log('Im on the port 3003, baby')
})