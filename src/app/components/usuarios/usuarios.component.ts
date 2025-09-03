// src/app/components/usuarios/usuarios.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  loading = true;
  error = '';

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.carregarUsuarios();
  }

  carregarUsuarios(): void {
    this.loading = true;
    this.usuarioService.getUsuarios().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Erro ao carregar usuários';
        this.loading = false;
        console.error('Erro:', error);
      }
    });
  }

  excluirUsuario(id: number): void {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      this.usuarioService.deleteUsuario(id).subscribe({
        next: () => {
          this.carregarUsuarios();
        },
        error: (error) => {
          alert('Erro ao excluir usuário');
          console.error('Erro:', error);
        }
      });
    }
  }

  formatarData(data: Date): string {
    return new Date(data).toLocaleDateString('pt-BR');
  }
  getRoleLabel(role: string): string {
        switch (role.toLowerCase()) {
            case 'Administrador': return 'Administrador';
            case 'gerente': return 'Gerente';
            case 'vendedor': return 'Vendedor';
            default: return role;
        }
  }

  getRoleIcon(role: string): string {
        switch (role.toLowerCase()) {
            case 'Administrador': return 'bi bi-shield-lock';
            case 'gerente': return 'bi bi-person-gear';
            case 'vendedor': return 'bi bi-person-check';
            default: return 'bi bi-person';
        }
   }

  getRoleBadgeClass(role: string): string {
    switch (role.toLowerCase()) {
      case 'Administrador': return 'badge bg-danger';
      case 'gerente': return 'badge bg-warning';
      case 'vendedor': return 'badge bg-info';
      default: return 'badge bg-secondary';
    }
  }

  getStatusBadgeClass(ativo: boolean): string {
    return ativo ? 'badge bg-success' : 'badge bg-danger';
  }

  
}