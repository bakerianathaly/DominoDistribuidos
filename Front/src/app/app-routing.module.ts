import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component'
import { HomeComponent } from './home/home.component'
import { OnepageComponent } from './onepage/onepage.component'
import { UnirseComponent } from './unirse/unirse.component'
import { CrearComponent } from './crear/crear.component'
import { PartidaComponent } from './partida/partida.component'


const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'unirse', component:UnirseComponent},
  {path:'crear', component:CrearComponent},
  {path:'partida', component: PartidaComponent},
  {path: 'onePage', component: OnepageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
