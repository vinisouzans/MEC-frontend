// src/app/components/fornecedores/fornecedores.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FornecedorService } from '../../services/fornecedor.service';
import { Fornecedor } from '../../models/fornecedor.model';

@Component({
  selector: 'app-fornecedores',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.scss']
})
export class FornecedoresComponent implements OnInit {
  fornecedores: Fornecedor[] = [];
  loading = true;
  error = '';

  constructor(private fornecedorService: FornecedorService) {}

  ngOnInit(): void {
    this.carregarFornecedores();
  }

  carregarFornecedores(): void {
    this.loading = true;
    this.error = '';
    
    this.fornecedorService.getFornecedores().subscribe({
      next: (fornecedores) => {
        this.fornecedores = fornecedores;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Erro ao carregar fornecedores';
        this.loading = false;
        console.error('Erro:', error);
      }
    });
  }

  excluirFornecedor(id: number): void {
    if (confirm('Tem certeza que deseja excluir este fornecedor?')) {
      this.fornecedorService.deleteFornecedor(id).subscribe({
        next: () => {
          this.carregarFornecedores();
        },
        error: (error) => {
          if (error.status === 400) {
            alert(error.error || 'Não é possível excluir o fornecedor pois existem produtos associados.');
          } else {
            alert('Erro ao excluir fornecedor');
          }
          console.error('Erro:', error);
        }
      });
    }
  }

  formatarData(data: Date): string {
    return new Date(data).toLocaleDateString('pt-BR');
  }

  formatarCNPJ(cnpj: string): string {
    return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
  }

  getStatusBadgeClass(ativo: boolean): string {
    return ativo ? 'badge bg-success' : 'badge bg-danger';
  }
}