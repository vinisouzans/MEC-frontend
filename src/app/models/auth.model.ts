export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginResponse {
  token: string;
  expiraEm: Date;
  nome: string;
  role: string;
}