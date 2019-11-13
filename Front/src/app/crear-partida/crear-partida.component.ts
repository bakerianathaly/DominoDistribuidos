import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { LocalStorageService } from '../../services/local-storage.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-partida',
  templateUrl: './crear-partida.component.html',
  styleUrls: ['./crear-partida.component.css']
})
export class CrearPartidaComponent implements OnInit {

  private formGroup: FormGroup
  nombreUsuario:String =''

  constructor(
    private router: Router,
    private localStorage: LocalStorageService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.http.get("http://localhost:3003/obtenerUsuario").subscribe((response: any)=>{
      console.log(response)
      this.nombreUsuario = response
    })
  }

  
}
