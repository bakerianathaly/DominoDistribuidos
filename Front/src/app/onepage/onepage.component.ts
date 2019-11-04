import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: "app-onepage",
  templateUrl: "./onepage.component.html",
  styleUrls: ["./onepage.component.css"]
})
export class OnepageComponent implements OnInit {

  partida = {
    nombre: 'partida1',
    cantidadJugadores: ['jugador1'],
    estatus: 'esperando',
    ganador: 'N/A',
    fichasJugador1: [],
    fichasJugador2: [],
    HistorialDejugadas: [],
    turnoDeJugador: ''
  }

  jugador = {
    partidaNombre: 'partida1',
    jugador: 'jugador2'
  }
  momo = '';
  momo2 = '';
  momo3 = '';

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.http
      .get("http://localhost:3000/Partidas")
      .subscribe((response: any) => {
        console.log(response.length);


        this.momo = response;
        this.momo2 = response[0].HistorialDejugadas;
        this.momo3 = response[0].nombre;

      });
  }

  crearPartida() {
    this.http
      .post("http://localhost:3000/CrearPartida", this.partida)
      .subscribe((response: any) => {
        console.log(response);

      });

  }
  cambiarPartida() {

    this.http
      .get("http://localhost:3000/Partidas")
      .subscribe((response: any) => {
        console.log(response.length);


        this.momo = response;
        this.momo2 = response[1].HistorialDejugadas;
        this.momo3 = response[1].nombre;
      });

  }

  unirsePartida() {
    this.http
      .post("http://localhost:3000/Unirse", this.jugador)
      .subscribe((response: any) => {
        console.log(response);

      });

  }

  obtenerTurno() {
    this.http
      .post("http://localhost:3000/Turno", {
        partidaNombre: "partida1"
      })
      .subscribe((response: any) => {
        console.log(response);

      });
  }

  RealizarJugada() {
    this.http
      .post("http://localhost:3000/Jugada", {
        "partidaNombre": "partida1",
        "jugador": "Tienda4",
        "jugada": "2:2"
      })
      .subscribe((response: any) => {
        console.log(response);

      });
  }



}
