import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

export const authGuard: CanActivateFn = (route, state) => {
  const srvNotification = inject(NzNotificationService);
  let authToken = sessionStorage.getItem('token');
  const router = inject(Router);

  if (!authToken) {
    srvNotification.error
    (
      'La session a expiré',
      'Rediriger vers la page de connexion',
    );
    router.navigate(['/login']);
    return false;
  } else {
    return true;
  }
}
