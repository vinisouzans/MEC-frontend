import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <a class="navbar-brand" href="#" routerLink="/dashboard">
          <i class="bi bi-house-gear"></i> MEC Marcenaria
        </a>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a class="nav-link" href="/dashboard" routerLinkActive="active">
                <i class="bi bi-speedometer2"></i> Dashboard
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/usuarios" routerLinkActive="active">
                <i class="bi bi-people"></i> Usuários
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/produtos" routerLinkActive="active">
                <i class="bi bi-boxes"></i> Produtos
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/estoque" routerLinkActive="active">
                <i class="bi bi-clipboard-data"></i> Estoque
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/projetos" routerLinkActive="active">
                <i class="bi bi-folder"></i> Projetos
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/fornecedores" routerLinkActive="active">
                <i class="bi bi-truck"></i> Fornecedores
              </a>
            </li>
          </ul>

          <!-- Botão Sair -->
          <div class="navbar-nav" *ngIf="isLoggedIn">
            <div class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                <i class="bi bi-person-circle me-1"></i> {{ userName }}
              </a>
              <ul class="dropdown-menu dropdown-menu-end">
                <li><a class="dropdown-item" href="#"><i class="bi bi-person me-2"></i>Perfil</a></li>
                <li><a class="dropdown-item" href="#"><i class="bi bi-gear me-2"></i>Configurações</a></li>
                <li><hr class="dropdown-divider"></li>
                <li>
                  <a class="dropdown-item text-danger" href="#" (click)="logout()">
                    <i class="bi bi-box-arrow-right me-2"></i>Sair
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div class="container mt-4">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `.navbar-brand { font-weight: bold; }
     .nav-link { padding: 0.5rem 1rem; }
     .nav-link.active { 
       font-weight: bold; 
       background-color: rgba(255,255,255,0.1); 
       border-radius: 0.25rem; 
     }
     .dropdown-menu { min-width: 200px; }`
  ]
})
export class AppComponent implements OnInit {
  title = 'mec-frontend';
  isLoggedIn = false;
  userName = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Observar mudanças no estado de login
    this.authService.getCurrentUser().subscribe(user => {
      this.isLoggedIn = !!user;
      this.userName = user?.nome || '';
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}