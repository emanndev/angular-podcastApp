import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state): boolean => {
 const authService = inject(AuthService);
 const router = inject(Router);
 
  if (authService.isAuthenticated()) {
    return true;
  } else {
    // if not authenticated, redirect to login
    router.navigate(['/login']);
    return false;
  }
};
