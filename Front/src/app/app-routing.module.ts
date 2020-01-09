import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component'
import { GameComponent } from './game/game.component'
import { GamesComponent } from './games/games.component'
import { TurnoComponent } from './turno/turno.component'

const routes: Routes = [
  {path:'', component: GamesComponent},
  {path:'delete', component: GameComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }