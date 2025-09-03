export interface Usuario {
  id: number;
  nome: string;
  userName: string;
  primeiroNome: string;
  sobrenome: string;
  dataNascimento: Date;
  cpf: string;
  rg?: string;
  email: string;
  role: string; // vendedor, gerente, admin
  ativo: boolean;
  dataCriacao: Date;
  dataAlteracao?: Date;
  sexo?: string;
  rua?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
  cep?: string;
}

export interface UsuarioCreate {
  nome: string;
  userName: string;
  primeiroNome: string;
  sobrenome: string;
  dataNascimento: Date;
  cpf: string;
  rg?: string;
  email: string;
  role: string;
  senha?: string;
  ativo: boolean;
  sexo?: string;
  rua?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
  cep?: string;
}

export interface UsuarioUpdate {
  nome: string;
  userName: string;
  primeiroNome: string;
  sobrenome: string;
  dataNascimento: Date;
  cpf: string;
  rg?: string;
  email: string;
  role: string;
  senha?: string;
  ativo: boolean;
  sexo?: string;
  rua?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
  cep?: string;
}