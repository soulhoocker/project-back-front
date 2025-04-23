// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
// Define the UtilisateurDTO interface within the service
export interface UtilisateurDTO {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  role: string;
  login: string;
  password: string;
  dateInscription: string;
  statutActivation: boolean;
}
@Injectable({
  providedIn: 'root'
})

export class UserService {

  private apiUrl = 'http://localhost:8089/api/utilisateurs'; // Adjust the URL as needed

  constructor(private http: HttpClient) {}



// Create a new user
createUtilisateur(utilisateurDTO: UtilisateurDTO): Observable<UtilisateurDTO> {
  return this.http.post<UtilisateurDTO>(`${this.apiUrl}/api/utilisateurs`, utilisateurDTO);
}

// Get a user by ID
getUtilisateurById(id: number): Observable<UtilisateurDTO> {
  return this.http.get<UtilisateurDTO>(`${this.apiUrl}/api/utilisateurs/${id}`);
}

// Get all users
  getAllUtilisateurs(): Observable<UtilisateurDTO[]> {
    return this.http.get<UtilisateurDTO[]>('http://localhost:8089/transporter/utilisateur/');
  }

// Update an existing user
updateUtilisateur(id: number, utilisateurDTO: UtilisateurDTO): Observable<UtilisateurDTO> {
  return this.http.put<UtilisateurDTO>(`${this.apiUrl}/api/utilisateurs/${id}`, utilisateurDTO);
}

// Delete a user by ID
deleteUtilisateur(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/api/utilisateurs/${id}`);
}
}
