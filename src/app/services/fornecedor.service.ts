// src/app/services/fornecedor.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Fornecedor, FornecedorCreate, FornecedorUpdate } from '../models/fornecedor.model';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/fornecedor`;

  getFornecedores(): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(this.apiUrl);
  }

  getFornecedor(id: number): Observable<Fornecedor> {
    return this.http.get<Fornecedor>(`${this.apiUrl}/${id}`);
  }

  createFornecedor(fornecedor: FornecedorCreate): Observable<Fornecedor> {
    return this.http.post<Fornecedor>(this.apiUrl, fornecedor);
  }

  updateFornecedor(id: number, fornecedor: FornecedorUpdate): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, fornecedor);
  }

  deleteFornecedor(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getProdutosFornecedor(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}/produtos`);
  }
}