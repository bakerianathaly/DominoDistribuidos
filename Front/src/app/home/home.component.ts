import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { LocalStorageService } from '../../services/local-storage.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userId: any;
  isDataLoaded: boolean;
  public formGroup: FormGroup
  user: String =''
  constructor(
    private _router: Router,
    private localStorage: LocalStorageService,
    private http: HttpClient
  ) {}
  ngOnInit() {
    this.getLocalStorage()

    this.formGroup = new FormGroup({
      usuario: new FormControl("", [
        Validators.required
      ])
    })
  }

  getUser(){
    this.http.get("http://localhost:3003/getUser").subscribe((response: any)=>{
      this.user = response
    })
  }

  public getLocalStorage(){
    this.localStorage.getItem('id').subscribe(storedId =>{
      if(storedId){
        this.isDataLoaded = true
        this.userId = storedId
      }
    })
  }

  public crerPartida(): void{
    this._router.navigate(['/crear']);
  }

  public unirsePartida(): void{
    this._router.navigate(['/unirse']);
  }

  public partidas(): void{
    this._router.navigate(['/totalPartidas'])
  }

  postUser(){
    let auida={
      usuario: this.formGroup.get('usuario').value
    }
    this.http.post("http://localhost:3003/user", auida).subscribe((response: any)=>{
      this.user = this.formGroup.get('usuario').value
      console.log(this.user)
    })
  }
}
