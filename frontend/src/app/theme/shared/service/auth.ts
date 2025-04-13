import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponseDTO, LoginRequest, RegisterRequest } from '../../../models/auth.model';  // Assure-toi que RegisterRequest est importé correctement

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Base URL for the API
  private apiUrl = 'http://localhost:8089/transporter';

  constructor(private http: HttpClient) {}

  // Méthode de connexion
  login(data: LoginRequest): Observable<AuthResponseDTO> {
    return this.http.post<AuthResponseDTO>(`${this.apiUrl}/auth/login`, data);
  }

  // Méthode d'inscription
  signup(data: RegisterRequest): Observable<AuthResponseDTO> {
    return this.http.post<AuthResponseDTO>(`${this.apiUrl}/auth/register`, data);  // Change l'URL si nécessaire
  }
}
