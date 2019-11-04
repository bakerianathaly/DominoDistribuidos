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

  // ngOnInit() {
  //   this.peopleDinner()
  //   this.hourDinner()
  //   this.getLocalStorage()

  //   var date = this.actualDate()
  //   this.formGroup = new FormGroup({
  //     cantidadPersonas: new FormControl(-1, [
  //       Validators.required
  //     ]),
  //     fechaReserva: new FormControl(null, [
  //       Validators.required
  //     ]),
  //     horaReserva: new FormControl(-1, [
  //       Validators.required
  //     ]),
  //     pais: new FormControl(-1, [
  //       Validators.required
  //     ]),
  //     ciudad: new FormControl(-1, [
  //       Validators.required
  //     ])
  //   })
  //   document.getElementById("reserva").setAttribute("min", date);
  // }

  // public onSubmit() {
  //   if(this.formGroup.get('horaReserva').value != -1 && this.formGroup.get('ciudad').value != -1 && 
  //     this.formGroup.get('pais').value != -1 && this.formGroup.get('cantidadPersonas').value != -1 && 
  //     this.formGroup.get('fechaReserva').valid){
      
  //     var datosReserva ={
  //       userID:this.userId,
  //       timeStamp: this.formGroup.get('fechaReserva').value+' '+this.formGroup.get('horaReserva').value,
  //       cantPeople: this.formGroup.get('cantidadPersonas').value,
  //       ciudad:this.formGroup.get('ciudad').value
  //     }
  //     this.localStorage.setItem('formReserva', datosReserva).subscribe(datosReserva =>{
        
  //       this.router.navigate(['restaurant-reservation/list-restaurant']);
  //     })
      
  //   }
  //   else{
  //     this.subM =true
  //   }
  // }

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
}
