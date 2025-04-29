import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { BusService } from '../core/services/bus.service'; // Ajuste le chemin si nécessaire
import {Bus, Client, Trajet} from '../../../models/MissionModel';
import {BusFormComponent} from "../../../features/buses/bus-form-modal/bus-form-modal.component";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DispoBusFormComponent} from "../../../features/buses/dispobus-form-modal/dispobus-form-modal.component";
import {DispoBusService} from "../core/services/dispoBus.service";
import {forkJoin} from "rxjs";
import {ZoneService} from "../core/services/zone.service";
import {TrajetService} from "../core/services/trajet.service";
import {TrajetModalComponent} from "../../../features/trajet-modal/trajet-modal.component";
import {ZoneModalComponent} from "../../../features/zone-modal/zone-modal.component";
import {ClientService} from "../core/services/client.service";
import {ClientModalComponent} from "../../../features/client-modal/client-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap"; // Ajuste aussi ici selon ton projet

@Component({
  selector: 'app-mod-dashboard',
  standalone: true,  // Make sure your dashboard component is standalone as well

  templateUrl: 'mod-dashboard.component.html',
  imports: [
    BusFormComponent,
    DispoBusFormComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TrajetModalComponent,
    ZoneModalComponent,
    ClientModalComponent
  ],
  styleUrls: ['mod-dashboard.component.scss']
})
export class ModDashboardComponent implements OnInit {
  buses: Bus[] = [];
  dispoBuses: any[] = []; // pour stocker toutes les disponibilités de bus
  availableBuses: Bus[] = [];
  unavailableBuses: Bus[] = [];

  selectedBus: Bus | null = null;
  modalOpen: boolean = false;
  dispoBusModalOpen: boolean = false;

  trajets: Trajet[] = []; // your list of trajets
  trajetModalOpen = false;
  selectedTrajet: Trajet | null = null;

  zones: any[] = []; // La liste des zones
  selectedZone: any | null = null;
  isZoneModalOpen = false;

  clients: any[] = [];  // Define the clients array to store the fetched data
  selectedClient: Client | null = null;
  clientModalOpen: boolean = false; // Example of an unused field

  constructor(
    private busService: BusService,
    private dispoBusService: DispoBusService,
    private zoneService: ZoneService,
    private trajetService: TrajetService,
    private cdRef: ChangeDetectorRef,
    private clientService: ClientService,  // Add a comma here
    private modalService: NgbModal  // Add a comma here
  ) {}

  ngOnInit(): void {
    forkJoin({
      buses: this.busService.getAllBuses(),
      dispoBuses: this.dispoBusService.getAllDispoBuses()
    }).subscribe(({ buses, dispoBuses }) => {
      console.log('Buses chargés:', buses);
      console.log('Disponibilités chargées:', dispoBuses);
      this.buses = buses;
      this.dispoBuses = dispoBuses;
      this.updateBusAvailability();
      this.loadZones();
      this.loadClients();
      this.loadTrajets();  // Load trajets when the component is initialized

    });
  }

  loadBuses(): void {
    this.busService.getAllBuses().subscribe((buses) => {
      this.buses = buses;
      console.log('Buses récupérés:', this.buses); // Vérifiez ici les données des buses

    });
  }


  openModal(): void {
    this.selectedBus = null;
    this.modalOpen = true;
  }

  closeModal(): void {
    this.modalOpen = false;
  }

  editBus(bus: Bus): void {
    this.selectedBus = { ...bus }; // Clone pour éviter les modifications directes
    this.modalOpen = true;
  }

  deleteBus(index: number): void {
    const busId = this.buses[index].id;
    if (confirm('Êtes-vous sûr de vouloir supprimer ce bus ?')) {
      this.busService.deleteBus(busId).subscribe(() => {
        this.buses = this.buses.filter(b => b.id !== busId);
      });
    }
  }


  onSaveBus(bus: any): void {
    if (bus.id) {
      // S'il a un id, c'est une mise à jour
      this.busService.updateBus(bus.id, bus).subscribe(() => {
        this.loadBuses();
        this.closeModal();
      });
    } else {
      // Sinon, c'est un ajout
      this.busService.createBus(bus).subscribe(() => {
        this.loadBuses();
        this.closeModal();
      });
    }
  }

  loadDispoBuses(): void {
    this.dispoBusService.getAllDispoBuses().subscribe((dispos) => {
      this.dispoBuses = dispos;
      this.updateBusAvailability(); // met à jour disponibles / indisponibles
    });
  }
  loadBusesAndUpdateAvailability(): void {
    this.busService.getAllBuses().subscribe((buses) => {
      this.buses = buses;
      this.updateBusAvailability();
    });
  }

  updateBusAvailability(): void {
    const today = new Date();
    this.availableBuses = [];
    this.unavailableBuses = [];

    // Affiche les buses et les disponibilités pour débogage
    console.log("DispoBuses:", this.dispoBuses);
    console.log("Buses:", this.buses);

    this.buses.forEach(bus => {
      // Vérification si le bus et l'indisponibilité existent avant d'accéder à bus.id et dispo.bus.id
      if (bus && bus.id) {
        const isUnavailable = this.dispoBuses.some(dispo =>
          dispo && dispo.busId === bus.id &&
          new Date(dispo.dateDebutIndisponibilite).getTime() <= today.getTime() &&
          new Date(dispo.dateFinIndisponibilite).getTime() >= today.getTime()
        );

        // Si le bus est indisponible, l'ajouter à la liste des buses indisponibles
        if (isUnavailable) {
          this.unavailableBuses.push(bus);
        } else {
          // Sinon, il est disponible et l'ajouter à la liste des buses disponibles
          this.availableBuses.push(bus);
        }
      }
    });

    console.log("Available Buses:", this.availableBuses);
    console.log("Unavailable Buses:", this.unavailableBuses);

    // Assurez-vous que Angular prend en compte le changement d'état
    this.cdRef.detectChanges();


  }






