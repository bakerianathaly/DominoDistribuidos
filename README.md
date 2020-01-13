# DominoDistribuidos

[{"nombre":"prueba1","cantidadJugadores":["nath","kiddo"],"estatus":"Finalizada","ganador":"nath","fichasJugador1":["","0:1","0:2","0:3","0:4","0:5","0:6","1:1","1:2","1:3","1:4","","1:6"],"fichasJugador2":["","","2:4","2:5","2:6","3:3","3:4","3:5","3:6","4:4","4:5","4:6","5:5","5:6"],"HistorialDejugadas":["nath --> 2:2","kiddo --> 0:0","nath --> 2:3","kiddo --> 1:5"],"turnoDeJugador":"nath","turno":"nath"},{"nombre":"auida","cantidadJugadores":["carmen","saris"],"estatus":"Jugando","ganador":"No hay, se esta jugando","fichasJugador1":["0:0","0:1","","0:3","0:4","0:5","0:6","1:1","1:2","1:3","1:4","1:5","1:6"],"fichasJugador2":["","","2:4","2:5","2:6","3:3","3:4","3:5","3:6","4:4","4:5","4:6","5:5","5:6"],"HistorialDejugadas":["saris --> 2:2","carmen --> 0:2","saris --> 2:3"],"turnoDeJugador":"carmen","turno":"carmen"}]

Rutas explicadas

GET /game: Lo que hace es regresar el arreglo de JSON que contiene las dos partidas que se pueden crear 
POST /update: Refresca el arreglo de juegos que ya estan creados
POST /updateGame: Cuando se crea una partida nueva lo agrega al arreglo de juegos y lo actuliza para todos los jugadores
POST /joinGame: Para unirse a la partida recibe un body (JSON) con el siguiente formato:

    {
	    "nombrePartida":"Prueba3",
	    "jugador":"bakerianathaly"
    }

POST /gameInit: Crear una nueva partida, regresa un error si el arreglo de partidas ya tiene 2 partidas creadas. Recibe un body (JSON) con el siguiente formato: 

    {
        "nombrePartida" : "Prueba3",
        "jugadoresPartida": ["carmellapg"],
        "estatus": "esperando",
        "turno": "",
        "ficha": []
    }

POST /itsMyTurn: Es lo que seria el juego como tal, lo que hace es que lee ve que jugador del arreglo de jugadores es el que tiene el turno y cambia al otro jugador. A su vez asigna las fichas a un arreglo de fichas que concuerda con la posicion del jugador en el arreay de jugadores, recibe un body (JSON) con el siguiente formato:

    {
        "nombrePartida":"Prueba3",
        "jugador":"bakerianathaly",
        "ficha":"3:3"
    }

NOTA: /itsMyTurn SOLAMENTE cambia el turno y agrega la ficha al array, actualmente no valida nada del juego de domino como tal

Cosas que faltan por hacerle:

1. Que haga bien las jugadas con las fichas
2. Que muestre el historial de las jugadas en la tabla de todas las partidas
3. Actualizar automatico
4. Mostrar las fichas
5. Mostrar simultaneamente el que tiene 2 partidas sus partidas