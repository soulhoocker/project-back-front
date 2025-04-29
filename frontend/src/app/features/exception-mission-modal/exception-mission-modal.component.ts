import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ExceptionMission } from '../../models/MissionModel'; // adapte ton chemin ici

@Component({
  selector: 'app-exception-mission-modal',
  templateUrl: './exception-mission-modal.component.html',
  imports: [
    ReactiveFormsModule
  ]
})
export class ExceptionMissionModalComponent implements OnInit {
  @Input() exceptionMission?: ExceptionMission;
  exceptionMissionForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.exceptionMissionForm = this.fb.group({
      id: [this.exceptionMission?.id || ''],
      missionId: [this.exceptionMission?.missionId || '', Validators.required],
      raison: [this.exceptionMission?.raison || '', Validators.required],
      details: [this.exceptionMission?.details || '', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.exceptionMissionForm.valid) {
      const exceptionData: ExceptionMission = this.exceptionMissionForm.value;
      console.log('Exception soumise:', exceptionData);
      // Appelle ton service ici si besoin
    }
  }

  onClose(): void {
    // logique pour fermer le modal
  }
}
