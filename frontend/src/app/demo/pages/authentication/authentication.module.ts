import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthSigninComponent } from './auth-signin/auth-signin.component';
import { AuthSignupComponent } from './auth-signup/auth-signup.component';

@NgModule({
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    AuthSigninComponent,
    AuthSignupComponent
  ]
})
export class AuthenticationModule {}
