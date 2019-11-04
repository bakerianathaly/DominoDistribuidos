import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-unirse',
  templateUrl: './unirse.component.html',
  styleUrls: ['./unirse.component.css']
})
export class UnirseComponent implements OnInit {

  constructor(
    private _router: Router,
    private localStorage: LocalStorageService,
    private http: HttpClient
  ) { }
  
  public partidas: any[] =[]
  public formGroup: FormGroup

  ngOnInit() {
    this.formGroup = new FormGroup({
      usuario: new FormControl("", [
        Validators.required
      ]),
      partida: new FormControl("", [
        Validators.required
      ])
    })

    this.http.get("http://localhost:3003/game").subscribe((response: any) => {
        for(let i =0; i< response.length; i++){
          if(response[i].estatus == 'esperando'){
            let datos ={
              nombrePartida: response[i].nombrePartida,
              cantidadJugadores:response[i].jugadoresPartida.length,
              jugadores: response[i].jugadoresPartida,
              estatus: "En espera"              
            }
            this.partidas.push(datos)
          }
        }
    })
  }

  public onSubmit(){
    if(this.formGroup.get('usuario').value != ""){
      if(this.formGroup.get('partida').value != ""){
        var datos={
          "nombrePartida": this.formGroup.get('partida').value,
          "jugador": this.formGroup.get('usuario').value
        }
        this.http.post("http://localhost:3003/joinGame", datos).subscribe((response: any) => {
          console.log(response);
          if (response.error == "No pueden haber mas de dos jugadores por partida!!!"){
            this._router.navigate(['/'])
          }
          else{
            var datos
            for(let i=0; i<response.length; i++){
              if(response[i].nombrePartida == this.formGroup.get('partida').value){
                for(let j=0; j<2; j++){
                  if(response[i].jugadoresPartida[j] == this.formGroup.get('usuario').value){
                    datos={
                      "nombrePartida": response[i].nombrePartida,
                      "jugadoresPartida": response[i].jugadoresPartida[j],
                      "estatus": response[i].estatus,
                      "turno": response[i].turno,
                      "ficha": response[i].ficha
                    }
                    console.log(datos)
                    i=100
                    j=30
                  }
                }
              }
            }
            this.localStorage.setItem('usuario', datos).subscribe(datos =>{
              this._router.navigate(['/partida'])
            })
          }
        })
      }
      else{
        this._router.navigate(['/crear']);
      }
    }
    else{
      this._router.navigate(['/crear']);
    }
  }
}
