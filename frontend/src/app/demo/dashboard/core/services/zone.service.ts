import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Zone } from '../../../../models/MissionModel'; // Adjust the path if necessary

@Injectable({
  providedIn: 'root'
})
export class ZoneService {
  private apiUrl = 'http://localhost:8089/transporter/api/zones'; // ✅ Update if your backend URL is different

  constructor(private http: HttpClient) {}

  // Get all zones
  getAllZones(): Observable<Zone[]> {
    return this.http.get<Zone[]>(this.apiUrl);
  }

  // Get a specific zone by ID
  getZoneById(id: number): Observable<Zone> {
    return this.http.get<Zone>(`${this.apiUrl}/${id}`);
  }

  // Create a new zone
  createZone(zone: Zone): Observable<Zone> {
    return this.http.post<Zone>(this.apiUrl, zone);
  }

  // Update an existing zone
  updateZone(zone: any) {
    return this.http.put(`${this.apiUrl}/${zone.id}`, zone);
  }

  // Delete a zone
  deleteZone(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
