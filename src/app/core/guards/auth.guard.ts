import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state): boolean => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = authService.isAuthenticated();
  const isAdmin = authService.getUser()?.role === 'admin';

  if (isAuthenticated && isAdmin) {
    return true;
  }

  if (isAuthenticated && !isAdmin) {
    router.navigate(['/confessions']);
    return false;
  }

  router.navigate(['/login']);
  return false;
};
