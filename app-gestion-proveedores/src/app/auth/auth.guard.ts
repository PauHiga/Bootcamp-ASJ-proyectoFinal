import {inject} from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

export const authGuard = () => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  if (authService.isLoggedIn) {
    return true;
  }

  // Redirect to the login page
  return router.parseUrl('/login');
};