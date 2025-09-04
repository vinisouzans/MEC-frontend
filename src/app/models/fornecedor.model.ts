// src/app/models/fornecedor.model.ts
export interface Fornecedor {
  id: number;
  nome: string;
  nomeFantasia?: string;
  cnpj: string;
  inscricaoEstadual?: string;
  email?: string;
  telefone?: string;
  celular?: string;
  cep?: string;
  endereco?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  observacoes?: string;
  ativo: boolean;
  dataCadastro: Date;
}

export interface FornecedorCreate {
  nome: string;
  nomeFantasia?: string;
  cnpj: string;
  inscricaoEstadual?: string;
  email?: string;
  telefone?: string;
  celular?: string;
  cep?: string;
  endereco?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  observacoes?: string;
}

export interface FornecedorUpdate {
  nome: string;
  nomeFantasia?: string;
  inscricaoEstadual?: string;
  email?: string;
  telefone?: string;
  celular?: string;
  cep?: string;
  endereco?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  observacoes?: string;
  ativo: boolean;
}