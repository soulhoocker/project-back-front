import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthSigninComponent } from './auth-signin/auth-signin.component';
import { AuthSignupComponent } from './auth-signup/auth-signup.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AuthenticationRoutingModule,
    AuthSigninComponent,   // Import standalone components
    AuthSignupComponent,   // Import standalone components
    ResetPasswordComponent // Import standalone components
  ]
})
export class AuthenticationModule { }
