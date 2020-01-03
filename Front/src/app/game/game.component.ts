import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor(private http: HttpClient) { }

  game = {
    nombre: '',
    cantidadJugadores: ['jugador1'],
    estatus: 'esperando',
    ganador: 'N/A',
    fichasJugador1: [],
    fichasJugador2: [],
    HistorialDejugadas: [],
    turnoDeJugador: 'Jugador1'
  }

  player = {
    partidaNombre: 'partida1',
    jugador: 'jugador1'
  }

  
  games = '';
  items = '';
  items2 = '';

  ngOnInit() {

    this.http
    .get("http://localhost:3000/Partidas")
    .subscribe((response: any) => {
      console.log(response.length);

      this.games = response;
      this.items = response[0].HistorialDejugadas;
      this.items2 = response[0].nombre;
    });
  }

  jugar() {
    
  }

}
