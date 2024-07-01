import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { NzNotificationService } from 'ng-zorro-antd/notification';

export const baseUrl = 'http://localhost:3000';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  
  public userInfo: any;
  constructor(private router: Router, private http: HttpClient, private srvNotification: NzNotificationService) {
    if (sessionStorage.getItem('token')) {
      this.userInfo = jwtDecode(sessionStorage.getItem('token')!)
    }
  }


  isTokenExp() {
    let authToken = sessionStorage.getItem('token');

    if (!authToken) return this.router.navigate(['/login'])
    let decoded = jwtDecode(authToken);
    this.userInfo = decoded;
    let tokenExp = new Date(0).setUTCSeconds(Number(decoded.exp))
    let session = tokenExp.valueOf() > new Date().valueOf()
    if (session === false) this.router.navigate(['/login']) // if token exp navigate 
    return session
  }

  getUser() {
    return this.userInfo;
  }

  getAgents() {
    return this.http.get(`${baseUrl}/admin/agents`);
  }

  notification(type: 'success'| 'error'| 'info'| 'warning', title: string, description: string) {
    this.srvNotification[type](title, description);
  }

  logoutUser() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
