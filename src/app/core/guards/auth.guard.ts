import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '@v2/services'; // Assuming LoginService is in @v2/services
import { AuthState } from '@v2/enums';

export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  if (loginService.authState() === AuthState.LoggedIn) {
    return true; // User is logged in, allow access
  } else {
    // User is not logged in, redirect to login page
    console.log('AuthGuard: User not logged in, redirecting to /login');
    router.navigate(['/login']);
    return false; // Prevent access to the route
  }
}; 