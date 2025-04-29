import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Notification } from '../../models/MissionModel'; // Adjust path to your model

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.css'],
  imports: [
    ReactiveFormsModule
  ]
})
export class NotificationModalComponent implements OnInit {
  @Input() notification?: Notification;
  notificationForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.notificationForm = this.fb.group({
      id: [this.notification?.id || ''],
      missionId: [this.notification?.missionId || '', Validators.required],
      message: [this.notification?.message || '', Validators.required],
      lue: [this.notification?.lue || false],
      type: [this.notification?.type || 'info', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.notificationForm.valid) {
      const notificationData: Notification = this.notificationForm.value;
      console.log('Notification soumise:', notificationData);
      // Call your service here if needed to save the data
    }
  }

  onClose(): void {
    // Logic to close the modal
  }
}
