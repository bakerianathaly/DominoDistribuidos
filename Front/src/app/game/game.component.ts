import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor(private http: HttpClient, private _router: Router) { }
  nombreJugador: string;
  
  game = {
    nombre: '',
    cantidadJugadores: [],
    estatus: 'esperando',
    ganador: 'N/A',
    fichasJugador1: [],
    fichasJugador2: [],
    HistorialDejugadas: [],
    turnoDeJugador: ''
  }

  player = {
    partidaNombre: '',
    jugador: ''
  }

  play = {
    partidaNombre: '',
    jugador: '',
    jugada: ''
  }

  games = '';
  items = '';
  items2 = ''; 
  turno: boolean;

  ngOnInit() {

  }

  delete() {
    localStorage.removeItem('nombreJugador');
    localStorage.removeItem('nombrePartida');

    localStorage.clear()
    this._router.navigate(['/'])
  }

}
