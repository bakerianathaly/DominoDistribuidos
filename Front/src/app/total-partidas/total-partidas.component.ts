import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-total-partidas',
  templateUrl: './total-partidas.component.html',
  styleUrls: ['./total-partidas.component.css']
})
export class TotalPartidasComponent implements OnInit {

  public juego: any[] = []
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.http.get("http://localhost:3003/game").subscribe((response: any) => {
      for(let i =0; i< response.length; i++){
        console.log(response[i].nombrePartida)
        let datos ={
          nombrePartida: response[i].nombrePartida,
          cantidadJugadores:response[i].jugadoresPartida.length,
          jugadores: response[i].jugadoresPartida,
          estatus: response[i].estatus,
          turno: response[i].turno              
        }
        this.juego.push(datos)
      }
    })
  }

}
