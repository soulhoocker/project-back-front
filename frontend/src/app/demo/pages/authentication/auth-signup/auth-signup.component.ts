import { Component } from '@angular/core';
import {Router, RouterModule} from '@angular/router';
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

  applyForm = new FormGroup(
    {
      nom: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      prenom: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(100)]),
      role: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required]),
      login: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)])

    },
    { validators: AuthSignupComponent.passwordsMatchValidator }
  );

  constructor(private authService: AuthService, private router: Router) {}

  static passwordsMatchValidator(formGroup: AbstractControl): { [key: string]: boolean } | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  // ✅ Tout le code ici est dans la méthode `signup()`
  signup(): void {
    this.formSubmitted = true;

    if (this.applyForm.invalid) return;

    const selectedRole = this.applyForm.value.role as Role;

    const registerRequest: RegisterRequest = {
      id: 0,
      login: this.applyForm.value.login!,
      nom: this.applyForm.value.nom!,
      prenom: this.applyForm.value.prenom!,
      email: this.applyForm.value.email!,
      role: selectedRole,
      password: this.applyForm.value.password!,
      token: ''
    };

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
