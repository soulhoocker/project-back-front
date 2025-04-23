import { Component, OnInit } from '@angular/core';
import { Bus, DispoBus, Chauffeur, DispoChauffeur } from '../../../models/MissionModel';
import { ModeratorDashboardService } from '../core/services/moderator-dashboard.service';

@Component({
  selector: 'app-moderator-dashboard',
  templateUrl: './moderator-dashboard.component.html',
  styleUrls: ['./moderator-dashboard.component.scss']
})
export class ModeratorDashboardComponent implements OnInit {
  activeTab: 'buses' | 'chauffeurs' = 'buses';

  // Bus data
  buses: Bus[] = [];
  selectedBus?: Bus;
  newBus: Partial<Bus> = {};
  busDisponibilites: DispoBus[] = [];
  newDispoBus: Partial<DispoBus> = {};

  // Chauffeur data
  chauffeurs: Chauffeur[] = [];
  selectedChauffeur?: Chauffeur;
  newChauffeur: Partial<Chauffeur> = {};
  chauffeurDisponibilites: DispoChauffeur[] = [];
  newDispoChauffeur: Partial<DispoChauffeur> = {};

  constructor(private dashboardService: ModeratorDashboardService) { }

  ngOnInit(): void {
    this.loadBuses();
    this.loadChauffeurs();
  }

  /* ========== BUS CRUD ========== */
  loadBuses(): void {
    this.dashboardService.getAllBuses().subscribe({
      next: (data) => this.buses = data,
      error: (err) => console.error('Error loading buses:', err)
    });
  }

  createBus(): void {
    this.dashboardService.createBus(this.newBus).subscribe({
      next: () => {
        this.loadBuses();
        this.newBus = {};
      },
      error: (err) => console.error('Error creating bus:', err)
    });
  }

  updateBus(): void {
    if (this.selectedBus) {
      this.dashboardService.updateBus(this.selectedBus.id, this.selectedBus).subscribe({
        next: () => {
          this.loadBuses();
          this.selectedBus = undefined;
        },
        error: (err) => console.error('Error updating bus:', err)
      });
    }
  }

  deleteBus(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce bus?')) {
      this.dashboardService.deleteBus(id).subscribe({
        next: () => this.loadBuses(),
        error: (err) => console.error('Error deleting bus:', err)
      });
    }
  }

  /* ========== BUS DISPONIBILITE ========== */
  loadBusDisponibilites(busId: string): void {
    this.dashboardService.getBusDisponibilites(busId).subscribe({
      next: (data) => this.busDisponibilites = data,
      error: (err) => console.error('Error loading bus disponibilites:', err)
    });
  }

  addBusDisponibilite(): void {
    if (this.selectedBus) {
      this.dashboardService.addBusDisponibilite(this.selectedBus.id, this.newDispoBus).subscribe({
        next: () => {
          this.loadBusDisponibilites(this.selectedBus!.id);
          this.newDispoBus = {};
        },
        error: (err) => console.error('Error adding bus disponibilite:', err)
      });
    }
  }

  removeBusDisponibilite(dispoId: number): void {
    if (this.selectedBus && confirm('Êtes-vous sûr de vouloir supprimer cette disponibilité?')) {
      this.dashboardService.removeBusDisponibilite(this.selectedBus.id, dispoId).subscribe({
        next: () => this.loadBusDisponibilites(this.selectedBus!.id),
        error: (err) => console.error('Error removing bus disponibilite:', err)
      });
    }
  }

  /* ========== CHAUFFEUR CRUD ========== */
  loadChauffeurs(): void {
    this.dashboardService.getAllChauffeurs().subscribe({
      next: (data) => this.chauffeurs = data,
      error: (err) => console.error('Error loading chauffeurs:', err)
    });
  }

  createChauffeur(): void {
    this.dashboardService.createChauffeur(this.newChauffeur).subscribe({
      next: () => {
        this.loadChauffeurs();
        this.newChauffeur = {};
      },
      error: (err) => console.error('Error creating chauffeur:', err)
    });
  }

  updateChauffeur(): void {
    if (this.selectedChauffeur) {
      this.dashboardService.updateChauffeur(this.selectedChauffeur.id, this.selectedChauffeur).subscribe({
        next: () => {
          this.loadChauffeurs();
          this.selectedChauffeur = undefined;
        },
        error: (err) => console.error('Error updating chauffeur:', err)
      });
    }
  }

  deleteChauffeur(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce chauffeur?')) {
      this.dashboardService.deleteChauffeur(id).subscribe({
        next: () => this.loadChauffeurs(),
        error: (err) => console.error('Error deleting chauffeur:', err)
      });
    }
  }

  /* ========== CHAUFFEUR DISPONIBILITE ========== */
  loadChauffeurDisponibilites(chauffeurId: number): void {
    this.dashboardService.getChauffeurDisponibilites(chauffeurId).subscribe({
      next: (data) => this.chauffeurDisponibilites = data,
      error: (err) => console.error('Error loading chauffeur disponibilites:', err)
    });
  }

  addChauffeurDisponibilite(): void {
    if (this.selectedChauffeur) {
      this.dashboardService.addChauffeurDisponibilite(this.selectedChauffeur.id, this.newDispoChauffeur).subscribe({
        next: () => {
          this.loadChauffeurDisponibilites(this.selectedChauffeur!.id);
          this.newDispoChauffeur = {};
        },
        error: (err) => console.error('Error adding chauffeur disponibilite:', err)
      });
    }
  }

  removeChauffeurDisponibilite(dispoId: number): void {
    if (this.selectedChauffeur && confirm('Êtes-vous sûr de vouloir supprimer cette disponibilité?')) {
      this.dashboardService.removeChauffeurDisponibilite(this.selectedChauffeur.id, dispoId).subscribe({
        next: () => this.loadChauffeurDisponibilites(this.selectedChauffeur!.id),
        error: (err) => console.error('Error removing chauffeur disponibilite:', err)
      });
    }
  }
}
