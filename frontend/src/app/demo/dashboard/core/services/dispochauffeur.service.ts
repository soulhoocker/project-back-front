import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DispoChauffeur } from '../../../../models/MissionModel';  // Assure-toi d'ajuster le chemin

@Injectable({
  providedIn: 'root'
})
export class DispoChauffeurService {
  private apiUrl = 'http://localhost:8089/transporter/api/dispochauffeur'; // Vérifie l'URL de ton backend

  constructor(private http: HttpClient) {}

  // Create a new DispoChauffeur
  createDispoChauffeur(dispoChauffeur: DispoChauffeur): Observable<DispoChauffeur> {
    return this.http.post<DispoChauffeur>(this.apiUrl, dispoChauffeur);
  }

  // Get all DispoChauffeurs
  getAllDispoChauffeurs(): Observable<DispoChauffeur[]> {
    return this.http.get<DispoChauffeur[]>(this.apiUrl);
  }

  // Get a DispoChauffeur by ID
  getDispoChauffeurById(id: number): Observable<DispoChauffeur> {
    return this.http.get<DispoChauffeur>(`${this.apiUrl}/${id}`);
  }

  // Update an existing DispoChauffeur
  updateDispoChauffeur(id: number, dispoChauffeur: DispoChauffeur): Observable<DispoChauffeur> {
    return this.http.put<DispoChauffeur>(`${this.apiUrl}/${id}`, dispoChauffeur);
  }

  // Delete a DispoChauffeur by ID
  deleteDispoChauffeur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
