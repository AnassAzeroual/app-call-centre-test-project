import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  let authToken = sessionStorage.getItem('token');
  const router = inject(Router);

  if (!authToken) {
    router.navigate(['/login']);
    return false;
  } else {
    return true;
  }
}
