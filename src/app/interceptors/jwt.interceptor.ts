// src/app/interceptors/jwt.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  
  console.log('Token limpo:', token); // Deve ser apenas o token, sem "Bearer"
  
  if (token) {
    // CERTIFIQUE-SE que o token NÃO contém "Bearer"
    
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}` // Adiciona "Bearer" apenas aqui
      }
    });
  }

  return next(req);
};