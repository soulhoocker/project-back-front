import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Facture } from '../../models/MissionModel'; // adapte le chemin à ton projet

@Component({
  selector: 'app-facture-modal',
  templateUrl: './facture-modal.component.html',
  imports: [
    ReactiveFormsModule
  ]
})
export class FactureModalComponent implements OnInit {
  @Input() facture?: Facture;
  factureForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.factureForm = this.fb.group({
      id: [this.facture?.id || ''],
      missionId: [this.facture?.missionId || '', Validators.required],
      montant: [this.facture?.montant || '', [Validators.required, Validators.min(0.01)]],
      payee: [this.facture?.payee ?? '', Validators.required],
      dateEmission: [this.facture?.dateEmission ? this.formatDate(this.facture.dateEmission) : '', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.factureForm.valid) {
      const factureData: Facture = this.factureForm.value;
      console.log('Facture soumise:', factureData);
      // Ici tu pourras envoyer vers ton service
    }
  }

  onClose(): void {
    // logique pour fermer ton modal
  }

  private formatDate(date: Date): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }
}
