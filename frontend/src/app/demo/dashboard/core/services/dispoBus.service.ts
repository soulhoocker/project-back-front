import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DispoBus } from '../../../../models/MissionModel'; // ajuste le chemin si nécessaire

@Injectable({
  providedIn: 'root'
})
export class DispoBusService {
  private apiUrl = 'http://localhost:8089/transporter/api/dispoBuses'; // ✅ adapte l'URL selon ton backend

  constructor(private http: HttpClient) {}

  // Create or Update a DispoBus
  saveOrUpdateDispoBus(dispoBus: any): Observable<any> {
    if (dispoBus.id) {
      // Si un id existe, on fait une mise à jour
      return this.http.put(`${this.apiUrl}/${dispoBus.id}`, dispoBus);
    } else {
      // Sinon, c'est un nouvel ajout
      return this.http.post(this.apiUrl, dispoBus);
    }
  }

  // Get all DispoBuses
  getAllDispoBuses(): Observable<DispoBus[]> {
    return this.http.get<DispoBus[]>(this.apiUrl);
  }

  // Get a DispoBus by ID
  getDispoBusById(id: number): Observable<DispoBus> {
    return this.http.get<DispoBus>(`${this.apiUrl}/${id}`);
  }

  // Update a DispoBus by ID
  updateDispoBus(id: number, dispoBus: DispoBus): Observable<DispoBus> {
    return this.http.put<DispoBus>(`${this.apiUrl}/${id}`, dispoBus);
  }

  // Delete a DispoBus by ID
  deleteDispoBus(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
