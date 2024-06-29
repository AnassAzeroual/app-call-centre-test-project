import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  let authToken = null;
  const platformId = inject(PLATFORM_ID);
  const router = inject(Router);

  if (isPlatformBrowser(platformId)) {
    authToken = sessionStorage?.getItem('token') ?? '';
  }

  if (!!authToken) {
    router.navigate(['/login']);
    return false;
  } else {
    return true;
  }
}
