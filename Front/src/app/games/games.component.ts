import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer, Subject, interval } from 'rxjs';
import { GameComponent } from '../game/game.component';


@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  nombrePartida: string;
  nombreJugador: string 
  jugada: string;
  turnoJugador: '';

  game = {
    nombre: '',
    cantidadJugadores: [],
    estatus: 'Esperando',
    ganador: 'N/A',
    fichasJugador1: [],
    fichasJugador2: [],
    HistorialDejugadas: [],
    turnoDeJugador: ''
  }

  game2 = {
    nombre: '',
    cantidadJugadores: [],
    estatus: 'Esperando',
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
  games2 = [];
  items = '';
  items2 = '';
  turno: boolean;
  bandera = true;

  private clientes$ = new Subject<any[]>();
  constructor(private http: HttpClient) {}

  ngOnInit() {

    this.nombreJugador = JSON.parse(localStorage.getItem('nombreJugador'));
    this.nombrePartida = JSON.parse(localStorage.getItem('nombrePartida'));

    interval(10000).subscribe(x => { //70 y 90 actualizar automaticamente
      this.games2 = [];
      // this.games = '';
      // this.items = '';
      // this.items2 = '';
      // this.turnoJugador = '';

      this.http.get("http://localhost:3000/Partidas").subscribe((response: any) => {
        
          console.log(response.length);

          for (let index = 0; index < response.length; index++) {
            if (response[index].cantidadJugadores[0] == this.nombreJugador || response[index].cantidadJugadores[1] == this.nombreJugador) {
              this.games2.push(response[index]);
            }
          }
          this.games = response;

          this.items = response[0].HistorialDejugadas;
          this.items2 = response[0].nombre;

          this.turnoJugador = response[1].turnoDeJugador;
        });
    });

  }

  CreateGame() {
    console.log(this.nombreJugador)
    console.log(this.nombrePartida)
    this.game.nombre = this.nombrePartida;
    this.game.cantidadJugadores = [];
    this.game.cantidadJugadores.push(this.nombreJugador);
    this.http
      .post("http://localhost:3000/CrearPartida", this.game)
      .subscribe((response: any) => {
        console.log(response);
        this.games = response;
      });

    localStorage.setItem('nombrePartida', JSON.stringify(this.nombrePartida));
    localStorage.setItem('nombreJugador', JSON.stringify(this.nombreJugador));
    this.ngOnInit();
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
    this.ngOnInit();
  }

  jugar() {
    this.play.partidaNombre = this.nombrePartida;
    this.play.jugador = this.nombreJugador;
    this.play.jugada = this.jugada;
    this.http
      .post("http://localhost:3000/Jugada", this.play)
      .subscribe((response: any) => {
        this.game = response;
        for (let index = 0; index < response.length; index++) {
          if (this.game.nombre == this.nombrePartida) {
            if (this.nombreJugador == this.game.cantidadJugadores[0] || this.nombreJugador == this.game.cantidadJugadores[1]) {
              this.items = this.game.HistorialDejugadas[index];
              console.log("jugada")
            }
          }
        }
        console.log(response);
      });
    this.ngOnInit();
  }

  historial() {
    this.bandera = !this.bandera;
  }

  jugador(){
    
  }
}
