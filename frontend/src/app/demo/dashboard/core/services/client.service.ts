import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../../../../models/MissionModel'; // Adjust the path if necessary

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'http://localhost:8089/transporter/api/clients'; // ✅ Update if your backend URL is different

  constructor(private http: HttpClient) {}

  // Get all clients
  getAllClients(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);  // Ensure this endpoint is correct
  }

  // Get a specific client by ID
  getClientById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/${id}`);
  }

  // Create a new client
  saveClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, client);
  }

  // Update an existing client
  updateClient(client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/${client.id}`, client);
  }

  // Delete a client
  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


}
