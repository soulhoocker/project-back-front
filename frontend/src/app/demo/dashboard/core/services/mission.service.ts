import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mission } from '../../../../models/MissionModel'; // Import MissionDTO model

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  private apiUrl = `http://localhost:8089/transporter/api/missions`;

  constructor(private http: HttpClient) {}

  // Create Mission
  createMission(missionDTO: Mission): Observable<Mission> {
    return this.http.post<Mission>(this.apiUrl, missionDTO, this.getHttpOptions());
  }

  // Get Mission by ID
  getMissionById(id: number): Observable<Mission> {
    return this.http.get<Mission>(`${this.apiUrl}/${id}`, this.getHttpOptions());
  }

  // Get All Missions
  getAllMissions(): Observable<Mission[]> {
    return this.http.get<Mission[]>(this.apiUrl, this.getHttpOptions());
  }

  // Update Mission
  updateMission(id: number, missionDTO: Mission): Observable<Mission> {
    return this.http.put<Mission>(`${this.apiUrl}/${id}`, missionDTO, this.getHttpOptions());
  }

  // Delete Mission
  deleteMission(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.getHttpOptions());
  }

  // Start Mission Execution
  startMissionExecution(id: number): Observable<Mission> {
    return this.http.post<Mission>(`${this.apiUrl}/${id}/start`, null, this.getHttpOptions());
  }

  // Check if Mission can be executed
  canExecuteMission(id: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/${id}/can-execute`, this.getHttpOptions());
  }

  // Private method to get HTTP options with authorization headers
  private getHttpOptions() {
    const token = localStorage.getItem('authToken'); // Get the token from localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return { headers };
  }
}
