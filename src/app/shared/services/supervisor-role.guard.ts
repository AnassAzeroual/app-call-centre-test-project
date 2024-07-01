import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SharedService } from './shared.service';

export const supervisorGuard: CanActivateFn = (route, state) => {
  const srvShared = inject(SharedService);
  let authToken = sessionStorage.getItem('token');
  const router = inject(Router);

  if (!authToken) {
    srvShared.notification('error', 'La session a expiré', 'Rediriger vers la page de connexion');
    router.navigate(['/login'])
    return false;
  } else {
    console.log(srvShared.getUser().roles);
    
    if (srvShared.getUser().roles === 2) {
      return true
    } else {
      srvShared.notification('warning', 'Non autorisé', 'Rediriger vers la page président ');
      return false;
    }
  }
}
