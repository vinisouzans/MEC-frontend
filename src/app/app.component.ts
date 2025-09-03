import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

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
              <a class="nav-link" routerLink="/dashboard" routerLinkActive="active">
                <i class="bi bi-speedometer2"></i> Dashboard
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
              <a class="nav-link" routerLink="/fornecedores" routerLinkActive="active">
                <i class="bi bi-truck"></i> Fornecedores
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container mt-4">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .navbar-brand { font-weight: bold; }
    .nav-link { padding: 0.5rem 1rem; }
    .nav-link.active { 
      font-weight: bold; 
      background-color: rgba(255,255,255,0.1); 
      border-radius: 0.25rem; 
    }
  `]
})
export class AppComponent {
  title = 'mec-frontend';
}