import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OnepageComponent } from './onepage/onepage.component';
import { HomeComponent } from './home/home.component';
import { UnirseComponent } from './unirse/unirse.component';
import { CrearComponent } from './crear/crear.component';
import { PartidaComponent } from './partida/partida.component';

@NgModule({
  declarations: [
    AppComponent,
    OnepageComponent,
    HomeComponent,
    UnirseComponent,
    CrearComponent,
    PartidaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
