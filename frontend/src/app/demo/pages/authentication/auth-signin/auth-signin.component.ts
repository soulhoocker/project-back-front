import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { LoginRequest } from "../../../../models/auth.model";
import { AuthService } from "../../../../theme/shared/service/auth";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import {jwtDecode} from "jwt-decode";

@Component({
  selector: 'app-auth-signin',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule,CommonModule],
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export class AuthSigninComponent {
  credentials: LoginRequest;
  applyForm = new FormGroup({
    login: new FormControl(''),
    password: new FormControl('')
  });

  // Variable to hold error message
  errorMessage: string |null=null;

  constructor(private http: HttpClient, private auth: AuthService, private route: Router) {}

  login() {
    const credentials: LoginRequest = {
      login: this.applyForm.value.login || '',
      password: this.applyForm.value.password || ''
    };

    this.auth.login(credentials).subscribe({
      next: (response) => {
        console.log('Connexion réussie :', response);
        localStorage.setItem('auth_token', response.token);
        const decodedToken: any = jwtDecode(response.token);

        const role = decodedToken.roles?.[0];

        if (role === 'ROLE_GERANT') {
          this.route.navigateByUrl('/dashboard');
        }  // Redirect to the dashboard
      },
      error: (err) => {
        console.error('Erreur de connexion :', err);
        this.errorMessage = err.message; // Store the error message to display it
      }
    });
  }
}
