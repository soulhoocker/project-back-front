import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define the UtilisateurDTO interface
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

  // Utilisation de l'URL relative pour que le proxy fonctionne
  private apiUrl = 'http://localhost:8089/transporter/api/utilisateurs';

  constructor(private http: HttpClient) {}

  // Créer un nouvel utilisateur
  createUtilisateur(utilisateurDTO: UtilisateurDTO): Observable<UtilisateurDTO> {
    return this.http.post<UtilisateurDTO>(this.apiUrl, utilisateurDTO);
  }

  // Récupérer un utilisateur par son ID
  getUtilisateurById(id: number): Observable<UtilisateurDTO> {
    return this.http.get<UtilisateurDTO>(`${this.apiUrl}/${id}`);
  }

  // Récupérer tous les utilisateurs
  getAllUtilisateurs(): Observable<UtilisateurDTO[]> {
    return this.http.get<UtilisateurDTO[]>(this.apiUrl);
  }

  // Mettre à jour un utilisateur
  updateUtilisateur(id: number, utilisateurDTO: UtilisateurDTO): Observable<UtilisateurDTO> {
    return this.http.put<UtilisateurDTO>(`${this.apiUrl}/${id}`, utilisateurDTO);
  }

  // Supprimer un utilisateur
  deleteUtilisateur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
