import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Distribuidos';
  hasPapa: boolean;
  nombreJugador: string;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.nombreJugador = 'Jugador1';
  }
  haspapa(hasPapa) {
    this.hasPapa = hasPapa;
    return this.hasPapa;
  }
}
