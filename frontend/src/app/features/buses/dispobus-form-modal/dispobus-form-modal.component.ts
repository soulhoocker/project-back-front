import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-dispobus-form',
  standalone: true, // <-- Ajoute standalone: true
  imports: [
    CommonModule, // <-- Pour *ngIf, *ngFor
    ReactiveFormsModule
  ],
  templateUrl: './dispobus-form-modal.component.html',
  styleUrls: ['./dispobus-form-modal.component.scss'] // si tu as un style
})
export class DispoBusFormComponent implements OnInit {
  dispoBusForm!: FormGroup;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Initialize the form with form controls and their validators
    this.dispoBusForm = this.fb.group({
      busId: [null, Validators.required],
      dateDebutIndisponibilite: [null, Validators.required],
      dateFinIndisponibilite: [null, Validators.required],
      descriptionIndisponibilite: ['', Validators.required],
    });
  }

  /**
   * Helper method to check if a form control is invalid and touched
   * @param controlName The name of the form control to check
   * @returns boolean indicating whether the control is invalid and touched
   */
  isInvalid(controlName: string): boolean {
    const control = this.dispoBusForm.get(controlName);
    return control?.invalid && control?.touched ? true : false;
  }

  /**
   * Method that is called when the form is submitted
   */
  ngSubmit(): void {
    if (this.dispoBusForm.valid) {
      // Émettre les données du formulaire lorsque tout est valide
      this.save.emit(this.dispoBusForm.value);
      console.log('Form submitted:', this.dispoBusForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
