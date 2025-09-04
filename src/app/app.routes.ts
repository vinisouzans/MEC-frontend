// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { UsuarioFormComponent } from './components/usuario-form/usuario-form.component';
import { authGuard } from './guards/auth.guard';
import { FornecedoresComponent } from './components/fornecedores/fornecedores.component';
import { FornecedorFormComponent } from './components/fornecedor-form/fornecedor-form.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  
  // Rotas protegidas
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [authGuard] },
  { path: 'usuarios/novo', component: UsuarioFormComponent, canActivate: [authGuard] },
  { path: 'usuarios/editar/:id', component: UsuarioFormComponent, canActivate: [authGuard] },

  { path: 'fornecedores', component: FornecedoresComponent, canActivate: [authGuard] },
  { path: 'fornecedores/novo', component: FornecedorFormComponent, canActivate: [authGuard] },
  { path: 'fornecedores/editar/:id', component: FornecedorFormComponent, canActivate: [authGuard] },
  
  // Rota vazia - SEM canActivate aqui
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  
  // Rota curinga - SEM canActivate aqui  
  { path: '**', redirectTo: '/dashboard' }
];