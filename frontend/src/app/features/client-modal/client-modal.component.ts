import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Client } from '../../models/MissionModel';
import { CommonModule } from '@angular/common';
import {ClientService} from "../../demo/dashboard/core/services/client.service";  // Adjust import as needed

@Component({
  selector: 'app-client-modal',
  templateUrl: './client-modal.component.html',
  imports: [ReactiveFormsModule, CommonModule],
  styleUrls: ['./client-modal.component.scss'],
})
export class ClientModalComponent implements OnInit {
  @Input() client: Client | null = null;
  @Output() closeModal = new EventEmitter<void>();
  @Output() clientSaved = new EventEmitter<Client>();

  clientForm: FormGroup;

  constructor(private fb: FormBuilder , private clientService: ClientService) {
    this.clientForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      libelletClient: ['', Validators.required],
      mailClient: ['', [Validators.required, Validators.email]],
      telephoneClient: ['', Validators.required],
      adresseClient: ['', Validators.required],
      matriculeFiscale: ['', Validators.required],
      zoneAction: ['', Validators.required],
      chiffreAffaire: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    if (this.client) {
      this.clientForm.patchValue(this.client);
    }
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      const clientToSave: Client = this.clientForm.getRawValue();

      console.log('Client to save:', clientToSave);

      this.clientService.saveClient(clientToSave).subscribe({
        next: (savedClient) => {
          console.log('Client saved from backend:', savedClient);
          this.clientSaved.emit(savedClient);
          this.closeModal.emit();
        },
        error: (err) => {
          console.error('Erreur lors de la sauvegarde du client :', err);
        }
      });
    } else {
      console.log('Form is invalid. Please fill out all required fields.');
      this.markAllFieldsAsTouched();
    }
  }


  onCancel(): void {
    this.closeModal.emit();  // Émet l'événement pour fermer la modal
    console.log('Form cancelled');
  }

  private markAllFieldsAsTouched(): void {
    Object.keys(this.clientForm.controls).forEach((field) => {
      const control = this.clientForm.get(field);
      if (control) {
        control.markAsTouched();  // Marque chaque champ comme touché pour déclencher les messages d'erreur
      }
    });
  }
}
