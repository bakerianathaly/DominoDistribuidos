const express = require('express');
const bodyParser = require('body-parser');
const request = require("request-promise");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var PIEZAS = {
     1: '0:0',
     2: '0:1',
     3: '0:2',
     4: '0:3',
     5: '0:4',
     6: '0:5',
     7: '0:6',
     8: '1:1',
     9: '1:2',
     10: '1:3',
     11: '1:4',
     12: '1:5',
     13: '1:6',
     14: '2:2',
     15: '2:3',
     16: '2:4',
     17: '2:5',
     18: '2:6',
     19: '3:3',
     20: '3:4',
     21: '3:5',
     22: '3:6',
     23: '4:4',
     24: '4:5',
     25: '4:6',
     26: '5:5',
     27: '5:6',
     28: '6:6',
};

var PIEZAS2 = {
     1: '0:0',
     2: '0:1',
     3: '0:2',
     4: '0:3',
     5: '0:4',
     6: '0:5',
     7: '0:6',
     8: '1:1',
     9: '1:2',
     10: '1:3',
     11: '1:4',
     12: '1:5',
     13: '1:6',
     14: '2:2',
     15: '2:3',
     16: '2:4',
     17: '2:5',
     18: '2:6',
     19: '3:3',
     20: '3:4',
     21: '3:5',
     22: '3:6',
     23: '4:4',
     24: '4:5',
     25: '4:6',
     26: '5:5',
     27: '5:6',
     28: '6:6',
};


var computadoras_conectadas = ['localhost:3000']

// var partida = [{
//      nombre: 'partida1',
//      cantidadJugadores: ['jugador1'],
//      estatus: 'esperando',
//      ganador: 'N/A',
//      fichasJugador1: [],
//      fichasJugador2: [],
//      HistorialDejugadas: ['jugador 1 ->  0:0', 'jugador 2 -> 0:1'],
//      turnoDeJugador: ''
// },
// {
//      nombre: 'partida2',
//      cantidadJugadores: ['jugador1'],
//      estatus: 'esperando',
//      ganador: 'N/A',
//      fichasJugador1: [],
//      fichasJugador2: [],
//      HistorialDejugadas: [],
//      turnoDeJugador: ''
// }]
const fs = require('fs');
var partida = [];

app.get('/Partidas', function (req, res) {
     console.log(partida)
     res.send(partida);
});

app.post('/Actualizar', function (req, res) {
     partida = req.body;
     fs.unlink('salvar.json', (err) => {
          if (err) {
               throw err;
          } else {
               console.log('Archivo Eliminado Satisfactoriamente');
               fs.appendFile('salvar.json', JSON.stringify(partida), (err) => {
                    if (err) throw err;
                    console.log('Archivo Creado Satisfactoriamente');
               });
          }
     });

     console.log('actualizado');
     res.send(partida);
});

app.post('/Jugada', async (req, res) => {
     var partidaNombre = req.body.partidaNombre;
     var jugador = req.body.jugador;
     var jugada = req.body.jugada;

     for (let index = 0; index < partida.length; index++) {
          console.log(partida[index].nombre.localeCompare(partidaNombre));
          if (partida[index].nombre == partidaNombre) {
               if (partida[index].turnoDeJugador == jugador) {
                    for (let index2 = 0; index2 < partida[index].fichasJugador1.length; index2++) {
                         if (partida[index].fichasJugador1[index2] == jugada) {
                              partida[index].fichasJugador1[index2] = ''
                              partida[index].HistorialDejugadas.push(jugador + ' --> ' + jugada);
                              partida[index].turno = partida[index].cantidadJugadores[1];
                              partida[index].turnoDeJugador = partida[index].cantidadJugadores[1];
                         } else if (partida[index].fichasJugador2[index2] == jugada) {
                              partida[index].fichasJugador2[index2] = ''
                              partida[index].HistorialDejugadas.push(jugador + ' --> ' + jugada)
                              partida[index].turno = partida[index].cantidadJugadores[0];
                              partida[index].turnoDeJugador = partida[index].cantidadJugadores[0];

                         } else if (jugada == 'g') { //esto es para lo de ganar (cuando se bloquee la vaina)
                              partida[index].ganador = partida[index].turnoDeJugador;
                              partida[index].estatus = 'finalizada';
                         }

                    }
               }

          }
     }



     for (let index = 0; index < computadoras_conectadas.length; index++) {
          let ip = computadoras_conectadas[index];


          let peticion = {
               method: "POST",
               uri: "http://" + ip + "/Actualizar",
               resolveWithFullResponse: true,
               json: true,
               body: partida
          };

          await request(peticion).then(() => {

               console.log('ACTUALIZE')

          }).catch(function (err) {

               console.log('error::: ' + err);
          })
     }

     res.send(partida);
});


