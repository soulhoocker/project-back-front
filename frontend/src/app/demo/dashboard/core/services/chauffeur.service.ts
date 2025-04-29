import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chauffeur } from '../../../../models/MissionModel'; // adjust the path if needed

@Injectable({
  providedIn: 'root'
})
export class ChauffeurService {
  private apiUrl = 'http://localhost:8089/transporter/api/chauffeurs'; // ✅ adjust backend URL if different

  constructor(private http: HttpClient) {}

  // Get all chauffeurs
  getAllChauffeurs(): Observable<Chauffeur[]> {
    return this.http.get<Chauffeur[]>(this.apiUrl);
  }

  // Get a chauffeur by ID
  getChauffeurById(id: number): Observable<Chauffeur> {
    return this.http.get<Chauffeur>(`${this.apiUrl}/${id}`);
  }

  // Create a new chauffeur
  createChauffeur(chauffeur: Chauffeur): Observable<Chauffeur> {
    return this.http.post<Chauffeur>(this.apiUrl, chauffeur);
  }

  // Update a chauffeur
  updateChauffeur(id: number, chauffeur: Chauffeur): Observable<Chauffeur> {
    return this.http.put<Chauffeur>(`${this.apiUrl}/${id}`, chauffeur);
  }

  // Delete a chauffeur
  deleteChauffeur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
