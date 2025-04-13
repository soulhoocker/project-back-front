import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthSigninComponent } from './auth-signin/auth-signin.component';
import { AuthSignupComponent } from './auth-signup/auth-signup.component';

const routes: Routes = [
  {
    path: 'login',
    component: AuthSigninComponent
  },
  {
    path: 'signup',
    component: AuthSignupComponent
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' } // Optional: Default route to login
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule {}
