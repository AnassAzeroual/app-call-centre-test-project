// notification.gateway.ts
import { Logger } from '@nestjs/common/services';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { jwtDecode } from 'jwt-decode';
@WebSocketGateway({
  transports: ['websocket', 'polling', 'flashsocket'],
})
export class NotificationGateway {
  constructor() {}
  room = ['room1'];
  private logger: Logger = new Logger('AppGateway');

  afterInit(server: Server) {
    this.logger.log('Init');
  }
  @WebSocketServer() wss: Server = new Server();

  @SubscribeMessage('getEvent')
  async setVU(client: Socket, data: any) {
    this.wss.in(this.room).emit('setEvent', data);
  }

  async handleConnection(client: Socket, ...args: any[]) {
    let user: any = null;
    const token = client.handshake.auth.token;
    if (token) {
      user = jwtDecode(token);
      client.join(this.room);
    }
    this.wss.in(this.room).emit('setEvent', user);
  }
  /* -------------------------------------------------------------------------- */
  /*                            Join Rooms by User ID                           */
  /* -------------------------------------------------------------------------- */
  @SubscribeMessage('joinRoom')
  async joinRoom(client: Socket, userID: number) {
    this.logger.log(`joinRoom user ${userID} now`);
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
  @SubscribeMessage('setEvent')
  setEventNotifications(data: any) {
    this.wss.in(this.room).emit('getEvent', data);
  }
}
