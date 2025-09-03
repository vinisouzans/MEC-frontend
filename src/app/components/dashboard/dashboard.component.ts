// src/app/components/dashboard/dashboard.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  // Você pode adicionar propriedades e lógica aqui
  // Exemplo: estatísticas, dados do usuário, etc.
  
  userName = 'Vinícius'; // Isso pode vir do AuthService depois
  today = new Date();
  
  // Estatísticas de exemplo (substitua por dados reais)
  stats = {
    totalProdutos: 152,
    totalProjetos: 27,
    estoqueBaixo: 8,
    novosPedidos: 5
  };
}