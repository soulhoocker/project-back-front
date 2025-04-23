import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthSigninComponent } from './auth-signin/auth-signin.component';
import { AuthSignupComponent } from './auth-signup/auth-signup.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component'; // ✅ Import this

const routes: Routes = [
  {
    path: 'login',
    component: AuthSigninComponent
  },
  {
    path: 'signup',
    component: AuthSignupComponent
  },
  {
    path: 'reset-password', // ✅ Add this route
    component: ResetPasswordComponent
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule {}
