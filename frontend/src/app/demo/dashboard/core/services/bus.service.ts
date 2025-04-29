import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bus } from '../../../../models/MissionModel'; // adjust the path based on your structure

@Injectable({
  providedIn: 'root'
})
export class BusService {
  private apiUrl = 'http://localhost:8089/transporter/api/buses'; // 🔥 adjust if your server URL is different

  constructor(private http: HttpClient) {}

  // Get all buses
  getAllBuses(): Observable<Bus[]> {
    return this.http.get<Bus[]>(this.apiUrl);
  }

  // Create a new bus
  createBus(bus: Bus): Observable<Bus> {
    return this.http.post<Bus>(this.apiUrl, bus);
  }

  // Update an existing bus
  updateBus(id: number, bus: Bus): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/${id}`, bus);
  }

  // Delete a bus
  deleteBus(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
