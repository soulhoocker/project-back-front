import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExceptionMission } from '../../../../models/MissionModel'; // Assure-toi que le chemin du modèle est correct

@Injectable({
  providedIn: 'root'
})
export class ExeptionMissionService {
  private apiUrl = 'http://localhost:8089/transporter/api/exeptionmissions'; // URL de ton backend

  constructor(private http: HttpClient) {}

  // Create or Update an ExeptionMission
  createOrUpdateExeptionMission(exeptionMission: ExceptionMission): Observable<ExceptionMission> {
    return this.http.post<ExceptionMission>(this.apiUrl, exeptionMission);
  }

  // Get all ExeptionMissions
  getAllExeptionMissions(): Observable<ExceptionMission[]> {
    return this.http.get<ExceptionMission[]>(this.apiUrl);
  }

  // Get an ExeptionMission by ID
  getExeptionMissionById(id: number): Observable<ExceptionMission> {
    return this.http.get<ExceptionMission>(`${this.apiUrl}/${id}`);
  }

  // Update an ExeptionMission by ID
  updateExeptionMission(id: number, exeptionMission: ExceptionMission): Observable<ExceptionMission> {
    return this.http.put<ExceptionMission>(`${this.apiUrl}/${id}`, exeptionMission);
  }

  // Delete an ExeptionMission by ID
  deleteExeptionMission(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
