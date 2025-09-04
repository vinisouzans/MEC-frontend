// src/app/components/fornecedor-form/fornecedor-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FornecedorService } from '../../services/fornecedor.service';
import { Fornecedor, FornecedorCreate, FornecedorUpdate } from '../../models/fornecedor.model';

@Component({
  selector: 'app-fornecedor-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './fornecedor-form.component.html',
  styleUrls: ['./fornecedor-form.component.scss']
})
export class FornecedorFormComponent implements OnInit {
  fornecedor: FornecedorCreate = {
    nome: '',
    nomeFantasia: '',
    cnpj: '',
    inscricaoEstadual: '',
    email: '',
    telefone: '',
    celular: '',
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    observacoes: ''
  };

  isEdit = false;
  loading = false;
  error = '';
  id?: number;

  estados = [
    'AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 
    'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 
    'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'
  ];

  constructor(
    private fornecedorService: FornecedorService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isEdit = !!this.id;

    if (this.isEdit && this.id) {
      this.carregarFornecedor(this.id);
    }
  }

  carregarFornecedor(id: number): void {
    this.loading = true;
    this.fornecedorService.getFornecedor(id).subscribe({
      next: (fornecedor) => {
        // Para edição, precisamos converter Fornecedor para FornecedorCreate
        this.fornecedor = {
          nome: fornecedor.nome,
          nomeFantasia: fornecedor.nomeFantasia || '',
          cnpj: fornecedor.cnpj,
          inscricaoEstadual: fornecedor.inscricaoEstadual || '',
          email: fornecedor.email || '',
          telefone: fornecedor.telefone || '',
          celular: fornecedor.celular || '',
          cep: fornecedor.cep || '',
          endereco: fornecedor.endereco || '',
          numero: fornecedor.numero || '',
          complemento: fornecedor.complemento || '',
          bairro: fornecedor.bairro || '',
          cidade: fornecedor.cidade || '',
          estado: fornecedor.estado || '',
          observacoes: fornecedor.observacoes || ''
        };
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Erro ao carregar fornecedor';
        this.loading = false;
        console.error('Erro:', error);
      }
    });
  }

  onSubmit(): void {
    this.loading = true;
    this.error = '';

    if (this.isEdit && this.id) {
      const fornecedorUpdate: FornecedorUpdate = {
        nome: this.fornecedor.nome,
        nomeFantasia: this.fornecedor.nomeFantasia,
        inscricaoEstadual: this.fornecedor.inscricaoEstadual,
        email: this.fornecedor.email,
        telefone: this.fornecedor.telefone,
        celular: this.fornecedor.celular,
        cep: this.fornecedor.cep,
        endereco: this.fornecedor.endereco,
        numero: this.fornecedor.numero,
        complemento: this.fornecedor.complemento,
        bairro: this.fornecedor.bairro,
        cidade: this.fornecedor.cidade,
        estado: this.fornecedor.estado,
        observacoes: this.fornecedor.observacoes,
        ativo: true // Você pode ajustar isso conforme necessário
      };

      this.fornecedorService.updateFornecedor(this.id, fornecedorUpdate).subscribe({
        next: () => {
          this.router.navigate(['/fornecedores']);
        },
        error: (error) => {
          this.handleError(error, 'atualizar');
        }
      });
    } else {
      this.fornecedorService.createFornecedor(this.fornecedor).subscribe({
        next: () => {
          this.router.navigate(['/fornecedores']);
        },
        error: (error) => {
          this.handleError(error, 'criar');
        }
      });
    }
  }

  private handleError(error: any, action: string): void {
    this.loading = false;
    
    if (error.status === 400) {
      this.error = error.error || `Erro ao ${action} fornecedor. Verifique os dados.`;
    } else {
      this.error = `Erro ao ${action} fornecedor`;
    }
    
    console.error('Erro:', error);
  }

  formatarCNPJ(event: any): void {
    let cnpj = event.target.value.replace(/\D/g, '');
    
    if (cnpj.length > 14) {
      cnpj = cnpj.substring(0, 14);
    }
    
    if (cnpj.length > 12) {
      cnpj = cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    } else if (cnpj.length > 8) {
      cnpj = cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/, '$1.$2.$3/$4');
    } else if (cnpj.length > 5) {
      cnpj = cnpj.replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2.$3');
    }
    
    this.fornecedor.cnpj = cnpj;
  }

  formatarTelefone(event: any): void {
    let telefone = event.target.value.replace(/\D/g, '');
    
    if (telefone.length > 11) {
      telefone = telefone.substring(0, 11);
    }
    
    if (telefone.length > 10) {
      telefone = telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (telefone.length > 6) {
      telefone = telefone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else if (telefone.length > 2) {
      telefone = telefone.replace(/(\d{2})(\d{4})/, '($1) $2');
    }
    
    if (event.target.name === 'telefone') {
      this.fornecedor.telefone = telefone;
    } else {
      this.fornecedor.celular = telefone;
    }
  }

  formatarCEP(event: any): void {
    let cep = event.target.value.replace(/\D/g, '');
    
    if (cep.length > 8) {
      cep = cep.substring(0, 8);
    }
    
    if (cep.length > 5) {
      cep = cep.replace(/(\d{5})(\d{3})/, '$1-$2');
    }
    
    this.fornecedor.cep = cep;
  }

  buscarCEP(): void {
    if (this.fornecedor.cep && this.fornecedor.cep.length === 9) {
      const cepLimpo = this.fornecedor.cep.replace(/\D/g, '');
      
      // Você pode implementar a busca de CEP aqui
      // Exemplo com a API ViaCEP:
      fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
        .then(response => response.json())
        .then(data => {
          if (!data.erro) {
            this.fornecedor.endereco = data.logradouro;
            this.fornecedor.bairro = data.bairro;
            this.fornecedor.cidade = data.localidade;
            this.fornecedor.estado = data.uf;
          }
        })
        .catch(error => {
          console.error('Erro ao buscar CEP:', error);
        });
    }
  }
}