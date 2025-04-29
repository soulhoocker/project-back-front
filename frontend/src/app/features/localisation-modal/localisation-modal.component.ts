import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Localisation } from '../../models/MissionModel'; // adapte le chemin

@Component({
  selector: 'app-localisation-modal',
  templateUrl: './localisation-modal.component.html',
  imports: [
    ReactiveFormsModule
  ]
})
export class LocalisationModalComponent implements OnInit {
  @Input() localisation?: Localisation;
  localisationForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.localisationForm = this.fb.group({
      id: [this.localisation?.id || ''],
      missionId: [this.localisation?.missionId || '', Validators.required],
      latitude: [this.localisation?.latitude || '', Validators.required],
      longitude: [this.localisation?.longitude || '', Validators.required],
      horodatage: [this.localisation ? this.formatDate(this.localisation.horodatage) : '', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.localisationForm.valid) {
      const localisationData: Localisation = this.localisationForm.value;
      console.log('Localisation soumise:', localisationData);
      // Appelle ici ton service pour sauvegarder ou mettre à jour
    }
  }

  onClose(): void {
    // Logique pour fermer le modal
  }

  private formatDate(date: Date): string {
    // Pour afficher correctement le datetime-local input
    const d = new Date(date);
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }
}
