import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  socket: any;

  constructor() {
    this.socket = io('ws://localhost:3000', {
      rejectUnauthorized: false,
      secure: true,
      transports: ['websocket', 'polling', 'flashsocket'],
      auth: {
        token: sessionStorage.getItem('token')
      }
    });
    setTimeout(() => {
      this.sendMessage('')
    }, 3000);
  }

  sendMessage(data: any) { //TODO create DTO
    data = "hello world";

    if (this.socket.connected == true) {
      this.socket.emit('setEvent', data);
    } else {
      // this.socket.emit('joinRoom', {
      //   room: JSON.parse(String(sessionStorage.getItem('room'))).id,
      // });
      console.log('join room first');
    }

  }

  getMessages() {
    const observable = new Observable((observer) => {
      this.socket.on('getEvent', (data: any) => {
        console.log(data);

        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });

    return observable;
  }

}
