import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component'
import { HomeComponent } from './home/home.component'
import { UnirseComponent } from './unirse/unirse.component'
import { CrearComponent } from './crear/crear.component'
import { PartidaComponent } from './partida/partida.component'
import { TotalPartidasComponent } from './total-partidas/total-partidas.component'

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'unirse', component:UnirseComponent},
  {path:'crear', component:CrearComponent},
  {path:'partida', component: PartidaComponent},
  {path: 'totalPartidas' ,component: TotalPartidasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
