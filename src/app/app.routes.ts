// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { UsuarioFormComponent } from './components/usuario-form/usuario-form.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'usuarios/novo', component: UsuarioFormComponent },
  { path: 'usuarios/editar/:id', component: UsuarioFormComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },  
  { path: '**', redirectTo: '/dashboard' }
  
];