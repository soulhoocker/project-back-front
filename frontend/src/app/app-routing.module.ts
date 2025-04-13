import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import your components
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';

const routes: Routes = [
  // 🔁 Redirect '' to 'auth/register' as the default route
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./demo/dashboard/dashboard.component').then(
            (c) => c.DashboardComponent
          ),
      },
      // Other admin routes...
    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('./demo/pages/authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
      },
    ],
  },
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./demo/pages/authentication/auth-signin/auth-signin.component').then(
        (c) => c.AuthSigninComponent
      ),
  },
  {
    path: 'auth/register',
    loadComponent: () =>
      import('./demo/pages/authentication/auth-signup/auth-signup.component').then(
        (c) => c.AuthSignupComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
