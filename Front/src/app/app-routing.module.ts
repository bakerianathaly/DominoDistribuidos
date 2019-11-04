import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component'
import { HomeComponent } from './home/home.component'
import { OnepageComponent } from './onepage/onepage.component'


const routes: Routes = [
  {path:'', component: AppComponent},
  {path:'home', component: HomeComponent},
  {path: 'onePage', component: OnepageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
