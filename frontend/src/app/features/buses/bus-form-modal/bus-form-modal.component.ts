import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Bus } from '../../../models/MissionModel';
import {CommonModule} from "@angular/common"; // Ajuste le chemin

@Component({
  selector: 'app-bus-form',
  templateUrl: './bus-form-modal.component.html',
  standalone: true,
  imports: [ReactiveFormsModule,
    CommonModule]
})
export class BusFormComponent implements OnInit {
  @Input() bus: Bus | null = null; // 🔥 recevoir un bus pour edit
  @Output() close = new EventEmitter<void>(); // 🔥 émettre fermeture
  @Output() save = new EventEmitter<Bus>(); // 🔥 émettre sauvegarde

  busForm!: FormGroup<{
    immatriculation: FormControl<string | null>;
    marqueModel: FormControl<string | null>;
    capacite: FormControl<number | null>;
    kilometrage: FormControl<number | null>;
    etat: FormControl<string | null>;
  }>;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.busForm = this.fb.group({
      immatriculation: this.fb.control('', { validators: Validators.required }),
      marqueModel: this.fb.control('', { validators: Validators.required }),
      capacite: this.fb.control(0, { validators: [Validators.required, Validators.min(1)] }),
      kilometrage: this.fb.control(0, { validators: [Validators.required, Validators.min(0)] }),
      etat: this.fb.control('', { validators: Validators.required })
    });

    // Si le bus existe (pour l'édition), pré-remplir les données
    if (this.bus) {
      this.busForm.patchValue(this.bus);
    }
  }

  isInvalid(controlName: keyof typeof this.busForm.controls): boolean {
    const control = this.busForm.controls[controlName];
    return control.invalid && control.touched;
  }

  onSubmit(): void {
    if (this.busForm.valid) {
      const formValue = this.busForm.value;
      if (this.bus) {
        formValue['id'] = this.bus.id; // garder l'id si modification
      }
      this.save.emit(formValue as Bus);
    }
  }

  onCancel(): void {
    this.close.emit();
  }
}
