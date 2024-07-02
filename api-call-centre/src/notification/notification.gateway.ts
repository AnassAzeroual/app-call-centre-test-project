// notification.gateway.ts
import { Logger } from '@nestjs/common/services';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { jwtDecode } from "jwt-decode";
@WebSocketGateway({
  transports: ['websocket', 'polling', 'flashsocket']
})
export class NotificationGateway {
  room = [];
  private logger: Logger = new Logger('AppGateway');

  afterInit(server: Server) {
    this.logger.log('Init');
  }
  @WebSocketServer() wss: Server;

  @SubscribeMessage('getEvent')
  async setVU(client: Socket, data: any) {
    console.log(data);

    this.wss.in(this.room).emit('setEvent', data);
  }
  async handleConnection(client: Socket, ...args: any[]) {
    let user: any = null;
    const token = client.handshake.auth.token;
    if (token) {
      user = jwtDecode(token);
      this.room.push(user?.login)
      this.room = [...new Set(this.room)]
      client.join(this.room)
    }

    console.log(this.room);
    
  }
  /* -------------------------------------------------------------------------- */
  /*                            Join Rooms by User ID                           */
  /* -------------------------------------------------------------------------- */
  @SubscribeMessage('joinRoom')
  async joinRoom(client: Socket, userID: number) {
    this.logger.log(`joinRoom user ${userID} now`)
  }

  /* -------------------------------------------------------------------------- */
  /*                                 leave room                                 */
  /* -------------------------------------------------------------------------- */
  @SubscribeMessage('leaveRoom')
  leaveRoom(client: Socket, room: string) {
    client.emit('leftRoom', room);
  }
  // @SubscribeMessage('events')
  // findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
  //   return from('users').pipe(map(item => ({ event: 'events', data: item })));
  // }

  // @SubscribeMessage('identity')
  // async identity(@MessageBody() data: number): Promise<number> {
  //   return data;
  // }

  // public sendNotification(message: string): void {
  //   this.server.clients.forEach((client: any) => {
  //     if (client.readyState === WebSocket.OPEN) {
  //       client.send(message);
  //     }
  //   });
  // }

  // public subscribeToNotifications(): Observable<string> {
  //   return new Observable((observer: Observer<string>) => {
  //     this.server.on('connection', (socket: any) => {
  //       socket.onmessage = (event: any) => {
  //         observer.next(event.data.toString());
  //       };
  //       socket.onclose = () => {
  //         observer.complete();
  //       };
  //     });
  //   });
  // }
}
