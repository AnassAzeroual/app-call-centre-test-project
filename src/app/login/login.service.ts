import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) {

  }

  loginMethod(user: any) {
    return of('ok')
    // return this.http.post('', user)
  }
}
