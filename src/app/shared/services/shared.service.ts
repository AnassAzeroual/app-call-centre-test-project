import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DecodedSession } from '../models/decodedSession.model';

export const baseUrl = 'http://localhost:3000';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  
  public userInfo: DecodedSession = new DecodedSession();
  constructor(private router: Router, private http: HttpClient, private srvNotification: NzNotificationService) {
    if (sessionStorage.getItem('token')) {
      this.userInfo = jwtDecode(sessionStorage.getItem('token')!)
    }
  }

  initUserData(token:string){
    this.userInfo = jwtDecode(token);
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