app.post('/Unirse', async (req, res) => {

     var partidaNombre = req.body.partidaNombre;
     var jugador = req.body.jugador;
     console.log(jugador)
     console.log(partidaNombre)

     for (let index = 0; index < partida.length; index++) {

          console.log(partida[index].nombre.localeCompare(partidaNombre));
          if (partida[index].nombre == partidaNombre) {
               console.log('--------------------');
               partida[index].nombre = partidaNombre;
               partida[index].cantidadJugadores.push(jugador);
               partida[index].estatus = 'jugando';
               partida[index].turnoDeJugador = jugador;
               for (let i = 1; i < 14; i++) {
                    partida[index].fichasJugador1.push(PIEZAS[i]);
               }
               for (let j = 14; j < 28; j++) {
                    partida[index].fichasJugador2.push(PIEZAS2[j])
               }
          }
     }

     for (let index = 0; index < computadoras_conectadas.length; index++) {
          let ip = computadoras_conectadas[index];


          let peticion = {
               method: "POST",
               uri: "http://" + ip + "/Actualizar",
               resolveWithFullResponse: true,
               json: true,
               body: partida
          };

          await request(peticion).then(() => {

               console.log('ACTUALIZE')

          }).catch(function (err) {

               console.log('error::: ' + err);
          })
     }

     res.send(partida);
})

app.post('/CrearPartida', async (req, res) => {

     let peticion2 = req.body;
     console.log(peticion2)
     partida.push(peticion2);

     for (let index = 0; index < computadoras_conectadas.length; index++) {
          let ip = computadoras_conectadas[index];


          let peticion = {
               method: "POST",
               uri: "http://" + ip + "/Actualizar",
               resolveWithFullResponse: true,
               json: true,
               body: partida
          };

          await request(peticion).then(() => {

               console.log('ACTUALIZE')

          }).catch(function (err) {

               console.log('error::: ' + err);
          })
     }
     res.send(partida);
})

app.post('/turno', async (req, res) => {
     var partidaNombre = req.body.partidaNombre;
     var turno = '';
     for (let index = 0; index < partida.length; index++) {
          console.log(partida[index].nombre.localeCompare(partidaNombre));
          if (partida[index].nombre == partidaNombre) {
               console.log('-----------')
               partida[index].turnoDeJugador;
               res.send({ turno: partida[index].turnoDeJugador });
          }
     }

     // for (let index = 0; index < computadoras_conectadas.length; index++) {
     //      let ip = computadoras_conectadas[index];


     //      let peticion = {
     //           method: "POST",
     //           uri: "http://" + ip + "/Actualizar",
     //           resolveWithFullResponse: true,
     //           json: true,
     //           body: partida
     //      };

     //      await request(peticion).then(() => {

     //           console.log('ACTUALIZE')

     //      }).catch(function (err) {

     //           console.log('error::: ' + err);
     //      })
     // }


});
app.post('/fin', async (req, res) => {
     var partidaNombre = req.body.partidaNombre;
     var ganador = req.body.ganador;

     for (let index = 0; index < partida.length; index++) {

          if (partida[index].nombre == partidaNombre) {

               partida[index].ganador = ganador;
               partida[index].estatus = 'finaliazada';

          }
     }

     for (let index = 0; index < computadoras_conectadas.length; index++) {
          let ip = computadoras_conectadas[index];


          let peticion = {
               method: "POST",
               uri: "http://" + ip + "/Actualizar",
               resolveWithFullResponse: true,
               json: true,
               body: partida
          };

          await request(peticion).then(() => {

               console.log('ACTUALIZE')

          }).catch(function (err) {

               console.log('error::: ' + err);
          })
     }
     res.send(partida);
});


app.listen(process.env.PORT || 3000, async () => {

     for (let index = 0; index < computadoras_conectadas.length; index++) {
          let ip = computadoras_conectadas[index];


          let peticion = {
               method: "GET",
               uri: "http://" + ip + "/Partidas",
               resolveWithFullResponse: true,
               json: true
          };

          await request(peticion).then((response) => {

               console.log('ACTUALIZE: ' + JSON.stringify(response.body))
               partida = response.body;



          }).catch(function (err) {

               console.log('error::: ' + err);
          })
     }
     if (partida.length != 0) {
          console.log('todo bien');

          fs.appendFile('salvar.json', JSON.stringify(partida), (err) => {
               if (err) throw err;
               console.log('Archivo Creado Satisfactoriamente');
          });

          console.log(partida);
     } else {
          fs.readFile('salvar.json', (err, data) => {
               if (err) {
                    console.log('error: ', err);
               } else {
                    console.log('archivo cargado::' + data);
                    partida = JSON.parse(data);
               }
          });
     }


     console.log('Escuchando peticiones en el puerto 3000');
});