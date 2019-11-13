import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component'
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component'
import { CrearPartidaComponent } from './crear-partida/crear-partida.component'

const routes: Routes = [
  {path:'', component: RegistroUsuarioComponent},
  {path: 'crearPartida', component: CrearPartidaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
