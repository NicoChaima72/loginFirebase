import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrarComponent } from './pages/registrar/registrar.component';
import { PrivadoComponent } from './pages/privado/privado.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registrar', component: RegistrarComponent },
  { path: 'privado', component: PrivadoComponent, canActivate: [AuthGuard] },
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' }
  // { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
