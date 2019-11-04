import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userId: any;
  isDataLoaded: boolean;

  constructor(
    private _router: Router,
    private localStorage: LocalStorageService
  ) {}
  ngOnInit() {
    this.getLocalStorage()
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
}
