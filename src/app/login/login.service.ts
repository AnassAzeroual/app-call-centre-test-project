import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl = `http://localhost:3000/`
  constructor(private http: HttpClient) {

  }

  loginMethod(user: any): any {
    return this.http.post(`${this.baseUrl}auth/signin`,user)
  }
}
