import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Trajet } from '../../models/MissionModel';  // Adjust path as needed
import { Zone } from '../../models/MissionModel';      // Adjust path as needed
import { Client } from '../../models/MissionModel';
import {CommonModule} from "@angular/common";
import {ZoneService} from "../../demo/dashboard/core/services/zone.service";
import {ClientService} from "../../demo/dashboard/core/services/client.service";
import {BusService} from "../../demo/dashboard/core/services/bus.service";  // Adjust path as needed

@Component({
  selector: 'app-trajet-modal',
  templateUrl: './trajet-modal.component.html',
  standalone: true,  // Make sure this is set if it's a standalone component

  styleUrls: ['./trajet-modal.component.scss'],
  imports: [
    ReactiveFormsModule,
    CommonModule
  ]
})
export class TrajetModalComponent implements OnInit {
  @Input() trajet: any; // ton trajet passé en modification (optionnel)
  @Output() save = new EventEmitter<Trajet>();
  @Output() close = new EventEmitter<void>(); // <- si tu veux aussi fermer le modal

  trajetForm: FormGroup;
  zones: Zone[] = [];  // Assuming you'll load these from a service
  clients: Client[] = [];  // Assuming you'll load these from a service
  buses = [];  // Declare the buses array

  constructor(private fb: FormBuilder,private zoneService: ZoneService ,
              private clientService: ClientService,
              private busService: BusService
  ) {
    this.trajetForm = this.fb.group({
      id: [''],
      dateDemarrageContrat: ['', Validators.required],
      dateFinContrat: ['', Validators.required],
      distanceMoyenne: [0, [Validators.required, Validators.min(0.1)]],
      dureeMoyenne: [0, [Validators.required, Validators.min(1)]],
      coutKm: [0, [Validators.required, Validators.min(0)]],
      typeTarification: ['', Validators.required],
      montantForfaitaire: [0, [Validators.required, Validators.min(0)]],
      zoneId: ['', Validators.required],
      clientId: ['', Validators.required],
      busId: ['', Validators.required]  // Ajoutez ceci
    });


  }

  ngOnInit(): void {
    if (this.trajet) {
      this.trajetForm.patchValue(this.trajet);  // Populate the form if there's an existing trajet
    } else {
      console.warn('Aucun trajet trouvé pour la modification');
    }
    this.loadZones(); // Load zones
    this.loadClients(); // Load clients
    this.loadBuses();  // Chargez les buses ici

  }

  loadBuses(): void {
    this.busService.getAllBuses().subscribe({
      next: (buses) => {
        this.buses = buses;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des buses', error);
      }
    });
  }

  loadClients(): void {
    this.clientService.getAllClients().subscribe({
      next: (clients) => {
        this.clients = clients;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des clients', error);
      }
    });
  }
  loadZones(): void {
    this.zoneService.getAllZones().subscribe({
      next: (zones) => {
        this.zones = zones;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des zones', error);
      }
    });
  }

  onSubmit(): void {
    if (this.trajetForm.valid) {
      this.save.emit(this.trajetForm.value);  // Emit the form data on save
    }
  }

  onClose(): void {
    this.close.emit();  // Emit close event to close the modal
  }
}
