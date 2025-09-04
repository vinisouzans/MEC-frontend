// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { UsuarioFormComponent } from './components/usuario-form/usuario-form.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  
  // Rotas protegidas
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [authGuard] },
  { path: 'usuarios/novo', component: UsuarioFormComponent, canActivate: [authGuard] },
  { path: 'usuarios/editar/:id', component: UsuarioFormComponent, canActivate: [authGuard] },
  
  // Rota vazia - SEM canActivate aqui
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  
  // Rota curinga - SEM canActivate aqui  
  { path: '**', redirectTo: '/dashboard' }
];