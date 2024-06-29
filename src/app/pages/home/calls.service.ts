import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Calls } from '../../shared/models/calls.model';

@Injectable({
  providedIn: 'root'
})
export class CallsService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:3000/calls';

  getAllCalls(): Observable<Calls[]> {
    return this.http.get<Calls[]>(this.baseUrl);
  }

  getCallById(id: number): Observable<Calls> {
    return this.http.get<Calls>(`${this.baseUrl}/${id}`);
  }

  createCall(call: Calls): Observable<Calls> {
    return this.http.post<Calls>(this.baseUrl, call);
  }

  updateCall(id: number, call: Calls): Observable<Calls> {
    return this.http.put<Calls>(`${this.baseUrl}/${id}`, call);
  }

  deleteCall(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/${id}`);
  }
}
