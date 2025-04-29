import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ExecutionMission } from '../../models/MissionModel'; // Adjust path to your model

@Component({
  selector: 'app-execution-mission-modal',
  templateUrl: './execution-mission-modal.component.html',
  styleUrls: ['./execution-mission-modal.component.css'],
  imports: [
    ReactiveFormsModule
  ]
})
export class ExecutionMissionModalComponent implements OnInit {
  @Input() executionMission?: ExecutionMission;
  executionMissionForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.executionMissionForm = this.fb.group({
      id: [this.executionMission?.id || ''],
      dateHeureDepartReel: [this.executionMission?.dateHeureDepartReel || '', Validators.required],
      dateHeureArriveReel: [this.executionMission?.dateHeureArriveReel || '', Validators.required],
      statutExecution: [this.executionMission?.statutExecution || '', Validators.required],
      revenus: [this.executionMission?.revenus || '', [Validators.required, Validators.min(0)]],
      missionId: [this.executionMission?.missionId || '', Validators.required],
      localisationId: [this.executionMission?.localisationId || '', Validators.required],
      factureId: [this.executionMission?.factureId || '', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.executionMissionForm.valid) {
      const executionMissionData: ExecutionMission = this.executionMissionForm.value;
      console.log('Execution Mission soumise:', executionMissionData);
      // Call your service here if needed to save the data
    }
  }

  onClose(): void {
    // Logic to close the modal
  }
}
