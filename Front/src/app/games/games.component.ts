import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GameComponent } from '../game/game.component';
import { Router } from '@angular/router'

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  nombrePartida: string;
  nombreJugador: string;
  jugada: string;
  turnoJugador: '';

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

  constructor(private http: HttpClient, private _router: Router) {
    
  }

  ngOnInit() {
    this.nombreJugador = JSON.parse(localStorage.getItem('nombreJugador'));
    this.nombrePartida = JSON.parse(localStorage.getItem('nombrePartida'));
    //localStorage.removeItem('nombreJugador');
    //localStorage.removeItem('nombrePartida');
    this.http
    .get("http://localhost:3000/Partidas")
    .subscribe((response: any) => {
      console.log(response.length);
      
      this.games = response;
      this.items = response[0].HistorialDejugadas;
      this.items2 = response[0].nombre;
      this.turnoJugador = response[1].turnoDeJugador;
    });
  }

  ngOnDestroy(){
    this.salir()
  }

  CreateGame() {
    this.game.nombre = this.nombrePartida;
    this.game.cantidadJugadores.push(this.nombreJugador);
    this.http
    .post("http://localhost:3000/CrearPartida", this.game)
    .subscribe((response: any) => {
        console.log(response);
        this.games = response;
    });
    localStorage.setItem('nombrePartida', JSON.stringify(this.nombrePartida));
    localStorage.setItem('nombreJugador', JSON.stringify(this.nombreJugador));
  }

  JoinGame() {
    this.player.jugador = this.nombreJugador;
    this.player.partidaNombre = this.nombrePartida;
    this.http
    .post("http://localhost:3000/Unirse", this.player)
    .subscribe((response: any) => {
      console.log(response);
      this.games = response;
    });
    localStorage.setItem('nombrePartida', JSON.stringify(this.nombrePartida));
    localStorage.setItem('nombreJugador', JSON.stringify(this.nombreJugador));
  }

  ChangeGame() {    
  }

  jugar() {
    this.play.partidaNombre = this.nombrePartida;
    this.play.jugador = this.nombreJugador;
    this.play.jugada = this.jugada;
    this.http
    .post("http://localhost:3000/Jugada", this.play)
    .subscribe((response: any) => {
      this.game = response;
      for (let index = 0; index < response.length; index++ ) {
        if(this.game.nombre == this.nombrePartida) {
          if (this.nombreJugador == this.game.cantidadJugadores[0] || this.nombreJugador == this.game.cantidadJugadores[1]) {
            this.items = this.game.HistorialDejugadas[index];
          }
        }
      } 
      console.log(response);
    });
  }

  salir(){
    
    localStorage.removeItem('nombreJugador')
    localStorage.removeItem('nombrePartida')
    localStorage.clear();
    this.nombreJugador =''
    this.nombrePartida = ''
    this._router.navigate(['/'])
  }
}