  openDispoBusModal(): void {
    this.dispoBusModalOpen = true;
  }

  closeDispoBusModal(): void {
    this.dispoBusModalOpen = false;
  }

  onSaveDispoBus(dispoBus: any): void {
    this.dispoBusService.saveOrUpdateDispoBus(dispoBus).subscribe(
      (savedDispo) => {
        console.log('DispoBus enregistré:', savedDispo);
        this.loadDispoBuses(); // Recharge toutes les disponibilités et met à jour l'affichage
        this.closeDispoBusModal();
      },
      (error) => {
        console.error('Erreur lors de l\'enregistrement de l\'indisponibilité :', error);
      }
    );
  }
// Methods for trajet ////////////////////////////////////////////////////////////////////////////////
  loadTrajets(): void {
    this.trajetService.getAllTrajets().subscribe(
      (data: Trajet[]) => {
        this.trajets = data;  // Store the fetched trajets
        console.log('Trajets loaded:', this.trajets);  // Log the loaded trajets
      },
      (error) => {
        console.error('Error fetching trajets', error);  // Handle any errors
      }
    );
  }

  openTrajetModal() {
    this.selectedTrajet = null;
    this.trajetModalOpen = true;
  }

  editTrajet(trajet: Trajet) {
    this.selectedTrajet = { ...trajet };
    this.trajetModalOpen = true;
  }

  closeTrajetModal() {
    this.trajetModalOpen = false;
  }

  onSaveTrajet(trajet: Trajet) {
    if (trajet.id) {
      // Update existing trajet
      this.trajetService.updateTrajet(trajet.id,trajet).subscribe({
        next: (updatedTrajet) => {
          const index = this.trajets.findIndex(t => t.id === trajet.id);
          if (index !== -1) {
            this.trajets[index] = updatedTrajet; // Update the existing trajet
          }
        },
        error: (error) => {
          console.error('Error updating trajet', error);
        }
      });
    } else {
      // Create new trajet
      this.trajetService.createTrajet(trajet).subscribe({
        next: (savedTrajet) => {
          this.trajets.push(savedTrajet); // Add the new trajet to the list
        },
        error: (error) => {
          console.error('Error saving trajet', error);
        }
      });
    }
    this.closeTrajetModal(); // Close the modal after saving
  }

  deleteTrajet(index: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce trajet ?')) {
      this.trajets.splice(index, 1);
    }
  }
// Methods for zone////////////////////////////////////////////////////////////////////////////////

  loadZones(): void {
    this.zoneService.getAllZones().subscribe((data) => {
      this.zones = data;
    });
  }

  openCreateZoneModal(): void {
    this.selectedZone = null;
    this.isZoneModalOpen = true;
  }

  openEditZoneModal(zone: any): void {
    this.selectedZone = { ...zone };
    this.isZoneModalOpen = true;
  }

  onSaveZone(zoneData: any): void {
    if (zoneData.id) {
      // Update
      this.zoneService.updateZone(zoneData).subscribe(() => {
        this.loadZones();
        this.isZoneModalOpen = false;
      });
    } else {
      // Create
      this.zoneService.createZone(zoneData).subscribe(() => {
        this.loadZones();
        this.isZoneModalOpen = false;
      });
    }
  }

  onCancelZone(): void {
    this.isZoneModalOpen = false;
  }

// Methods for client////////////////////////////////////////////////////////////////////////////////

  loadClients(): void {
    this.clientService.getAllClients().subscribe(
      (data) => {
        this.clients = data;
        console.log('Clients loaded:', this.clients);  // Optional: log the loaded clients
      },
      (error) => {
        console.error('Error loading clients', error);  // Optional: log any errors
      }
    );
  }

  openClientModal(): void {
    const modalRef = this.modalService.open(ClientModalComponent, { size: 'lg' }); // Option pour la taille
    modalRef.componentInstance.client = this.selectedClient; // Pass selectedClient if editing
    modalRef.result.then(() => {
      this.loadClients(); // Reload clients after modal action (save/edit)
    }).catch(() => {});
  }

  onClientSaved(client: Client): void {
    console.log('Client enregistré :', client);
    this.loadClients(); // recharge tous les clients
    this.clientModalOpen = false;
  }

  editClient(client: Client): void {
    this.selectedClient = client;
    this.openClientModal();
  }

  deleteClient(index: number): void {
    const clientId = this.clients[index].id;
    if (confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
      this.clientService.deleteClient(clientId).subscribe(() => {
        this.clients = this.clients.filter(c => c.id !== clientId);
      });
    }
  }
  toggleClientModal(): void {
    this.clientModalOpen = !this.clientModalOpen; // Make sure this is used somewhere
  }

  closeClientModal(): void {
    this.clientModalOpen = false;
    console.log('Modal closed');
  }


  protected readonly oncancel = oncancel;
}
