import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tickets } from '../../shared/models/tickets.model';
import { Observable } from 'rxjs';
import { baseUrl } from '../../shared/services/shared.service';
import { TicketComments } from '../../shared/models/ticketComments.model';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(private http: HttpClient) { }

  getAllTickets(): Observable<Tickets[]> {
    return this.http.get<Tickets[]>(`${baseUrl}/tickets`);
  }

  getTicketByPhoneNumber(phoneNumber: string): Observable<any> {
    return this.http.get(`${baseUrl}/tickets/${phoneNumber}`);
  }

  getTicketsByUserId(userId: number): Observable<Tickets[]> {
    return this.http.get<Tickets[]>(`${baseUrl}/tickets/ticketByUserId/${userId}`);
  }

  createTicket(ticket: Tickets): Observable<Tickets> {
    return this.http.post<Tickets>(`${baseUrl}/tickets`, ticket);
  }

  editTicket(ticket: Tickets): Observable<Tickets> {
    return this.http.put<Tickets>(`${baseUrl}/tickets/${ticket.ticketId}`, ticket);
  }

  getTicketComments(ticketId: number): Observable<TicketComments[]> {
    return this.http.get<TicketComments[]>(`${baseUrl}/ticket-comments/${ticketId}`);
  }

  getTicketById(ticketId: number): Observable<Tickets> {
    console.log('service');
    
    return this.http.get<Tickets>(`${baseUrl}/tickets/ticketById/${ticketId}`);
  }

  addTicketComment(ticketComment: TicketComments): Observable<any> {
    return this.http.post(`${baseUrl}/ticket-comments`,ticketComment);
  }

}
