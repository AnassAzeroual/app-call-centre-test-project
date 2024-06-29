import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor(private router: Router) {


  }


  isTokenExp() {
    let authToken = '';
    const platformId = inject(PLATFORM_ID);
    const router: Router = inject(Router);
    if (isPlatformBrowser(platformId)) {
      authToken = sessionStorage?.getItem('token') ?? '';
    }
    if (!!!authToken) return router.navigate(['/login'])
    let decoded = jwtDecode(authToken);
    let tokenExp = new Date(0).setUTCSeconds(Number(decoded.exp))
    let session = tokenExp.valueOf() > new Date().valueOf()
    if (session === false) router.navigate(['/login']) // if token exp navigate 
    return session
  }

}
