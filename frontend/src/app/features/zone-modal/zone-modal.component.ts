import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Zone } from '../../models/MissionModel';
import { CommonModule } from "@angular/common"; // ajuste le chemin si besoin

@Component({
  selector: 'app-zone-modal',
  templateUrl: './zone-modal.component.html',
  imports: [
    ReactiveFormsModule,
    CommonModule
  ]
})
export class ZoneModalComponent implements OnInit { // <<<<<< implements OnInit ajouté
  @Input() zone?: Zone;
  @Output() save = new EventEmitter<Zone>();
  @Output() cancel = new EventEmitter<void>();

  zoneForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.zoneForm = this.fb.group({
      id: ['', Validators.required],
      designation: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Initialise le formulaire avec les données existantes
    this.zoneForm = this.fb.group({
      id: [{ value: this.zone?.id || '', disabled: true }],
      designation: [this.zone?.designation || '', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.zoneForm.valid) {
      const zoneToSave: Zone = {
        ...this.zoneForm.getRawValue() // pour récupérer même les champs disabled comme 'id'
      };
      this.save.emit(zoneToSave);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
