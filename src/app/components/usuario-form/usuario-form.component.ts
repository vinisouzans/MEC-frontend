// src/app/components/usuario-form/usuario-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario, UsuarioCreate, UsuarioUpdate } from '../../models/usuario.model';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})
export class UsuarioFormComponent implements OnInit {
  usuario: UsuarioCreate = {
    nome: '',
    userName: '',
    primeiroNome: '',
    sobrenome: '',
    dataNascimento: new Date(),
    cpf: '',
    rg: '',
    email: '',
    role: 'vendedor',
    senha: '',
    ativo: true,
    sexo: '',
    rua: '',
    bairro: '',
    cidade: '',
    uf: '',
    cep: ''
  };

  isEdit = false;
  loading = false;
  error = '';
  id?: number;

  roles = [
    { value: 'vendedor', label: 'Vendedor' },
    { value: 'gerente', label: 'Gerente' },
    { value: 'Administrador', label: 'Administrador' }
  ];

  ufs = [
    'AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 
    'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 
    'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'
  ];

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isEdit = !!this.id;

    if (this.isEdit && this.id) {
      this.carregarUsuario(this.id);
    }
  }

  carregarUsuario(id: number): void {
    this.loading = true;
    this.usuarioService.getUsuario(id).subscribe({
      next: (usuario) => {
        // Converter para UsuarioCreate (remover campos que não estão no DTO)
        this.usuario = { ...usuario, senha: '' } as any;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Erro ao carregar usuário';
        this.loading = false;
        console.error('Erro:', error);
      }
    });
  }

  onSubmit(): void {
    this.loading = true;
    this.error = '';

    if (this.isEdit && this.id) {
      this.usuarioService.updateUsuario(this.id, this.usuario as UsuarioUpdate).subscribe({
        next: () => {
          this.router.navigate(['/usuarios']);
        },
        error: (error) => {
          this.handleError(error, 'atualizar');
        }
      });
    } else {
      this.usuarioService.createUsuario(this.usuario).subscribe({
        next: () => {
          this.router.navigate(['/usuarios']);
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
      this.error = error.error || `Erro ao ${action} usuário. Verifique os dados.`;
    } else if (error.status === 401) {
      this.error = 'Você não tem permissão para realizar esta ação';
    } else {
      this.error = `Erro ao ${action} usuário`;
    }
    
    console.error('Erro:', error);
  }

  formatarCpf(event: any): void {
    let cpf = event.target.value.replace(/\D/g, '');
    
    if (cpf.length > 11) {
      cpf = cpf.substring(0, 11);
    }
    
    if (cpf.length > 9) {
      cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (cpf.length > 6) {
      cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3');
    } else if (cpf.length > 3) {
      cpf = cpf.replace(/(\d{3})(\d{3})/, '$1.$2');
    }
    
    this.usuario.cpf = cpf;
  }

  formatarCep(event: any): void {
    let cep = event.target.value.replace(/\D/g, '');
    
    if (cep.length > 8) {
      cep = cep.substring(0, 8);
    }
    
    if (cep.length > 5) {
      cep = cep.replace(/(\d{5})(\d{3})/, '$1-$2');
    }
    
    this.usuario.cep = cep;
  }
}