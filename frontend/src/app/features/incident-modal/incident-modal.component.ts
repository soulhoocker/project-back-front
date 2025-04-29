import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Incident } from '../../models/MissionModel'; // adapte ici aussi le chemin

@Component({
  selector: 'app-incident-modal',
  templateUrl: './incident-modal.component.html',
  imports: [
    ReactiveFormsModule
  ]
})
export class IncidentModalComponent implements OnInit {
  @Input() incident?: Incident;
  incidentForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.incidentForm = this.fb.group({
      id: [this.incident?.id || ''],
      missionId: [this.incident?.missionId || '', Validators.required],
      description: [this.incident?.description || '', Validators.required],
      gravite: [this.incident?.gravite || '', Validators.required],
      resolu: [this.incident?.resolu ?? '', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.incidentForm.valid) {
      const incidentData: Incident = this.incidentForm.value;
      console.log('Incident soumis:', incidentData);
      // ici tu pourras appeler ton service pour enregistrer ou mettre à jour
    }
  }

  onClose(): void {
    // logique pour fermer ton modal
  }
}
