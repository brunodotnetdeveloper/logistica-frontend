import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddressViewModel, ClientViewModel } from '../models/client';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'https://localhost:7102/api/clients'; // URL base da sua API

  constructor(private http: HttpClient) { }

  // Obter todos os clientes
  getAll(): Observable<ClientViewModel[]> {
    return this.http.get<ClientViewModel[]>(this.apiUrl);
  }

  // Obter cliente por ID
  getClientById(id: number): Observable<ClientViewModel> {
    return this.http.get<ClientViewModel>(`${this.apiUrl}/${id}`);
  }

  // Criar um novo cliente
  createClient(client: ClientViewModel): Observable<ClientViewModel> {
    return this.http.post<ClientViewModel>(this.apiUrl, client);
  }

  // Atualizar um cliente existente
  updateClient(id: number, client: ClientViewModel): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, client);
  }

  // Excluir um cliente
  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Obter endereços do cliente
  getClientAddresses(id: number): Observable<AddressViewModel[]> {
    return this.http.get<AddressViewModel[]>(`${this.apiUrl}/${id}/addresses`);
  }

  // Adicionar um endereço ao cliente
  addAddressToClient(id: number, address: AddressViewModel): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/addresses`, address);
  }
}