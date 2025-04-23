import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../../app/theme/shared/service/auth'; // Make sure to import your AuthService

@Injectable({
  providedIn: 'root'
})
export class GerantGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const currentUser = this.authService.getCurrentUser(); // Replace this with how you get current logged-in user
    console.log('Current User:', currentUser); // Debugging: Log the decoded token
    console.log(currentUser)
    if (currentUser && currentUser.roles[0] === 'ROLE_GERANT') {
      // User is a Gérant, allow access
      return true;
    }

    // User is not a Gérant, redirect to login page or show an error
    this.router.navigate(['auth/login']); // Tu peux créer une page "Unauthorized" si tu veux
    return false;
  }
}
