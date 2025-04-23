// src/app/services/moderator-dashboard.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import {
  Mission, Trajet, Bus, DispoBus, Chauffeur, DispoChauffeur,
  Client, Localisation, Incident, ExceptionMission, Facture, Notification, Zone
} from '../../../../models/MissionModel'
@Injectable({
  providedIn: 'root'
})
export class ModeratorDashboardService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Mission CRUD
  getMissions(): Observable<Mission[]> {
    return this.http.get<Mission[]>(`${this.apiUrl}/missions`);
  }

  createMission(mission: Partial<Mission>): Observable<Mission> {
    return this.http.post<Mission>(`${this.apiUrl}/missions`, mission);
  }

  deleteMission(mission: string): Observable<Mission> {
    return this.http.post<Mission>(`${this.apiUrl}/missions`, mission);
  }

  // Bus CRUD
  getAllBuses(): Observable<Bus[]> {
    return this.http.get<Bus[]>(this.apiUrl);
  }

  getBusById(id: number): Observable<Bus> {
    return this.http.get<Bus>(`${this.apiUrl}/${id}`);
  }

  createBus(bus: Partial<Bus>): Observable<Bus> {
    return this.http.post<Bus>(this.apiUrl, bus);
  }

  updateBus(id: string, bus: Partial<Bus>): Observable<Bus> {
    return this.http.put<Bus>(`${this.apiUrl}/${id}`, bus);
  }

  deleteBus(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getBusDisponibilites(busId: string): Observable<DispoBus[]> {
    return this.http.get<DispoBus[]>(`${this.apiUrl}/${busId}/disponibilites`);
  }

  addBusDisponibilite(busId: string, dispo: Partial<DispoBus>): Observable<DispoBus> {
    return this.http.post<DispoBus>(`${this.apiUrl}/${busId}/disponibilites`, dispo);
  }

  removeBusDisponibilite(busId: string, dispoId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${busId}/disponibilites/${dispoId}`);
  }
  // Chauffeur CRUD
  getAllChauffeurs(): Observable<Chauffeur[]> {
    return this.http.get<Chauffeur[]>(this.apiUrl);
  }

  getChauffeurById(id: number): Observable<Chauffeur> {
    return this.http.get<Chauffeur>(`${this.apiUrl}/${id}`);
  }

  createChauffeur(chauffeur: Partial<Chauffeur>): Observable<Chauffeur> {
    return this.http.post<Chauffeur>(this.apiUrl, chauffeur);
  }

  updateChauffeur(id: number, chauffeur: Partial<Chauffeur>): Observable<Chauffeur> {
    return this.http.put<Chauffeur>(`${this.apiUrl}/${id}`, chauffeur);
  }

  deleteChauffeur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // DispoChauffeur methods
  getChauffeurDisponibilites(chauffeurId: number): Observable<DispoChauffeur[]> {
    return this.http.get<DispoChauffeur[]>(`${this.apiUrl}/${chauffeurId}/disponibilites`);
  }

  addChauffeurDisponibilite(chauffeurId: number, dispo: Partial<DispoChauffeur>): Observable<DispoChauffeur> {
    return this.http.post<DispoChauffeur>(`${this.apiUrl}/${chauffeurId}/disponibilites`, dispo);
  }

  removeChauffeurDisponibilite(chauffeurId: number, dispoId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${chauffeurId}/disponibilites/${dispoId}`);
  }

  // Client CRUD
  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}/clients`);
  }

  // Trajet CRUD
  getTrajets(): Observable<Trajet[]> {
    return this.http.get<Trajet[]>(`${this.apiUrl}/trajets`);
  }

  // Other entities CRUD operations...
  // Add similar methods for Localisation, Incident, ExceptionMission, Facture, Notification, Zone
}
