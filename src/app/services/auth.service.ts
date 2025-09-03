import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse } from '../models/auth.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService { 
  private apiUrl = `${environment.apiUrl}/auth`;
  private tokenKey = 'authToken';
  private currentUserSubject = new BehaviorSubject<any>(null);
  
  // Nova forma de injetar dependências no Angular v17+
  private http = inject(HttpClient);

  constructor() {
    this.loadToken();
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          this.storeToken(response.token);
          this.currentUserSubject.next({
            nome: response.nome,
            role: response.role
          });
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getCurrentUser() {
    return this.currentUserSubject.asObservable();
  }

  private storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private loadToken(): void {
    const token = this.getToken();
    if (token) {
      // Decodificar o token JWT para obter informações do usuário
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.currentUserSubject.next({
          nome: payload.name,
          role: payload.role
        });
      } catch (error) {
        this.logout();
      }
    }
  }
}