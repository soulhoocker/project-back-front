import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegisterRequest, Role } from '../../../../models/auth.model';
import { AuthService } from '../../../../theme/shared/service/auth';

@Component({
  selector: 'app-auth-signup',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.scss']
})
export class AuthSignupComponent {
  roles = Object.values(Role);
  formSubmitted = false;

  // Create the form group with fields for the general user data
  applyForm = new FormGroup(
    {
      nom: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      prenom: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(100)]),
      role: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required]),
      login: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),

      // Chauffeur-specific fields (initially optional)
      idPermis: new FormControl(''),
      typePermis: new FormControl(''),
      dateValiditePermis: new FormControl(''),
      disponibilite: new FormControl(false),
      etatCivile: new FormControl(''),
    },
    { validators: AuthSignupComponent.passwordsMatchValidator }
  );

  constructor(private authService: AuthService, private router: Router) {}

  static passwordsMatchValidator(formGroup: AbstractControl): { [key: string]: boolean } | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  // Handle the signup process
  signup(): void {
    this.formSubmitted = true;

    if (this.applyForm.invalid) return;

    const selectedRole = this.applyForm.value.role as Role;

    // Construct the RegisterRequest object
    const registerRequest: RegisterRequest = {
      id: 0, // id is assumed to be set by the backend (auto-generated)
      login: this.applyForm.value.login!,
      nom: this.applyForm.value.nom!,
      prenom: this.applyForm.value.prenom!,
      email: this.applyForm.value.email!,
      role: selectedRole,
      password: this.applyForm.value.password!,
      token: '',

      // Include chauffeur-specific fields only if the selected role is CHAUFFEUR
      ...(selectedRole === Role.CHAUFFEUR && {
        idPermis: this.applyForm.value.idPermis,
        typePermis: this.applyForm.value.typePermis,
        dateValiditePermis: this.applyForm.value.dateValiditePermis ? new Date(this.applyForm.value.dateValiditePermis) : null,
        disponibilite: this.applyForm.value.disponibilite,
        etatCivile: this.applyForm.value.etatCivile
      }),

    };
    console.log("🧾 applyForm.value complet :", this.applyForm.value);
    console.log('✅ Données envoyées :', registerRequest);

    this.authService.signup(registerRequest).subscribe({
      next: (response) => {
        console.log('✅ Inscription réussie :', response);
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        console.error('❌ Erreur d\'inscription :', err);
        if (err.error) {
          console.error('🛠️ Détails de l\'erreur :', err.error);
        }
      }
    });
  }
}
