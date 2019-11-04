import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {

  public formGroup: FormGroup
  constructor(
    private _router: Router,
    private localStorage: LocalStorageService,
    private http: HttpClient) { 
    
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      usuario: new FormControl("", [
        Validators.required
      ]),
      partida: new FormControl("", [
        Validators.required
      ])
    })
  }

  public onSubmit(){
    if(this.formGroup.get('usuario').value != ""){
      if(this.formGroup.get('partida').value != ""){
        var datos={
          "nombrePartida": this.formGroup.get('partida').value,
          "jugadoresPartida": [this.formGroup.get('usuario').value],
          "estatus": "esperando",
          "turno": "",
          "ficha": []
        }
        //Guardo en el localsotrage la partida a la cual me estoy uniendo en la llame "usuario"
        this.localStorage.setItem('usuario', datos).subscribe(datos =>{
          this.http.post("http://localhost:3003/gameInit", datos).subscribe((response: any) => {
            console.log(response);
            if (response.error == "No pueden haber mas de dos partidas creadas"){
              this._router.navigate(['/'])
            }
            else{
              this._router.navigate(['/partida'])
            }
          })
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
