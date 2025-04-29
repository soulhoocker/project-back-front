import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExecutionMission } from '../../../../models/MissionModel';  // Assure-toi d'ajuster le chemin

@Injectable({
  providedIn: 'root'
})
export class ExecutionMissionService {
  private apiUrl = 'http://localhost:8089/api/executionmissions'; // URL de ton backend

  constructor(private http: HttpClient) {}

  // Create or Update an ExecutionMission
  createOrUpdateExecutionMission(executionMission: ExecutionMission): Observable<ExecutionMission> {
    return this.http.post<ExecutionMission>(this.apiUrl, executionMission);
  }

  // Get all ExecutionMissions
  getAllExecutionMissions(): Observable<ExecutionMission[]> {
    return this.http.get<ExecutionMission[]>(this.apiUrl);
  }

  // Get an ExecutionMission by ID
  getExecutionMissionById(id: number): Observable<ExecutionMission> {
    return this.http.get<ExecutionMission>(`${this.apiUrl}/${id}`);
  }

  // Update an ExecutionMission by ID
  updateExecutionMission(id: number, executionMission: ExecutionMission): Observable<ExecutionMission> {
    return this.http.put<ExecutionMission>(`${this.apiUrl}/${id}`, executionMission);
  }

  // Delete an ExecutionMission by ID
  deleteExecutionMission(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
