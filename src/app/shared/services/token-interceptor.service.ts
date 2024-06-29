import { isPlatformBrowser } from '@angular/common';
import {
  HttpErrorResponse,
  HttpInterceptorFn
} from '@angular/common/http';
import { PLATFORM_ID, inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';


export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  let authToken = null;
  if (isPlatformBrowser(platformId)) {
    authToken = sessionStorage?.getItem('token') || null;
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  });

  return next(authReq).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          router.navigate(['/login']);
        } else {
          console.log('Handle other HTTP error codes:', err);
        }
      } else {
        console.log('Handle non-HTTP errors:', err);
      }

      // Re-throw the error to propagate it further
      return of(err);
    })
  );;
};
