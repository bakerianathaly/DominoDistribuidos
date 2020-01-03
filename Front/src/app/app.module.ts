import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { MatCardModule } from '@angular/material/card';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { TurnoComponent } from './turno/turno.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GamesComponent } from './games/games.component';


@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    TurnoComponent,
    GamesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
