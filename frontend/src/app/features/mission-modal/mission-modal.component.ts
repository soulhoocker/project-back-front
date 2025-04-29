import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Mission } from '../../models/MissionModel';
import { Trajet } from '../../models/MissionModel';
import { Bus } from '../../models/MissionModel';
import { Chauffeur } from '../../models/MissionModel';
import { Client } from '../../models/MissionModel';
import { Localisation } from '../../models/MissionModel';

@Component({
  selector: 'app-mission-modal',
  templateUrl: './mission-modal.component.html',
  styleUrls: ['./mission-modal.component.css'],
  imports: [
    ReactiveFormsModule
  ]
})
export class MissionModalComponent implements OnInit {
  @Input() mission: Mission | null = null;
  @Output() save = new EventEmitter<Mission>();
  @Output() close = new EventEmitter<void>();

  missionForm: FormGroup;
  trajets: Trajet[] = [];
  buses: Bus[] = [];
  chauffeurs: Chauffeur[] = [];
  clients: Client[] = [];

  constructor(private fb: FormBuilder) {
    this.missionForm = this.fb.group({
      id: [''],
      trajetId: ['', Validators.required],
      busId: ['', Validators.required],
      chauffeurId: ['', Validators.required],
      clientId: ['', Validators.required],
      dateHeureDepart: ['', Validators.required],
      dateHeureArrivee: ['', Validators.required],
      statut: ['planifié', Validators.required],
      localisation: [''],
      incidents: [[]],
      exceptions: [[]],
      notifications: [[]],
      facture: [''],
      createdAt: [new Date()],
      updatedAt: [new Date()]
    });
  }

  ngOnInit(): void {
    if (this.mission) {
      this.missionForm.patchValue(this.mission);
    }
  }

  onSubmit(): void {
    if (this.missionForm.valid) {
      this.save.emit(this.missionForm.value);
    }
  }

  onClose(): void {
    this.close.emit();
  }
}
