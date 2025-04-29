import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Localisation } from '../../../../models/MissionModel'; // Assure-toi que le chemin est correct

@Injectable({
  providedIn: 'root'
})
export class LocalisationService {
  private apiUrl = 'http://localhost:8089/transporter/api/localisations'; // URL de ton backend

  constructor(private http: HttpClient) {}

  // Create or Update Localisation
  createOrUpdateLocalisation(localisation: Localisation): Observable<Localisation> {
    return this.http.post<Localisation>(this.apiUrl, localisation);
  }

  // Get all Localisations
  getAllLocalisations(): Observable<Localisation[]> {
    return this.http.get<Localisation[]>(this.apiUrl);
  }

  // Get Localisation by ID
  getLocalisationById(id: number): Observable<Localisation> {
    return this.http.get<Localisation>(`${this.apiUrl}/${id}`);
  }

  // Update Localisation by ID
  updateLocalisation(id: number, localisation: Localisation): Observable<Localisation> {
    return this.http.put<Localisation>(`${this.apiUrl}/${id}`, localisation);
  }

  // Delete Localisation by ID
  deleteLocalisation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
