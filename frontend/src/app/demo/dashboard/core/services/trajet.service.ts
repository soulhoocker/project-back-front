import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trajet } from '../../../../models/MissionModel'; // Adjust the path if necessary

@Injectable({
  providedIn: 'root'
})
export class TrajetService {
  private apiUrl = 'http://localhost:8089/transporter/api/trajets'; // ✅ Update if your backend URL is different

  constructor(private http: HttpClient) {}

  // Get all trajets
  getAllTrajets(): Observable<Trajet[]> {
    return this.http.get<Trajet[]>(this.apiUrl);
  }

  // Get a specific trajet by ID
  getTrajetById(id: number): Observable<Trajet> {
    return this.http.get<Trajet>(`${this.apiUrl}/${id}`);
  }

  // Create a new trajet
  createTrajet(trajet: Trajet): Observable<Trajet> {
    return this.http.post<Trajet>(this.apiUrl, trajet);
  }

  // Update an existing trajet
  updateTrajet(id: number, trajet: Trajet): Observable<Trajet> {
    return this.http.put<Trajet>(`${this.apiUrl}/${id}`, trajet);
  }

  // Delete a trajet
  deleteTrajet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
