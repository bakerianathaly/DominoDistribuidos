import { BrowserModule } from '@angular/platform-browser';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UnirseComponent } from './unirse/unirse.component';
import { CrearComponent } from './crear/crear.component';
import { PartidaComponent } from './partida/partida.component';
import { TotalPartidasComponent } from './total-partidas/total-partidas.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UnirseComponent,
    CrearComponent,
    PartidaComponent,
    TotalPartidasComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
