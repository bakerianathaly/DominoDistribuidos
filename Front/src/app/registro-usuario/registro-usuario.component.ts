import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { LocalStorageService } from '../../services/local-storage.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {

  nombreUsuario: String = ''
  private formGroup: FormGroup

  constructor(
    private router: Router,
    private localStorage: LocalStorageService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    //this.getLocalStorage()

    this.formGroup = new FormGroup({
      usuario: new FormControl("", [
        Validators.required
      ])
    })

    this.http.get("http://localhost:3003/obtenerUsuario").subscribe((response: any)=>{
      console.log(response)
      this.nombreUsuario = response
    })
  }

  postNombreUsuraio(): void{
    this.nombreUsuario = this.formGroup.get('usuario').value

    if(this.nombreUsuario != ''){
      let datos = {
        usuario: this.nombreUsuario
      }

      this.http.post("http://localhost:3003/registroUsuario", datos).subscribe((response: any)=>{
        //Agregar aqui el usuario a l 
        console.log(response)    
      })
    }
  }

  crearPartida(): void{
    this.router.navigate(['/crearPartida']);
  }

  unirsePartida(): void{
    this.router.navigate(['/unirse']);
  }

  partidas(): void{
    this.router.navigate(['/totalPartidas'])
  }

}
