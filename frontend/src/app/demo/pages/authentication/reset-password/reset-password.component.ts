import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { AuthService } from "../../../../theme/shared/service/auth";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  imports: [
    FormsModule,
    CommonModule
  ],
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  email: string = '';
  message: string = '';
  error: string = '';

  constructor(private authService: AuthService) {
  }

  resetPassword() {
    this.authService.resetPassword(this.email).subscribe({
      next: (response) => {
        console.log('Password reset response:', response);
        this.message = response.message || 'Reset instructions sent to your email';
        this.error = '';
      },
      error: (err) => {
        console.error('Reset error:', err);
        this.error = err.message || 'Failed to process reset request';
        this.message = '';
      }
    });
  }
}
