import { Component } from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {LoginRequest} from "../../../../models/auth.model";
import { AuthService} from "../../../../theme/shared/service/auth";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-auth-signin',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export  class AuthSigninComponent {
  credentials : LoginRequest;
  applyForm = new FormGroup({
    login: new FormControl(''),
    password : new FormControl('')
  })
  constructor(private http:HttpClient,private auth:AuthService,private route:Router) {
  }

  login() {
    const credentials: LoginRequest = {
      login: this.applyForm.value.login || '',
      password: this.applyForm.value.password || ''
    };

    this.auth.login(credentials).subscribe({
      next: (response) => {
        console.log('Connexion réussie :', response);
        this.route.navigateByUrl('dashboard')
        // Tu peux ici stocker le token, rediriger, etc.
      },
      error: (err) => {
        console.error('Erreur de connexion :', err);
      }
    });
  }

}
