import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../../services/local-storage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { interval, Subscription } from 'rxjs'

@Component({
  selector: 'app-partida',
  templateUrl: './partida.component.html',
  styleUrls: ['./partida.component.css']
})
export class PartidaComponent implements OnInit {

  public juego: any[] = []
  public user =''
  public partida = ''
  public formGroup: FormGroup
  public turno = ''
  subscription: Subscription
  jugador: String
  jugadorActual: String
  constructor(
    private _router: Router,
    private localStorage: LocalStorageService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getLocalStorage() 
    this.formGroup = new FormGroup({
      jugada: new FormControl("", [
        Validators.required
      ])
    })
    this.actualizacion()
  }

  ngOnDestroy(){
    this.destroyLocalStorage()
  }

  public getLocalStorage(){
    this.localStorage.getItem('usuario').subscribe(datos =>{
      if(datos){
        this.user = datos.jugadoresPartida
        this.partida = datos.nombrePartida
        console.log(this.user)
        console.log(this.partida)
        this.actualizar()
      }
    })
  }

  //Metodo para actualizar la tabla, es la que hace las peticiones
  public actualizar(){
    this.http.get("http://localhost:3003/game").subscribe((response: any) => {
      for(let i =0; i< response.length; i++){
        console.log(response[i].nombrePartida)
        if(response[i].nombrePartida == this.partida && (response[i].jugadoresPartida[0] == this.user || response[i].jugadoresPartida[1] == this.user)){
          let datos ={
            nombrePartida: response[i].nombrePartida,
            cantidadJugadores:response[i].jugadoresPartida.length,
            jugadores: response[i].jugadoresPartida,
            estatus: "Jugando ando",
            turno: response[i].turno,
            ficha: response[i].ficha[i]             
          }
          console.log(datos)
          this.jugador = datos["turno"]
          if(this.jugador != this.jugadorActual){
            this.juego.push(datos)
            this.jugadorActual = datos["turno"]
          }
        }
      }
    })
  }

  public destroyLocalStorage(){
    this.localStorage.removeItem('usuario')
  }

  actualizacion(){
    const source = interval(2500)
    this.subscription=source.subscribe(val => this.actualizarPantalla())
  }

  actualizarPantalla(){
    this.actualizar();
  }

  async onSubmit(){
    if(this.formGroup.get('jugada').value != ""){
      let jugada = {
        nombrePartida:this.partida,
        jugador:this.user,
        ficha: this.formGroup.get('jugada').value
      }

      await this.http.post("http://localhost:3003/itsMyTurn", jugada).subscribe((response: any) => {
        
      })
      this.actualizar()
    }
  }

  public otraPartida(){
    this._router.navigate(['/unirse'])
  }

  public partidas(){
    this._router.navigate(['/totalPartidas'])
  }

}
