import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-turno',
  templateUrl: './turno.component.html',
  styleUrls: ['./turno.component.scss']
})
export class TurnoComponent implements OnInit {

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
  turnoJugador = '';
  turno: boolean;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http
    .get("http://localhost:3000/Partidas")
    .subscribe((response: any) => {
      console.log(response.length);
      
      this.games = response;
      this.turnoJugador = response[0].turnoDeJugador;
      this.items = response[0].HistorialDejugadas;
      this.items2 = response[0].nombre;
    });
  }

  GetTurno(): boolean {
    return (this.turnoJugador == 'Jugador1')
  }

}
