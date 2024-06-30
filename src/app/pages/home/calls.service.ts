import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Calls } from '../../shared/models/calls.model';
import { baseUrl } from '../../shared/services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class CallsService {

  constructor(private http: HttpClient) { }

  getAllCalls(): Observable<Calls[]> {
    return this.http.get<Calls[]>(`${baseUrl}/calls`);
  }

  getCallById(id: number): Observable<Calls> {
    return this.http.get<Calls>(`${baseUrl}/calls/${id}`);
  }

  createCall(call: Calls): Observable<Calls> {
    return this.http.post<Calls>(`${baseUrl}/calls`, call);
  }

  updateCall(id: number, call: Calls): Observable<Calls> {
    return this.http.put<Calls>(`${baseUrl}/calls/${id}`, call);
  }

  deleteCall(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${baseUrl}/calls/${id}`);
  }
}
